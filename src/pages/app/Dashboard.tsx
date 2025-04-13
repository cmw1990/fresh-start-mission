
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import PageBreadcrumb from '@/components/common/PageBreadcrumb';
import DashboardOverview from '@/components/app/dashboard/DashboardOverview';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Footprints } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import EnhancedMobileStepTracker from '@/components/mobile/EnhancedMobileStepTracker';
import { useIsMobile } from '@/hooks/use-mobile';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [username, setUsername] = useState<string | null>(null);
  const [activeGoal, setActiveGoal] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [daysSinceStart, setDaysSinceStart] = useState(0);
  const [nicotineFreeCount, setNicotineFreeCount] = useState(0);
  const [moneySaved, setMoneySaved] = useState(0);
  const [lifeRegained, setLifeRegained] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        if (user) {
          // Fetch user profile
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('first_name')
            .eq('id', user.id)
            .single();

          if (profileError) {
            console.error("Error fetching profile:", profileError);
          } else {
            setUsername(profile?.first_name || null);
          }

          // Fetch active goal
          const { data: goals, error: goalsError } = await supabase
            .from('user_goals')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(1);

          if (goalsError) {
            console.error("Error fetching goals:", goalsError);
          } else if (goals && goals.length > 0) {
            setActiveGoal(goals[0]);

            // Calculate days since start
            if (goals[0].created_at) {
              const startDate = new Date(goals[0].created_at);
              const today = new Date();
              const diffInDays = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
              setDaysSinceStart(diffInDays);
              
              // Calculate estimated money saved (based on average cost)
              // Assuming $10/day for cigarettes as an example
              const dailyCost = 10;
              const totalSaved = diffInDays * dailyCost;
              setMoneySaved(totalSaved);
              
              // Calculate life regained (very rough estimate)
              // Assuming each day not smoking adds ~5 hours to lifespan
              const hoursRegained = diffInDays * 5;
              setLifeRegained(hoursRegained);
            }
          }
          
          // Fetch nicotine logs for the past week to count nicotine-free days
          const today = new Date();
          const weekAgo = new Date(today);
          weekAgo.setDate(today.getDate() - 7);
          
          const { data: logs, error: logsError } = await supabase
            .from('nicotine_logs')
            .select('date, used_nicotine')
            .eq('user_id', user.id)
            .gte('date', weekAgo.toISOString().split('T')[0])
            .lte('date', today.toISOString().split('T')[0])
            .order('date', { ascending: false });
            
          if (logsError) {
            console.error("Error fetching logs:", logsError);
          } else if (logs) {
            // Count days without nicotine use
            const freeDays = logs.filter(log => !log.used_nicotine).length;
            setNicotineFreeCount(freeDays);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user]);
  
  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'log':
        navigate('/app/log');
        break;
      case 'breathing':
        navigate('/app/tools/cravings');
        break;
      case 'goal':
        navigate('/app/goals');
        break;
      default:
        break;
    }
  };
  
  return (
    <div className="p-6">
      <PageBreadcrumb />
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Welcome back, {username || 'User'}</h1>
        <p className="text-muted-foreground mt-1">
          {isLoading ? (
            <span>Loading your progress...</span>
          ) : activeGoal ? (
            <span>
              {activeGoal.goal_type === 'afresh' 
                ? `You've been Afresh for ${daysSinceStart} days. Keep going!` 
                : `You're on track with your ${activeGoal.reduction_percent}% reduction goal.`
              }
            </span>
          ) : (
            <span>Set your goals to track your progress</span>
          )}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <DashboardOverview
            username={username}
            daysSinceStart={daysSinceStart}
            activeGoal={activeGoal}
            nicotineFreeCount={nicotineFreeCount}
            moneySaved={moneySaved}
            lifeRegained={lifeRegained}
          />
        </div>
        
        {/* Sidebar content */}
        <div className="space-y-6">
          {isMobile ? (
            <EnhancedMobileStepTracker />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Step Tracker</CardTitle>
                <CardDescription>Daily progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">6,428</div>
                <p className="text-muted-foreground">Steps today</p>
                <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '64%' }} />
                </div>
                <p className="text-sm mt-2">Goal: 10,000 steps</p>
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Jump to key tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <button 
                className="w-full text-left px-4 py-2 rounded-md hover:bg-secondary/50"
                onClick={() => handleQuickAction('log')}
              >
                Log Nicotine Use
              </button>
              <button 
                className="w-full text-left px-4 py-2 rounded-md hover:bg-secondary/50"
                onClick={() => handleQuickAction('breathing')}
              >
                Practice Breathing
              </button>
              <button 
                className="w-full text-left px-4 py-2 rounded-md hover:bg-secondary/50"
                onClick={() => handleQuickAction('goal')}
              >
                Set a New Goal
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
