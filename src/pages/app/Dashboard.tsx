
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/app/StatsCard";
import CravingChart from "@/components/app/dashboard/CravingChart";
import HolisticMetrics from "@/components/app/dashboard/HolisticMetrics";
import { Activity, Battery, Brain, Calendar, DollarSign, Flame, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLogEntries, getRecentLogStats } from "@/services/logService";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getRecentLogStats,
  });
  
  const { data: logs, isLoading: logsLoading } = useQuery({
    queryKey: ['logs'],
    queryFn: getLogEntries,
  });
  
  const isLoading = statsLoading || logsLoading;
  
  // Get first name from user_metadata or email
  const firstName = user?.user_metadata?.name 
    ? user.user_metadata.name.split(' ')[0] 
    : user?.email?.split('@')[0] || 'there';

  return (
    <div className="container py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {firstName}! Your fresh journey is going well.
          </p>
        </div>
        <Link to="/app/log">
          <Button className="bg-fresh-300 hover:bg-fresh-400 text-white">
            Log Today's Data
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-[120px] bg-gray-100 animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatsCard
            title="Days Afresh"
            value={stats?.daysAfresh.toString() || "0"}
            description={stats?.daysAfresh === 1 ? "One day milestone achieved!" : 
                        stats?.daysAfresh === 7 ? "One week milestone achieved!" :
                        stats?.daysAfresh === 0 ? "Start your journey today!" :
                        `${stats?.daysAfresh} days milestone achieved!`}
            icon={<Calendar className="h-4 w-4" />}
            trend="up"
          />
          <StatsCard
            title="Money Saved"
            value={`$${stats?.moneySaved.toFixed(2)}`}
            description="Based on $10/day spending"
            icon={<DollarSign className="h-4 w-4" />}
            trend="up"
          />
          <StatsCard
            title="Life Regained"
            value={stats?.lifeRegained || "0 hrs"}
            description="Time saved from not smoking"
            icon={<Clock className="h-4 w-4" />}
            trend="up"
          />
          <StatsCard
            title="Recent Cravings"
            value={stats?.recentCravings.toString() || "0"}
            description="From the past week"
            icon={<Flame className="h-4 w-4" />}
            trend={stats?.recentCravings < 10 ? "down" : "up"}
          />
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">Your Holistic Wellness</h2>
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-[120px] bg-gray-100 animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <StatsCard
            title="Average Mood"
            value={`${stats?.avgMood.toFixed(1)} / 5`}
            description="Based on your recent logs"
            icon={<Activity className="h-4 w-4" />}
            trend={stats?.avgMood > 3 ? "up" : "neutral"}
          />
          <StatsCard
            title="Energy Level"
            value={`${stats?.avgEnergy.toFixed(1)} / 5`}
            description="Based on your recent logs"
            icon={<Battery className="h-4 w-4" />}
            trend={stats?.avgEnergy > 3 ? "up" : "neutral"}
          />
          <StatsCard
            title="Focus Level"
            value={`${stats?.avgFocus.toFixed(1)} / 5`}
            description="Based on your recent logs"
            icon={<Brain className="h-4 w-4" />}
            trend={stats?.avgFocus > 3 ? "up" : "neutral"}
          />
        </div>
      )}

      <div className="grid gap-6 mt-8">
        <CravingChart logs={logs || []} />
        <HolisticMetrics logs={logs || []} />
      </div>

      <div className="mt-8 p-6 bg-fresh-50 rounded-lg border border-fresh-100">
        <h2 className="text-xl font-semibold mb-2">Next Milestone</h2>
        <p className="text-muted-foreground mb-4">
          {stats?.daysAfresh === 0 
            ? "Start your journey today! Your first day milestone awaits."
            : stats?.daysAfresh < 3 
              ? "You're just getting started! After 3 days, your body will have cleared most nicotine." 
              : stats?.daysAfresh < 7 
                ? `You're just ${7 - (stats?.daysAfresh || 0)} days away from your one week milestone! At this point, your sense of taste and smell will have improved.`
                : stats?.daysAfresh < 14
                  ? `You're just ${14 - (stats?.daysAfresh || 0)} days away from your two week milestone! Circulation and lung function will continue to improve.`
                  : `You're doing amazing at ${stats?.daysAfresh} days! Continue on your fresh journey.`
          }
        </p>
        <div className="w-full bg-fresh-100 rounded-full h-2.5 mb-4">
          <div className="bg-fresh-300 h-2.5 rounded-full" style={{ 
            width: stats?.daysAfresh === 0 
              ? '0%' 
              : stats?.daysAfresh < 7 
                ? `${(stats?.daysAfresh / 7) * 100}%` 
                : stats?.daysAfresh < 14
                  ? `${((stats?.daysAfresh - 7) / 7) * 100}%`
                  : '100%'
          }}></div>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            {stats?.daysAfresh === 0 
              ? 'Day 0' 
              : stats?.daysAfresh < 7 
                ? `Day ${stats?.daysAfresh}` 
                : stats?.daysAfresh < 14
                  ? 'Day 7'
                  : 'Day 14'
            }
          </span>
          <span>
            {stats?.daysAfresh < 7 
              ? 'Day 7' 
              : stats?.daysAfresh < 14
                ? 'Day 14'
                : 'Day 30'
            }
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
        <Link to="/app/tools/cravings" className="col-span-1">
          <Button variant="outline" className="w-full">
            <Flame className="mr-2 h-4 w-4" />
            Craving Support
          </Button>
        </Link>
        <Link to="/app/tools/energy" className="col-span-1">
          <Button variant="outline" className="w-full">
            <Battery className="mr-2 h-4 w-4" />
            Energy Boosters
          </Button>
        </Link>
        <Link to="/app/tools/mood" className="col-span-1">
          <Button variant="outline" className="w-full">
            <Activity className="mr-2 h-4 w-4" />
            Mood Lifters
          </Button>
        </Link>
        <Link to="/app/tools/focus" className="col-span-1">
          <Button variant="outline" className="w-full">
            <Brain className="mr-2 h-4 w-4" />
            Focus Enhancers
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
