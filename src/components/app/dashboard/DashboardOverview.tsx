
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, DollarSign, Timer, TrendingUp } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import StepTracker from './StepTracker';
import QuoteCard from './QuoteCard';
import AiInsights from './AiInsights';
import HolisticMetricsChart from './HolisticMetricsChart';
import CravingIntensityChart from './CravingIntensityChart';

interface DashboardOverviewProps {
  username: string | null;
  daysSinceStart: number;
  activeGoal: any | null;
  nicotineFreeCount: number;
  moneySaved: number;
  lifeRegained: number;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  username,
  daysSinceStart,
  activeGoal,
  nicotineFreeCount,
  moneySaved,
  lifeRegained
}) => {
  return (
    <div className="space-y-6">
      {/* First row: Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Nicotine-Free Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
              <div className="text-2xl font-bold">{nicotineFreeCount}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Out of 7 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Money Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-muted-foreground" />
              <div className="text-2xl font-bold">${moneySaved.toFixed(2)}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Since you started</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Life Regained</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Timer className="h-5 w-5 mr-2 text-muted-foreground" />
              <div className="text-2xl font-bold">{lifeRegained} hrs</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Added to your lifespan</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-muted-foreground" />
              <div className="text-2xl font-bold">{daysSinceStart} days</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {activeGoal?.goal_type === 'afresh' ? 'Staying Afresh' : 'Staying Fresher'}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* New: AI Insights */}
      <AiInsights />
      
      {/* Second row: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CravingIntensityChart />
        <HolisticMetricsChart />
      </div>
      
      {/* Motivational quote */}
      <QuoteCard />
    </div>
  );
};

export default DashboardOverview;
