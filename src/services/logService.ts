
import { supabase, NicotineLog } from '@/lib/supabase';
import { toast } from 'sonner';

export const saveLogEntry = async (logData: Omit<NicotineLog, 'id' | 'user_id' | 'created_at'>) => {
  try {
    const user = supabase.auth.getUser();
    const userId = (await user).data.user?.id;
    
    if (!userId) {
      throw new Error('User not authenticated');
    }
    
    const { data, error } = await supabase
      .from('nicotine_logs')
      .insert([
        {
          ...logData,
          user_id: userId
        }
      ])
      .select();
      
    if (error) throw error;
    
    return data[0];
  } catch (error: any) {
    toast.error(error.message || 'Error saving log entry');
    throw error;
  }
};

export const getLogEntries = async (): Promise<NicotineLog[]> => {
  try {
    const user = supabase.auth.getUser();
    const userId = (await user).data.user?.id;
    
    if (!userId) {
      throw new Error('User not authenticated');
    }
    
    const { data, error } = await supabase
      .from('nicotine_logs')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });
      
    if (error) throw error;
    
    return data as NicotineLog[];
  } catch (error: any) {
    toast.error(error.message || 'Error fetching log entries');
    throw error;
  }
};

export const getRecentLogStats = async () => {
  try {
    const logs = await getLogEntries();
    
    if (logs.length === 0) {
      return {
        daysAfresh: 0,
        moneySaved: 0,
        lifeRegained: '0 hrs',
        recentCravings: 0,
        avgMood: 0,
        avgEnergy: 0,
        avgFocus: 0
      };
    }
    
    // Calculate days afresh (days without nicotine)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let daysAfresh = 0;
    let dayChecking = new Date(today);
    
    while (true) {
      const dateStr = dayChecking.toISOString().split('T')[0];
      const logForDay = logs.find(log => log.date.split('T')[0] === dateStr);
      
      if (!logForDay || !logForDay.used_nicotine) {
        daysAfresh++;
        dayChecking.setDate(dayChecking.getDate() - 1);
      } else {
        break;
      }
    }
    
    // Calculate money saved (assume $10 per day)
    const moneySaved = daysAfresh * 10;
    
    // Calculate life regained (assume 5 mins per cigarette, 20 per day)
    const minutesRegained = daysAfresh * 100;
    const hoursRegained = Math.floor(minutesRegained / 60);
    const daysRegained = Math.floor(hoursRegained / 24);
    
    let lifeRegained = '';
    if (daysRegained > 0) {
      lifeRegained = `${daysRegained} day${daysRegained > 1 ? 's' : ''}, ${hoursRegained % 24} hrs`;
    } else {
      lifeRegained = `${hoursRegained} hrs`;
    }
    
    // Get recent craving count (last 7 days)
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const recentLogs = logs.filter(log => new Date(log.date) >= lastWeek);
    
    const recentCravings = recentLogs.reduce((sum, log) => 
      sum + (log.craving_intensity > 0 ? 1 : 0), 0);
      
    // Calculate averages
    const avgMood = recentLogs.reduce((sum, log) => sum + log.mood, 0) / Math.max(recentLogs.length, 1);
    const avgEnergy = recentLogs.reduce((sum, log) => sum + log.energy, 0) / Math.max(recentLogs.length, 1);
    const avgFocus = recentLogs.reduce((sum, log) => sum + log.focus, 0) / Math.max(recentLogs.length, 1);
    
    return {
      daysAfresh,
      moneySaved,
      lifeRegained,
      recentCravings,
      avgMood: parseFloat(avgMood.toFixed(1)),
      avgEnergy: parseFloat(avgEnergy.toFixed(1)),
      avgFocus: parseFloat(avgFocus.toFixed(1))
    };
  } catch (error) {
    console.error('Error calculating stats:', error);
    return {
      daysAfresh: 0,
      moneySaved: 0,
      lifeRegained: '0 hrs',
      recentCravings: 0,
      avgMood: 0,
      avgEnergy: 0,
      avgFocus: 0
    };
  }
};
