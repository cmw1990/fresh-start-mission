
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getUserGoal } from '@/services/goalService';
import { differenceInDays, format, addDays } from 'date-fns';

interface Milestone {
  id: string;
  title: string;
  description: string;
  daysAfterQuit: number;
  achieved: boolean;
}

const milestoneData: Omit<Milestone, 'achieved'>[] = [
  {
    id: '20min',
    title: '20 Minutes',
    description: 'Your heart rate and blood pressure drop.',
    daysAfterQuit: 0,
  },
  {
    id: '12hrs',
    title: '12 Hours',
    description: 'Carbon monoxide levels in your blood drop to normal.',
    daysAfterQuit: 0.5,
  },
  {
    id: '24hrs',
    title: '24 Hours',
    description: 'Your risk of heart attack begins to decrease.',
    daysAfterQuit: 1,
  },
  {
    id: '48hrs',
    title: '48 Hours',
    description: 'Your nerve endings start to regrow, and your sense of smell and taste improve.',
    daysAfterQuit: 2,
  },
  {
    id: '72hrs',
    title: '72 Hours',
    description: 'Nicotine is completely out of your body. Breathing becomes easier.',
    daysAfterQuit: 3,
  },
  {
    id: '1wk',
    title: '1 Week',
    description: 'Your risk of heart attack has dropped. Your sense of taste and smell have improved.',
    daysAfterQuit: 7,
  },
  {
    id: '2wks',
    title: '2 Weeks',
    description: 'Circulation improves and lung function increases up to 30%.',
    daysAfterQuit: 14,
  },
  {
    id: '1month',
    title: '1 Month',
    description: 'Cilia regrow in your lungs, increasing ability to handle mucus and reduce infection.',
    daysAfterQuit: 30,
  },
  {
    id: '3months',
    title: '3 Months',
    description: 'Your circulation and lung function continue to improve.',
    daysAfterQuit: 90,
  },
  {
    id: '6months',
    title: '6 Months',
    description: 'You may notice less coughing and shortness of breath. You have more energy.',
    daysAfterQuit: 180,
  },
  {
    id: '1year',
    title: '1 Year',
    description: 'Your risk of heart disease has dropped to half that of a smoker.',
    daysAfterQuit: 365,
  },
  {
    id: '5years',
    title: '5 Years',
    description: 'Your risk of stroke has reduced to that of a non-smoker.',
    daysAfterQuit: 1825,
  },
  {
    id: '10years',
    title: '10 Years',
    description: 'Your risk of dying from lung cancer is about half that of a smoker.',
    daysAfterQuit: 3650,
  },
  {
    id: '15years',
    title: '15 Years',
    description: 'Your risk of heart disease is the same as someone who never smoked.',
    daysAfterQuit: 5475,
  },
];

const HealthTimeline: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [quitDate, setQuitDate] = useState<Date | null>(null);
  const [daysSinceQuit, setDaysSinceQuit] = useState(0);
  const [goalType, setGoalType] = useState<'afresh' | 'fresher' | null>(null);
  
  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        const goal = await getUserGoal();
        
        if (goal) {
          setGoalType(goal.goal_type as 'afresh' | 'fresher');
          
          if (goal.quit_date) {
            const parsedQuitDate = new Date(goal.quit_date);
            setQuitDate(parsedQuitDate);
            
            const today = new Date();
            const days = differenceInDays(today, parsedQuitDate);
            setDaysSinceQuit(Math.max(0, days));
            
            // Update milestones based on quit date
            const updatedMilestones = milestoneData.map(milestone => ({
              ...milestone,
              achieved: days >= milestone.daysAfterQuit
            }));
            
            setMilestones(updatedMilestones);
          }
        }
      } catch (error) {
        console.error("Error fetching goal data:", error);
      }
    };
    
    fetchGoalData();
  }, []);

  if (!quitDate && goalType !== 'afresh') {
    return (
      <div className="container py-8">
        <Card className="border-2 border-fresh-100">
          <CardHeader>
            <CardTitle>Health Timeline</CardTitle>
            <CardDescription>
              To view your personal health recovery timeline, you need to set a quit date 
              in your goals with the "Staying Afresh" goal type.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="bg-fresh-300 hover:bg-fresh-400"
              onClick={() => window.location.href = '/app/goals'}
            >
              Set Your Quit Date
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Health Recovery Timeline</h1>
        {quitDate && (
          <p className="text-muted-foreground">
            {daysSinceQuit === 0 ? (
              <span>Starting your journey today! Here's what to expect.</span>
            ) : (
              <span>
                {daysSinceQuit} {daysSinceQuit === 1 ? 'day' : 'days'} since your quit date ({format(quitDate, 'MMMM d, yyyy')})
              </span>
            )}
          </p>
        )}
      </div>
      
      <div className="space-y-6">
        {milestones.map((milestone) => {
          const milestoneDate = quitDate ? addDays(quitDate, milestone.daysAfterQuit) : null;
          
          return (
            <Card 
              key={milestone.id} 
              className={`border-l-4 ${milestone.achieved ? 'border-l-green-500' : 'border-l-gray-300'}`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">
                    {milestone.title}
                    {milestone.achieved && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        Achieved
                      </span>
                    )}
                  </CardTitle>
                  {milestoneDate && (
                    <span className="text-sm text-muted-foreground">
                      {format(milestoneDate, 'MMM d, yyyy')}
                    </span>
                  )}
                </div>
                <CardDescription>{milestone.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
        
        <div className="mt-8 bg-muted p-4 rounded-md">
          <h3 className="font-medium text-lg mb-2">Note about this timeline:</h3>
          <p className="text-sm text-muted-foreground">
            This timeline represents general health improvements that most people experience after quitting nicotine. 
            Individual experiences may vary based on factors like how long and how much you used nicotine, 
            your overall health, and lifestyle factors. This information is based on research primarily from 
            cigarette smoking cessation but applies generally to other forms of nicotine use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthTimeline;
