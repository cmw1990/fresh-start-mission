import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
// Assume getLogEntries fetches data matching LogEntry interface
// import { getLogEntries } from "@/services/logService"; 
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format, subDays, startOfDay, isWithinInterval, parseISO } from 'date-fns';
import { Skeleton } from "@/components/ui/skeleton";
// Import Loader2
import { AlertCircle, TrendingUp, Award, HeartPulse, Loader2 } from "lucide-react"; 

// --- Types ---
// Define a more accurate LogEntry type based on expected data
interface LogEntry {
  id: string;
  user_id: string;
  date: string; // Assuming ISO string format e.g., "2023-10-27T10:00:00Z"
  used_nicotine?: boolean | null;
  nicotine_product?: string | null; // e.g., 'cigarette', 'vape', 'pouch'
  nicotine_quantity?: number | null; // e.g., number of cigarettes, puffs, pouches
  craving_intensity?: number | null; // Scale 1-10
  craving_trigger?: string | null;
  mood?: number | null; // Scale 1-5
  energy?: number | null; // Scale 1-5
  focus?: number | null; // Scale 1-5
  sleep_quality?: number | null; // Scale 1-5
  sleep_hours?: number | null;
}

// Type for processed data points used in charts
interface ChartDataPoint {
  date: string; // Formatted date string (e.g., 'Mon', 'Oct 27')
  fullDate: string; // yyyy-MM-dd
  nicotineUsage: number; // 1 for used, 0 for not used (or quantity if available)
  cravingIntensityAvg?: number | null;
  cravingCount: number;
  moodAvg?: number | null;
  energyAvg?: number | null;
  focusAvg?: number | null;
  sleepQualityAvg?: number | null;
}

// Placeholder fetch function - replace with actual service call
const getLogEntries = async (): Promise<LogEntry[]> => {
  // Simulate fetching data
  await new Promise(resolve => setTimeout(resolve, 500)); 
  // Return sample data matching the LogEntry interface for demonstration
  const today = new Date();
  return [
    { id: '1', user_id: 'user1', date: subDays(today, 6).toISOString(), used_nicotine: true, nicotine_product: 'cigarette', nicotine_quantity: 5, craving_intensity: 7, craving_trigger: 'Stress', mood: 2, energy: 2, focus: 3, sleep_quality: 3 },
    { id: '2', user_id: 'user1', date: subDays(today, 5).toISOString(), used_nicotine: true, nicotine_product: 'cigarette', nicotine_quantity: 3, craving_intensity: 6, craving_trigger: 'Boredom', mood: 3, energy: 3, focus: 4, sleep_quality: 4 },
    { id: '3', user_id: 'user1', date: subDays(today, 4).toISOString(), used_nicotine: false, craving_intensity: 4, craving_trigger: 'Social', mood: 4, energy: 4, focus: 4, sleep_quality: 5 },
    { id: '4', user_id: 'user1', date: subDays(today, 3).toISOString(), used_nicotine: false, craving_intensity: 3, craving_trigger: 'Coffee', mood: 4, energy: 5, focus: 5, sleep_quality: 4 },
    { id: '5', user_id: 'user1', date: subDays(today, 2).toISOString(), used_nicotine: false, craving_intensity: 2, mood: 5, energy: 4, focus: 5, sleep_quality: 5 },
    { id: '6', user_id: 'user1', date: subDays(today, 1).toISOString(), used_nicotine: false, craving_intensity: 1, mood: 5, energy: 5, focus: 5, sleep_quality: 5 },
    { id: '7', user_id: 'user1', date: today.toISOString(), used_nicotine: false, craving_intensity: 1, mood: 5, energy: 5, focus: 5, sleep_quality: 5 },
    // Add more sample data for month/quarter if needed
  ];
};

const COLORS = ['#9b87f5', '#38B2AC', '#805AD5', '#4FD1C5', '#B794F4', '#F6AD55', '#ED8936'];

