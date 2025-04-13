
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

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
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<BreathingPhase>('inhale');
  const [timeLeft, setTimeLeft] = useState(duration);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const pattern = BREATHING_PATTERNS[exerciseType];
  
  // Calculate total cycle time
  const cycleTime = pattern.inhale + pattern.hold + pattern.exhale + pattern.rest;
  
  // Reset the exercise
  const resetExercise = useCallback(() => {
    setIsActive(false);
    setCurrentPhase('inhale');
    setTimeLeft(duration);
    setPhaseProgress(0);
  }, [duration]);
  
  // Toggle play/pause
  const toggleActive = useCallback(() => {
    if (!isActive && timeLeft === 0) {
      resetExercise();
    }
    setIsActive(prev => !prev);
  }, [isActive, timeLeft, resetExercise]);
  
  // Get current phase time
  const getCurrentPhaseTime = useCallback((phase: BreathingPhase): number => {
    switch (phase) {
      case 'inhale': return pattern.inhale;
      case 'hold': return pattern.hold;
      case 'exhale': return pattern.exhale;
      case 'rest': return pattern.rest;
      default: return 4; // Default fallback
    }
  }, [pattern]);
  
  // Get color for current phase
  const getPhaseColor = useCallback((): string => {
    switch (currentPhase) {
      case 'inhale': return 'bg-blue-500';
      case 'hold': return 'bg-amber-500';
      case 'exhale': return 'bg-green-500';
      case 'rest': return 'bg-slate-400';
      default: return 'bg-blue-500';
    }
  }, [currentPhase]);
  
  // Get instruction text for current phase
  const getPhaseInstruction = useCallback((): string => {
    switch (currentPhase) {
      case 'inhale': return 'Breathe In...';
      case 'hold': return 'Hold...';
      case 'exhale': return 'Breathe Out...';
      case 'rest': return 'Rest...';
      default: return '';
    }
  }, [currentPhase]);
  
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
              break;
            case 'hold':
              setCurrentPhase('exhale');
              break;
            case 'exhale':
              setCurrentPhase(pattern.rest > 0 ? 'rest' : 'inhale');
              break;
            case 'rest':
              setCurrentPhase('inhale');
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
  }, [isActive, timeLeft, currentPhase, phaseProgress, pattern, getCurrentPhaseTime, onComplete]);
  
  // Calculate progress for visualization
  const calculateCirclePercentage = useCallback((): number => {
    const phaseTime = getCurrentPhaseTime(currentPhase);
    return ((phaseTime - phaseProgress) / phaseTime) * 100;
  }, [currentPhase, phaseProgress, getCurrentPhaseTime]);

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
        <Progress value={calculateCirclePercentage()} className="w-full mb-4" />
        
        {/* Time remaining */}
        <div className="text-sm text-muted-foreground mb-4">
          Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
        
        {/* Controls */}
        <div className="flex justify-center items-center space-x-4">
          <Button variant="outline" size="icon" onClick={resetExercise}>
            <RotateCcw className="h-5 w-5" />
            <span className="sr-only">Reset</span>
          </Button>
          
          <Button 
            variant="default" 
            size="lg" 
            onClick={toggleActive} 
            className="w-16 h-16 rounded-full"
          >
            {isActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            <span className="sr-only">{isActive ? 'Pause' : 'Play'}</span>
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <p className="text-xs text-center text-muted-foreground">
          Find a comfortable position and focus on your breath. 
          This exercise will guide you through timed breathing patterns.
        </p>
      </CardFooter>
    </Card>
  );
};

export default BreathingExercise;
