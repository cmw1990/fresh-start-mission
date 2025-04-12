import React from 'react';
import { differenceInDays } from 'date-fns';
import { Award, CheckCircle, Lock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { UserGoal, NicotineLog } from '@/lib/supabase'; // Assuming types are here
import { cn } from '@/lib/utils';

interface AchievementsListProps {
  goal: UserGoal | null | undefined;
  logs: NicotineLog[] | undefined;
  isLoading: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  check: (daysAfresh: number, logs: NicotineLog[]) => boolean;
}

// Define Achievements
const achievementsList: Achievement[] = [
  { id: 'day1', title: "First 24 Hours!", description: "You made it through the first day nicotine-free.", icon: Award, check: (days) => days >= 1 },
  { id: 'day3', title: "72 Hours Strong", description: "Nicotine is likely out of your system.", icon: Award, check: (days) => days >= 3 },
  { id: 'week1', title: "One Week Afresh", description: "Completed your first full week!", icon: Award, check: (days) => days >= 7 },
  { id: 'week2', title: "Two Week Milestone", description: "Consistency is building.", icon: Award, check: (days) => days >= 14 },
  { id: 'month1', title: "One Month Afresh!", description: "A major milestone achieved!", icon: Award, check: (days) => days >= 30 },
  { id: 'month3', title: "Three Months Strong", description: "Cravings are likely much less frequent.", icon: Award, check: (days) => days >= 90 },
  { id: 'month6', title: "Half Year Afresh!", description: "Incredible progress!", icon: Award, check: (days) => days >= 180 },
  { id: 'year1', title: "One Year Afresh!", description: "Congratulations on a full year!", icon: Award, check: (days) => days >= 365 },
  { id: 'log1', title: "First Log Entry", description: "You started tracking your journey.", icon: CheckCircle, check: (_, logs) => logs.length >= 1 },
  { id: 'log7', title: "Consistent Logger", description: "Logged entries for 7 different days.", icon: CheckCircle, check: (_, logs) => new Set(logs.map(l => l.date.split('T')[0])).size >= 7 },
  { id: 'log30', title: "Dedicated Tracker", description: "Logged entries for 30 different days.", icon: CheckCircle, check: (_, logs) => new Set(logs.map(l => l.date.split('T')[0])).size >= 30 },
  // Add more achievements based on cravings overcome, tools used etc. later
];

const AchievementsList: React.FC<AchievementsListProps> = ({ goal, logs, isLoading }) => {

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const calculateDaysAfresh = (): number => {
    if (!goal || goal.goal_type !== 'afresh' || !goal.quit_date) return 0;
    const quitDate = new Date(goal.quit_date);
    const now = new Date();
    // Only count if quit date is in the past
    return now > quitDate ? differenceInDays(now, quitDate) : 0; 
  };

  const daysAfresh = calculateDaysAfresh();
  const validLogs = logs || [];

  return (
    <div className="space-y-4">
      {achievementsList.map((achievement) => {
        const achieved = achievement.check(daysAfresh, validLogs);
        const Icon = achievement.icon;

        return (
          <div 
            key={achievement.id} 
            className={cn(
              "flex items-center space-x-4 p-4 border rounded-lg transition-all",
              achieved ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200 opacity-70"
            )}
          >
            <div className={cn(
              "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full",
              achieved ? 'bg-green-100' : 'bg-gray-200'
            )}>
              <Icon className={cn("h-6 w-6", achieved ? 'text-green-600' : 'text-gray-400')} />
            </div>
            <div className="flex-1">
              <p className={cn("font-medium", achieved ? 'text-green-800' : 'text-gray-600')}>
                {achievement.title}
              </p>
              <p className={cn("text-sm", achieved ? 'text-green-700' : 'text-gray-500')}>
                {achievement.description}
              </p>
            </div>
            {!achieved && <Lock className="h-5 w-5 text-gray-400 flex-shrink-0" />}
          </div>
        );
      })}
    </div>
  );
};

export default AchievementsList;