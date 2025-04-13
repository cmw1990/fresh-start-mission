
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type UserPreferences = {
  id?: string;
  user_id?: string;
  theme?: string;
  notification_logs?: boolean;
  notification_milestones?: boolean;
  notification_cravings?: boolean;
  dashboard_widgets?: string[];
  created_at?: string;
  updated_at?: string;
  cost_per_product?: {
    cigarette?: number;
    vape?: number;
    pouch?: number;
    other?: number;
  };
  notifications?: Record<string, boolean>;
};

export const getUserPreferences = async (): Promise<UserPreferences> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error("User not authenticated");
    
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (error) throw error;
    
    if (!data) {
      // Create default preferences if none exist
      return createDefaultPreferences();
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return {
      theme: 'light',
      notification_logs: true,
      notification_milestones: true,
      notification_cravings: true,
      dashboard_widgets: ['keyStats', 'wellness', 'milestone', 'quote', 'supportTools']
    };
  }
};

export const createDefaultPreferences = async (): Promise<UserPreferences> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error("User not authenticated");
    
    const defaultPrefs: UserPreferences = {
      user_id: user.id,
      theme: 'light',
      notification_logs: true,
      notification_milestones: true,
      notification_cravings: true,
      dashboard_widgets: ['keyStats', 'wellness', 'milestone', 'quote', 'supportTools'],
      cost_per_product: {
        cigarette: 0.50,
        vape: 0.30,
        pouch: 0.25,
        other: 0.40
      }
    };
    
    // Fix: Ensure user_id is set as required by the database
    const { data, error } = await supabase
      .from('user_preferences')
      .insert({
        ...defaultPrefs,
        user_id: user.id  // Make sure user_id is explicitly set
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error creating default preferences:', error);
    throw error;
  }
};

export const updateUserPreferences = async (preferences: Partial<UserPreferences>): Promise<UserPreferences> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error("User not authenticated");
    
    // First check if preferences exist
    const { data: existingPrefs } = await supabase
      .from('user_preferences')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (!existingPrefs) {
      // Create with these preferences
      const newPrefs = {
        ...preferences,
        user_id: user.id  // Ensure this is set
      };
      
      const { data, error } = await supabase
        .from('user_preferences')
        .insert(newPrefs)
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success("Preferences saved!");
      return data;
    } else {
      // Update existing preferences
      const { data, error } = await supabase
        .from('user_preferences')
        .update(preferences)
        .eq('id', existingPrefs.id)
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success("Preferences updated!");
      return data;
    }
  } catch (error) {
    console.error('Error updating user preferences:', error);
    toast.error("Failed to save preferences");
    throw error;
  }
};

// Add this function specifically for theme updates
export const updateThemePreference = async (theme: string): Promise<UserPreferences> => {
  return updateUserPreferences({ theme });
};

// For saving notification preferences
export const saveUserPreferences = async (preferences: Partial<UserPreferences>): Promise<UserPreferences> => {
  return updateUserPreferences(preferences);
};

// For updating product costs
export const updateProductCosts = async (costs: UserPreferences['cost_per_product']): Promise<UserPreferences> => {
  return updateUserPreferences({ cost_per_product: costs });
};
