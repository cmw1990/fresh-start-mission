
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// Use environment variables if available, otherwise use these development fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example-key';

// Only log warning in development
if (import.meta.env.DEV && (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY)) {
  console.warn('Missing Supabase environment variables. Using placeholder values for development. The app will work but data will not persist.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
