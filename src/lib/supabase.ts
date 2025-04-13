
import { createClient } from '@supabase/supabase-js';

// Default values for local development - these will be overridden by actual env vars if present
const defaultSupabaseUrl = 'https://your-project-id.supabase.co';
const defaultSupabaseAnonKey = 'your-anon-key';

// Get environment variables or use default values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || defaultSupabaseUrl;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || defaultSupabaseAnonKey;

// Validate that we have actual values before creating the client
if (!supabaseUrl || supabaseUrl === defaultSupabaseUrl) {
  console.warn('⚠️ VITE_SUPABASE_URL environment variable is not set or using default value.');
  console.warn('⚠️ Auth and database features will not work until you set valid Supabase credentials.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if we're using the default credentials
export const isUsingDefaultCredentials = () => {
  return supabaseUrl === defaultSupabaseUrl || supabaseAnonKey === defaultSupabaseAnonKey;
};
