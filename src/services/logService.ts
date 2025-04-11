
import { supabase, NicotineLog, getErrorMessage } from '@/lib/supabase';
import { toast } from 'sonner';

// Dummy/mock data for development until database is set up
const mockLogs: NicotineLog[] = [
  {
    id: '1',
    user_id: 'user-1',
    date: '2025-04-10',
    used_nicotine: false,
    product_type: 'cigarette',
    quantity: 0,
    mood: 3,
    energy: 4,
    focus: 3,
    sleep_hours: 7,
    sleep_quality: 4,
    craving_intensity: 2,
    craving_trigger: 'stress',
    journal: 'Feeling good today, kept busy with work',
    created_at: '2025-04-10T10:30:00Z'
  },
  {
    id: '2',
    user_id: 'user-1',
    date: '2025-04-09',
    used_nicotine: true,
    product_type: 'cigarette',
    quantity: 3,
    mood: 2,
    energy: 2,
    focus: 3,
    sleep_hours: 6,
    sleep_quality: 2,
    craving_intensity: 4,
    craving_trigger: 'social',
    journal: 'Had a difficult meeting, slipped up',
    created_at: '2025-04-09T10:30:00Z'
  },
  // More mock logs for testing purposes
  {
    id: '3',
    user_id: 'user-1',
    date: '2025-04-08',
    used_nicotine: false,
    product_type: 'cigarette',
    quantity: 0,
    mood: 4,
    energy: 3,
    focus: 4,
    sleep_hours: 8,
    sleep_quality: 4,
    craving_intensity: 2,
    craving_trigger: 'habit',
    journal: 'Good day overall, went for a long walk',
    created_at: '2025-04-08T10:30:00Z'
  },
  {
    id: '4',
    user_id: 'user-1',
    date: '2025-04-07',
    used_nicotine: true,
    product_type: 'cigarette',
    quantity: 2,
    mood: 3,
    energy: 3,
    focus: 2,
    sleep_hours: 7,
    sleep_quality: 3,
    craving_intensity: 3,
    craving_trigger: 'stress',
    journal: 'Work was stressful today',
    created_at: '2025-04-07T10:30:00Z'
  },
  {
    id: '5',
    user_id: 'user-1',
    date: '2025-04-06',
    used_nicotine: true,
    product_type: 'cigarette',
    quantity: 1,
    mood: 3,
    energy: 4,
    focus: 3,
    sleep_hours: 7.5,
    sleep_quality: 4,
    craving_intensity: 2,
    craving_trigger: 'boredom',
    journal: 'Weekend was relaxing',
    created_at: '2025-04-06T10:30:00Z'
  }
];

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
      // Use mock data for development until database is fully set up
      return mockLogs;
    }
    
    return data as NicotineLog[] || mockLogs;
  } catch (error) {
    console.error('Error in getLogEntries:', error);
    // Return mock data as fallback
    return mockLogs;
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
    // For now, calculate these from the mock data
    // In production, this would be a more efficient database query
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
    const avgMood = recentLogs.reduce((sum, log) => sum + log.mood, 0) / recentLogs.length;
    const avgEnergy = recentLogs.reduce((sum, log) => sum + log.energy, 0) / recentLogs.length;
    const avgFocus = recentLogs.reduce((sum, log) => sum + log.focus, 0) / recentLogs.length;
    
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
