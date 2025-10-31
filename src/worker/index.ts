/**
 * CLEANEXIT BACKEND API (Cloudflare Worker)
 * 
 * This is the main backend server that runs on Cloudflare's edge network.
 * It handles all API requests for authentication, user management, subscriptions, and AI chat.
 * 
 * Built with Hono - a lightweight, fast web framework perfect for edge computing.
 * Connects to Cloudflare D1 database for storing subscription data.
 */

import { Hono } from "hono";
import {
  exchangeCodeForSessionToken,  // Converts OAuth code to session token
  getOAuthRedirectUrl,           // Gets Google login URL
  authMiddleware,                // Protects routes that need authentication
  deleteSession,                 // Logs out user from backend
  MOCHA_SESSION_TOKEN_COOKIE_NAME, // Name of the cookie storing user session
} from "@getmocha/users-service/backend";
import { getCookie, setCookie } from "hono/cookie";

// Initialize the Hono app with TypeScript types for Cloudflare environment
const app = new Hono<{ Bindings: Env }>();

/**
 * Helper function to check if Mocha Users Service is configured
 * 
 * In development, you need to set MOCHA_USERS_SERVICE_API_URL and 
 * MOCHA_USERS_SERVICE_API_KEY in .dev.vars file for authentication to work.
 * Without these, the app still runs but auth features are disabled.
 * 
 * @param env - Cloudflare Worker environment variables
 * @returns true if both API URL and key are configured
 */
function hasUsersServiceConfig(env: Env) {
  return Boolean(env.MOCHA_USERS_SERVICE_API_URL && env.MOCHA_USERS_SERVICE_API_KEY);
}

/**
 * ROUTE: Get Google OAuth Login URL
 * 
 * This is step 1 of the login process. When users click "Continue with Google",
 * the frontend calls this endpoint to get the URL where they should be redirected.
 * 
 * Flow:
 * 1. Frontend requests this endpoint
 * 2. We ask Mocha Users Service for a Google OAuth URL
 * 3. Frontend redirects user to that URL
 * 4. User logs in with Google
 * 5. Google redirects back to our app with a code
 * 
 * @route GET /api/oauth/google/redirect_url
 * @returns { redirectUrl: string } - The Google OAuth URL to redirect to
 */
app.get('/api/oauth/google/redirect_url', async (c) => {
  // Check if auth service is configured (important for local development)
  if (!hasUsersServiceConfig(c.env)) {
    return c.json({
      error: 'Users Service not configured in dev',
      note: 'Set MOCHA_USERS_SERVICE_API_URL and MOCHA_USERS_SERVICE_API_KEY in .dev.vars to enable auth locally.'
    }, 501);
  }

  try {
    // Ask Mocha Users Service to generate the Google login URL
    const redirectUrl = await getOAuthRedirectUrl('google', {
      apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
      apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
    });
    return c.json({ redirectUrl }, 200);
  } catch (e) {
    console.error('Failed to get redirect URL:', e);
    return c.json({ error: 'Failed to get redirect URL' }, 502);
  }
});

/**
 * ROUTE: Create User Session (Complete Login)
 * 
 * This is step 2 of the login process. After Google redirects back with a code,
 * the frontend sends that code here to complete the login.
 * 
 * Flow:
 * 1. User returns from Google with a one-time code
 * 2. We exchange that code for a long-lived session token
 * 3. We store the session token in a secure HTTP-only cookie
 * 4. User is now logged in!
 * 
 * Security: The cookie is httpOnly (can't be accessed by JavaScript), secure (HTTPS only),
 * and lasts 60 days so users don't have to log in frequently.
 * 
 * @route POST /api/sessions
 * @body { code: string } - OAuth authorization code from Google
 * @returns { success: true } - Session created successfully
 */
app.post("/api/sessions", async (c) => {
  const body = await c.req.json();

  // Validate that we received the authorization code
  if (!body.code) {
    return c.json({ error: "No authorization code provided" }, 400);
  }

  // Check if auth service is configured
  if (!hasUsersServiceConfig(c.env)) {
    return c.json({
      error: 'Users Service not configured in dev',
      note: 'Set MOCHA_USERS_SERVICE_API_URL and MOCHA_USERS_SERVICE_API_KEY in .dev.vars.'
    }, 501);
  }

  // Exchange the one-time code for a reusable session token
  const sessionToken = await exchangeCodeForSessionToken(body.code, {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  // Store session token in a secure cookie that lasts 60 days
  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, sessionToken, {
    httpOnly: true,        // Can't be accessed by JavaScript (prevents XSS attacks)
    path: "/",             // Cookie valid for entire site
    sameSite: "none",      // Allow cross-site requests
    secure: true,          // Only send over HTTPS
    maxAge: 60 * 24 * 60 * 60, // 60 days in seconds
  });

  return c.json({ success: true }, 200);
});

/**
 * ROUTE: Get Current User Profile
 * 
 * Returns information about the currently logged-in user.
 * The authMiddleware automatically validates the session cookie and
 * attaches the user object to the request context.
 * 
 * Used by the frontend to:
 * - Display user name and profile picture
 * - Check if user is logged in
 * - Get user ID for other API calls
 * 
 * @route GET /api/users/me
 * @auth Required - Must have valid session cookie
 * @returns User object with email, name, profile picture, etc.
 */
app.get("/api/users/me", authMiddleware, async (c) => {
  // authMiddleware already validated session and attached user to context
  return c.json(c.get("user"));
});

/**
 * ROUTE: Logout User
 * 
 * Logs out the current user by:
 * 1. Deleting the session from the auth service backend
 * 2. Clearing the session cookie from the browser
 * 
 * This is a "clean" logout - the user is logged out everywhere,
 * not just on this device.
 * 
 * @route GET /api/logout
 * @auth Optional - Works even if not logged in
 * @returns { success: true }
 */
app.get('/api/logout', async (c) => {
  const sessionToken = getCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME);

  // If user has a session token, delete it from the backend
  if (typeof sessionToken === 'string') {
    if (hasUsersServiceConfig(c.env)) {
      try {
        // Tell Mocha Users Service to invalidate this session
        await deleteSession(sessionToken, {
          apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
          apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
        });
      } catch (e) {
        // If backend deletion fails (e.g., in dev), still clear cookie
        console.warn('Logout deleteSession failed (dev):', e);
      }
    }
  }

  // Clear the session cookie from browser (maxAge: 0 deletes it)
  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, '', {
    httpOnly: true,
    path: '/',
    sameSite: 'none',
    secure: true,
    maxAge: 0,  // Setting to 0 immediately expires the cookie
  });

  return c.json({ success: true }, 200);
});

