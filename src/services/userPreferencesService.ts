
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type DashboardWidget = 'keyStats' | 'wellness' | 'milestone' | 'quote' | 'supportTools';

type UserPreferences = {
  theme?: 'light' | 'dark' | 'system';
  notifications?: Record<string, boolean>;
  dashboard_widgets?: DashboardWidget[];
  cost_per_product?: Record<string, number>;
  show_welcome?: boolean;
};

export async function getUserPreferences(): Promise<UserPreferences | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (error) throw error;
    
    // Return the preferences or null if none exist
    if (!data) return null;
    
    // Make sure to convert theme to the correct type
    const preferences: UserPreferences = {
      theme: data.theme as 'light' | 'dark' | 'system',
      notifications: data.notifications,
      dashboard_widgets: data.dashboard_widgets,
      cost_per_product: data.cost_per_product,
      show_welcome: data.show_welcome
    };
    
    return preferences;
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return null;
  }
}

export async function saveUserPreferences(preferences: Partial<{
  theme?: 'light' | 'dark' | 'system';
  notifications?: Record<string, boolean>;
  dashboard_widgets?: DashboardWidget[];
  cost_per_product?: Record<string, number>;
  show_welcome?: boolean;
}>): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // First check if the user has existing preferences
    const { data: existingData, error: fetchError } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (fetchError) throw fetchError;
    
    if (existingData) {
      // Update existing preferences
      const { error: updateError } = await supabase
        .from('user_preferences')
        .update(preferences)
        .eq('user_id', user.id);
      
      if (updateError) throw updateError;
    } else {
      // Insert new preferences
      const { error: insertError } = await supabase
        .from('user_preferences')
        .insert({ 
          user_id: user.id,
          ...preferences
        });
      
      if (insertError) throw insertError;
    }
  } catch (error: any) {
    console.error('Error saving user preferences:', error);
    toast.error(`Failed to save preferences: ${error.message}`);
    throw error;
  }
}

export async function updateDashboardWidgets(widgetIds: DashboardWidget[]): Promise<void> {
  return saveUserPreferences({
    dashboard_widgets: widgetIds
  });
}

export async function updateThemePreference(theme: 'light' | 'dark' | 'system'): Promise<void> {
  return saveUserPreferences({
    theme
  });
}

export async function updateProductCosts(costs: Record<string, number>): Promise<void> {
  return saveUserPreferences({
    cost_per_product: costs
  });
}

export async function dismissWelcomeMessage(): Promise<void> {
  return saveUserPreferences({
    show_welcome: false
  });
}
