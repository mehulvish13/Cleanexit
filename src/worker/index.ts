import { Hono } from "hono";
import {
  exchangeCodeForSessionToken,
  getOAuthRedirectUrl,
  authMiddleware,
  deleteSession,
  MOCHA_SESSION_TOKEN_COOKIE_NAME,
} from "@getmocha/users-service/backend";
import { getCookie, setCookie } from "hono/cookie";

const app = new Hono<{ Bindings: Env }>();

// Helper to verify external Users Service config exists in dev
function hasUsersServiceConfig(env: Env) {
  return Boolean(env.MOCHA_USERS_SERVICE_API_URL && env.MOCHA_USERS_SERVICE_API_KEY);
}

// Obtain redirect URL from the Mocha Users Service
app.get('/api/oauth/google/redirect_url', async (c) => {
  if (!hasUsersServiceConfig(c.env)) {
    return c.json({
      error: 'Users Service not configured in dev',
      note: 'Set MOCHA_USERS_SERVICE_API_URL and MOCHA_USERS_SERVICE_API_KEY in .dev.vars to enable auth locally.'
    }, 501);
  }

  try {
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

// Exchange the code for a session token
app.post("/api/sessions", async (c) => {
  const body = await c.req.json();

  if (!body.code) {
    return c.json({ error: "No authorization code provided" }, 400);
  }

  if (!hasUsersServiceConfig(c.env)) {
    return c.json({
      error: 'Users Service not configured in dev',
      note: 'Set MOCHA_USERS_SERVICE_API_URL and MOCHA_USERS_SERVICE_API_KEY in .dev.vars.'
    }, 501);
  }

  const sessionToken = await exchangeCodeForSessionToken(body.code, {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
    maxAge: 60 * 24 * 60 * 60, // 60 days
  });

  return c.json({ success: true }, 200);
});

// Get the current user object for the frontend
app.get("/api/users/me", authMiddleware, async (c) => {
  return c.json(c.get("user"));
});

// Call this from the frontend to log out the user
app.get('/api/logout', async (c) => {
  const sessionToken = getCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME);

  if (typeof sessionToken === 'string') {
    if (hasUsersServiceConfig(c.env)) {
      try {
        await deleteSession(sessionToken, {
          apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
          apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
        });
      } catch (e) {
        console.warn('Logout deleteSession failed (dev):', e);
      }
    }
  }

  // Delete cookie by setting max age to 0
  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, '', {
    httpOnly: true,
    path: '/',
    sameSite: 'none',
    secure: true,
    maxAge: 0,
  });

  return c.json({ success: true }, 200);
});

// Get user subscription info
app.get('/api/users/subscription', authMiddleware, async (c) => {
  const user = c.get('user');
  
  try {
    // Get user's current subscription
    const subscription = await c.env.DB.prepare(`
      SELECT us.*, sp.name as plan_name, sp.price, sp.devices_limit as plan_devices_limit
      FROM user_subscriptions us
      JOIN subscription_plans sp ON us.plan_id = sp.id
      WHERE us.user_id = ? AND us.status = 'active'
      ORDER BY us.created_at DESC
      LIMIT 1
    `).bind(user.id).first();

    if (!subscription) {
      // If no subscription found, create a default Starter plan subscription
      const starterPlan = await c.env.DB.prepare(`
        SELECT * FROM subscription_plans WHERE name = 'Starter' LIMIT 1
      `).first();

      if (starterPlan) {
        await c.env.DB.prepare(`
          INSERT INTO user_subscriptions (user_id, plan_id, devices_limit, devices_used)
          VALUES (?, ?, ?, ?)
        `).bind(user.id, starterPlan.id, starterPlan.devices_limit, 0).run();

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

    const devicesRemaining = Math.max(0, subscription.devices_limit - subscription.devices_used);

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

// AI Assistant endpoint for Sid
app.post('/api/chat', authMiddleware, async (c) => {
  const user = c.get('user');
  const body = await c.req.json();
  
  if (!body.message) {
    return c.json({ error: "No message provided" }, 400);
  }

  // Simple AI assistant response for Sid
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

  const randomResponse = responses[Math.floor(Math.random() * responses.length)];

  return c.json({ 
    response: randomResponse,
    user: user?.google_user_data.given_name || user?.email 
  });
});

export default app;
