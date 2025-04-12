import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
// Import the actual service function
import { getLogAnalytics } from "@/services/logService"; 
// Import goal service and type
import { getUserGoal } from "@/services/goalService";
import { UserGoal } from "@/lib/supabase"; 
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format, subDays, startOfDay, isWithinInterval, parseISO } from 'date-fns';
import { Skeleton } from "@/components/ui/skeleton";
// Import Loader2
import { AlertCircle, TrendingUp, Award, HeartPulse, Loader2 } from "lucide-react"; 
import { NicotineLog } from "@/lib/supabase"; // Import the type
// Import the new HealthTimeline component
import HealthTimeline from "@/components/app/progress/HealthTimeline"; 
// Import the new AchievementsList component
import AchievementsList from "@/components/app/progress/AchievementsList";
// Import user preferences service
import { getUserPreferences } from "@/services/userPreferencesService";

// --- Types ---
// Using NicotineLog type directly from lib/supabase

// Type for processed data points used in charts
interface ChartDataPoint {
  date: string; // Formatted date string (e.g., 'Mon', 'Oct 27')
  fullDate: string; // yyyy-MM-dd
  nicotineUsage: number; // Quantity if used, 0 if not
  cravingIntensityAvg?: number | null;
  cravingCount: number;
  moodAvg?: number | null;
  energyAvg?: number | null;
  focusAvg?: number | null;
  sleepQualityAvg?: number | null;
  cumulativeSavings?: number; // Added for savings chart
}

const COLORS = ['#9b87f5', '#38B2AC', '#805AD5', '#4FD1C5', '#B794F4', '#F6AD55', '#ED8936'];

