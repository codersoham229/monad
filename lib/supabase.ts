import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const createClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
};

// Only create the singleton client if env vars are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient() 
  : null as any;

// Database types
export interface UserProfile {
  id: string;
  email: string;
  role: 'buyer' | 'seller';
  wallet_address: string;
  encrypted_private_key: string;
  created_at: string;
  updated_at: string;
}
