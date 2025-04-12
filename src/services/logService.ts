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
 * Get logs for the dashboard charts and displays
 */
export const getLogEntries = async (limit: number = 30) => {
  return getUserLogs(limit);
};

/**
 * Get a specific log by ID
 */
export const getLogById = async (logId: string) => {
  const { data, error } = await supabase
    .from('nicotine_logs')
    .select('*')
    .eq('id', logId)
    .single();

  if (error) {
    console.error('Error fetching log by ID', error);
    throw error;
  }

  return data as NicotineLog;
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
      return data as NicotineLog;
    } else {
      // Create new log
      const { data, error } = await supabase
        .from('nicotine_logs')
        .insert(log)
        .select()
        .single();
      
      if (error) throw error;
      return data as NicotineLog;
    }
  } catch (error: any) {
    console.error('Error saving log entry', error);
    throw error;
  }
};

/**
 * Delete a log entry by ID
 */
export const deleteLogEntry = async (logId: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error("User not authenticated");

    const { error } = await supabase
      .from('nicotine_logs')
      .delete()
      .eq('id', logId)
      .eq('user_id', user.id); // Ensure user can only delete their own logs
    
    if (error) throw error;
    
    toast.success("Log entry deleted successfully!");
    return true;
  } catch (error: any) {
    console.error('Error deleting log entry', error);
    toast.error(error.message || "Error deleting log entry");
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

/**
 * Get recent log statistics for the dashboard
 */
export const getRecentLogStats = async () => {
  try {
    const logs = await getLogAnalytics(30); // Get logs from the last 30 days

    if (!logs || logs.length === 0) {
      // Return default values if no logs are found
      return {
        daysAfresh: 0,
        moneySaved: 0,
        lifeRegained: "0 hrs",
        recentCravings: 0,
        avgMood: 0,
        avgEnergy: 0,
        avgFocus: 0
      };
    }

    // Sort logs by date (newest first)
    const sortedLogs = [...logs].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Calculate days afresh (consecutive days without nicotine)
    let daysAfresh = 0;
    for (const log of sortedLogs) {
      if (log.used_nicotine === false) {
        daysAfresh++;
      } else {
        break;
      }
    }

    // Calculate average mood, energy, and focus
    const validMoodLogs = logs.filter(log => log.mood !== null && log.mood !== undefined);
    const validEnergyLogs = logs.filter(log => log.energy !== null && log.energy !== undefined);
    const validFocusLogs = logs.filter(log => log.focus !== null && log.focus !== undefined);
    
    const avgMood = validMoodLogs.length > 0 
      ? validMoodLogs.reduce((sum, log) => sum + (log.mood || 0), 0) / validMoodLogs.length 
      : 0;
    
    const avgEnergy = validEnergyLogs.length > 0 
      ? validEnergyLogs.reduce((sum, log) => sum + (log.energy || 0), 0) / validEnergyLogs.length 
      : 0;
    
    const avgFocus = validFocusLogs.length > 0 
      ? validFocusLogs.reduce((sum, log) => sum + (log.focus || 0), 0) / validFocusLogs.length 
      : 0;

    // Calculate recent cravings (count of logs with craving_intensity > 5)
    const recentCravings = logs
      .filter(log => (log.craving_intensity || 0) > 5)
      .length;

    // Estimate money saved ($10/day for each day without nicotine)
    const costPerDay = 10; // Placeholder, could be made dynamic based on user settings
    const moneySaved = daysAfresh * costPerDay;

    // Estimate life regained (15 min per cigarette, assuming 20/day)
    const minPerDay = 20 * 15; // 20 cigarettes × 15 min each = 300 min
    const totalMin = daysAfresh * minPerDay;
    const hours = Math.floor(totalMin / 60);
    const lifeRegained = `${hours} hrs`;

    return {
      daysAfresh,
      moneySaved,
      lifeRegained,
      recentCravings,
      avgMood,
      avgEnergy,
      avgFocus
    };
  } catch (error) {
    console.error("Error calculating log statistics:", error);
    throw error;
  }
};
