
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BatteryCharging, Zap, Utensils, Coffee, Apple, Droplets, Sun, MoonStar } from "lucide-react";
import ToolExerciseCard from "@/components/tools/ToolExerciseCard";
import QuickToolCard from "@/components/tools/QuickToolCard";
import ExerciseModal from "@/components/tools/ExerciseModal";
import { ExerciseStep } from "@/components/tools/ExerciseModal";
import { toast } from "sonner";

// Exercise definitions
const energizingBreathingExercise = {
  title: "Energizing Breath Technique",
  description: "A stimulating breathing exercise designed to increase alertness and energy levels.",
  steps: [
    {
      title: "Find Your Position",
      instructions: "Sit comfortably with your back straight. You may also stand if you prefer.",
      duration: 5,
    },
    {
      title: "Begin With Deep Breaths",
      instructions: "Take 3 deep, slow breaths to center yourself.",
      duration: 15,
    },
    {
      title: "Quick Inhale",
      instructions: "Inhale quickly through your nose, filling your lungs about 3/4 full.",
      duration: 2,
    },
    {
      title: "Quick Exhale",
      instructions: "Exhale sharply through your mouth, making a 'ha' sound if comfortable.",
      duration: 2,
    },
    {
      title: "Continue Pattern",
      instructions: "Repeat this quick inhale-exhale pattern for 15 breaths, keeping a steady rhythm.",
      duration: 30,
    },
    {
      title: "Return to Normal",
      instructions: "Take a few normal breaths and notice how you feel. Is there a change in your energy level?",
      duration: 10,
    },
    {
      title: "Second Round",
      instructions: "Perform another 15 quick breath cycles.",
      duration: 30,
    },
    {
      title: "Final Reflection",
      instructions: "Return to normal breathing. Notice the sensations in your body and mind.",
      duration: 10,
    },
  ] as ExerciseStep[],
};

const energyMeditationExercise = {
  title: "Energy Visualization",
  description: "A guided meditation that uses visualization to increase energy and alertness.",
  steps: [
    {
      title: "Preparation",
      instructions: "Find a comfortable seated position with your back straight. Close your eyes or maintain a soft gaze.",
      duration: 10,
    },
    {
      title: "Center Yourself",
      instructions: "Take a few deep breaths, allowing your body to relax while maintaining an alert posture.",
      duration: 15,
    },
    {
      title: "Golden Light",
      instructions: "Imagine a warm, golden light above your head. This light represents pure, vibrant energy.",
      duration: 20,
    },
    {
      title: "Energy Enters",
      instructions: "With each inhale, visualize this golden light entering through the crown of your head and filling your body.",
      duration: 30,
    },
    {
      title: "Body Filling",
      instructions: "See and feel this light filling your chest, your core, your limbs - bringing vitality wherever it flows.",
      duration: 30,
    },
    {
      title: "Release Fatigue",
      instructions: "As you exhale, imagine releasing any fatigue or heaviness as dark smoke that dissolves and disappears.",
      duration: 30,
    },
    {
      title: "Energetic Circulation",
      instructions: "Continue breathing, circulating this golden energy throughout your entire body.",
      duration: 60,
    },
    {
      title: "Seal the Practice",
      instructions: "Take three deep breaths. With each inhale, draw in more vitality. With each exhale, release any remaining lethargy.",
      duration: 15,
    },
    {
      title: "Return",
      instructions: "Slowly become aware of your surroundings. Wiggle your fingers and toes. When ready, open your eyes.",
      duration: 10,
    },
  ] as ExerciseStep[],
};

const quickStretchExercise = {
  title: "5-Minute Energy Stretch Routine",
  description: "A series of simple stretches designed to increase blood flow and energy levels.",
  steps: [
    {
      title: "Preparation",
      instructions: "Stand up in a clear space where you can extend your arms fully without hitting anything.",
      duration: 5,
    },
    {
      title: "Shoulder Rolls",
      instructions: "Roll your shoulders backward 5 times, then forward 5 times. Feel the tension releasing.",
      duration: 20,
    },
    {
      title: "Neck Stretches",
      instructions: "Gently tilt your head to the right, holding for 5 seconds. Then tilt to the left. Repeat twice on each side.",
      duration: 20,
    },
    {
      title: "Side Stretches",
      instructions: "Raise your right arm overhead and lean gently to the left. Hold for 10 seconds. Switch sides and repeat.",
      duration: 20,
    },
    {
      title: "Forward Fold",
      instructions: "Stand with feet hip-width apart. Hinge at your hips and let your upper body hang forward loosely. Bend your knees if needed. Hold for 15 seconds.",
      duration: 15,
    },
    {
      title: "Chest Opener",
      instructions: "Clasp your hands behind your back. Lift your arms slightly while drawing your shoulders back. Hold for 10 seconds.",
      duration: 10,
    },
    {
      title: "Mini Squat",
      instructions: "Stand with feet shoulder-width apart. Perform 10 small squats, just going down a few inches.",
      duration: 20,
    },
    {
      title: "Arm Circles",
      instructions: "Extend your arms out to the sides and make 10 small circles forward, then 10 backward.",
      duration: 20,
    },
    {
      title: "Shake It Out",
      instructions: "Shake your hands, arms, and legs to release any remaining tension.",
      duration: 10,
    },
    {
      title: "Final Breath",
      instructions: "Stand tall, take a deep breath in, raising your arms overhead. Exhale and lower your arms. Repeat twice more.",
      duration: 15,
    },
  ] as ExerciseStep[],
};

