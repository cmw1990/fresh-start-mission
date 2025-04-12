
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, PauseCircle, RefreshCw, Volume2, VolumeX } from "lucide-react";
import { useHaptics, HapticImpact } from "@/hooks/useHaptics";
import { toast } from "sonner";

interface BreathingExerciseProps {
  inhaleTime?: number;
  holdTime?: number;
  exhaleTime?: number;
  cycles?: number;
  onComplete?: () => void;
  technique?: "box" | "478" | "coherent";
}

const BreathingExercise: React.FC<BreathingExerciseProps> = ({
  inhaleTime = 4,
  holdTime = 4,
  exhaleTime = 4,
  cycles = 5,
  onComplete,
  technique = "box"
}) => {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<"inhale" | "hold" | "exhale" | "hold2" | "complete">("inhale");
  const [currentCycle, setCurrentCycle] = useState(1);
  const [timeLeft, setTimeLeft] = useState(inhaleTime);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const { impact } = useHaptics();
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  
  // Set technique parameters
  useEffect(() => {
    if (technique === "478") {
      // 4-7-8 breathing technique
      inhaleTime = 4;
      holdTime = 7;
      exhaleTime = 8;
    } else if (technique === "coherent") {
      // Coherent breathing (5.5 seconds in, 5.5 seconds out)
      inhaleTime = 5.5;
      holdTime = 0;
      exhaleTime = 5.5;
    }
    // box breathing is 4-4-4-4 which is the default
    
    setTimeLeft(inhaleTime);
  }, [technique]);
  
  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleStart = () => {
    setIsActive(true);
    setCurrentPhase("inhale");
    setCurrentCycle(1);
    setTimeLeft(inhaleTime);
    setProgress(0);
    
    // Play audio cue
    if (!isMuted && audioRef.current) {
      audioRef.current.play().catch(err => console.error("Audio play failed:", err));
    }
    
    // Provide haptic feedback
    impact(HapticImpact.MEDIUM);
    
    // Show start toast
    toast.info(`Starting ${cycles} cycles of breathing exercise`, {
      description: "Follow the animation and breathe with it",
    });
    
    // Set up the interval
    intervalRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time to change phase
          switch (currentPhase) {
            case "inhale":
              setCurrentPhase(technique === "coherent" ? "exhale" : "hold");
              impact(HapticImpact.LIGHT);
              return technique === "coherent" ? exhaleTime : holdTime;
            case "hold":
              setCurrentPhase("exhale");
              impact(HapticImpact.LIGHT);
              return exhaleTime;
            case "exhale":
              // For box breathing, there's a second hold phase
              if (technique === "box") {
                setCurrentPhase("hold2");
                impact(HapticImpact.LIGHT);
                return holdTime;
              } else {
                // For other techniques, go back to inhale or complete
                if (currentCycle >= cycles) {
                  completeExercise();
                  return 0;
                } else {
                  setCurrentCycle(prev => prev + 1);
                  setCurrentPhase("inhale");
                  impact(HapticImpact.LIGHT);
                  return inhaleTime;
                }
              }
            case "hold2":
              if (currentCycle >= cycles) {
                completeExercise();
                return 0;
              } else {
                setCurrentCycle(prev => prev + 1);
                setCurrentPhase("inhale");
                impact(HapticImpact.LIGHT);
                return inhaleTime;
              }
            default:
              return prev;
          }
        }
        return prev - 0.1; // Update every 100ms for smoother animation
      });
    }, 100);
  };

  const completeExercise = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentPhase("complete");
    setIsActive(false);
    impact(HapticImpact.MEDIUM);
    toast.success("Breathing exercise complete!", {
      description: "Great job! How do you feel now?",
    });
    if (onComplete) onComplete();
  };
  
  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsActive(false);
    toast.info("Breathing exercise paused", {
      description: "You can resume anytime",
    });
  };
  
  const handleReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsActive(false);
    setCurrentPhase("inhale");
    setCurrentCycle(1);
    setTimeLeft(inhaleTime);
    setProgress(0);
  };
  
  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };
  
  // Calculate circle size based on breathing phase
  useEffect(() => {
    let targetProgress = 0;
    
    switch (currentPhase) {
      case "inhale":
        // Circle grows during inhale
        targetProgress = 100 - ((timeLeft / inhaleTime) * 100);
        break;
      case "hold":
      case "hold2":
        // Circle stays large during hold
        targetProgress = 100;
        break;
      case "exhale":
        // Circle shrinks during exhale
        targetProgress = (timeLeft / exhaleTime) * 100;
        break;
      case "complete":
        targetProgress = 0;
        break;
    }
    
    setProgress(targetProgress);
  }, [timeLeft, currentPhase, inhaleTime, exhaleTime]);
  
  const getPhaseText = () => {
    switch (currentPhase) {
      case "inhale":
        return "Inhale";
      case "hold":
      case "hold2":
        return "Hold";
      case "exhale":
        return "Exhale";
      case "complete":
        return "Complete";
      default:
        return "";
    }
  };
  
  // Calculate circle styles
  const minSize = 100;
  const maxSize = 280;
  const currentSize = minSize + ((maxSize - minSize) * (progress / 100));
  
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <audio ref={audioRef} src="/sounds/soft-bell.mp3" />
      
      <Card className="relative flex flex-col items-center justify-center p-8 mb-8 w-full max-w-lg">
        <CardContent className="flex flex-col items-center justify-center p-0">
          <div className="mb-4 text-center">
            <h3 className="text-2xl font-bold mb-2">
              {technique === "box" && "Box Breathing"}
              {technique === "478" && "4-7-8 Breathing"}
              {technique === "coherent" && "Coherent Breathing"}
            </h3>
            <p className="text-muted-foreground">
              {isActive ? (
                <>
                  Cycle {currentCycle} of {cycles}: <span className="font-medium">{getPhaseText()}</span>
                </>
              ) : currentPhase === "complete" ? (
                "Exercise Complete"
              ) : (
                "Press start when you're ready"
              )}
            </p>
          </div>
          
          <div className="relative flex items-center justify-center my-8 h-[300px]">
            {/* Breathing circle */}
            <div
              className="rounded-full bg-fresh-100 border-2 border-fresh-300 transition-all duration-300 ease-in-out flex items-center justify-center"
              style={{
                width: `${currentSize}px`,
                height: `${currentSize}px`,
              }}
            >
              <span className="text-2xl font-bold text-fresh-700">
                {isActive ? Math.ceil(timeLeft) : ""}
              </span>
            </div>
          </div>
          
          <div className="flex gap-3 mt-4">
            {!isActive ? (
              <Button 
                onClick={handleStart} 
                className="bg-fresh-500 hover:bg-fresh-600" 
                size="lg"
                disabled={currentPhase === "complete" && currentCycle > cycles}
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                {currentPhase === "complete" ? "Restart" : "Start"}
              </Button>
            ) : (
              <Button onClick={handleStop} variant="outline" size="lg">
                <PauseCircle className="mr-2 h-5 w-5" />
                Pause
              </Button>
            )}
            
            <Button onClick={handleReset} variant="ghost" size="lg">
              <RefreshCw className="mr-2 h-5 w-5" />
              Reset
            </Button>
            
            <Button onClick={toggleMute} variant="ghost" size="icon">
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <p className="text-sm text-muted-foreground text-center max-w-lg">
        {technique === "box" && (
          "Box breathing helps reduce stress and improve focus. Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds. Repeat."
        )}
        {technique === "478" && (
          "The 4-7-8 technique is designed to reduce anxiety. Inhale for 4 seconds, hold for 7 seconds, and exhale for 8 seconds. Repeat."
        )}
        {technique === "coherent" && (
          "Coherent breathing helps balance the nervous system. Breathe in for 5.5 seconds and out for 5.5 seconds. This creates a coherent heart rhythm."
        )}
      </p>
    </div>
  );
};

export default BreathingExercise;
