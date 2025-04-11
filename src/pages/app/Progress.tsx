
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getLogEntries } from "@/services/logService";
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format, subDays, differenceInDays } from 'date-fns';

const COLORS = ['#9b87f5', '#38B2AC', '#805AD5', '#4FD1C5', '#B794F4'];

const Progress = () => {
  const [timeRange, setTimeRange] = useState("week");
  const { data: logs = [], isLoading } = useQuery({
    queryKey: ['logs'],
    queryFn: getLogEntries,
  });

  const getDateRange = () => {
    const today = new Date();
    switch (timeRange) {
      case 'week':
        return 7;
      case 'month':
        return 30;
      case 'quarter':
        return 90;
      default:
        return 7;
    }
  };
  
  const processNicotineData = () => {
    const days = getDateRange();
    const today = new Date();
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(today, i);
      const dateString = format(date, 'yyyy-MM-dd');
      const dayLabel = format(date, timeRange === 'week' ? 'EEE' : 'MMM dd'); 
      
      const logsForDay = logs.filter(log => log.date.startsWith(dateString));
      const usedNicotine = logsForDay.some(log => log.used_nicotine);
      
      data.push({
        day: dayLabel,
        date: dateString,
        used: usedNicotine ? 1 : 0,
      });
    }
    
    return data;
  };
  
  const processCravingTriggers = () => {
    const triggers = logs.reduce((acc: Record<string, number>, log) => {
      if (log.craving_trigger) {
        acc[log.craving_trigger] = (acc[log.craving_trigger] || 0) + 1;
      }
      return acc;
    }, {});
    
    return Object.entries(triggers).map(([name, value]) => ({ name, value }));
  };
  
  const calculateSavings = () => {
    // Find the first day without nicotine
    const sortedLogs = [...logs].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime());
    
    let streak = 0;
    let startDate = null;
    
    for (let i = 0; i < sortedLogs.length; i++) {
      if (!sortedLogs[i].used_nicotine) {
        if (!startDate) {
          startDate = new Date(sortedLogs[i].date);
        }
        streak++;
      } else {
        startDate = null;
        streak = 0;
      }
    }
    
    // Calculate savings based on $10/day
    const dailySaving = 10;
    const totalDays = startDate ? differenceInDays(new Date(), startDate) + 1 : 0;
    const totalSaved = totalDays * dailySaving;
    
    const weekly = dailySaving * 7;
    const monthly = dailySaving * 30;
    const yearly = dailySaving * 365;
    
    return {
      daily: dailySaving,
      weekly,
      monthly,
      yearly,
      totalDays,
      totalSaved
    };
  };
  
  const nicotineData = processNicotineData();
  const triggerData = processCravingTriggers();
  const savings = calculateSavings();
  
  return (
    <div className="container py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Progress</h1>
          <p className="text-muted-foreground">
            Detailed metrics and insights from your journey
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Past Week</SelectItem>
            <SelectItem value="month">Past Month</SelectItem>
            <SelectItem value="quarter">Past Quarter</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="nicotine" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="nicotine">Nicotine Use</TabsTrigger>
          <TabsTrigger value="cravings">Cravings</TabsTrigger>
          <TabsTrigger value="wellness">Wellness</TabsTrigger>
          <TabsTrigger value="savings">Savings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="nicotine" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Nicotine Usage Pattern</CardTitle>
              <CardDescription>Track your progress in staying afresh</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <p>Loading data...</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={nicotineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis ticks={[0, 1]} domain={[0, 1]} tickFormatter={(tick) => tick === 1 ? 'Yes' : 'No'} />
                    <Tooltip formatter={(value) => [value === 1 ? 'Yes' : 'No', 'Used Nicotine']} />
                    <Area 
                      type="monotone" 
                      dataKey="used" 
                      stroke="#9b87f5" 
                      fillOpacity={1} 
                      fill="url(#colorUsage)" 
                      name="Used Nicotine"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cravings" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Craving Triggers</CardTitle>
                <CardDescription>Most common reasons for your cravings</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <p>Loading data...</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={triggerData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {triggerData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [value, name]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Craving Intensity</CardTitle>
                <CardDescription>How your cravings change over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <p>Loading data...</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={nicotineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="intensity" 
                        stroke="#38B2AC" 
                        name="Intensity (1-10)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="wellness" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Holistic Wellness</CardTitle>
              <CardDescription>Track your mood, energy, and focus levels</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <p>Loading data...</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={nicotineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="#9b87f5" 
                      name="Mood (1-5)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="energy" 
                      stroke="#38B2AC" 
                      name="Energy (1-5)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="focus" 
                      stroke="#805AD5" 
                      name="Focus (1-5)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="savings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Benefits</CardTitle>
              <CardDescription>Money saved by staying nicotine-free</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-fresh-50 p-4 rounded-lg border border-fresh-100">
                  <p className="text-sm text-muted-foreground">Daily Savings</p>
                  <p className="text-2xl font-bold">${savings.daily.toFixed(2)}</p>
                </div>
                <div className="bg-fresh-50 p-4 rounded-lg border border-fresh-100">
                  <p className="text-sm text-muted-foreground">Weekly Savings</p>
                  <p className="text-2xl font-bold">${savings.weekly.toFixed(2)}</p>
                </div>
                <div className="bg-fresh-50 p-4 rounded-lg border border-fresh-100">
                  <p className="text-sm text-muted-foreground">Monthly Savings</p>
                  <p className="text-2xl font-bold">${savings.monthly.toFixed(2)}</p>
                </div>
                <div className="bg-fresh-50 p-4 rounded-lg border border-fresh-100">
                  <p className="text-sm text-muted-foreground">Yearly Savings</p>
                  <p className="text-2xl font-bold">${savings.yearly.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="bg-fresh-50 p-6 rounded-lg border border-fresh-100 text-center">
                <h3 className="text-lg font-semibold mb-2">Total Saved So Far</h3>
                <p className="text-4xl font-bold text-fresh-500">${savings.totalSaved.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  From {savings.totalDays} {savings.totalDays === 1 ? 'day' : 'days'} without nicotine
                </p>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">What You Could Buy With Your Savings</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium">In 1 month</p>
                    <p className="text-muted-foreground">A nice dinner for two (${savings.monthly.toFixed(2)})</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium">In 6 months</p>
                    <p className="text-muted-foreground">A weekend getaway (${(savings.monthly * 6).toFixed(2)})</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium">In 1 year</p>
                    <p className="text-muted-foreground">A new gadget or vacation (${savings.yearly.toFixed(2)})</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Progress;
