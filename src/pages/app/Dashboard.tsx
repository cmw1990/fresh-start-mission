
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { differenceInDays, format, subDays } from "date-fns";
import { AlertCircle, Loader2, TrendingUp, ArrowRight, Calendar, Banknote, Clock, Flame, Brain, Smile, Battery } from "lucide-react";
import { getDashboardStats, getMotivationalQuote } from "@/services/dashboardService";
import { getLogAnalytics } from "@/services/logService";
import { getUserGoal } from "@/services/goalService";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quote, setQuote] = useState("");

  // Fetch dashboard stats
  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Fetch logs for chart
  const { data: logs, isLoading: logsLoading, error: logsError } = useQuery({
    queryKey: ['logs-analytics'],
    queryFn: () => getLogAnalytics(14), // Get 14 days of logs
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Fetch user goal
  const { data: goal, isLoading: goalLoading } = useQuery({
    queryKey: ['user-goal'],
    queryFn: getUserGoal,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  // Generate and set motivational quote
  useEffect(() => {
    setQuote(getMotivationalQuote());
  }, []);

  // Format chart data
  const chartData = React.useMemo(() => {
    if (!logs) return [];
    
    // Generate data for the last 14 days
    const today = new Date();
    const data = [];
    
    for (let i = 13; i >= 0; i--) {
      const date = subDays(today, i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const logEntry = logs.find(log => log.date.split('T')[0] === dateStr);
      
      const dayData: any = {
        date: format(date, 'MMM dd'),
        dateStr: dateStr,
        nicotineUse: logEntry?.used_nicotine ? (logEntry.quantity || 1) : 0,
        cravingIntensity: logEntry?.craving_intensity || 0,
        mood: logEntry?.mood || null,
        energy: logEntry?.energy || null,
        focus: logEntry?.focus || null,
      };
      
      data.push(dayData);
    }
    
    return data;
  }, [logs]);

  // Calculate streak percentage for progress bar
  const getProgressPercentage = () => {
    if (!stats) return 0;
    
    if (goal?.goal_type === 'afresh') {
      // For afresh goals, show progress towards next milestone
      if (stats.daysAfresh < 3) return (stats.daysAfresh / 3) * 100;
      if (stats.daysAfresh < 7) return (stats.daysAfresh / 7) * 100;
      if (stats.daysAfresh < 14) return (stats.daysAfresh / 14) * 100;
      if (stats.daysAfresh < 30) return (stats.daysAfresh / 30) * 100;
      if (stats.daysAfresh < 90) return (stats.daysAfresh / 90) * 100;
      return 100;
    } else {
      // For fresher goals, show progress towards reduction target
      return Math.min(100, (stats.reductionAchieved || 0));
    }
  };

  if (statsError || logsError) {
    return (
      <div className="container py-8">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            There was an error loading your dashboard. Please refresh the page to try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back{user?.user_metadata?.name ? `, ${user.user_metadata.name}` : ''}!</h1>
          <p className="text-muted-foreground">
            Here's a summary of your fresh journey so far.
          </p>
        </div>
        <Button onClick={() => navigate('/app/log')} className="bg-fresh-300 hover:bg-fresh-400">
          Log Today's Entry
        </Button>
      </div>

      {/* Streak Card */}
      <Card className="border-2 border-fresh-300">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center">
            {goal?.goal_type === 'afresh' ? (
              <>
                <Calendar className="h-5 w-5 mr-2 text-fresh-500" />
                {statsLoading ? (
                  <Skeleton className="h-7 w-32" />
                ) : (
                  <span>{stats?.daysAfresh || 0} Days Afresh</span>
                )}
              </>
            ) : (
              <>
                <TrendingUp className="h-5 w-5 mr-2 text-fresh-500" />
                {statsLoading ? (
                  <Skeleton className="h-7 w-40" />
                ) : (
                  <span>{stats?.reductionAchieved || 0}% Reduction</span>
                )}
              </>
            )}
          </CardTitle>
          <CardDescription>
            {statsLoading ? (
              <Skeleton className="h-4 w-64" />
            ) : (
              <>Next milestone: {stats?.nextMilestone}</>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              {!statsLoading && stats?.nextMilestoneDate && (
                <span className="text-muted-foreground">Target: {stats.nextMilestoneDate}</span>
              )}
            </div>
            <Progress value={statsLoading ? 0 : getProgressPercentage()} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Money Saved */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Banknote className="h-5 w-5 mr-2 text-green-500" />
              Money Saved
            </CardTitle>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-9 w-24" />
            ) : (
              <div className="text-3xl font-bold text-green-600">${stats?.moneySaved.toFixed(2)}</div>
            )}
            <p className="text-sm text-muted-foreground">
              Based on your product costs
            </p>
          </CardContent>
        </Card>

        {/* Life Regained */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-500" />
              Life Regained
            </CardTitle>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-9 w-24" />
            ) : (
              <div className="text-3xl font-bold text-blue-600">{stats?.lifeRegained}</div>
            )}
            <p className="text-sm text-muted-foreground">
              Extra time added to your life
            </p>
          </CardContent>
        </Card>

        {/* Recent Cravings */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Flame className="h-5 w-5 mr-2 text-orange-500" />
              Recent Cravings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-9 w-24" />
            ) : (
              <div className="text-3xl font-bold text-orange-500">{stats?.recentCravings}</div>
            )}
            <p className="text-sm text-muted-foreground">
              Strong cravings in the last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Trend</CardTitle>
          <CardDescription>Your nicotine use and craving intensity over the last 2 weeks</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          {logsLoading ? (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="left"
                  domain={[0, 10]}
                  tickCount={6}
                  label={{ 
                    value: 'Craving Intensity', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { fontSize: 12, fill: '#fb923c' },
                  }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  label={{ 
                    value: 'Nicotine Use', 
                    angle: 90, 
                    position: 'insideRight',
                    style: { fontSize: 12, fill: '#ef4444' },
                  }}
                />
                <Tooltip />
                <defs>
                  <linearGradient id="colorCraving" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fb923c" stopOpacity={0.7}/>
                    <stop offset="95%" stopColor="#fb923c" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorUse" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.7}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  yAxisId="left"
                  dataKey="cravingIntensity" 
                  stroke="#fb923c" 
                  fill="url(#colorCraving)" 
                  name="Craving Intensity"
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  yAxisId="right"
                  dataKey="nicotineUse" 
                  stroke="#ef4444" 
                  fill="url(#colorUse)" 
                  name="Nicotine Use"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
              <p>Not enough data yet.</p>
              <Button 
                variant="link" 
                className="mt-2"
                onClick={() => navigate('/app/log')}
              >
                Start logging your journey
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Wellness Snapshot */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Wellness Snapshot</CardTitle>
            <CardDescription>Your average mood, energy, and focus levels (scale 1-5)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {/* Mood */}
              <div className="flex flex-col items-center justify-center p-4">
                <div className="bg-purple-100 p-3 rounded-full mb-2">
                  <Smile className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="font-medium text-sm">Mood</h3>
                {statsLoading ? (
                  <Skeleton className="h-8 w-12 mt-1" />
                ) : (
                  <div className="text-xl font-bold mt-1">{stats?.avgMood.toFixed(1)}</div>
                )}
              </div>
              
              {/* Energy */}
              <div className="flex flex-col items-center justify-center p-4">
                <div className="bg-amber-100 p-3 rounded-full mb-2">
                  <Battery className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="font-medium text-sm">Energy</h3>
                {statsLoading ? (
                  <Skeleton className="h-8 w-12 mt-1" />
                ) : (
                  <div className="text-xl font-bold mt-1">{stats?.avgEnergy.toFixed(1)}</div>
                )}
              </div>
              
              {/* Focus */}
              <div className="flex flex-col items-center justify-center p-4">
                <div className="bg-sky-100 p-3 rounded-full mb-2">
                  <Brain className="h-6 w-6 text-sky-500" />
                </div>
                <h3 className="font-medium text-sm">Focus</h3>
                {statsLoading ? (
                  <Skeleton className="h-8 w-12 mt-1" />
                ) : (
                  <div className="text-xl font-bold mt-1">{stats?.avgFocus.toFixed(1)}</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Motivational Quote */}
        <Card className="bg-gradient-to-br from-fresh-50 to-fresh-100 border-fresh-200">
          <CardHeader>
            <CardTitle className="text-lg">Daily Inspiration</CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="italic text-lg">"{quote}"</blockquote>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-4 text-fresh-700"
              onClick={() => setQuote(getMotivationalQuote())}
            >
              Get Another
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Support Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Supportive Tools</CardTitle>
          <CardDescription>Quick access to tools that will help you on your journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link to="/app/tools/craving">
              <Button variant="outline" className="w-full h-24 flex flex-col" size="lg">
                <Flame className="h-6 w-6 mb-2 text-orange-500" />
                <span>Craving Tools</span>
              </Button>
            </Link>
            <Link to="/app/tools/energy">
              <Button variant="outline" className="w-full h-24 flex flex-col" size="lg">
                <Battery className="h-6 w-6 mb-2 text-amber-500" />
                <span>Energy Tools</span>
              </Button>
            </Link>
            <Link to="/app/tools/mood">
              <Button variant="outline" className="w-full h-24 flex flex-col" size="lg">
                <Smile className="h-6 w-6 mb-2 text-purple-500" />
                <span>Mood Tools</span>
              </Button>
            </Link>
            <Link to="/app/tools/focus">
              <Button variant="outline" className="w-full h-24 flex flex-col" size="lg">
                <Brain className="h-6 w-6 mb-2 text-sky-500" />
                <span>Focus Tools</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
