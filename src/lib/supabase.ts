
import { createClient } from '@supabase/supabase-js';

// Use the Supabase credentials from integrations/supabase/client.ts
const supabaseUrl = "https://yekarqanirdkdckimpna.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlla2FycWFuaXJka2Rja2ltcG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyNzUwOTQsImV4cCI6MjA1OTg1MTA5NH0.WQlbyilIuH_Vz_Oit-M5MZ9II9oqO7tg-ThkZ5GCtfc";

// Initialize the Supabase client with proper configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Types for database entities
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

// Type for user goals
export type UserGoal = {
  id: string;
  user_id: string;
  goal_type: 'afresh' | 'fresher';  // 'afresh' = quitting, 'fresher' = reducing
  method: 'cold-turkey' | 'gradual-reduction' | 'tapering' | 'nrt' | 'harm-reduction';
  product_type: string;
  quit_date?: string;
  reduction_percent?: number;
  timeline_days?: number;
  motivation?: string;
  created_at: string;
  updated_at: string;
};

// Type for step rewards
export type StepReward = {
  id: string;
  user_id: string;
  date: string;
  steps: number;
  points_earned: number;
  created_at: string;
};

// Type for rewards
export type Reward = {
  id: string;
  name: string;
  description: string;
  points_required: number;
  active: boolean;
  created_at: string;
};

// Type for claimed rewards
export type ClaimedReward = {
  id: string;
  user_id: string;
  reward_id: string;
  claimed_at: string;
  status: 'pending' | 'fulfilled';
};

// Helper functions for data handling
export const getErrorMessage = (error: any): string => {
  return error?.message || 'An unknown error occurred';
};