/**
 * ROUTE: Get User's Subscription Details
 * 
 * Returns the user's current subscription plan and device usage.
 * Shows how many device erasures they've used vs. their limit.
 * 
 * Smart Features:
 * - Auto-creates a FREE Starter plan if user has no subscription
 * - Calculates remaining devices automatically
 * - Joins subscription with plan details for complete info
 * 
 * Used by dashboard to show:
 * - Current plan (Starter/Pro/Advanced)
 * - Monthly cost
 * - Device credits used and remaining
 * - Progress bar for usage
 * 
 * @route GET /api/users/subscription
 * @auth Required - Must be logged in
 * @returns Subscription details with plan info and usage
 */
app.get('/api/users/subscription', authMiddleware, async (c) => {
  const user = c.get('user');
  
  try {
    // Query database for user's active subscription + plan details
    // We JOIN with subscription_plans to get plan name, price, etc.
    const subscription = await c.env.DB.prepare(`
      SELECT us.*, sp.name as plan_name, sp.price, sp.devices_limit as plan_devices_limit
      FROM user_subscriptions us
      JOIN subscription_plans sp ON us.plan_id = sp.id
      WHERE us.user_id = ? AND us.status = 'active'
      ORDER BY us.created_at DESC
      LIMIT 1
    `).bind(user.id).first();

    // If user has no subscription, give them the FREE Starter plan automatically
    if (!subscription) {
      const starterPlan = await c.env.DB.prepare(`
        SELECT * FROM subscription_plans WHERE name = 'Starter' LIMIT 1
      `).first();

      if (starterPlan) {
        // Create new subscription record for this user
        await c.env.DB.prepare(`
          INSERT INTO user_subscriptions (user_id, plan_id, devices_limit, devices_used)
          VALUES (?, ?, ?, ?)
        `).bind(user.id, starterPlan.id, starterPlan.devices_limit, 0).run();

        // Return the starter plan details
        return c.json({
          plan_name: starterPlan.name,
          price: starterPlan.price,
          devices_limit: starterPlan.devices_limit,
          devices_used: 0,
          devices_remaining: starterPlan.devices_limit,
          status: 'active'
        });
      }
    }

    // Calculate how many device credits remain (can't go negative)
    const devicesRemaining = Math.max(0, subscription.devices_limit - subscription.devices_used);

    // Return complete subscription info to frontend
    return c.json({
      plan_name: subscription.plan_name,
      price: subscription.price,
      devices_limit: subscription.devices_limit,
      devices_used: subscription.devices_used,
      devices_remaining: devicesRemaining,
      status: subscription.status
    });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return c.json({ error: 'Failed to fetch subscription data' }, 500);
  }
});

/**
 * ROUTE: Chat with Sid AI Assistant
 * 
 * Handles conversations with Sid, our AI-powered data security assistant.
 * Currently uses simple random responses, but can be upgraded to GPT-4 or similar.
 * 
 * Sid can help with:
 * - Pricing questions
 * - Compliance requirements (GDPR, HIPAA, etc.)
 * - Service explanations
 * - Emergency requests
 * - Scheduling consultations
 * 
 * Future: Integrate with OpenAI GPT-4 or Claude for smarter responses
 * 
 * @route POST /api/chat
 * @auth Required - Must be logged in
 * @body { message: string } - User's question
 * @returns { response: string, user: string } - Sid's answer + user name
 */
app.post('/api/chat', authMiddleware, async (c) => {
  const user = c.get('user');
  const body = await c.req.json();
  
  // Validate that message was provided
  if (!body.message) {
    return c.json({ error: "No message provided" }, 400);
  }

  // Array of helpful responses Sid can give
  // TODO: Replace with actual AI (GPT-4, Claude, etc.) for smarter conversations
  const responses = [
    "Hello! I'm Sid, your data security assistant. How can I help you with your data erasure needs today?",
    "I can help you understand our secure data deletion services. What specific information are you looking for?",
    "Our NIST 800-88 compliant erasure processes ensure your data is completely unrecoverable. Would you like to know more?",
    "For enterprise clients, we offer custom solutions with dedicated support. What's the scale of your data security needs?",
    "I can guide you through our compliance certifications including GDPR, HIPAA, and SOX. Which standard interests you most?",
    "Our mobile device wiping service supports both iOS and Android platforms. Do you need help with BYOD policies?",
    "Emergency data destruction is available 24/7. Is this for an urgent security incident?",
    "I can help you schedule a consultation with our data security experts. What's your preferred contact method?"
  ];

  // Pick a random response for now (simple demo behavior)
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];

  // Return response with user's first name for personalization
  return c.json({ 
    response: randomResponse,
    user: user?.google_user_data.given_name || user?.email 
  });
});

// Export the Hono app as the default Worker handler
export default app;
