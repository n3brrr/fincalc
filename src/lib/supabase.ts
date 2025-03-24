
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase credentials are available
const hasSupabaseCredentials = supabaseUrl && supabaseAnonKey;

// Create a real client only if credentials are available
export const supabase = hasSupabaseCredentials 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Log status for debugging
if (!hasSupabaseCredentials) {
  console.warn('Supabase credentials are missing. Authentication functionality will be mocked.');
} else {
  console.log('Supabase client initialized successfully.');
}
