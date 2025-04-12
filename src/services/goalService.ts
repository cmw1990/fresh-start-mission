
import { supabase } from "@/integrations/supabase/client";
import { UserGoal } from "@/lib/supabase";
import { toast } from "sonner";

/**
 * Get the current active goal for the user
 */
export const getUserGoal = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from('user_goals')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching user goal:', error);
    throw error;
  }

  return data as UserGoal | null;
};

/**
 * Get all goals for the current user
 */
export const getUserGoals = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from('user_goals')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching goals', error);
    throw error;
  }

  return data as UserGoal[];
};

/**
 * Get a specific goal by ID
 */
export const getGoalById = async (goalId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from('user_goals')
    .select('*')
    .eq('id', goalId)
    .eq('user_id', user.id) // Ensure user can only access their own goals
    .single();

  if (error) {
    console.error('Error fetching goal by ID:', error);
    throw error;
  }

  return data as UserGoal;
};

/**
 * Add a new goal
 */
export const saveUserGoal = async (goal: Omit<UserGoal, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error("User not authenticated");

    const goalWithUserId = {
      ...goal,
      user_id: user.id
    };

    const { data, error } = await supabase
      .from('user_goals')
      .insert(goalWithUserId)
      .select()
      .single();

    if (error) {
      console.error('Error adding goal:', error);
      throw error;
    }

    toast.success("Goal saved successfully!");
    return data as UserGoal;
  } catch (error: any) {
    toast.error(error.message || "Failed to save goal");
    throw error;
  }
};

/**
 * Update an existing goal
 */
export const updateUserGoal = async (goalId: string, updates: Partial<Omit<UserGoal, 'id' | 'created_at' | 'updated_at' | 'user_id'>>) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error("User not authenticated");
    
    // Verify the goal belongs to the user before updating
    const { data: existingGoal } = await supabase
      .from('user_goals')
      .select('id')
      .eq('id', goalId)
      .eq('user_id', user.id)
      .single();
      
    if (!existingGoal) {
      throw new Error("Goal not found or you don't have permission to update it");
    }
    
    const { data, error } = await supabase
      .from('user_goals')
      .update(updates)
      .eq('id', goalId)
      .select()
      .single();

    if (error) {
      console.error('Error updating goal:', error);
      throw error;
    }

    toast.success("Goal updated successfully!");
    return data as UserGoal;
  } catch (error: any) {
    toast.error(error.message || "Failed to update goal");
    throw error;
  }
};

/**
 * Delete a goal
 */
export const deleteUserGoal = async (goalId: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error("User not authenticated");

    const { error } = await supabase
      .from('user_goals')
      .delete()
      .eq('id', goalId)
      .eq('user_id', user.id); // Ensure user can only delete their own goals
    
    if (error) throw error;
    
    toast.success("Goal deleted successfully!");
    return true;
  } catch (error: any) {
    console.error('Error deleting goal:', error);
    toast.error(error.message || "Failed to delete goal");
    throw error;
  }
};
