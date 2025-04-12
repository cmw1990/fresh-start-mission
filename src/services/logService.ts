
import { supabase, NicotineLog, getErrorMessage } from '@/lib/supabase';
import { toast } from 'sonner';

/**
 * Get all log entries for the current user
 */
export const getLogEntries = async (): Promise<NicotineLog[]> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    
    if (!userId) {
      console.error('User not authenticated');
      return [];
    }
    
    const { data, error } = await supabase
      .from('nicotine_logs')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });
      
    if (error) {
      console.error('Error fetching logs:', error);
      return [];
    }
    
    return data as NicotineLog[] || [];
  } catch (error) {
    console.error('Error in getLogEntries:', error);
    return [];
  }
};

/**
 * Add a new log entry
 */
export const saveLogEntry = async (log: Omit<NicotineLog, 'id' | 'user_id' | 'created_at'>): Promise<NicotineLog | null> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    
    if (!userId) {
      toast.error('You must be logged in to add a log entry');
      return null;
    }
    
    const { data, error } = await supabase
      .from('nicotine_logs')
      .insert({ ...log, user_id: userId })
      .select()
      .single();
      
    if (error) throw error;
    
    toast.success('Log entry added successfully');
    return data as NicotineLog;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error);
    toast.error(`Error adding log entry: ${errorMessage}`);
    console.error('Error in saveLogEntry:', error);
    return null;
  }
};

/**
 * Get stats for dashboard
 */
export const getRecentLogStats = async () => {
  try {
    const logs = await getLogEntries();
    
    // Count consecutive days without nicotine (days afresh)
    let daysAfresh = 0;
    for (const log of logs) {
      if (!log.used_nicotine) {
        daysAfresh++;
      } else {
        break; // Stop at first day with nicotine use
      }
    }
    
    // Calculate money saved (assuming $10 per day average)
    const moneySaved = daysAfresh * 10;
    
    // Life regained (assuming 11 minutes per cigarette not smoked)
    // Let's estimate 10 cigarettes per day would have been smoked
    const minutesSaved = daysAfresh * 10 * 11;
    const hoursSaved = Math.floor(minutesSaved / 60);
    const lifeRegained = hoursSaved > 24 
      ? `${Math.floor(hoursSaved / 24)} days ${hoursSaved % 24} hrs` 
      : `${hoursSaved} hrs`;
    
    // Count cravings in the past week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const recentCravings = logs
      .filter(log => new Date(log.date) >= oneWeekAgo)
      .filter(log => log.craving_intensity > 0)
      .length;
    
    // Calculate average mood, energy, focus
    const recentLogs = logs.slice(0, 7); // Last 7 logs
    const avgMood = recentLogs.length > 0 ? recentLogs.reduce((sum, log) => sum + log.mood, 0) / recentLogs.length : 3;
    const avgEnergy = recentLogs.length > 0 ? recentLogs.reduce((sum, log) => sum + log.energy, 0) / recentLogs.length : 3;
    const avgFocus = recentLogs.length > 0 ? recentLogs.reduce((sum, log) => sum + log.focus, 0) / recentLogs.length : 3;
    
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
    console.error('Error getting stats:', error);
    // Return default values as fallback
    return {
      daysAfresh: 0,
      moneySaved: 0,
      lifeRegained: '0 hrs',
      recentCravings: 0,
      avgMood: 3,
      avgEnergy: 3,
      avgFocus: 3
    };
  }
};
