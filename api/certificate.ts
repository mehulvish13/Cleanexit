import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseAdmin } from './_lib/supabase';
import {
  successResponse,
  errorResponse,
  handleCors,
  validateRequired,
  generateCertificateId,
} from './_lib/response';

/**
 * POST /api/certificate
 * 
 * Generate a data wipe certificate
 * 
 * Request body:
 * {
 *   deviceType: string (required) - Type of device (e.g., "Laptop", "Phone")
 *   userId?: string (optional) - User ID if authenticated
 * }
 * 
 * Response:
 * {
 *   success: true,
 *   data: {
 *     id: string,
 *     certificate_id: string,
 *     device_type: string,
 *     wiped_at: string,
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
    const validation = validateRequired(req.body, ['deviceType']);
    if (!validation.valid) {
      return errorResponse(
        res,
        `Missing required fields: ${validation.missing?.join(', ')}`,
        400
      );
    }

    const { deviceType, userId = 'guest' } = req.body;

    // Get Supabase client
    const supabase = getSupabaseAdmin();

    // Generate certificate details
    const certificateId = generateCertificateId();
    const wipedAt = new Date().toISOString();

    // Insert certificate into database
    const { data, error } = await supabase
      .from('certificates')
      .insert({
        user_id: userId,
        certificate_id: certificateId,
        device_type: deviceType,
        wiped_at: wipedAt,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return errorResponse(res, 'Failed to create certificate', 500);
    }

    return successResponse(res, data, 201);
  } catch (error) {
    console.error('API error:', error);
    return errorResponse(res, 'Internal server error', 500);
  }
}
