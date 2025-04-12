
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type DashboardWidget = 'keyStats' | 'wellness' | 'milestone' | 'quote' | 'supportTools';

export interface UserPreferences {
  id: string;
  user_id: string;
  dashboard_widgets: DashboardWidget[];
  notification_cravings: boolean;
  notification_logs: boolean;
  notification_milestones: boolean;
  theme: 'light' | 'dark';
  created_at?: string;
  updated_at?: string;
}

/**
 * Get the current user's preferences
 * @returns User preferences
 */
export const getUserPreferences = async (): Promise<UserPreferences | null> => {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return null;

    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', user.user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Not found - create default preferences
        return createDefaultUserPreferences();
      }
      throw error;
    }

    return data as UserPreferences;
  } catch (error: any) {
    console.error("Error fetching user preferences:", error);
    throw error;
  }
};

/**
 * Create default user preferences if none exist
 */
const createDefaultUserPreferences = async (): Promise<UserPreferences> => {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error('User not authenticated');

  const defaultPreferences = {
    user_id: user.user.id,
    dashboard_widgets: ['keyStats', 'wellness', 'milestone', 'quote', 'supportTools'] as DashboardWidget[],
    notification_cravings: true,
    notification_logs: true,
    notification_milestones: true,
    theme: 'light' as const
  };

  try {
    const { data, error } = await supabase
      .from('user_preferences')
      .insert([defaultPreferences])
      .select()
      .single();

    if (error) throw error;
    return data as UserPreferences;
  } catch (error: any) {
    console.error("Error creating default user preferences:", error);
    throw error;
  }
};

/**
 * Update dashboard widget order
 * @param widgets Array of dashboard widgets in the desired order
 */
export const updateDashboardWidgets = async (widgets: DashboardWidget[]): Promise<void> => {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('user_preferences')
      .update({ dashboard_widgets: widgets })
      .eq('user_id', user.user.id);

    if (error) throw error;
    
    toast.success("Dashboard layout saved");
  } catch (error: any) {
    console.error("Error updating dashboard widgets:", error);
    toast.error("Failed to save dashboard layout");
    throw error;
  }
};
