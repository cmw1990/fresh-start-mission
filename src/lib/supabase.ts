
// Re-export the Supabase client from the integrations folder for consistency
export { supabase } from '@/integrations/supabase/client';

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

// Types for smokeless directory
export type SmokelessProduct = {
  id: string;
  name: string;
  brand: string;
  description?: string | null;
  image_url?: string | null;
  nicotine_strength_mg?: number | null;
  flavor_category?: string | null;
  ingredients?: string[] | null;
  expert_notes_chemicals?: string | null;
  expert_notes_gum_health?: string | null;
  user_rating_avg?: number | null;
  user_rating_count?: number | null;
  created_at?: string;
  updated_at?: string;
};

export type SmokelessVendor = {
  id: string;
  name: string;
  website_url?: string | null;
  description?: string | null;
  logo_url?: string | null;
  shipping_info_summary?: string | null;
  regions_served?: string[] | null;
  affiliate_link_template?: string | null;
  user_rating_avg?: number | null;
  user_rating_count?: number | null;
  created_at?: string;
  updated_at?: string;
};

export type ProductReview = {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  review_text?: string | null;
  created_at: string;
  is_moderated: boolean;
  user_name?: string; // For UI display
  user_avatar_url?: string | null; // For UI display
};

export type VendorReview = {
  id: string;
  vendor_id: string;
  user_id: string;
  rating: number;
  review_text?: string | null;
  created_at: string;
  is_moderated: boolean;
};

// Helper functions for data handling
export const getErrorMessage = (error: any): string => {
  return error?.message || 'An unknown error occurred';
};
