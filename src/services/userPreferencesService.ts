
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
      dashboard_widgets: ['keyStats', 'wellness', 'milestone', 'quote', 'supportTools']
    };
    
    const { data, error } = await supabase
      .from('user_preferences')
      .insert(defaultPrefs)
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
        user_id: user.id,
        ...preferences
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
