
import { supabase } from "@/integrations/supabase/client";
import { NicotineLog } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

// Get all log entries for the current user
export const getLogEntries = async () => {
  const { data, error } = await supabase
    .from('nicotine_logs')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching logs', error);
    throw error;
  }

  return data as NicotineLog[];
};

// Add a new log entry
export const addLogEntry = async (log: Omit<NicotineLog, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('nicotine_logs')
    .insert(log)
    .select()
    .single();

  if (error) {
    console.error('Error adding log entry', error);
    throw error;
  }

  return data as NicotineLog;
};

// Save log entry (alias for addLogEntry to match the import in LogEntry.tsx)
export const saveLogEntry = addLogEntry;

// Calculate and return recent stats for the dashboard
export const getRecentLogStats = async () => {
  const { data: logs, error } = await supabase
    .from('nicotine_logs')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching logs for stats', error);
    throw error;
  }

  // Calculate days afresh (days without nicotine)
  const sortedLogs = [...(logs as NicotineLog[])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  let daysAfresh = 0;
  for (const log of sortedLogs) {
    if (!log.used_nicotine) {
      daysAfresh++;
    } else {
      break;
    }
  }

  // Calculate money saved (assuming $10 per day saved when not using nicotine)
  const moneySaved = daysAfresh * 10;

  // Calculate life regained (assuming 11 minutes per cigarette, average 20 per day)
  const minutesSaved = daysAfresh * 20 * 11;
  const lifeRegained = minutesSaved > 1440 
    ? `${Math.floor(minutesSaved / 1440)} days, ${Math.floor((minutesSaved % 1440) / 60)} hrs` 
    : `${Math.floor(minutesSaved / 60)} hrs`;

  // Calculate number of cravings in the past week
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  
  const recentLogs = sortedLogs.filter(
    log => new Date(log.date) >= lastWeek
  );
  
  const recentCravings = recentLogs.reduce((total, log) => 
    total + (log.craving_intensity > 2 ? 1 : 0), 0);

  // Calculate average mood, energy and focus from recent logs
  const avgMood = recentLogs.reduce((sum, log) => sum + log.mood, 0) / 
    (recentLogs.length || 1);

  const avgEnergy = recentLogs.reduce((sum, log) => sum + log.energy, 0) / 
    (recentLogs.length || 1);
    
  const avgFocus = recentLogs.reduce((sum, log) => sum + log.focus, 0) / 
    (recentLogs.length || 1);

  return {
    daysAfresh,
    moneySaved,
    lifeRegained,
    recentCravings,
    avgMood,
    avgEnergy,
    avgFocus
  };
};
