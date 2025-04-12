
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, Clock, Wind, Brain, Leaf, Dumbbell, HeartPulse } from "lucide-react";
import ToolExerciseCard from "@/components/tools/ToolExerciseCard";
import QuickToolCard from "@/components/tools/QuickToolCard";
import ExerciseModal from "@/components/tools/ExerciseModal";
import { ExerciseStep } from "@/components/tools/ExerciseModal";
import { toast } from "sonner";

// Exercise definitions
const breathingExercise = {
  title: "4-7-8 Breathing Technique",
  description: "A powerful breathing exercise that can help reduce cravings and promote relaxation. Based on ancient pranayama practices.",
  steps: [
    {
      title: "Get Comfortable",
      instructions: "Find a comfortable sitting position with your back straight. Rest your hands on your lap.",
      duration: 5,
    },
    {
      title: "Prepare",
      instructions: "Place the tip of your tongue against the ridge behind your upper teeth and keep it there throughout the exercise.",
      duration: 5,
    },
    {
      title: "Exhale Completely",
      instructions: "Exhale completely through your mouth, making a whoosh sound.",
      duration: 5,
    },
    {
      title: "Inhale",
      instructions: "Close your mouth and inhale quietly through your nose to a count of 4.",
      duration: 4,
    },
    {
      title: "Hold",
      instructions: "Hold your breath for a count of 7.",
      duration: 7,
    },
    {
      title: "Exhale",
      instructions: "Exhale completely through your mouth, making a whoosh sound to a count of 8.",
      duration: 8,
    },
    {
      title: "Repeat",
      instructions: "Repeat the cycle three more times, for a total of four breaths.",
      duration: 60,
    },
    {
      title: "Reflect",
      instructions: "Notice how you feel now. Has your craving intensity changed?",
      duration: 10,
    },
  ] as ExerciseStep[],
};

const urgeWaveExercise = {
  title: "Urge Surfing Meditation",
  description: "Learn to ride out your cravings like waves, observing them rise and fall without acting on them.",
  steps: [
    {
      title: "Find a Quiet Space",
      instructions: "Find a quiet place where you can sit or lie down comfortably without distractions.",
      duration: 10,
    },
    {
      title: "Notice Your Craving",
      instructions: "Acknowledge your craving. Where do you feel it in your body? Is it a tightness, tingling, or tension?",
      duration: 30,
    },
    {
      title: "Don't Fight It",
      instructions: "Instead of trying to push away the craving, allow yourself to fully experience it. Be curious about the sensation.",
      duration: 30,
    },
    {
      title: "Ride the Wave",
      instructions: "Imagine your craving as a wave. It grows in intensity, crests, and then subsides. Stay with it without acting on it.",
      duration: 60,
    },
    {
      title: "Focus on Your Breathing",
      instructions: "If the urge becomes too intense, gently shift your attention to your breathing. Then return to observing the craving.",
      duration: 45,
    },
    {
      title: "The Wave Subsides",
      instructions: "Notice how the intensity changes over time. Cravings rarely stay at peak intensity for more than a few minutes.",
      duration: 45,
    },
    {
      title: "Reflect",
      instructions: "As the exercise concludes, acknowledge your success in observing the craving without giving in to it.",
      duration: 20,
    },
  ] as ExerciseStep[],
};

const thoughtReframingExercise = {
  title: "Thought Reframing Exercise",
  description: "Challenge and change negative thought patterns that trigger cravings with this CBT-based technique.",
  steps: [
    {
      title: "Identify Thought",
      instructions: "Identify the thought behind your craving. For example: 'I need nicotine to relax' or 'Just one won't hurt.'",
      duration: 20,
    },
    {
      title: "Challenge the Thought",
      instructions: "Ask yourself: Is this thought a fact or an opinion? What evidence do I have against this thought?",
      duration: 30,
    },
    {
      title: "Identify Cognitive Distortions",
      instructions: "Look for thinking traps like all-or-nothing thinking, catastrophizing, or justification.",
      duration: 30,
    },
    {
      title: "Create Alternative Thought",
      instructions: "Develop a more balanced thought. For example: 'Nicotine actually increases stress long-term' or 'Every time I resist builds my strength.'",
      duration: 40,
    },
    {
      title: "Reinforce New Thought",
      instructions: "Repeat your new, balanced thought several times. How does it make you feel compared to the original thought?",
      duration: 30,
    },
    {
      title: "Plan Ahead",
      instructions: "Think about how you'll use this reframed thought next time a similar craving occurs.",
      duration: 30,
    },
  ] as ExerciseStep[],
};

// Add more exercises as needed

