
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/app/StatsCard";
import CravingChart from "@/components/app/dashboard/CravingChart";
import HolisticMetrics from "@/components/app/dashboard/HolisticMetrics";
import { Activity, Battery, Brain, Calendar, DollarSign, Flame, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, John! Your fresh journey is going well.
          </p>
        </div>
        <Link to="/app/log">
          <Button className="bg-fresh-300 hover:bg-fresh-400 text-white">
            Log Today's Data
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Days Afresh"
          value="7"
          description="One week milestone achieved!"
          icon={<Calendar className="h-4 w-4" />}
          trend="up"
        />
        <StatsCard
          title="Money Saved"
          value="$70.00"
          description="Based on $10/day spending"
          icon={<DollarSign className="h-4 w-4" />}
          trend="up"
        />
        <StatsCard
          title="Life Regained"
          value="1 day, 8 hrs"
          description="Time saved from not smoking"
          icon={<Clock className="h-4 w-4" />}
          trend="up"
        />
        <StatsCard
          title="Recent Cravings"
          value="7"
          description="Down 30% from last week"
          icon={<Flame className="h-4 w-4" />}
          trend="down"
        />
      </div>

      <h2 className="text-xl font-semibold mb-4">Your Holistic Wellness</h2>
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <StatsCard
          title="Average Mood"
          value="4.2 / 5"
          description="10% improvement this week"
          icon={<Activity className="h-4 w-4" />}
          trend="up"
        />
        <StatsCard
          title="Energy Level"
          value="3.8 / 5"
          description="15% improvement this week"
          icon={<Battery className="h-4 w-4" />}
          trend="up"
        />
        <StatsCard
          title="Focus Level"
          value="3.5 / 5"
          description="5% improvement this week"
          icon={<Brain className="h-4 w-4" />}
          trend="up"
        />
      </div>

      <div className="grid gap-6 mt-8">
        <CravingChart />
        <HolisticMetrics />
      </div>

      <div className="mt-8 p-6 bg-fresh-50 rounded-lg border border-fresh-100">
        <h2 className="text-xl font-semibold mb-2">Next Milestone</h2>
        <p className="text-muted-foreground mb-4">
          You're just 3 days away from your 10-day milestone! At this point, your blood pressure and heart rate will have normalized.
        </p>
        <div className="w-full bg-fresh-100 rounded-full h-2.5 mb-4">
          <div className="bg-fresh-300 h-2.5 rounded-full" style={{ width: '70%' }}></div>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Day 7</span>
          <span>Day 10</span>
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
