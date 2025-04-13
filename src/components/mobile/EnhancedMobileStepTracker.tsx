import React, { useState, useEffect } from 'react';
import { useStepTracking } from '@/hooks/useStepTracking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from "@/components/ui/skeleton";
import { useHaptics, HapticImpact } from '@/hooks/useHaptics';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Footprints, AlertTriangle, ArrowRight, Gift, Star } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export interface EnhancedMobileStepTrackerProps {
  className?: string;
}

interface MilestoneInfo {
  threshold: number;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const MILESTONES: MilestoneInfo[] = [
  {
    threshold: 1000,
    name: "First Steps",
    icon: <Footprints className="h-6 w-6 text-blue-500" />,
    description: "You've started moving! Keep it up!"
  },
  {
    threshold: 5000,
    name: "Daily Goal",
    icon: <Star className="h-6 w-6 text-amber-400" />,
    description: "You've reached the recommended daily step count!"
  },
  {
    threshold: 10000,
    name: "Step Master",
    icon: <Trophy className="h-6 w-6 text-yellow-500" />,
    description: "Amazing achievement! You've hit 10,000 steps!"
  }
];

const EnhancedMobileStepTracker: React.FC<EnhancedMobileStepTrackerProps> = ({ className }) => {
  const { stepData, isLoading, hasPermission, fetchSteps, logManualSteps } = useStepTracking();
  const { impact, notification } = useHaptics();
  const [showAnimation, setShowAnimation] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [reachedMilestones, setReachedMilestones] = useState<number[]>([]);
  const mobile = useIsMobile();

  useEffect(() => {
    let highestMilestoneIndex = -1;
    const steps = stepData.steps;
    
    if (steps > 0) {
      for (let i = MILESTONES.length - 1; i >= 0; i--) {
        if (steps >= MILESTONES[i].threshold && !reachedMilestones.includes(i)) {
          highestMilestoneIndex = i;
          break;
        }
      }
    }
    
    if (highestMilestoneIndex >= 0) {
      setActiveIndex(highestMilestoneIndex);
      setShowAnimation(true);
      notification('SUCCESS');
      setReachedMilestones(prev => [...prev, highestMilestoneIndex]);
      
      toast.success(`🎉 ${MILESTONES[highestMilestoneIndex].name} Achievement!`, {
        description: MILESTONES[highestMilestoneIndex].description
      });
    }
  }, [stepData.steps, reachedMilestones, notification]);

  const handleRefresh = async () => {
    try {
      await fetchSteps();
      impact(HapticImpact.LIGHT);
    } catch (e) {
      console.error("Error refreshing steps:", e);
    }
  };

  const getClosestMilestone = () => {
    const steps = stepData.steps;
    
    if (steps <= 0) return MILESTONES[0];
    
    for (let i = 0; i < MILESTONES.length; i++) {
      if (steps < MILESTONES[i].threshold) {
        return MILESTONES[i];
      }
    }
    
    return MILESTONES[MILESTONES.length - 1];
  };

  const closestMilestone = getClosestMilestone();
  const nextMilestoneProgress = Math.min(
    100, 
    stepData.steps > 0 ? (stepData.steps / closestMilestone.threshold) * 100 : 0
  );
  const pointsEarned = Math.floor(stepData.steps / 100);

  return (
    <Card className={cn("relative overflow-hidden", 
      mobile ? "border-2 shadow-md" : "",
      className
    )}>
      <AnimatePresence>
        {showAnimation && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="absolute inset-0 z-10 flex items-center justify-center"
            onAnimationComplete={() => setTimeout(() => setShowAnimation(false), 2000)}
          >
            <motion.div 
              className="bg-gradient-to-br from-yellow-400 via-amber-300 to-orange-400 rounded-full p-12 flex items-center justify-center flex-col"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 8 }}
            >
              {activeIndex >= 0 && (
                <>
                  <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-2"
                  >
                    {MILESTONES[activeIndex].icon}
                  </motion.div>
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                  >
                    <h3 className="font-bold text-white">{MILESTONES[activeIndex].name}</h3>
                    <p className="text-xs text-white/90">Achievement Unlocked!</p>
                  </motion.div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={showAnimation ? "opacity-20" : ""}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Footprints className="h-5 w-5" /> Step Tracker
              </CardTitle>
              <CardDescription>
                Earn points with every step
              </CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleRefresh} 
              disabled={isLoading}
              className="h-8 w-8 p-0 rounded-full"
            >
              <motion.div 
                animate={isLoading ? { rotate: 360 } : {}}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              >
                <ArrowRight className={`h-4 w-4 ${isLoading ? 'opacity-70' : ''}`} />
              </motion.div>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {!hasPermission ? (
            <div className="py-4 text-center">
              <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Unable to connect to health data</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                className="mt-2"
              >
                Try Again
              </Button>
            </div>
          ) : isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="text-3xl font-bold">{stepData.steps.toLocaleString()}</span>
                </motion.div>
                <p className="text-muted-foreground text-sm">steps today</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Progress to {closestMilestone.name}</span>
                  <span className="font-medium">{nextMilestoneProgress.toFixed(0)}%</span>
                </div>
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Progress value={nextMilestoneProgress} className="h-2" />
                </motion.div>
                <p className="text-xs text-muted-foreground">
                  {stepData.steps < closestMilestone.threshold ? (
                    `${closestMilestone.threshold - stepData.steps} more steps to go`
                  ) : (
                    'Milestone reached!'
                  )}
                </p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-2 flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Gift className="h-4 w-4 text-fresh-500" />
            <span className="text-sm font-medium">{pointsEarned} points earned</span>
          </div>
          <Button variant="link" size="sm" className="text-xs p-0 h-auto">
            View Rewards
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default EnhancedMobileStepTracker;