const CravingTools = () => {
  const [activeExercise, setActiveExercise] = useState<any | null>(null);
  const [exerciseModalOpen, setExerciseModalOpen] = useState(false);

  const startExercise = (exercise: any) => {
    setActiveExercise(exercise);
    setExerciseModalOpen(true);
  };

  const handleQuickTool = (toolName: string) => {
    // For now just show a toast - these could be expanded into mini-exercises later
    toast.success(`${toolName} activated!`, {
      description: "This quick tool would provide immediate support."
    });
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Craving Tools</h1>
        <p className="text-muted-foreground">
          Techniques and exercises to help you overcome nicotine cravings
        </p>
      </div>

      <Tabs defaultValue="exercises">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="exercises">Guided Exercises</TabsTrigger>
          <TabsTrigger value="quick-tools">Quick Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="exercises" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ToolExerciseCard
              title={breathingExercise.title}
              description={breathingExercise.description}
              duration="5 minutes"
              difficulty="easy"
              tags={["Breathing", "Relaxation"]}
              popular={true}
              onStart={() => startExercise(breathingExercise)}
            />
            
            <ToolExerciseCard
              title={urgeWaveExercise.title}
              description={urgeWaveExercise.description}
              duration="4 minutes"
              difficulty="moderate"
              tags={["Mindfulness", "Observation"]}
              onStart={() => startExercise(urgeWaveExercise)}
            />
            
            <ToolExerciseCard
              title={thoughtReframingExercise.title}
              description={thoughtReframingExercise.description}
              duration="3 minutes"
              difficulty="moderate"
              tags={["CBT", "Mental"]}
              onStart={() => startExercise(thoughtReframingExercise)}
            />

            <ToolExerciseCard
              title="5-Minute Body Scan"
              description="A mindfulness practice that helps you connect with your body and release tension caused by cravings."
              duration="5 minutes"
              difficulty="easy"
              tags={["Mindfulness", "Relaxation"]}
              onStart={() => toast.info("This exercise will be available soon!")}
            />

            <ToolExerciseCard
              title="H.A.L.T. Assessment"
              description="Quickly identify if your craving is triggered by being Hungry, Angry, Lonely, or Tired, and address the root cause."
              duration="3 minutes"
              difficulty="easy"
              tags={["Self-awareness", "Triggers"]}
              onStart={() => toast.info("This exercise will be available soon!")}
            />
          </div>
        </TabsContent>

        <TabsContent value="quick-tools">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <QuickToolCard
              title="Delay 5 Minutes"
              description="Set a 5-minute timer and promise yourself to reassess the craving when it ends."
              icon={Clock}
              iconColor="text-amber-500"
              iconBgColor="bg-amber-50"
              onClick={() => handleQuickTool("Delay Timer")}
            />
            
            <QuickToolCard
              title="Drink Water"
              description="Hydration reminder: Drinking water can help reduce the intensity of cravings."
              icon={Wind}
              iconColor="text-blue-500"
              iconBgColor="bg-blue-50"
              onClick={() => handleQuickTool("Hydration Reminder")}
            />
            
            <QuickToolCard
              title="Distraction Activity"
              description="Quick suggestions for activities to distract yourself from cravings."
              icon={Brain}
              iconColor="text-purple-500"
              iconBgColor="bg-purple-50"
              onClick={() => handleQuickTool("Distraction Activities")}
            />
            
            <QuickToolCard
              title="Deep Breathing"
              description="Take 3 deep breaths to reduce stress and craving intensity."
              icon={Wind}
              iconColor="text-sky-500"
              iconBgColor="bg-sky-50"
              onClick={() => handleQuickTool("Deep Breathing")}
            />
            
            <QuickToolCard
              title="5-Second Hand Exercise"
              description="Clench and release your hands for 5 seconds to redirect focus and tension."
              icon={Dumbbell}
              iconColor="text-green-500"
              iconBgColor="bg-green-50"
              onClick={() => handleQuickTool("Hand Exercise")}
            />
            
            <QuickToolCard
              title="Remember Your 'Why'"
              description="Quick reminder of your personal motivation for staying fresh."
              icon={Leaf}
              iconColor="text-fresh-500"
              iconBgColor="bg-fresh-50"
              onClick={() => handleQuickTool("Motivation Reminder")}
            />
            
            <QuickToolCard
              title="Benefits Reminder"
              description="Quick review of health benefits you've already achieved."
              icon={HeartPulse}
              iconColor="text-red-500"
              iconBgColor="bg-red-50"
              onClick={() => handleQuickTool("Health Benefits")}
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

export default CravingTools;
