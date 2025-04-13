import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Calendar, Heart, Brain, Zap, Plus, ArrowRight, Footprints } from 'lucide-react';
import EnhancedMobileStepTracker from '@/components/mobile/EnhancedMobileStepTracker';
import { useHaptics, HapticImpact } from "@/hooks/useHaptics";
import OfflineIndicator from '@/components/common/OfflineIndicator';
import { useQuery } from '@tanstack/react-query';
import { getDashboardStats, DashboardStats } from '@/services/dashboardService';
import { toast } from 'sonner';

const MobileDashboard = () => {
  const { impact } = useHaptics();
  
  // Updated useQuery with proper error handling approach for v5+
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['mobile-dashboard-stats'],
    queryFn: getDashboardStats,
    meta: {
      onError: (error: Error) => {
        toast.error("Couldn't load dashboard data", {
          description: "Please check your connection and try again."
        });
      }
    }
  });
  
  // Default data while loading or if fetch fails
  const userData = dashboardData || {
    name: 'Fresh User',
    daysAfresh: 0,
    moneySaved: 0,
    lastCraving: {
      time: 'None recorded',
      intensity: 0
    },
    metrics: {
      mood: 3,
      energy: 3,
      focus: 3
    }
  };
  
  const handleButtonPress = () => {
    impact(HapticImpact.LIGHT);
  };
  
  // Provide haptic feedback when the dashboard loads
  useEffect(() => {
    if (!isLoading && dashboardData) {
      impact(HapticImpact.LIGHT);
    }
  }, [isLoading, dashboardData, impact]);
  
  return (
    <div className="space-y-6 pb-20">
      <OfflineIndicator />
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {isLoading ? 'Welcome!' : `Hi, ${userData.name || 'Fresh User'}!`}
        </h1>
        <Button 
          onClick={() => {
            impact(HapticImpact.MEDIUM);
          }}
          variant="ghost" 
          size="icon"
          asChild
        >
          <Link to="/app/log">
            <Plus className="h-5 w-5" />
          </Link>
        </Button>
      </div>
      
      {/* Status Card */}
      <Card className="bg-gradient-to-br from-fresh-50 to-fresh-100 border-fresh-200">
        <CardHeader className="pb-2">
          <CardTitle>Your Fresh Journey</CardTitle>
          <CardDescription>
            {isLoading ? 'Loading your progress...' : 
              userData.daysAfresh > 0 
                ? `Day ${userData.daysAfresh} of Staying Afresh` 
                : 'Begin your Fresh journey today!'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium">Money saved</p>
              <p className="text-2xl font-bold">${isLoading ? '0.00' : userData.moneySaved.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Last craving</p>
              <p className="text-lg">{isLoading ? 'Loading...' : userData.lastCraving.time}</p>
              {userData.lastCraving.intensity > 0 && (
                <p className="text-sm text-muted-foreground">Intensity: {userData.lastCraving.intensity}/10</p>
              )}
            </div>
          </div>
          
          <div className="mt-4 flex justify-center">
            <Button 
              asChild 
              className="bg-fresh-500 hover:bg-fresh-600"
              onClick={handleButtonPress}
            >
              <Link to="/app/log">Log Today</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Step Tracker */}
      <EnhancedMobileStepTracker />
      
      {/* Holistic Support */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Holistic Support</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-fresh-600 p-0 h-auto"
            asChild
            onClick={handleButtonPress}
          >
            <Link to="/app/tools">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <HolisticToolCard 
            title="Energy"
            icon={<Zap className="h-5 w-5 text-amber-500" />}
            linkTo="/app/tools/energy"
          />
          
          <HolisticToolCard 
            title="Mood"
            icon={<Heart className="h-5 w-5 text-rose-500" />}
            linkTo="/app/tools/mood"
          />
          
          <HolisticToolCard 
            title="Focus"
            icon={<Brain className="h-5 w-5 text-indigo-500" />}
            linkTo="/app/tools/focus"
          />
          
          <HolisticToolCard 
            title="Cravings"
            icon={<Calendar className="h-5 w-5 text-emerald-500" />}
            linkTo="/app/tools/cravings"
          />
        </div>
      </div>
      
      {/* Daily Check-in */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Today's Wellness</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-2">
            <p className="text-sm">Mood</p>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i} 
                  className={`w-4 h-4 rounded-full mx-0.5 ${i <= userData.metrics.mood ? 'bg-fresh-400' : 'bg-gray-200'}`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-between mb-2">
            <p className="text-sm">Energy</p>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i} 
                  className={`w-4 h-4 rounded-full mx-0.5 ${i <= userData.metrics.energy ? 'bg-amber-400' : 'bg-gray-200'}`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <p className="text-sm">Focus</p>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i} 
                  className={`w-4 h-4 rounded-full mx-0.5 ${i <= userData.metrics.focus ? 'bg-indigo-400' : 'bg-gray-200'}`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper component for holistic tool cards
const HolisticToolCard = ({ title, icon, linkTo }: { title: string; icon: React.ReactNode; linkTo: string }) => {
  const { impact } = useHaptics();
  
  return (
    <Link to={linkTo} onClick={() => impact(HapticImpact.LIGHT)}>
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardContent className="flex flex-col items-center justify-center p-4 text-center">
          <div className="mb-2 mt-2">{icon}</div>
          <p className="font-medium">{title}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MobileDashboard;
