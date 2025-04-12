
import { NicotineLog, UserGoal } from '@/lib/supabase';
import { getLogAnalytics } from '@/services/logService';
import { getUserGoal } from '@/services/goalService';
import { getUserPreferences } from '@/services/userPreferencesService';
import { differenceInDays, parseISO, format } from 'date-fns';

export interface DashboardStats {
  daysAfresh: number;
  reductionAchieved?: number;
  moneySaved: number;
  lifeRegained: string;
  recentCravings: number;
  avgMood: number;
  avgEnergy: number;
  avgFocus: number;
  streakType: 'afresh' | 'fresher';
  nextMilestone: string;
  nextMilestoneDate?: string;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    // Fetch required data
    const [logs, goal, preferences] = await Promise.all([
      getLogAnalytics(30), // Get last 30 days logs
      getUserGoal(),
      getUserPreferences()
    ]);

    // Default values
    let stats: DashboardStats = {
      daysAfresh: 0,
      moneySaved: 0,
      lifeRegained: '0 hrs',
      recentCravings: 0,
      avgMood: 0,
      avgEnergy: 0,
      avgFocus: 0,
      streakType: goal?.goal_type || 'afresh',
      nextMilestone: 'First day nicotine-free',
    };

    if (!logs || logs.length === 0) {
      return stats; // Return defaults if no logs
    }

    // Calculate streak based on goal type
    if (goal?.goal_type === 'afresh') {
      // For those staying afresh, count consecutive days without nicotine
      stats = calculateAfreshStats(logs, goal, preferences, stats);
    } else {
      // For those staying fresher, track reduction percentage
      stats = calculateFresherStats(logs, goal, preferences, stats);
    }

    // Calculate common metrics across both types
    return calculateCommonMetrics(logs, stats);

  } catch (error) {
    console.error("Error calculating dashboard statistics:", error);
    throw error;
  }
};

// Calculate stats for 'Afresh' users (quitting)
const calculateAfreshStats = (
  logs: NicotineLog[], 
  goal: UserGoal | null,
  preferences: any,
  stats: DashboardStats
): DashboardStats => {
  // Sort logs newest first
  const sortedLogs = [...logs].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Count consecutive nicotine-free days
  let daysAfresh = 0;
  for (const log of sortedLogs) {
    if (log.used_nicotine === false) {
      daysAfresh++;
    } else {
      break;
    }
  }
  stats.daysAfresh = daysAfresh;
  
  // Set next milestone based on streak
  if (daysAfresh === 0) {
    stats.nextMilestone = "First day nicotine-free";
  } else if (daysAfresh < 3) {
    stats.nextMilestone = "3 days nicotine-free";
    stats.nextMilestoneDate = calculateMilestoneDate(daysAfresh, 3);
  } else if (daysAfresh < 7) {
    stats.nextMilestone = "1 week nicotine-free";
    stats.nextMilestoneDate = calculateMilestoneDate(daysAfresh, 7);
  } else if (daysAfresh < 14) {
    stats.nextMilestone = "2 weeks nicotine-free";
    stats.nextMilestoneDate = calculateMilestoneDate(daysAfresh, 14);
  } else if (daysAfresh < 30) {
    stats.nextMilestone = "1 month nicotine-free";
    stats.nextMilestoneDate = calculateMilestoneDate(daysAfresh, 30);
  } else if (daysAfresh < 90) {
    stats.nextMilestone = "3 months nicotine-free";
    stats.nextMilestoneDate = calculateMilestoneDate(daysAfresh, 90);
  } else if (daysAfresh < 180) {
    stats.nextMilestone = "6 months nicotine-free";
    stats.nextMilestoneDate = calculateMilestoneDate(daysAfresh, 180);
  } else if (daysAfresh < 365) {
    stats.nextMilestone = "1 year nicotine-free";
    stats.nextMilestoneDate = calculateMilestoneDate(daysAfresh, 365);
  } else {
    stats.nextMilestone = `${Math.floor(daysAfresh / 365) + 1} years nicotine-free`;
    stats.nextMilestoneDate = calculateMilestoneDate(daysAfresh, (Math.floor(daysAfresh / 365) + 1) * 365);
  }

  // Calculate money saved based on user's product preferences
  const costPerDay = calculateDailyCost(goal?.product_type || 'cigarette', preferences);
  stats.moneySaved = Math.round(daysAfresh * costPerDay * 100) / 100;

  // Calculate life regained (15 min per cigarette, assuming avg of 20/day for smokers)
  // Or equivalent for other products
  const minPerDay = calculateTimeRegained(goal?.product_type || 'cigarette');
  const totalMin = daysAfresh * minPerDay;
  const hours = Math.floor(totalMin / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    stats.lifeRegained = `${days} ${days === 1 ? 'day' : 'days'} ${hours % 24} hrs`;
  } else {
    stats.lifeRegained = `${hours} hrs`;
  }

  return stats;
};

