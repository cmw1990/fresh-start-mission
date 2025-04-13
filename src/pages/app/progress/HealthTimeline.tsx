
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format, differenceInDays, differenceInHours, addDays, isAfter, isBefore } from 'date-fns';
import { getUserGoal } from '@/services/goalService';
import { UserGoal } from '@/lib/supabase';
import { CircleCheckBig, CircleCheck, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";

interface TimelineMilestone {
  id: string;
  title: string;
  description: string;
  days: number;
  hours?: number;
  icon?: React.ReactNode;
  category: 'physical' | 'mental' | 'long-term';
}

const HealthTimeline = () => {
  const [goal, setGoal] = useState<UserGoal | null>(null);
  const [loading, setLoading] = useState(true);
  const [quitDate, setQuitDate] = useState<Date | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'physical' | 'mental' | 'long-term'>('all');
  
  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const userGoal = await getUserGoal();
        setGoal(userGoal);
        
        if (userGoal?.quit_date) {
          setQuitDate(new Date(userGoal.quit_date));
        }
      } catch (error) {
        console.error("Error fetching goal:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGoal();
  }, []);
  
  const milestones: TimelineMilestone[] = [
    {
      id: '20min',
      title: '20 Minutes',
      description: 'Your heart rate begins to drop towards a normal level.',
      days: 0,
      hours: 0.33, // 20 minutes in hours
      icon: <Clock className="h-10 w-10 text-red-500" />,
      category: 'physical'
    },
    {
      id: '2hrs',
      title: '2 Hours',
      description: 'Your heart rate and blood pressure normalize. Peripheral circulation improves.',
      days: 0,
      hours: 2,
      category: 'physical'
    },
    {
      id: '12hrs',
      title: '12 Hours',
      description: 'Carbon monoxide level in blood drops to normal. Oxygen levels increase to normal.',
      days: 0,
      hours: 12,
      category: 'physical'
    },
    {
      id: '24hrs',
      title: '24 Hours',
      description: 'Anxiety and irritability peak as physical withdrawal kicks in. Risk of heart attack begins to decrease.',
      days: 1,
      category: 'physical'
    },
    {
      id: '48hrs',
      title: '48 Hours',
      description: 'Nerve endings start to regrow. Your sense of smell and taste begin to improve.',
      days: 2,
      category: 'physical'
    },
    {
      id: '72hrs',
      title: '72 Hours',
      description: 'Bronchial tubes relax, making breathing easier. Energy levels increase.',
      days: 3,
      category: 'physical'
    },
    {
      id: '1week',
      title: '1 Week',
      description: 'Your odds of quitting successfully increase significantly if you make it one week.',
      days: 7,
      category: 'mental'
    },
    {
      id: '2weeks',
      title: '2 Weeks',
      description: 'Circulation continues to improve. Walking becomes easier. Lung function increases.',
      days: 14,
      category: 'physical'
    },
    {
      id: '1month',
      title: '1 Month',
      description: 'Clear and deeper breathing. Energy levels continue to increase. Cilia begin functioning properly.',
      days: 30,
      category: 'physical'
    },
    {
      id: '3months',
      title: '3 Months',
      description: 'Circulation has substantially improved. Lung function has increased by up to 30%.',
      days: 90,
      category: 'physical'
    },
    {
      id: '6months',
      title: '6 Months',
      description: 'Withdrawal symptoms largely subside. Lung capacity improves. Coughing, sinus congestion, and shortness of breath improve.',
      days: 180,
      category: 'physical'
    },
    {
      id: '9months',
      title: '9 Months',
      description: 'Lung cilia have recovered. Energy levels are much higher. Breathing problems decrease significantly.',
      days: 270,
      category: 'physical'
    },
    {
      id: '1year',
      title: '1 Year',
      description: 'Risk of heart disease has decreased to half that of a smoker.',
      days: 365,
      category: 'long-term'
    },
    {
      id: '5years',
      title: '5 Years',
      description: 'Risk of stroke is reduced to that of someone who has never smoked.',
      days: 365 * 5,
      category: 'long-term'
    },
    {
      id: '10years',
      title: '10 Years',
      description: 'Risk of lung cancer falls to about half that of a smoker. Risk of other cancers decreases significantly.',
      days: 365 * 10,
      category: 'long-term'
    },
    {
      id: '15years',
      title: '15 Years',
      description: 'Risk of heart disease is now similar to that of someone who has never smoked.',
      days: 365 * 15,
      category: 'long-term'
    }
  ];
  
  const getMilestoneDate = (milestone: TimelineMilestone): Date | null => {
    if (!quitDate) return null;
    
    if (milestone.hours !== undefined) {
      // For hour-based milestones
      return new Date(quitDate.getTime() + milestone.hours * 60 * 60 * 1000);
    } else {
      // For day-based milestones
      return addDays(quitDate, milestone.days);
    }
  };
  
  const getMilestoneStatus = (milestone: TimelineMilestone): 'completed' | 'upcoming' | 'current' => {
    if (!quitDate) return 'upcoming';
    
    const today = new Date();
    const milestoneDate = getMilestoneDate(milestone);
    
    if (!milestoneDate) return 'upcoming';
    
    if (isBefore(milestoneDate, today)) {
      return 'completed';
    } else if (differenceInDays(milestoneDate, today) < 1) {
      return 'current';
    } else {
      return 'upcoming';
    }
  };
  
  const getTimeUntil = (milestone: TimelineMilestone): string => {
    if (!quitDate) return '';
    
    const today = new Date();
    const milestoneDate = getMilestoneDate(milestone);
    
    if (!milestoneDate) return '';
    
    if (isBefore(milestoneDate, today)) {
      return 'Completed!';
    }
    
    const daysUntil = differenceInDays(milestoneDate, today);
    
    if (daysUntil === 0) {
      const hoursUntil = differenceInHours(milestoneDate, today);
      return `${hoursUntil} hours to go`;
    } else if (daysUntil === 1) {
      return '1 day to go';
    } else {
      return `${daysUntil} days to go`;
    }
  };
  
  const getFilteredMilestones = () => {
    if (activeCategory === 'all') {
      return milestones;
    } else {
      return milestones.filter(m => m.category === activeCategory);
    }
  };
  
  if (loading) {
    return (
      <div className="container py-8 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }
  
  if (!goal || !quitDate) {
    return (
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>No Quit Date Set</CardTitle>
            <CardDescription>
              Set a quit date in your goals to see your personalized health timeline.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.href = '/app/goals'}>
              Set Quit Date
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Health Improvement Timeline</h1>
        <p className="text-muted-foreground mt-1">
          Your personalized timeline based on your quit date: {format(quitDate, 'MMMM d, yyyy')}
        </p>
      </div>
      
      {/* Category filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Button 
          variant={activeCategory === 'all' ? 'default' : 'outline'} 
          onClick={() => setActiveCategory('all')}
          size="sm"
        >
          All
        </Button>
        <Button 
          variant={activeCategory === 'physical' ? 'default' : 'outline'} 
          onClick={() => setActiveCategory('physical')}
          size="sm"
        >
          Physical
        </Button>
        <Button 
          variant={activeCategory === 'mental' ? 'default' : 'outline'}
          onClick={() => setActiveCategory('mental')}
          size="sm"
        >
          Mental
        </Button>
        <Button 
          variant={activeCategory === 'long-term' ? 'default' : 'outline'}
          onClick={() => setActiveCategory('long-term')}
          size="sm"
        >
          Long-term
        </Button>
      </div>
      
      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted"></div>
        
        {/* Timeline items */}
        <div className="space-y-8 ml-10">
          {getFilteredMilestones().map((milestone) => {
            const status = getMilestoneStatus(milestone);
            const milestoneDate = getMilestoneDate(milestone);
            
            return (
              <div key={milestone.id} className="relative">
                {/* Timeline marker */}
                <div className="absolute -left-10 flex items-center justify-center">
                  <div 
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center",
                      status === 'completed' ? "bg-green-100" : 
                      status === 'current' ? "bg-blue-100" : 
                      "bg-gray-100"
                    )}
                  >
                    {status === 'completed' ? (
                      <CircleCheck className="h-6 w-6 text-green-500" />
                    ) : (
                      <Clock className={cn(
                        "h-6 w-6",
                        status === 'current' ? "text-blue-500" : "text-gray-400"
                      )} />
                    )}
                  </div>
                </div>
                
                {/* Timeline content */}
                <Card className={cn(
                  "transition-all",
                  status === 'completed' ? "border-green-200 bg-green-50/50" : 
                  status === 'current' ? "border-blue-200 bg-blue-50/50" : 
                  ""
                )}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{milestone.title}</CardTitle>
                        {milestoneDate && (
                          <CardDescription>
                            {format(milestoneDate, 'MMMM d, yyyy')}
                          </CardDescription>
                        )}
                      </div>
                      <div>
                        <span className={cn(
                          "text-sm font-medium px-2 py-1 rounded",
                          status === 'completed' ? "bg-green-100 text-green-700" : 
                          status === 'current' ? "bg-blue-100 text-blue-700" : 
                          "bg-gray-100 text-gray-700"
                        )}>
                          {status === 'completed' ? 'Achieved' : 
                           status === 'current' ? 'In Progress' : 
                           getTimeUntil(milestone)}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{milestone.description}</p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HealthTimeline;
