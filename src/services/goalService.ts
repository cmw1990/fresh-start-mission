
import { supabase } from "@/integrations/supabase/client";
import { UserGoal } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

// Get the goal for the current user
export const getUserGoal = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from('user_goals')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No goals found, return null
      return null;
    }
    console.error('Error fetching user goal:', error);
    throw error;
  }

  return data as UserGoal;
};

// Add a new goal
export const saveUserGoal = async (goal: Omit<UserGoal, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
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

  return data as UserGoal;
};

// Update an existing goal
export const updateUserGoal = async (goalId: string, updates: Partial<Omit<UserGoal, 'id' | 'created_at' | 'updated_at' | 'user_id'>>) => {
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

  return data as UserGoal;
};
