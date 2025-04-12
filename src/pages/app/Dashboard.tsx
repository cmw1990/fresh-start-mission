import { Button } from "@/components/ui/button";
import StatsCard from "@/components/app/StatsCard";
import CravingChart from "@/components/app/dashboard/CravingChart";
import HolisticMetrics from "@/components/app/dashboard/HolisticMetrics";
import { Activity, Battery, Brain, Calendar, DollarSign, Flame, Clock, Loader2, AlertCircle, Quote } from "lucide-react"; 
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// Assume these service functions exist and fetch relevant data
// TODO: Implement actual service functions connecting to backend
import { getLogEntries, getRecentLogStats } from "@/services/logService"; 
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton"; 
// Ensure CardHeader and CardTitle are imported
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; 
// Ensure Progress is imported
import { Progress } from "@/components/ui/progress"; 

// Placeholder type for stats - replace with actual type from service later
interface DashboardStats {
  daysAfresh: number;
  moneySaved: number;
  lifeRegained: string; // Assuming string like "X hrs"
  recentCravings: number;
  avgMood: number;
  avgEnergy: number;
  avgFocus: number;
  // TODO: Add goal related stats like reductionTargetMet: boolean, currentReduction: number etc.
}

// Placeholder type for logs - replace with actual type from service later
interface LogEntry {
  id: string;
  date: string; 
  // Add other log fields as needed by charts
  used_nicotine?: boolean | null;
  craving_intensity?: number | null;
  mood?: number | null;
  energy?: number | null;
  focus?: number | null;
}

