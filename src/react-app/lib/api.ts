/**
 * API Client for frontend
 * Provides type-safe API calls to backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Make API request
 */
async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const json: ApiResponse<T> = await response.json();

  if (!response.ok || !json.success) {
    throw new Error(json.error || `API request failed: ${response.statusText}`);
  }

  return json.data as T;
}

/**
 * Certificate API
 */
export const certificateApi = {
  /**
   * Generate a new certificate
   */
  create: async (deviceType: string, userId?: string) => {
    return apiRequest<{
      id: string;
      certificate_id: string;
      device_type: string;
      wiped_at: string;
      created_at: string;
    }>('/certificate', {
      method: 'POST',
      body: JSON.stringify({ deviceType, userId }),
    });
  },
};

/**
 * Auth API
 */
export const authApi = {
  /**
   * Login with username
   */
  login: async (username: string) => {
    return apiRequest<{
      user: {
        id: string;
        username: string;
        email?: string;
        created_at: string;
      };
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username }),
    });
  },
};

/**
 * Support API
 */
export const supportApi = {
  /**
   * Create support ticket
   */
  createTicket: async (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
    userId?: string;
  }) => {
    return apiRequest<{
      id: string;
      name: string;
      email: string;
      subject: string;
      message: string;
      status: string;
      created_at: string;
    }>('/support/ticket', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
