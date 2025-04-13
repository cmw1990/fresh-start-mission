
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import PageBreadcrumb from '@/components/common/PageBreadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, ClipboardList, Footprints, LayoutDashboard, Settings, Smile, Target, Wind, Wrench, Zap } from 'lucide-react';
import AiInsights from '@/components/app/dashboard/AiInsights';

const Dashboard = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState<string | null>(null);
  const [activeGoal, setActiveGoal] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [daysSinceStart, setDaysSinceStart] = useState(0);

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
            }
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
        <div className="md:col-span-2 space-y-6">
          {/* First row: Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Nicotine-Free Days</CardTitle>
                <CardDescription>Your progress this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">4</div>
                <p className="text-muted-foreground">Out of 7 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Cravings Managed</CardTitle>
                <CardDescription>Techniques used effectively</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">12</div>
                <p className="text-muted-foreground">This week</p>
              </CardContent>
            </Card>
          </div>
          
          {/* New: AI Insights */}
          <AiInsights />
          
          {/* Second row: Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Craving Intensity</CardTitle>
                <CardDescription>Average daily craving levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <p className="text-muted-foreground">Craving data visualization</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Holistic Metrics</CardTitle>
                <CardDescription>Mood, energy, and focus trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <p className="text-muted-foreground">Holistic metrics visualization</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Sidebar content */}
        <div className="space-y-6">
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
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Jump to key tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <button className="w-full text-left px-4 py-2 rounded-md hover:bg-secondary/50">Log Nicotine Use</button>
              <button className="w-full text-left px-4 py-2 rounded-md hover:bg-secondary/50">Practice Breathing</button>
              <button className="w-full text-left px-4 py-2 rounded-md hover:bg-secondary/50">Set a New Goal</button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
