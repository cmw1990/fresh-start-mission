
import React, { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { useHaptics, HapticImpact } from '@/hooks/useHaptics';

interface BreathingExerciseProps {
  onComplete: () => void;
  type: 'box' | '478' | 'deep';
  duration?: number; // in seconds, default to 3 minutes
}

type BreathingPhase = 'inhale' | 'hold1' | 'exhale' | 'hold2';

interface BreathingPattern {
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
}

export const BreathingExercise: React.FC<BreathingExerciseProps> = ({ 
  onComplete,
  type = 'deep',
  duration = 180 // 3 minutes default
}) => {
  const { impact } = useHaptics();
  const [secondsRemaining, setSecondsRemaining] = useState(duration);
  const [currentPhase, setCurrentPhase] = useState<BreathingPhase>('inhale');
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [breathCount, setBreathCount] = useState(0);
  
  // Define breathing patterns based on type
  const patterns: Record<string, BreathingPattern> = {
    box: { inhale: 4, hold1: 4, exhale: 4, hold2: 4 },
    '478': { inhale: 4, hold1: 7, exhale: 8, hold2: 0 },
    deep: { inhale: 5, hold1: 2, exhale: 6, hold2: 0 }
  };
  
  const currentPattern = patterns[type];
  
  // Phase labels
  const phaseLabels: Record<BreathingPhase, string> = {
    inhale: 'Breathe In',
    hold1: 'Hold',
    exhale: 'Breathe Out',
    hold2: 'Hold'
  };
  
  // Get total cycle time
  const getCycleTime = (): number => {
    const { inhale, hold1, exhale, hold2 } = currentPattern;
    return inhale + hold1 + exhale + hold2;
  };
  
  // Get current phase time
  const getCurrentPhaseTime = (): number => {
    return currentPattern[currentPhase];
  };
  
  // Effect for countdown timer
  useEffect(() => {
    if (secondsRemaining <= 0) {
      // Exercise completed
      impact(HapticImpact.MEDIUM);
      onComplete();
      return;
    }
    
    const timer = setTimeout(() => {
      setSecondsRemaining(prev => prev - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [secondsRemaining, impact, onComplete]);
  
  // Effect for breathing phases
  useEffect(() => {
    let phaseLength = getCurrentPhaseTime();
    if (phaseLength === 0) {
      // Skip phases with zero duration
      moveToNextPhase();
      return;
    }
    
    let interval: NodeJS.Timeout;
    let phaseTimer: NodeJS.Timeout;
    
    // Update progress every 100ms
    interval = setInterval(() => {
      setPhaseProgress(prev => {
        const increment = 100 / (phaseLength * 10);
        return Math.min(prev + increment, 100);
      });
    }, 100);
    
    // Move to next phase after phase time
    phaseTimer = setTimeout(() => {
      moveToNextPhase();
    }, phaseLength * 1000);
    
    // Provide haptic feedback at phase change
    impact(HapticImpact.LIGHT);
    
    return () => {
      clearInterval(interval);
      clearTimeout(phaseTimer);
    };
  }, [currentPhase, breathCount]);
  
  const moveToNextPhase = () => {
    setPhaseProgress(0);
    
    // Determine next phase
    switch (currentPhase) {
      case 'inhale':
        setCurrentPhase('hold1');
        break;
      case 'hold1':
        setCurrentPhase('exhale');
        break;
      case 'exhale':
        setCurrentPhase('hold2');
        break;
      case 'hold2':
        // Complete one full breath
        setCurrentPhase('inhale');
        setBreathCount(prev => prev + 1);
        break;
    }
  };
  
  // Format time remaining
  const formatTimeRemaining = (): string => {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="text-2xl mb-3 font-semibold">
          {type === 'box' ? 'Box Breathing' : 
           type === '478' ? '4-7-8 Breathing' :
           'Deep Breathing'}
        </div>
        <div className="text-sm text-muted-foreground mb-6">
          {type === 'box' ? 'Equal inhale, hold, exhale, and hold' : 
           type === '478' ? 'Inhale for 4, hold for 7, exhale for 8' :
           'Long, deep breaths to activate relaxation'}
        </div>
        <div className="text-3xl font-mono mb-2">
          {formatTimeRemaining()}
        </div>
        <div className="text-sm text-muted-foreground">
          {breathCount} breaths completed
        </div>
      </div>
      
      <div className="w-full mb-8">
        <div className="text-center mb-2 text-xl font-medium">
          {phaseLabels[currentPhase]}
        </div>
        <Progress value={phaseProgress} className="h-3" />
      </div>
      
      <div className="relative w-40 h-40 mb-8">
        {/* Animated breathing circle */}
        <div 
          className={`absolute inset-0 rounded-full border-4 border-primary transition-all duration-1000 flex items-center justify-center`}
          style={{ 
            transform: `scale(${currentPhase === 'inhale' ? 1.5 : 
                           currentPhase === 'exhale' ? 1 : 
                           currentPhase === 'hold1' || currentPhase === 'hold2' ? 1.5 : 1})`,
            opacity: 0.3
          }}
        />
        <div 
          className="absolute inset-0 rounded-full bg-primary/10 transition-all duration-1000 flex items-center justify-center"
          style={{ 
            transform: `scale(${currentPhase === 'inhale' ? 1.3 : 
                           currentPhase === 'exhale' ? 0.9 : 
                           currentPhase === 'hold1' || currentPhase === 'hold2' ? 1.3 : 1})`
          }}
        />
      </div>
      
      {/* Guidance text */}
      <div className="text-center text-sm text-muted-foreground">
        {currentPhase === 'inhale' && 'Breathe in slowly through your nose...'}
        {currentPhase === 'hold1' && 'Hold your breath...'}
        {currentPhase === 'exhale' && 'Exhale slowly through your mouth...'}
        {currentPhase === 'hold2' && 'Hold your breath before the next cycle...'}
      </div>
    </div>
  );
};
