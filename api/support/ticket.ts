import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseAdmin } from '../_lib/supabase';
import {
  successResponse,
  errorResponse,
  handleCors,
  validateRequired,
  generateTicketId,
} from '../_lib/response';

/**
 * POST /api/support/ticket
 * 
 * Create a support ticket
 * 
 * Request body:
 * {
 *   name: string (required)
 *   email: string (required)
 *   subject: string (required)
 *   message: string (required)
 *   userId?: string (optional) - User ID if authenticated
 * }
 * 
 * Response:
 * {
 *   success: true,
 *   data: {
 *     id: string,
 *     name: string,
 *     email: string,
 *     subject: string,
 *     message: string,
 *     status: string,
 *     created_at: string
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
    const validation = validateRequired(req.body, ['name', 'email', 'subject', 'message']);
    if (!validation.valid) {
      return errorResponse(
        res,
        `Missing required fields: ${validation.missing?.join(', ')}`,
        400
      );
    }

    const { name, email, subject, message, userId } = req.body;

    // Validate email format (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return errorResponse(res, 'Invalid email format', 400);
    }

    // Get Supabase client
    const supabase = getSupabaseAdmin();

    // Insert support ticket into database
    const { data, error } = await supabase
      .from('support_tickets')
      .insert({
        user_id: userId || null,
        name,
        email,
        subject,
        message,
        status: 'open',
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return errorResponse(res, 'Failed to create support ticket', 500);
    }

    return successResponse(res, data, 201);
  } catch (error) {
    console.error('API error:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
}
