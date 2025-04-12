import React from 'react';
import { differenceInHours, differenceInDays, differenceInWeeks, differenceInMonths } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, HeartPulse } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { UserGoal } from '@/lib/supabase'; // Assuming UserGoal type is defined here

interface HealthTimelineProps {
  goal: UserGoal | null | undefined;
  isLoading: boolean;
}

interface Milestone {
  timeframe: string;
  description: string;
  check: (hoursSinceQuit: number) => boolean;
}

const milestones: Milestone[] = [
  { timeframe: "20 minutes", description: "Heart rate and blood pressure start to drop.", check: hours => hours >= (20 / 60) },
  { timeframe: "12 hours", description: "Carbon monoxide level in your blood drops to normal.", check: hours => hours >= 12 },
  { timeframe: "24 hours", description: "Risk of heart attack begins to decrease.", check: hours => hours >= 24 },
  { timeframe: "48 hours", description: "Nerve endings start regenerating; ability to smell and taste is enhanced.", check: hours => hours >= 48 },
  { timeframe: "2 weeks to 3 months", description: "Circulation improves; lung function increases.", check: hours => hours >= (14 * 24) },
  { timeframe: "1 to 9 months", description: "Coughing and shortness of breath decrease.", check: hours => hours >= (30 * 24) }, // Approx 1 month
  { timeframe: "1 year", description: "Risk of coronary heart disease is half that of a smoker's.", check: hours => hours >= (365 * 24) },
  { timeframe: "5 years", description: "Stroke risk is reduced to that of a nonsmoker 5-15 years after quitting.", check: hours => hours >= (5 * 365 * 24) },
  { timeframe: "10 years", description: "Risk of dying from lung cancer is about half that of a person who is still smoking.", check: hours => hours >= (10 * 365 * 24) },
  { timeframe: "15 years", description: "Risk of coronary heart disease is the same as a nonsmoker's.", check: hours => hours >= (15 * 365 * 24) },
];

const HealthTimeline: React.FC<HealthTimelineProps> = ({ goal, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-6 w-6 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!goal || goal.goal_type !== 'afresh' || !goal.quit_date) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <p>Set a 'Stay Afresh' goal with a quit date to view your health timeline.</p>
      </div>
    );
  }

  const quitDate = new Date(goal.quit_date);
  const now = new Date();
  const hoursSinceQuit = differenceInHours(now, quitDate);

  return (
    <div className="space-y-6">
      {milestones.map((milestone, index) => {
        const achieved = milestone.check(hoursSinceQuit);
        return (
          <div key={index} className="flex items-start space-x-4">
            <div className={`mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
              achieved ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              {achieved ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <Clock className="h-5 w-5 text-gray-400" />
              )}
            </div>
            <div>
              <p className={`font-medium ${achieved ? 'text-foreground' : 'text-muted-foreground'}`}>
                {milestone.timeframe}
              </p>
              <p className={`text-sm ${achieved ? 'text-foreground' : 'text-muted-foreground'}`}>
                {milestone.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HealthTimeline;