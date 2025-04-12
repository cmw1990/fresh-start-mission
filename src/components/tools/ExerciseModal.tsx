
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { X, Check } from "lucide-react";

export interface ExerciseStep {
  title: string;
  instructions: string;
  duration?: number; // in seconds
  audioUrl?: string;
}

interface ExerciseModalProps {
  exercise: {
    title: string;
    description: string;
    steps: ExerciseStep[];
  };
  open: boolean;
  onClose: () => void;
}

const ExerciseModal = ({ exercise, open, onClose }: ExerciseModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Reset state when the modal opens
  useEffect(() => {
    if (open) {
      setCurrentStep(0);
      setIsComplete(false);
    }
  }, [open]);

  // Set up timer for steps with durations
  useEffect(() => {
    if (!open || isComplete) return;

    const step = exercise.steps[currentStep];
    if (!step || !step.duration) return;

    setTimeLeft(step.duration);
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentStep, open, isComplete, exercise.steps]);

  // Auto advance when timer ends
  useEffect(() => {
    if (timeLeft === 0 && exercise.steps[currentStep]?.duration) {
      handleNext();
    }
  }, [timeLeft]);

  const handleNext = () => {
    if (currentStep < exercise.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
      toast.success("Exercise completed!");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentProgress = ((currentStep + 1) / exercise.steps.length) * 100;

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{exercise.title}</DialogTitle>
          <DialogDescription>{exercise.description}</DialogDescription>
        </DialogHeader>

        {!isComplete ? (
          <>
            <div className="py-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-1.5">
                <span>Step {currentStep + 1} of {exercise.steps.length}</span>
                {exercise.steps[currentStep]?.duration && (
                  <span>{formatTime(timeLeft)}</span>
                )}
              </div>
              <Progress value={currentProgress} className="h-2" />
              
              <div className="mt-6">
                <h4 className="font-semibold text-lg mb-2">
                  {exercise.steps[currentStep].title}
                </h4>
                <p className="text-muted-foreground">
                  {exercise.steps[currentStep].instructions}
                </p>

                {exercise.steps[currentStep].audioUrl && (
                  <div className="mt-4">
                    <audio 
                      controls 
                      src={exercise.steps[currentStep].audioUrl}
                      className="w-full"
                    >
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="sm:justify-between">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <Button onClick={handleNext}>
                {currentStep < exercise.steps.length - 1 ? "Next" : "Complete"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold">Exercise Complete!</h3>
            <p className="text-center text-muted-foreground mt-2">
              Great job completing this exercise. You've taken an important step towards your goal.
            </p>
            <Button onClick={onClose} className="mt-6">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseModal;
