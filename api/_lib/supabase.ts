import { createClient } from '@supabase/supabase-js';

/**
 * Server-side Supabase client with service role key
 * WARNING: Never expose service role key to frontend!
 */
export const getSupabaseAdmin = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables. Please configure SUPABASE_URL and SUPABASE_SERVICE_KEY in Vercel dashboard.');
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

/**
 * Database type definitions
 */
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          username: string;
          email?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          username: string;
          email?: string;
        };
        Update: {
          username?: string;
          email?: string;
        };
      };
      certificates: {
        Row: {
          id: string;
          user_id: string;
          certificate_id: string;
          device_type: string;
          wiped_at: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          certificate_id: string;
          device_type: string;
          wiped_at: string;
        };
        Update: {
          device_type?: string;
        };
      };
      support_tickets: {
        Row: {
          id: string;
          user_id?: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          status: 'open' | 'in_progress' | 'closed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id?: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          status?: 'open' | 'in_progress' | 'closed';
        };
        Update: {
          status?: 'open' | 'in_progress' | 'closed';
        };
      };
    };
  };
}