const ProgressPage = () => { // Renamed component
  const [timeRange, setTimeRange] = useState("week");
  const { data: logs = [], isLoading, error } = useQuery<LogEntry[]>({
    queryKey: ['logs', timeRange], // Include timeRange in queryKey if fetching depends on it
    queryFn: getLogEntries, // Ideally, pass timeRange to fetch function
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const processedData = useMemo(() => {
    const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90;
    const endDate = startOfDay(new Date());
    const startDate = startOfDay(subDays(endDate, days - 1));
    const interval = { start: startDate, end: endDate };
    
    const dailyData: Record<string, Partial<ChartDataPoint> & { entries: LogEntry[] }> = {};

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
      const logDate = startOfDay(parseISO(log.date));
      if (isWithinInterval(logDate, interval)) {
        const dateString = format(logDate, 'yyyy-MM-dd');
        if (dailyData[dateString]) {
          dailyData[dateString].entries.push(log);
        }
      }
    });

    // Calculate aggregates
    const chartData = Object.values(dailyData).map(day => {
      const { entries } = day;
      const nicotineUsage = entries.some(e => e.used_nicotine) ? 1 : 0; // Simple Yes/No for now
      
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
      };
    }).sort((a, b) => new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime()); // Sort chronologically

    // Process trigger data separately
    const triggerCounts = logs.reduce((acc: Record<string, number>, log) => {
       const logDate = startOfDay(parseISO(log.date));
       if (isWithinInterval(logDate, interval) && log.craving_trigger) {
         acc[log.craving_trigger] = (acc[log.craving_trigger] || 0) + 1;
       }
       return acc;
     }, {});
    const triggerData = Object.entries(triggerCounts).map(([name, value]) => ({ name, value }));

    return { chartData, triggerData };

  }, [logs, timeRange]);

  const { chartData, triggerData } = processedData;

  // Placeholder Savings Calculation (Needs user cost input)
  const calculateSavings = () => {
    const dailySaving = 10; // Placeholder
    const daysNicotineFree = chartData.filter(d => d.nicotineUsage === 0).length; // Simple count for demo
    const totalSaved = daysNicotineFree * dailySaving;
    return { totalSaved, daysNicotineFree };
  };
  const savings = calculateSavings();

  // --- Render ---
  
  if (error) {
    return (
      <div className="container py-8 text-center text-red-600">
        <AlertCircle className="mx-auto h-12 w-12 mb-4" />
        <h2 className="text-xl font-semibold">Error Loading Progress Data</h2>
        <p>{(error as Error).message}</p>
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
              <CardDescription>Days you used nicotine vs. stayed afresh ({timeRange} view).</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              {isLoading ? renderChartLoading() : (
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
                    <YAxis ticks={[0, 1]} domain={[0, 1]} tickFormatter={(tick) => tick === 1 ? 'Used' : 'Afresh'} />
                    <Tooltip formatter={(value) => [value === 1 ? 'Used Nicotine' : 'Stayed Afresh', 'Status']} />
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
                {isLoading ? renderChartLoading() : (
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
                {isLoading ? renderChartLoading() : triggerData.length > 0 ? (
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
              {isLoading ? renderChartLoading() : (
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
               <CardDescription>Estimated savings from staying nicotine-free (based on $10/day placeholder).</CardDescription>
             </CardHeader>
             <CardContent>
                <div className="text-center mb-8">
                  <p className="text-sm text-muted-foreground">Total Estimated Savings</p>
                  <p className="text-4xl font-bold text-green-600">${savings.totalSaved.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">
                    Across {savings.daysNicotineFree} nicotine-free {savings.daysNicotineFree === 1 ? 'day' : 'days'} logged
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">(Note: Based on a $10/day placeholder. Update your spending in Settings for accuracy.)</p>
                </div>
                {/* Placeholder for Savings Graph */}
                 <div className="h-64 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                    <TrendingUp className="h-8 w-8 mr-2"/> Cumulative Savings Chart (Coming Soon)
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
             <CardContent className="h-96 flex items-center justify-center text-muted-foreground">
                <HeartPulse className="h-8 w-8 mr-2"/> Health Timeline Feature (Coming Soon)
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
             <CardContent className="h-96 flex items-center justify-center text-muted-foreground">
                <Award className="h-8 w-8 mr-2"/> Achievements Feature (Coming Soon)
             </CardContent>
           </Card>
         </TabsContent>

      </Tabs>
    </div>
  );
};

export default ProgressPage; // Corrected export name
