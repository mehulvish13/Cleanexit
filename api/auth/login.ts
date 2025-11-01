import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseAdmin } from '../_lib/supabase';
import {
  successResponse,
  errorResponse,
  handleCors,
  validateRequired,
} from '../_lib/response';

/**
 * POST /api/auth/login
 * 
 * Simple authentication - creates or retrieves user by username
 * 
 * Request body:
 * {
 *   username: string (required) - Username to login with
 * }
 * 
 * Response:
 * {
 *   success: true,
 *   data: {
 *     user: {
 *       id: string,
 *       username: string,
 *       email?: string,
 *       created_at: string
 *     }
 *   }
 * }
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return handleCors(res);
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return errorResponse(res, 'Method not allowed', 405);
  }

  try {
    // Validate request body
    const validation = validateRequired(req.body, ['username']);
    if (!validation.valid) {
      return errorResponse(
        res,
        `Missing required fields: ${validation.missing?.join(', ')}`,
        400
      );
    }

    const { username } = req.body;

    // Validate username format
    if (username.length < 3) {
      return errorResponse(res, 'Username must be at least 3 characters', 400);
    }

    // Get Supabase client
    const supabase = getSupabaseAdmin();

    // Check if user exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .maybeSingle();

    if (fetchError) {
      console.error('Database error:', fetchError);
      return errorResponse(res, 'Database error', 500);
    }

    // If user exists, return it
    if (existingUser) {
      return successResponse(res, { user: existingUser });
    }

    // Create new user
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert({
        username: username,
        email: `${username}@cleanexit.local`,
      })
      .select()
      .single();

    if (createError) {
      console.error('Database error:', createError);
      return errorResponse(res, 'Failed to create user', 500);
    }

    return successResponse(res, { user: newUser }, 201);
  } catch (error) {
    console.error('API error:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
}
