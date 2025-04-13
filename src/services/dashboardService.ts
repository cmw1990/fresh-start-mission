
// First, let's define the DashboardStats type to match what the component is using
export interface DashboardStats {
  name: string;
  daysAfresh: number;
  moneySaved: number;
  lastCraving: {
    time: string;
    intensity: number;
  };
  metrics: {
    mood: number;
    energy: number;
    focus: number;
  };
  lifeRegained: string;
  recentCravings: number;
  avgMood: number;
  avgEnergy: number;
  avgFocus: number;
  nextMilestone: {
    name: string;
    daysUntil: number;
    description: string;
  };
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    // Import the getRecentLogStats function from the logService
    const { getRecentLogStats } = await import('./logService');
    const { getUserPreferences } = await import('./userPreferencesService');
    const { getUserGoal } = await import('./goalService');
    
    // Get log statistics
    const logStats = await getRecentLogStats();
    
    // Get user preferences for cost calculation
    const preferences = await getUserPreferences();
    
    // Fix: Access cost_per_product directly and provide a default if it doesn't exist or if the product doesn't exist
    // Default to $10 per day cost if preferences or cost_per_product are not available
    const costPerDay = preferences?.cost_per_product?.cigarette || 10;
    
    // Calculate money saved based on actual cost per day from user preferences
    const moneySaved = logStats.daysAfresh * costPerDay;
    
    // Get user goal to determine milestone information
    const userGoal = await getUserGoal();
    
    // Calculate next milestone information
    const milestones = [
      { days: 1, name: "24 Hours", description: "Oxygen and carbon monoxide levels returning to normal" },
      { days: 2, name: "48 Hours", description: "Taste and smell improving" },
      { days: 3, name: "72 Hours", description: "Bronchial tubes relaxing, making breathing easier" },
      { days: 7, name: "1 Week", description: "Higher chance of quitting successfully" },
      { days: 14, name: "2 Weeks", description: "Circulation improving" },
      { days: 30, name: "1 Month", description: "Lung function increasing" },
      { days: 90, name: "3 Months", description: "Circulation and lung function significantly improved" },
      { days: 180, name: "6 Months", description: "Coughing and shortness of breath decreasing" },
      { days: 365, name: "1 Year", description: "Risk of heart disease halved" },
    ];
    
    let nextMilestone = milestones[0];
    for (const milestone of milestones) {
      if (milestone.days > logStats.daysAfresh) {
        nextMilestone = milestone;
        break;
      }
    }
    
    return {
      name: 'Fresh User', // This would come from the profile service in a real implementation
      daysAfresh: logStats.daysAfresh,
      moneySaved: moneySaved,
      lifeRegained: logStats.lifeRegained || "0 hrs",
      recentCravings: logStats.recentCravings,
      avgMood: logStats.avgMood,
      avgEnergy: logStats.avgEnergy,
      avgFocus: logStats.avgFocus,
      lastCraving: {
        time: '2 hours ago', // This would come from actual data in a real implementation
        intensity: 6
      },
      metrics: {
        mood: logStats.avgMood,
        energy: logStats.avgEnergy,
        focus: logStats.avgFocus
      },
      nextMilestone: {
        name: nextMilestone.name,
        daysUntil: nextMilestone.days - logStats.daysAfresh,
        description: nextMilestone.description
      }
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    
    // Return fallback data in case of error
    return {
      name: 'Fresh User',
      daysAfresh: 0,
      moneySaved: 0,
      lastCraving: {
        time: 'N/A',
        intensity: 0
      },
      metrics: {
        mood: 0,
        energy: 0,
        focus: 0
      },
      lifeRegained: "0 hrs",
      recentCravings: 0,
      avgMood: 0,
      avgEnergy: 0,
      avgFocus: 0,
      nextMilestone: {
        name: "24 Hours",
        daysUntil: 1,
        description: "Oxygen and carbon monoxide levels returning to normal"
      }
    };
  }
};