const ProgressPage = () => { 
  const [timeRange, setTimeRange] = useState("week");
  
  // Fetch logs
  const { data: logs = [], isLoading: isLoadingLogs, error: logsError } = useQuery<NicotineLog[]>({
    queryKey: ['logs', timeRange], 
    queryFn: () => getLogAnalytics(timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90), 
    staleTime: 5 * 60 * 1000, 
  });

  // Fetch user goal for timeline and achievements
  const { data: goal, isLoading: isLoadingGoal, error: goalError } = useQuery<UserGoal | null>({
    queryKey: ['user-goal-progress'], 
    queryFn: getUserGoal,
    staleTime: 10 * 60 * 1000, 
  });

  // Fetch user preferences for cost calculation
  const { data: userPreferences, isLoading: isLoadingPrefs, error: prefsError } = useQuery({
    queryKey: ['user-preferences-progress'],
    queryFn: getUserPreferences,
    staleTime: 15 * 60 * 1000, 
  });

  const isLoading = isLoadingLogs || isLoadingGoal || isLoadingPrefs;
  const queryError = logsError || goalError || prefsError;

  const processedData = useMemo(() => {
    const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90;
    const endDate = startOfDay(new Date());
    const startDate = startOfDay(subDays(endDate, days - 1));
    const interval = { start: startDate, end: endDate };
    
    const dailyData: Record<string, Partial<ChartDataPoint> & { entries: NicotineLog[] }> = {};

    // Initialize data points for the range
    for (let i = 0; i < days; i++) {
      const date = startOfDay(subDays(endDate, i));
      const dateString = format(date, 'yyyy-MM-dd');
      const dayLabel = format(date, days <= 7 ? 'EEE' : 'MMM dd');
      dailyData[dateString] = { 
        date: dayLabel, 
        fullDate: dateString, 
        nicotineUsage: 0, 
        cravingCount: 0,
        entries: [] 
      };
    }

    // Populate with log data
    logs.forEach(log => {
      const logDateStr = typeof log.date === 'string' ? log.date : new Date(log.date).toISOString();
      const logDate = startOfDay(parseISO(logDateStr));
      if (isWithinInterval(logDate, interval)) {
        const dateString = format(logDate, 'yyyy-MM-dd');
        if (dailyData[dateString]) {
          dailyData[dateString].entries.push(log);
        }
      }
    });

    // Calculate aggregates and cumulative savings
    let cumulativeSavings = 0;
    const costPerProduct = userPreferences?.cost_per_product || {};
    const defaultCost = 10; // Default daily cost if not specified

    const chartData = Object.values(dailyData)
      .sort((a, b) => new Date(a.fullDate!).getTime() - new Date(b.fullDate!).getTime()) // Sort chronologically first
      .map(day => {
        const { entries } = day;
        const usedEntry = entries.find(e => e.used_nicotine);
        const nicotineUsage = usedEntry ? (usedEntry.quantity || 1) : 0; 
        
        // Calculate daily savings
        let dailySaving = 0;
        if (!usedEntry) {
          // If no nicotine used, estimate savings based on primary product or default
          const primaryProduct = goal?.product_type || 'cigarette'; // Default to cigarette if no goal
          dailySaving = costPerProduct[primaryProduct as keyof typeof costPerProduct] || defaultCost;
        }
        cumulativeSavings += dailySaving;

        const cravings = entries.filter(e => e.craving_intensity !== null && e.craving_intensity !== undefined);
        const cravingCount = cravings.length;
        const cravingIntensitySum = cravings.reduce((sum, e) => sum + (e.craving_intensity || 0), 0);
        const cravingIntensityAvg = cravingCount > 0 ? cravingIntensitySum / cravingCount : null;

        const moods = entries.map(e => e.mood).filter(m => m !== null && m !== undefined) as number[];
        const energies = entries.map(e => e.energy).filter(e => e !== null && e !== undefined) as number[];
        const focuses = entries.map(e => e.focus).filter(f => f !== null && f !== undefined) as number[];
        const sleepQualities = entries.map(e => e.sleep_quality).filter(s => s !== null && s !== undefined) as number[];

        const moodAvg = moods.length > 0 ? moods.reduce((a, b) => a + b, 0) / moods.length : null;
        const energyAvg = energies.length > 0 ? energies.reduce((a, b) => a + b, 0) / energies.length : null;
        const focusAvg = focuses.length > 0 ? focuses.reduce((a, b) => a + b, 0) / focuses.length : null;
        const sleepQualityAvg = sleepQualities.length > 0 ? sleepQualities.reduce((a, b) => a + b, 0) / sleepQualities.length : null;

        return {
          ...day,
          nicotineUsage,
          cravingCount,
          cravingIntensityAvg,
          moodAvg,
          energyAvg,
          focusAvg,
          sleepQualityAvg,
          cumulativeSavings, // Add cumulative savings to data point
        };
      }); 

    // Process trigger data separately
    const triggerCounts = logs.reduce((acc: Record<string, number>, log) => {
       const logDateStr = typeof log.date === 'string' ? log.date : new Date(log.date).toISOString();
       const logDate = startOfDay(parseISO(logDateStr));
       if (isWithinInterval(logDate, interval) && log.craving_trigger) {
         acc[log.craving_trigger] = (acc[log.craving_trigger] || 0) + 1;
       }
       return acc;
     }, {});
    const triggerData = Object.entries(triggerCounts).map(([name, value]) => ({ name, value }));

    return { chartData, triggerData, totalSavings: cumulativeSavings }; // Return total savings as well

  }, [logs, timeRange, userPreferences, goal]);

  const { chartData, triggerData, totalSavings } = processedData;

  // --- Render ---
  
  if (queryError) {
    return (
      <div className="container py-8 text-center text-red-600">
        <AlertCircle className="mx-auto h-12 w-12 mb-4" />
        <h2 className="text-xl font-semibold">Error Loading Progress Data</h2>
        <p>{(queryError as Error).message}</p>
      </div>
    );
  }

  const renderChartLoading = () => (
    <div className="h-full flex items-center justify-center text-muted-foreground">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading chart data...
    </div>
  );

  return (
    <div className="container py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Progress</h1>
          <p className="text-muted-foreground">
            Visualize your journey towards a fresher life.
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Past 7 Days</SelectItem>
            <SelectItem value="month">Past 30 Days</SelectItem>
            <SelectItem value="quarter">Past 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Updated Tabs */}
      <Tabs defaultValue="nicotine" className="w-full">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6">
          <TabsTrigger value="nicotine">Nicotine</TabsTrigger>
          <TabsTrigger value="cravings">Cravings</TabsTrigger>
          <TabsTrigger value="wellness">Wellness</TabsTrigger>
          <TabsTrigger value="savings">Savings</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        
        {/* Nicotine Tab */}
        <TabsContent value="nicotine" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Nicotine Usage</CardTitle>
              <CardDescription>Your nicotine consumption over time ({timeRange} view).</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              {isLoadingLogs ? renderChartLoading() : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis label={{ value: 'Quantity/Count', angle: -90, position: 'insideLeft' }} /> 
                    <Tooltip formatter={(value) => [value, 'Usage Count']} />
                    <Area type="monotone" dataKey="nicotineUsage" stroke="#ef4444" fillOpacity={1} fill="url(#colorUsage)" name="Nicotine Use" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Cravings Tab */}
        <TabsContent value="cravings" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Craving Intensity & Frequency</CardTitle>
                <CardDescription>Average intensity and number of cravings logged ({timeRange} view).</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {isLoadingLogs ? renderChartLoading() : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} label={{ value: 'Avg Intensity (1-10)', angle: -90, position: 'insideLeft' }} />
                      <YAxis yAxisId="right" orientation="right" dataKey="cravingCount" allowDecimals={false} label={{ value: 'Count', angle: 90, position: 'insideRight' }} />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="cravingIntensityAvg" stroke="#f97316" name="Avg Intensity" connectNulls />
                      <Line yAxisId="right" type="monotone" dataKey="cravingCount" stroke="#3b82f6" name="Craving Count" />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle>Craving Triggers</CardTitle>
                <CardDescription>Most common triggers logged ({timeRange} view).</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {isLoadingLogs ? renderChartLoading() : triggerData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={triggerData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                        {triggerData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [value, name]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">No trigger data logged for this period.</div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Wellness Tab */}
        <TabsContent value="wellness" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Holistic Wellness Trends</CardTitle>
              <CardDescription>Average mood, energy, focus, and sleep quality ({timeRange} view).</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              {isLoadingLogs ? renderChartLoading() : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} label={{ value: 'Rating (1-5)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="moodAvg" stroke="#9b87f5" name="Mood" connectNulls />
                    <Line type="monotone" dataKey="energyAvg" stroke="#38B2AC" name="Energy" connectNulls />
                    <Line type="monotone" dataKey="focusAvg" stroke="#805AD5" name="Focus" connectNulls />
                    <Line type="monotone" dataKey="sleepQualityAvg" stroke="#F6AD55" name="Sleep Quality" connectNulls />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Savings Tab */}
        <TabsContent value="savings" className="mt-6 space-y-6">
           <Card>
             <CardHeader>
               <CardTitle>Financial Savings</CardTitle>
               <CardDescription>Estimated savings based on your logged nicotine-free days and product costs.</CardDescription>
             </CardHeader>
             <CardContent>
                <div className="text-center mb-8">
                  <p className="text-sm text-muted-foreground">Total Estimated Savings ({timeRange} view)</p>
                  <p className="text-4xl font-bold text-green-600">${totalSavings.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Based on costs entered in Settings. Update them for accuracy.
                  </p>
                </div>
                {/* Savings Graph */}
                 <div className="h-64">
                   {isLoading ? renderChartLoading() : (
                     <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                         <defs>
                           <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                             <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                           </linearGradient>
                         </defs>
                         <CartesianGrid strokeDasharray="3 3" />
                         <XAxis dataKey="date" />
                         <YAxis label={{ value: 'Cumulative Savings ($)', angle: -90, position: 'insideLeft' }} />
                         <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, 'Savings']} />
                         <Area type="monotone" dataKey="cumulativeSavings" stroke="#10b981" fillOpacity={1} fill="url(#colorSavings)" name="Cumulative Savings" />
                       </AreaChart>
                     </ResponsiveContainer>
                   )}
                 </div>
             </CardContent>
           </Card>
        </TabsContent>

        {/* Health Timeline Tab */}
         <TabsContent value="timeline" className="mt-6">
           <Card>
             <CardHeader>
               <CardTitle>Health Timeline</CardTitle>
               <CardDescription>See key health recovery milestones based on your quit date.</CardDescription>
             </CardHeader>
             <CardContent>
                {/* Integrate HealthTimeline component */}
                <HealthTimeline goal={goal} isLoading={isLoadingGoal} />
             </CardContent>
           </Card>
         </TabsContent>

         {/* Achievements Tab */}
         <TabsContent value="achievements" className="mt-6">
           <Card>
             <CardHeader>
               <CardTitle>Achievements & Milestones</CardTitle>
               <CardDescription>Celebrate your progress and accomplishments!</CardDescription>
             </CardHeader>
             <CardContent>
                {/* Integrate AchievementsList component */}
                <AchievementsList goal={goal} logs={logs} isLoading={isLoading} />
             </CardContent>
           </Card>
         </TabsContent>

      </Tabs>
    </div>
  );
};

export default ProgressPage;