// Calculate stats for 'Fresher' users (reducing)
const calculateFresherStats = (
  logs: NicotineLog[], 
  goal: UserGoal | null,
  preferences: any,
  stats: DashboardStats
): DashboardStats => {
  // For reduction goals, calculate percentage achieved
  if (!goal?.reduction_percent) {
    stats.reductionAchieved = 0;
    return stats;
  }

  // Get baseline usage before reduction
  // For now we'll use a simpler estimate of recent usage vs target
  const targetReduction = goal.reduction_percent / 100;
  const recentLogs = logs.slice(0, 7); // Last 7 days
  
  let usageDays = 0;
  let totalUsage = 0;
  
  recentLogs.forEach(log => {
    if (log.used_nicotine) {
      usageDays++;
      totalUsage += log.quantity || 1;
    }
  });
  
  // Calculate streak of days achieving reduction target
  const dailyUsageTarget = 1 - targetReduction; // e.g. if 50% reduction, target is 0.5 of original
  let reductionStreakDays = 0;
  
  const sortedLogs = [...logs].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  for (const log of sortedLogs) {
    // If they've used less than the target or not used at all, count as success
    const used = log.used_nicotine ? (log.quantity || 1) : 0;
    if (used <= dailyUsageTarget || !log.used_nicotine) {
      reductionStreakDays++;
    } else {
      break;
    }
  }
  
  stats.daysAfresh = reductionStreakDays; // Repurpose this field for reduction streak
  
  // Calculate current reduction percentage
  const avgDailyUsage = usageDays > 0 ? totalUsage / usageDays : 0;
  const originalUsage = 1; // Placeholder - should ideally come from user's initial assessment
  const reductionAchieved = Math.min(100, Math.max(0, 100 * (1 - (avgDailyUsage / originalUsage))));
  stats.reductionAchieved = Math.round(reductionAchieved);
  
  // Set next milestone based on reduction goal
  stats.nextMilestone = `${goal.reduction_percent}% reduction for 2 weeks`;
  
  // Calculate money saved (based on reduced consumption)
  const costPerDay = calculateDailyCost(goal.product_type, preferences);
  const originalCostPerDay = costPerDay;
  const currentCostPerDay = originalCostPerDay * (1 - (reductionAchieved / 100));
  stats.moneySaved = Math.round((originalCostPerDay - currentCostPerDay) * reductionStreakDays * 100) / 100;
  
  return stats;
};

// Calculate metrics common to both goal types
const calculateCommonMetrics = (logs: NicotineLog[], stats: DashboardStats): DashboardStats => {
  // Calculate average mood, energy and focus
  let moodTotal = 0, moodCount = 0;
  let energyTotal = 0, energyCount = 0;
  let focusTotal = 0, focusCount = 0;
  let recentCravings = 0;
  
  logs.forEach(log => {
    if (log.mood !== null && log.mood !== undefined) {
      moodTotal += log.mood;
      moodCount++;
    }
    
    if (log.energy !== null && log.energy !== undefined) {
      energyTotal += log.energy;
      energyCount++;
    }
    
    if (log.focus !== null && log.focus !== undefined) {
      focusTotal += log.focus;
      focusCount++;
    }
    
    // Count high intensity cravings (>5 on scale of 10)
    if ((log.craving_intensity || 0) > 5) {
      recentCravings++;
    }
  });
  
  stats.avgMood = moodCount > 0 ? Math.round((moodTotal / moodCount) * 10) / 10 : 0;
  stats.avgEnergy = energyCount > 0 ? Math.round((energyTotal / energyCount) * 10) / 10 : 0;
  stats.avgFocus = focusCount > 0 ? Math.round((focusTotal / focusCount) * 10) / 10 : 0;
  stats.recentCravings = recentCravings;
  
  return stats;
};

// Helper functions
const calculateDailyCost = (productType: string, preferences: any): number => {
  if (!preferences?.cost_per_product) return 10; // Default
  
  switch (productType) {
    case 'cigarette':
      // Assume 1 pack per day (cost per pack * 1)
      return preferences.cost_per_product.cigarette || 10;
    case 'vape':
      // Assume 1 pod/cartridge per day
      return preferences.cost_per_product.vape || 8;
    case 'pouch':
      // Assume 3-5 pouches per day
      return (preferences.cost_per_product.dip || 6) * 0.8;
    default:
      return preferences.cost_per_product.cigarette || 10;
  }
};

const calculateTimeRegained = (productType: string): number => {
  switch (productType) {
    case 'cigarette':
      // 15 minutes per cigarette, 20 per day = 300 minutes
      return 300;
    case 'vape':
      // Estimate based on typical usage
      return 240;
    case 'pouch':
    case 'dip':
      return 180;
    default:
      return 240;
  }
};

const calculateMilestoneDate = (currentStreak: number, targetDays: number): string => {
  if (currentStreak >= targetDays) return 'Achieved!';
  
  const today = new Date();
  const daysNeeded = targetDays - currentStreak;
  const milestoneDate = new Date();
  milestoneDate.setDate(today.getDate() + daysNeeded);
  
  return format(milestoneDate, 'MMM d, yyyy');
};

// Function to generate an inspirational quote
export const getMotivationalQuote = (): string => {
  const quotes = [
    "Every time you resist a craving, you're one step closer to freedom.",
    "The only way to a fresh start is through today's choices.",
    "Breathe in courage, breathe out fear. You've got this.",
    "Your future self is thanking you right now for staying strong.",
    "Progress isn't always perfect, but it's always worth celebrating.",
    "The journey of a thousand miles begins with a single step.",
    "You're not giving up something good, you're gaining something better.",
    "Small daily improvements lead to stunning results.",
    "The struggle you feel today is developing the strength you need tomorrow.",
    "Success is the sum of small efforts, repeated day in and day out."
  ];
  
  return quotes[Math.floor(Math.random() * quotes.length)];
};
