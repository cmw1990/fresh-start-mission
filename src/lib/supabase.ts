
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL and Anon Key must be provided in environment variables!');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

export type User = {
  id: string;
  email: string;
  name: string;
  created_at: string;
};

export type NicotineLog = {
  id: string;
  user_id: string;
  date: string;
  used_nicotine: boolean;
  product_type?: string;
  quantity?: number;
  mood: number;
  energy: number;
  focus: number;
  sleep_hours: number;
  sleep_quality: number;
  craving_intensity: number;
  craving_trigger?: string;
  journal?: string;
  created_at: string;
};
