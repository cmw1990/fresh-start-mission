
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useHaptics, HapticImpact } from '@/hooks/useHaptics';
import { Wind, Brain, Clock, Award } from 'lucide-react'; // Remove Lungs import
import { BreathingExercise } from '@/components/tools/breathing/BreathingExercise';
import { ExerciseModal } from '@/components/tools/ExerciseModal';
import { toast } from 'sonner';

const CravingTools = () => {
  const { impact } = useHaptics();
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
  
  const openExercise = (exerciseName: string) => {
    setSelectedExercise(exerciseName);
    setIsExerciseModalOpen(true);
    impact(HapticImpact.LIGHT);
  };
  
  const handleExerciseComplete = () => {
    impact(HapticImpact.MEDIUM);
    setIsExerciseModalOpen(false);
    toast.success("Great job completing the exercise!", {
      description: "You're one step closer to managing your cravings effectively."
    });
  };
  
  const breathingExercises = [
    { 
      name: "4-7-8 Breathing",
      description: "Inhale for 4 seconds, hold for 7, exhale for 8. Calms the nervous system quickly.",
      icon: <Wind className="h-12 w-12 text-blue-500" />,
      duration: "2 minutes"
    },
    { 
      name: "Box Breathing",
      description: "Equal duration inhale, hold, exhale, and hold. Used by Navy SEALs for stress management.",
      icon: <Wind className="h-12 w-12 text-indigo-500" />,
      duration: "3 minutes"
    },
    { 
      name: "Deep Diaphragmatic Breathing",
      description: "Slow, deep belly breathing that activates the parasympathetic nervous system.",
      icon: <Wind className="h-12 w-12 text-cyan-500" />,
      duration: "5 minutes"
    }
  ];
  
  const mindfulnessExercises = [
    {
      name: "Craving Surfing",
      description: "Observe your craving like a wave that rises, crests, and eventually subsides.",
      icon: <Brain className="h-12 w-12 text-purple-500" />,
      duration: "5 minutes"
    },
    {
      name: "Body Scan",
      description: "Systematically notice sensations throughout your body without judgment.",
      icon: <Brain className="h-12 w-12 text-violet-500" />,
      duration: "7 minutes"
    },
    {
      name: "Mindful Walking",
      description: "Focus completely on the experience of walking and your surroundings.",
      icon: <Brain className="h-12 w-12 text-fuchsia-500" />,
      duration: "10 minutes"
    }
  ];
  
  const delayTechniques = [
    {
      name: "5-Minute Rule",
      description: "Commit to waiting just 5 minutes before giving in to a craving.",
      icon: <Clock className="h-12 w-12 text-amber-500" />,
      duration: "5 minutes"
    },
    {
      name: "H.A.L.T. Check-in",
      description: "Check if you're Hungry, Angry, Lonely or Tired - common craving triggers.",
      icon: <Clock className="h-12 w-12 text-yellow-500" />,
      duration: "2 minutes"
    },
    {
      name: "Urge Logging",
      description: "Record the time, intensity, and context of your craving to identify patterns.",
      icon: <Clock className="h-12 w-12 text-orange-500" />,
      duration: "3 minutes"
    }
  ];
  
  const cbtTechniques = [
    {
      name: "Thought Challenging",
      description: "Identify and question thoughts that make cravings seem irresistible.",
      icon: <Award className="h-12 w-12 text-green-500" />,
      duration: "5 minutes"
    },
    {
      name: "Craving Pros & Cons",
      description: "Quickly list the real costs and benefits of giving in to the craving.",
      icon: <Award className="h-12 w-12 text-emerald-500" />,
      duration: "3 minutes"
    },
    {
      name: "Future Self Visualization",
      description: "Connect with your future self who has successfully overcome this craving.",
      icon: <Award className="h-12 w-12 text-teal-500" />,
      duration: "7 minutes"
    }
  ];

  const renderExerciseCards = (exercises: any[]) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exercises.map((exercise, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow hover-scale">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-2">{exercise.icon}</div>
              <CardTitle>{exercise.name}</CardTitle>
              <CardDescription>{exercise.duration}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-center">{exercise.description}</p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                variant="default" 
                onClick={() => openExercise(exercise.name)}
              >
                Start Exercise
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Craving Coping Toolkit</h1>
        <p className="text-muted-foreground mt-1">
          Evidence-based techniques to help you manage cravings effectively.
        </p>
      </div>
      
      <div className="grid gap-8">
        <Card className="bg-blue-50/50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-blue-700">Need Immediate Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-700">
              If you're experiencing an intense craving right now, try our quick 1-minute breathing exercise:
            </p>
            <div className="mt-4">
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => openExercise("Emergency Breathing")}
              >
                Start 1-Minute Emergency Breathing
              </Button>
            </div>
          </CardContent>
        </Card>
      
        <Tabs defaultValue="breathing">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="breathing">Breathing</TabsTrigger>
            <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>
            <TabsTrigger value="delay">Delay Techniques</TabsTrigger>
            <TabsTrigger value="cbt">CBT</TabsTrigger>
          </TabsList>
          
          <TabsContent value="breathing" className="space-y-4">
            {renderExerciseCards(breathingExercises)}
          </TabsContent>
          
          <TabsContent value="mindfulness" className="space-y-4">
            {renderExerciseCards(mindfulnessExercises)}
          </TabsContent>
          
          <TabsContent value="delay" className="space-y-4">
            {renderExerciseCards(delayTechniques)}
          </TabsContent>
          
          <TabsContent value="cbt" className="space-y-4">
            {renderExerciseCards(cbtTechniques)}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Modal for exercises */}
      <ExerciseModal
        isOpen={isExerciseModalOpen}
        onClose={() => setIsExerciseModalOpen(false)}
        onComplete={handleExerciseComplete}
        title={selectedExercise || "Exercise"}
      >
        {selectedExercise?.includes("Breathing") && (
          <BreathingExercise 
            onComplete={handleExerciseComplete} 
            type={selectedExercise === "Box Breathing" ? "box" : 
                 selectedExercise === "4-7-8 Breathing" ? "478" : "deep"}
            duration={selectedExercise === "Emergency Breathing" ? 60 : 180}
          />
        )}
        {!selectedExercise?.includes("Breathing") && (
          <div className="p-6 text-center">
            <p className="mb-4">
              Follow these steps for {selectedExercise}:
            </p>
            <ol className="text-left space-y-2 mb-6">
              <li>1. Find a quiet, comfortable place</li>
              <li>2. Close your eyes or maintain a soft focus</li>
              <li>3. Follow the instructions specific to this technique</li>
              <li>4. Acknowledge when your mind wanders and gently return focus</li>
              <li>5. Upon completion, notice how your body and mind feel</li>
            </ol>
            <Button onClick={handleExerciseComplete}>
              Mark as Complete
            </Button>
          </div>
        )}
      </ExerciseModal>
    </div>
  );
};

export default CravingTools;
