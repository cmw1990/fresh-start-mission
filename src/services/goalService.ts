
import { supabase, UserGoal } from '@/lib/supabase';
import { toast } from 'sonner';

/**
 * Retrieves the user's goal
 */
export const getUserGoal = async (): Promise<UserGoal | null> => {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return null;

    const { data, error } = await supabase
      .from('user_goals')
      .select('*')
      .eq('user_id', user.user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    return data as UserGoal;
  } catch (error: any) {
    console.error('Error fetching user goal:', error);
    return null;
  }
};

/**
 * Saves or updates the user's goal
 */
export const saveUserGoal = async (goalData: Omit<UserGoal, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<UserGoal | null> => {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      toast.error('You must be logged in to save goals');
      return null;
    }

    const { data, error } = await supabase
      .from('user_goals')
      .insert({
        ...goalData,
        user_id: user.user.id,
      })
      .select()
      .single();

    if (error) throw error;
    
    toast.success('Your goals have been saved successfully!');
    return data as UserGoal;
  } catch (error: any) {
    console.error('Error saving user goal:', error);
    toast.error(error.message || 'Error saving your goals');
    return null;
  }
};

/**
 * Updates an existing user goal
 */
export const updateUserGoal = async (goalId: string, goalData: Partial<UserGoal>): Promise<UserGoal | null> => {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      toast.error('You must be logged in to update goals');
      return null;
    }

    const { data, error } = await supabase
      .from('user_goals')
      .update(goalData)
      .eq('id', goalId)
      .eq('user_id', user.user.id)
      .select()
      .single();

    if (error) throw error;
    
    toast.success('Your goals have been updated successfully!');
    return data as UserGoal;
  } catch (error: any) {
    console.error('Error updating user goal:', error);
    toast.error(error.message || 'Error updating your goals');
    return null;
  }
};