const EnergyTools = () => {
  const [activeExercise, setActiveExercise] = useState<any | null>(null);
  const [exerciseModalOpen, setExerciseModalOpen] = useState(false);

  const startExercise = (exercise: any) => {
    setActiveExercise(exercise);
    setExerciseModalOpen(true);
  };

  const handleQuickTool = (toolName: string) => {
    // For now just show a toast - these could be expanded into mini-exercises later
    toast.success(`${toolName} activated!`, {
      description: "This energy tool would provide immediate support."
    });
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Energy Tools</h1>
        <p className="text-muted-foreground">
          Combat fatigue and boost your energy during your fresh journey
        </p>
      </div>

      <Tabs defaultValue="exercises">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="exercises">Guided Exercises</TabsTrigger>
          <TabsTrigger value="quick-tools">Quick Boosters</TabsTrigger>
        </TabsList>

        <TabsContent value="exercises" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ToolExerciseCard
              title={energizingBreathingExercise.title}
              description={energizingBreathingExercise.description}
              duration="3 minutes"
              difficulty="easy"
              tags={["Breathing", "Stimulating"]}
              popular={true}
              onStart={() => startExercise(energizingBreathingExercise)}
            />
            
            <ToolExerciseCard
              title={energyMeditationExercise.title}
              description={energyMeditationExercise.description}
              duration="4 minutes"
              difficulty="easy"
              tags={["Meditation", "Visualization"]}
              onStart={() => startExercise(energyMeditationExercise)}
            />
            
            <ToolExerciseCard
              title={quickStretchExercise.title}
              description={quickStretchExercise.description}
              duration="5 minutes"
              difficulty="moderate"
              tags={["Physical", "Movement"]}
              onStart={() => startExercise(quickStretchExercise)}
            />

            <ToolExerciseCard
              title="Power Posing"
              description="Stand in powerful postures that have been shown to increase energy and confidence levels."
              duration="2 minutes"
              difficulty="easy"
              tags={["Body Language", "Confidence"]}
              onStart={() => toast.info("This exercise will be available soon!")}
            />

            <ToolExerciseCard
              title="Energy Audit Reflection"
              description="A guided assessment to identify energy drains and sources in your life."
              duration="5 minutes"
              difficulty="moderate"
              tags={["Self-awareness", "Planning"]}
              onStart={() => toast.info("This exercise will be available soon!")}
            />
          </div>
        </TabsContent>

        <TabsContent value="quick-tools">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <QuickToolCard
              title="Power Minute"
              description="60 seconds of quick movements: 20 jumping jacks, 20 arm circles, 20 high knees."
              icon={Zap}
              iconColor="text-yellow-500"
              iconBgColor="bg-yellow-50"
              onClick={() => handleQuickTool("Power Minute")}
            />
            
            <QuickToolCard
              title="Energy Snack Ideas"
              description="Quick suggestions for energy-boosting snacks that don't trigger cravings."
              icon={Apple}
              iconColor="text-green-500"
              iconBgColor="bg-green-50"
              onClick={() => handleQuickTool("Energy Snacks")}
            />
            
            <QuickToolCard
              title="Hydration Reminder"
              description="Reminder to drink water, as dehydration often masquerades as fatigue."
              icon={Droplets}
              iconColor="text-blue-500"
              iconBgColor="bg-blue-50"
              onClick={() => handleQuickTool("Hydration Reminder")}
            />
            
            <QuickToolCard
              title="Caffeine Guide"
              description="Smart tips for using caffeine effectively without triggering cravings."
              icon={Coffee}
              iconColor="text-amber-700"
              iconBgColor="bg-amber-50"
              onClick={() => handleQuickTool("Caffeine Guide")}
            />
            
            <QuickToolCard
              title="Cold Splash"
              description="Quick instruction for using cold water on your face to increase alertness."
              icon={Droplets}
              iconColor="text-sky-500"
              iconBgColor="bg-sky-50"
              onClick={() => handleQuickTool("Cold Splash")}
            />
            
            <QuickToolCard
              title="Light Exposure"
              description="Get outside for natural light which helps regulate energy levels."
              icon={Sun}
              iconColor="text-orange-500"
              iconBgColor="bg-orange-50"
              onClick={() => handleQuickTool("Light Exposure")}
            />
            
            <QuickToolCard
              title="Sleep Tips"
              description="Quick adjustments to improve tonight's sleep for better energy tomorrow."
              icon={MoonStar}
              iconColor="text-indigo-500"
              iconBgColor="bg-indigo-50"
              onClick={() => handleQuickTool("Sleep Tips")}
            />
            
            <QuickToolCard
              title="Energizing Foods"
              description="List of foods that provide sustained energy without sugar crashes."
              icon={Utensils}
              iconColor="text-purple-500"
              iconBgColor="bg-purple-50"
              onClick={() => handleQuickTool("Energizing Foods")}
            />
          </div>
        </TabsContent>
      </Tabs>

      {activeExercise && (
        <ExerciseModal
          exercise={activeExercise}
          open={exerciseModalOpen}
          onClose={() => setExerciseModalOpen(false)}
        />
      )}
    </div>
  );
};

export default EnergyTools;
