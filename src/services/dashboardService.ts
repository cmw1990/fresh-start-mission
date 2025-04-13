
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
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  // Simulate fetching dashboard stats
  // In a real app, this would be a Supabase query
  return {
    name: 'Fresh User',
    daysAfresh: 7,
    moneySaved: 42.50,
    lastCraving: {
      time: '2 hours ago',
      intensity: 6
    },
    metrics: {
      mood: 4,
      energy: 3,
      focus: 4
    }
  };
};
