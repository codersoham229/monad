import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const createClient = () => {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = createClient();

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
