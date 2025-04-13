
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { useHaptics, HapticImpact } from '@/hooks/useHaptics';

interface BreathingExerciseProps {
  exerciseType?: 'box' | 'relaxing' | 'energizing';
  duration?: number; // in seconds
  onComplete?: () => void;
}

type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'rest';

interface BreathingPattern {
  inhale: number;
  hold: number;
  exhale: number;
  rest: number;
}

const BREATHING_PATTERNS: Record<string, BreathingPattern> = {
  box: { inhale: 4, hold: 4, exhale: 4, rest: 4 },
  relaxing: { inhale: 4, hold: 7, exhale: 8, rest: 0 },
  energizing: { inhale: 6, hold: 0, exhale: 2, rest: 0 }
};

const BreathingExercise: React.FC<BreathingExerciseProps> = ({
  exerciseType = 'box',
  duration = 120, // 2 minutes by default
  onComplete
}) => {
  const { impact } = useHaptics();
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<BreathingPhase>('inhale');
  const [timeLeft, setTimeLeft] = useState(duration);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const pattern = BREATHING_PATTERNS[exerciseType];
  
  // Calculate total cycle time
  const cycleTime = pattern.inhale + pattern.hold + pattern.exhale + pattern.rest;
  
  // Reset the exercise
  const resetExercise = () => {
    setIsActive(false);
    setCurrentPhase('inhale');
    setTimeLeft(duration);
    setPhaseProgress(0);
  };
  
  // Toggle play/pause
  const toggleActive = () => {
    if (!isActive && timeLeft === 0) {
      resetExercise();
    }
    setIsActive(!isActive);
    impact(HapticImpact.LIGHT);
  };
  
  // Get current phase time
  const getCurrentPhaseTime = (phase: BreathingPhase): number => {
    switch (phase) {
      case 'inhale': return pattern.inhale;
      case 'hold': return pattern.hold;
      case 'exhale': return pattern.exhale;
      case 'rest': return pattern.rest;
    }
  };
  
  // Get color for current phase
  const getPhaseColor = (): string => {
    switch (currentPhase) {
      case 'inhale': return 'bg-blue-500';
      case 'hold': return 'bg-amber-500';
      case 'exhale': return 'bg-green-500';
      case 'rest': return 'bg-slate-400';
    }
  };
  
  // Get instruction text for current phase
  const getPhaseInstruction = (): string => {
    switch (currentPhase) {
      case 'inhale': return 'Breathe In...';
      case 'hold': return 'Hold...';
      case 'exhale': return 'Breathe Out...';
      case 'rest': return 'Rest...';
    }
  };
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        // Update overall time remaining
        setTimeLeft(prev => prev - 1);
        
        // Calculate phase progress
        const phaseTime = getCurrentPhaseTime(currentPhase);
        const newPhaseProgress = (phaseProgress + 1) % phaseTime;
        setPhaseProgress(newPhaseProgress);
        
        // Move to next phase if current is complete
        if (newPhaseProgress === 0) {
          // Determine next phase in cycle
          switch (currentPhase) {
            case 'inhale':
              setCurrentPhase(pattern.hold > 0 ? 'hold' : 'exhale');
              impact(HapticImpact.MEDIUM);
              break;
            case 'hold':
              setCurrentPhase('exhale');
              impact(HapticImpact.MEDIUM);
              break;
            case 'exhale':
              setCurrentPhase(pattern.rest > 0 ? 'rest' : 'inhale');
              impact(HapticImpact.MEDIUM);
              break;
            case 'rest':
              setCurrentPhase('inhale');
              impact(HapticImpact.MEDIUM);
              break;
          }
        }
      }, 1000);
    } else if (timeLeft === 0) {
      // Exercise complete
      onComplete?.();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, currentPhase, phaseProgress, pattern, impact, onComplete]);
  
  // Calculate progress for visualization
  const calculateCirclePercentage = (): number => {
    const phaseTime = getCurrentPhaseTime(currentPhase);
    return ((phaseTime - phaseProgress) / phaseTime) * 100;
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {exerciseType === 'box' ? '4-4-4-4 Box Breathing'
            : exerciseType === 'relaxing' ? '4-7-8 Relaxing Breath'
            : '6-2 Energizing Breath'}
        </CardTitle>
        <CardDescription className="text-center">
          {exerciseType === 'box' ? 'Reduce stress and manage cravings'
            : exerciseType === 'relaxing' ? 'Calm your body and mind'
            : 'Boost your energy and focus'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {/* Breathing circle visualization */}
        <div className="relative w-48 h-48 mb-8">
          <div 
            className={`absolute inset-0 rounded-full ${getPhaseColor()} bg-opacity-20
              transition-transform duration-1000 ease-in-out`}
            style={{
              transform: currentPhase === 'inhale' 
                ? `scale(${1 + (phaseProgress / getCurrentPhaseTime(currentPhase)) * 0.5})` 
                : currentPhase === 'exhale'
                ? `scale(${1.5 - (phaseProgress / getCurrentPhaseTime(currentPhase)) * 0.5})`
                : 'scale(1.5)'
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl font-bold">{getPhaseInstruction()}</div>
          </div>
        </div>
        
        {/* Progress bar */}
        <Progress value={calculateCirclePercentage()} className="w-full h-2 mb-4" />
        
        {/* Timer */}
        <div className="text-center mb-4">
          <div className="text-4xl font-bold">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {isActive ? 'Exercise in progress' : timeLeft === 0 ? 'Exercise complete' : 'Ready to begin'}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center space-x-4">
        <Button 
          onClick={toggleActive} 
          variant="default"
          size="lg"
          className="w-32"
        >
          {isActive ? <><Pause className="mr-2 h-4 w-4" /> Pause</> : <><Play className="mr-2 h-4 w-4" /> Start</>}
        </Button>
        <Button 
          onClick={resetExercise} 
          variant="outline"
          size="lg"
        >
          <RotateCcw className="mr-2 h-4 w-4" /> Reset
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BreathingExercise;