const Dashboard = () => {
  const { user } = useAuth();
  
  // TODO: Fetch user goal alongside stats to determine which primary stat to show (Days Afresh vs Reduction %)
  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery<DashboardStats | null>({
    queryKey: ['dashboard-stats', user?.id], // Include user ID in query key
    queryFn: getRecentLogStats, 
    enabled: !!user, // Only fetch if user is available
  });
  
  // TODO: Potentially filter logs based on a date range for charts
  const { data: logs, isLoading: logsLoading, error: logsError } = useQuery<LogEntry[]>({
    queryKey: ['logs', user?.id], // Include user ID
    queryFn: getLogEntries,
    enabled: !!user,
  });
  
  const isLoading = statsLoading || logsLoading;
  const queryError = statsError || logsError;
  
  // Get first name from user_metadata or email
  const firstName = user?.user_metadata?.name 
    ? user.user_metadata.name.split(' ')[0] 
    : user?.email?.split('@')[0] || 'there';

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="container py-8 animate-pulse">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
           <Skeleton className="h-10 w-1/2" />
           <Skeleton className="h-10 w-36" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-[120px] w-full rounded-lg" />)}
        </div>
         <Skeleton className="h-8 w-1/3 mb-4" />
         <div className="grid gap-4 md:grid-cols-3 mb-8">
           {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-[120px] w-full rounded-lg" />)}
         </div>
         <div className="grid gap-6 mt-8">
            <Skeleton className="h-80 w-full rounded-lg" />
            <Skeleton className="h-80 w-full rounded-lg" />
         </div>
      </div>
    );
  }

  // --- Error State ---
   if (queryError) {
    return (
      <div className="container py-8 text-center text-red-600">
        <AlertCircle className="mx-auto h-12 w-12 mb-4" />
        <h2 className="text-xl font-semibold">Error Loading Dashboard Data</h2>
        <p>{(queryError as Error).message}</p>
        <p className="text-sm mt-2">Please try refreshing the page.</p>
      </div>
    );
  }

  // --- Success State ---
  return (
    <div className="container py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {firstName}! Your fresh journey overview.
          </p>
        </div>
        <Link to="/app/log">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Log Today's Data
          </Button>
        </Link>
      </div>

      {/* Key Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* TODO: Conditionally show Days Afresh or Reduction % based on user goal */}
        <StatsCard
          title="Days Afresh" 
          value={stats?.daysAfresh?.toString() ?? "N/A"}
          description={
            stats?.daysAfresh === 1 ? "Day 1 milestone!" :
            stats?.daysAfresh === 7 ? "One week milestone!" :
            stats?.daysAfresh === 0 ? "Ready to start!" :
            stats?.daysAfresh ? `${stats.daysAfresh} days and counting!` :
            "Log your progress"
          }
          icon={<Calendar className="h-4 w-4" />}
          trend="up"
        />
        <StatsCard
          title="Money Saved (Est.)"
          value={`$${stats?.moneySaved?.toFixed(2) ?? '0.00'}`}
          description="Based on $10/day placeholder" // TODO: Make dynamic based on user settings
          icon={<DollarSign className="h-4 w-4" />}
          trend="up"
        />
        <StatsCard
          title="Life Regained (Est.)"
          value={stats?.lifeRegained || "N/A"} // TODO: Implement calculation logic
          description="Time not spent using nicotine"
          icon={<Clock className="h-4 w-4" />}
          trend="up"
        />
        <StatsCard
          title="Recent Cravings"
          value={stats?.recentCravings?.toString() ?? "N/A"}
          description="In the last 7 days" // TODO: Clarify timeframe if dynamic
          icon={<Flame className="h-4 w-4" />}
          trend={stats && stats.recentCravings < 5 ? "down" : "neutral"} // Example trend logic
        />
      </div>

      {/* Holistic Wellness Snapshot */}
      <h2 className="text-xl font-semibold mb-4">Your Holistic Wellness</h2>
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <StatsCard
          title="Average Mood"
          value={`${stats?.avgMood?.toFixed(1) ?? 'N/A'} / 5`}
          description="Recent log average"
          icon={<Activity className="h-4 w-4" />}
          trend={stats && stats.avgMood > 3.5 ? "up" : "neutral"}
        />
        <StatsCard
          title="Average Energy"
          value={`${stats?.avgEnergy?.toFixed(1) ?? 'N/A'} / 5`}
          description="Recent log average"
          icon={<Battery className="h-4 w-4" />}
          trend={stats && stats.avgEnergy > 3.5 ? "up" : "neutral"}
        />
        <StatsCard
          title="Average Focus"
          value={`${stats?.avgFocus?.toFixed(1) ?? 'N/A'} / 5`}
          description="Recent log average"
          icon={<Brain className="h-4 w-4" />}
          trend={stats && stats.avgFocus > 3.5 ? "up" : "neutral"}
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 mt-8">
        {/* TODO: Align LogEntry type with chart component props or transform data */}
        <CravingChart logs={logs as any || []} /> 
        <HolisticMetrics logs={logs as any || []} />
      </div>

      {/* Milestone & Quote Section */}
      <div className="grid gap-6 mt-8 md:grid-cols-2">
          {/* Next Milestone Card */}
          <Card>
            <CardHeader>
                <CardTitle>Next Milestone</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  {stats?.daysAfresh === 0 
                    ? "Your first day milestone awaits!"
                    : stats?.daysAfresh < 3 
                      ? "Keep going! After 3 days, most nicotine leaves your system." 
                      : stats?.daysAfresh < 7 
                        ? `Almost 1 week! Your sense of taste and smell improve around now.`
                        : stats?.daysAfresh < 14
                          ? `Almost 2 weeks! Circulation and lung function continue to get better.`
                          : `You're doing great at ${stats?.daysAfresh} days! Keep building momentum.`
                  }
                </p>
                {/* Simplified Progress - Consider a more dynamic milestone system later */}
                <Progress value={stats ? (stats.daysAfresh / 14) * 100 : 0} className="h-2" aria-label="Progress to next milestone"/> 
            </CardContent>
          </Card>

          {/* Motivational Quote Card */}
          <Card className="flex flex-col justify-center bg-gradient-to-r from-blue-50 to-purple-50">
             <CardContent className="pt-6 text-center">
                <Quote className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                <p className="italic text-muted-foreground">
                    "The secret of getting ahead is getting started." 
                </p>
                <p className="text-sm font-medium mt-2">- Mark Twain (Placeholder)</p> 
                {/* TODO: Fetch dynamic quotes */}
             </CardContent>
          </Card>
      </div>

      {/* Quick Links to Tools */}
      <div className="mt-8">
         <h2 className="text-xl font-semibold mb-4">Support Tools</h2>
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link to="/app/tools/cravings" className="col-span-1">
              <Button variant="outline" className="w-full justify-start p-4 h-auto">
                <Flame className="mr-3 h-5 w-5 text-primary" />
                <div>
                    <p className="font-semibold">Craving Toolkit</p>
                    <p className="text-xs text-muted-foreground text-left">Manage urges effectively</p>
                </div>
              </Button>
            </Link>
            <Link to="/app/tools/energy" className="col-span-1">
              <Button variant="outline" className="w-full justify-start p-4 h-auto">
                <Battery className="mr-3 h-5 w-5 text-primary" />
                 <div>
                    <p className="font-semibold">Energy Boosters</p>
                    <p className="text-xs text-muted-foreground text-left">Combat fatigue</p>
                </div>
              </Button>
            </Link>
            <Link to="/app/tools/mood" className="col-span-1">
              <Button variant="outline" className="w-full justify-start p-4 h-auto">
                <Activity className="mr-3 h-5 w-5 text-primary" />
                 <div>
                    <p className="font-semibold">Mood Lifters</p>
                    <p className="text-xs text-muted-foreground text-left">Regulate emotions</p>
                </div>
              </Button>
            </Link>
            <Link to="/app/tools/focus" className="col-span-1">
              <Button variant="outline" className="w-full justify-start p-4 h-auto">
                <Brain className="mr-3 h-5 w-5 text-primary" />
                 <div>
                    <p className="font-semibold">Focus Enhancers</p>
                    <p className="text-xs text-muted-foreground text-left">Improve concentration</p>
                </div>
              </Button>
            </Link>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
