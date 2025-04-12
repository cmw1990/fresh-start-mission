
import { supabase } from "@/integrations/supabase/client";
import { NicotineLog } from "@/lib/supabase";
import { toast } from "sonner";

/**
 * Get logs for the current user
 */
export const getUserLogs = async (limit: number = 100) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");
  
  const { data, error } = await supabase
    .from('nicotine_logs')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching logs', error);
    throw error;
  }

  return data as NicotineLog[];
};

/**
 * Get a specific log entry by date
 */
export const getLogByDate = async (date: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");
  
  const { data, error } = await supabase
    .from('nicotine_logs')
    .select('*')
    .eq('user_id', user.id)
    .eq('date', date)
    .maybeSingle();

  if (error) {
    console.error('Error fetching log by date', error);
    throw error;
  }

  return data as NicotineLog | null;
};

/**
 * Save a new log entry or update existing one for the current date
 */
export const saveLogEntry = async (log: Omit<NicotineLog, 'id' | 'created_at'>) => {
  try {
    // Check if log already exists for this date
    const existingLog = await getLogByDate(log.date);
    
    if (existingLog) {
      // Update existing log
      const { data, error } = await supabase
        .from('nicotine_logs')
        .update(log)
        .eq('id', existingLog.id)
        .select()
        .single();
      
      if (error) throw error;
      toast.success("Log entry updated successfully!");
      return data as NicotineLog;
    } else {
      // Create new log
      const { data, error } = await supabase
        .from('nicotine_logs')
        .insert(log)
        .select()
        .single();
      
      if (error) throw error;
      toast.success("Log entry saved successfully!");
      return data as NicotineLog;
    }
  } catch (error: any) {
    console.error('Error saving log entry', error);
    toast.error(error.message || "Error saving log entry");
    throw error;
  }
};

/**
 * Get analytics data for dashboard
 */
export const getLogAnalytics = async (days: number = 30) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");
  
  // Calculate the date range
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  const formattedStartDate = startDate.toISOString().split('T')[0];
  const formattedEndDate = endDate.toISOString().split('T')[0];
  
  const { data, error } = await supabase
    .from('nicotine_logs')
    .select('*')
    .eq('user_id', user.id)
    .gte('date', formattedStartDate)
    .lte('date', formattedEndDate)
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching log analytics', error);
    throw error;
  }

  return data as NicotineLog[];
};
