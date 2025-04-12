
import { supabase } from "@/integrations/supabase/client";
import { UserGoal } from "@/lib/supabase";

// Get all goals for the current user
export const getUserGoals = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_goals')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching goals', error);
    throw error;
  }

  return data as UserGoal[];
};

// Add a new goal
export const addUserGoal = async (goal: Omit<UserGoal, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('user_goals')
    .insert(goal)
    .select()
    .single();

  if (error) {
    console.error('Error adding goal', error);
    throw error;
  }

  return data as UserGoal;
};

// Update an existing goal
export const updateUserGoal = async (goalId: string, updates: Partial<UserGoal>) => {
  const { data, error } = await supabase
    .from('user_goals')
    .update(updates)
    .eq('id', goalId)
    .select()
    .single();

  if (error) {
    console.error('Error updating goal', error);
    throw error;
  }

  return data as UserGoal;
};
