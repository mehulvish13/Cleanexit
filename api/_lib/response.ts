import type { VercelResponse } from '@vercel/node';

/**
 * API Response Types
 */
export interface ApiSuccessResponse<T = any> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Send success response
 */
export const successResponse = <T = any>(
  res: VercelResponse,
  data: T,
  statusCode = 200
): void => {
  res.status(statusCode).json({
    success: true,
    data,
  } as ApiSuccessResponse<T>);
};

/**
 * Send error response
 */
export const errorResponse = (
  res: VercelResponse,
  message: string,
  statusCode = 500
): void => {
  res.status(statusCode).json({
    success: false,
    error: message,
  } as ApiErrorResponse);
};

/**
 * Set CORS headers
 */
export const setCorsHeaders = (res: VercelResponse): void => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

/**
 * Handle CORS preflight request
 */
export const handleCors = (res: VercelResponse): void => {
  setCorsHeaders(res);
  res.status(200).end();
};

/**
 * Validate required fields in request body
 */
export const validateRequired = (
  body: any,
  fields: string[]
): { valid: boolean; missing?: string[] } => {
  const missing = fields.filter(field => !body || !body[field]);
  
  if (missing.length > 0) {
    return { valid: false, missing };
  }
  
  return { valid: true };
};

/**
 * Generate unique certificate ID
 */
export const generateCertificateId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9).toUpperCase();
  return `CERT-${timestamp}-${random}`;
};

/**
 * Generate unique ticket ID
 */
export const generateTicketId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `TICKET-${timestamp}-${random}`;
};
