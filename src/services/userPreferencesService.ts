
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type DashboardWidget = 'keyStats' | 'wellness' | 'milestone' | 'quote' | 'supportTools';

export interface UserPreferences {
  id?: string;
  user_id?: string;
  dashboard_widgets?: DashboardWidget[];
  notification_cravings?: boolean;
  notification_logs?: boolean;
  notification_milestones?: boolean;
  theme?: 'light' | 'dark' | 'system';
  created_at?: string;
  updated_at?: string;
}

/**
 * Get user preferences from Supabase
 */
export const getUserPreferences = async (): Promise<UserPreferences> => {
  const { user } = useAuth();
  if (!user) throw new Error("User not authenticated");

  try {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error("Error fetching user preferences:", error);
      return getDefaultPreferences();
    }

    return data as UserPreferences || getDefaultPreferences();
  } catch (error) {
    console.error("Error in getUserPreferences:", error);
    return getDefaultPreferences();
  }
};

/**
 * Save user preferences to Supabase
 */
export const saveUserPreferences = async (preferences: UserPreferences): Promise<UserPreferences> => {
  const { user } = useAuth();
  if (!user) throw new Error("User not authenticated");

  // Ensure user_id is set
  const prefsToSave = {
    ...preferences,
    user_id: user.id,
  };

  try {
    const { data, error } = await supabase
      .from('user_preferences')
      .upsert(prefsToSave, { onConflict: 'user_id' })
      .select()
      .single();

    if (error) {
      console.error("Error saving user preferences:", error);
      throw error;
    }

    return data as UserPreferences;
  } catch (error) {
    console.error("Error in saveUserPreferences:", error);
    throw error;
  }
};

/**
 * Update dashboard widgets order/visibility
 */
export const updateDashboardWidgets = async (widgets: DashboardWidget[]): Promise<UserPreferences> => {
  const { user } = useAuth();
  if (!user) throw new Error("User not authenticated");

  try {
    // First get current preferences
    const currentPrefs = await getUserPreferences();
    
    // Update just the widgets
    const updatedPrefs = {
      ...currentPrefs,
      dashboard_widgets: widgets,
    };
    
    return saveUserPreferences(updatedPrefs);
  } catch (error) {
    console.error("Error updating dashboard widgets:", error);
    throw error;
  }
};

/**
 * Get default preferences when none exist yet
 */
export const getDefaultPreferences = (): UserPreferences => ({
  dashboard_widgets: ['keyStats', 'wellness', 'milestone', 'quote', 'supportTools'],
  notification_cravings: true,
  notification_logs: true,
  notification_milestones: true,
  theme: 'light',
});
