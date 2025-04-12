
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Hourglass, Target, ClipboardList, AlignCenter, BookOpen, FoldVertical, CheckSquare } from "lucide-react";
import ToolExerciseCard from "@/components/tools/ToolExerciseCard";
import QuickToolCard from "@/components/tools/QuickToolCard";
import ExerciseModal from "@/components/tools/ExerciseModal";
import { ExerciseStep } from "@/components/tools/ExerciseModal";
import { toast } from "sonner";

// Exercise definitions
const attentionResetExercise = {
  title: "Attention Reset Practice",
  description: "A quick mindfulness exercise to reset your focus and concentration, particularly helpful during brain fog.",
  steps: [
    {
      title: "Settle In",
      instructions: "Find a comfortable seated position with your back straight. Allow your hands to rest on your lap.",
      duration: 10,
    },
    {
      title: "Connect to Breath",
      instructions: "Close your eyes or maintain a soft gaze. Take three deep breaths, feeling the sensation of air moving in and out.",
      duration: 15,
    },
    {
      title: "Notice Your Attention",
      instructions: "Without judgment, notice where your attention currently is. Is your mind scattered? Foggy? Acknowledge its current state.",
      duration: 20,
    },
    {
      title: "Sound Awareness",
      instructions: "Shift your attention to sounds in your environment. Notice distant sounds, then closer ones, without labeling or judging them.",
      duration: 30,
    },
    {
      title: "Body Sensation",
      instructions: "Now bring your attention to physical sensations. Feel your feet on the floor, your body against the chair, the touch of clothing on your skin.",
      duration: 30,
    },
    {
      title: "Single-Point Focus",
      instructions: "Choose a single focus point - your breath at the nostril, a specific sound, or a sensation. Hold your attention there exclusively.",
      duration: 45,
    },
    {
      title: "Notice Wandering",
      instructions: "When your mind wanders (and it will), gently notice it without judgment, then guide your attention back to your chosen point of focus.",
      duration: 30,
    },
    {
      title: "Expand Awareness",
      instructions: "Gradually expand your awareness to include your whole body, the room around you, and your place within it.",
      duration: 20,
    },
    {
      title: "Return",
      instructions: "Slowly open your eyes if they were closed. Notice if there's any difference in your quality of attention.",
      duration: 10,
    },
  ] as ExerciseStep[],
};

const pomodoroExercise = {
  title: "Guided Pomodoro Focus Session",
  description: "A structured focus technique alternating between intense concentration and brief breaks.",
  steps: [
    {
      title: "Preparation",
      instructions: "Clear your workspace of distractions. Have your task ready and clearly defined before beginning.",
      duration: 10,
    },
    {
      title: "Set Intention",
      instructions: "Clearly state to yourself what you will focus on during this session. Make it specific and achievable.",
      duration: 15,
    },
    {
      title: "Focus Period Begins",
      instructions: "For the next 25 minutes, focus exclusively on your chosen task. If your mind wanders, gently bring it back without judgment.",
      duration: 60, // This would actually be 25 minutes (1500s) in a real implementation
    },
    {
      title: "Short Break",
      instructions: "Well done! Take a 5-minute break. Stand up, stretch, or get a glass of water. Avoid screens during this break if possible.",
      duration: 20, // This would be 5 minutes (300s) in a real implementation
    },
    {
      title: "Reflection",
      instructions: "How was your focus during that session? Did you notice any patterns in how your mind responded?",
      duration: 15,
    },
    {
      title: "Next Steps",
      instructions: "Consider doing another Pomodoro session. After completing 4 sessions, take a longer break of 15-30 minutes.",
      duration: 10,
    },
  ] as ExerciseStep[],
};

const mindfulnessExercise = {
  title: "Single-Task Mindfulness",
  description: "Train your brain to focus deeply on one task at a time, counteracting the focus difficulties during withdrawal.",
  steps: [
    {
      title: "Choose Your Task",
      instructions: "Select a simple routine activity for this practice - eating a piece of fruit, washing dishes, or even just drinking water.",
      duration: 10,
    },
    {
      title: "Prepare",
      instructions: "Remove distractions from your environment. Put aside your phone and turn off notifications.",
      duration: 10,
    },
    {
      title: "Set Intention",
      instructions: "Take three deep breaths and set the intention to give this task your complete, undivided attention.",
      duration: 15,
    },
    {
      title: "Begin With Senses",
      instructions: "As you start the task, notice all sensory aspects. What do you see? Feel? Hear? Smell? Taste (if applicable)?",
      duration: 30,
    },
    {
      title: "Notice Details",
      instructions: "Observe details you normally overlook. The texture, temperature, weight, colors, or subtle sensations.",
      duration: 30,
    },
    {
      title: "When Mind Wanders",
      instructions: "Your mind will naturally wander. When you notice this happening, gently return your focus to the sensory experience of the task.",
      duration: 20,
    },
    {
      title: "Maintain Presence",
      instructions: "Continue with the task while maintaining full presence. Notice if you start rushing or thinking about finishing.",
      duration: 60,
    },
    {
      title: "Complete Mindfully",
      instructions: "Finish the task with the same quality of attention you started with. Notice the completion of the activity.",
      duration: 20,
    },
    {
      title: "Reflection",
      instructions: "How was this experience different from how you usually perform this task? Did you notice anything new?",
      duration: 15,
    },
  ] as ExerciseStep[],
};

const FocusTools = () => {
  const [activeExercise, setActiveExercise] = useState<any | null>(null);
  const [exerciseModalOpen, setExerciseModalOpen] = useState(false);

  const startExercise = (exercise: any) => {
    setActiveExercise(exercise);
    setExerciseModalOpen(true);
  };

  const handleQuickTool = (toolName: string) => {
    // For now just show a toast - these could be expanded into mini-exercises later
    toast.success(`${toolName} activated!`, {
      description: "This focus tool would provide immediate support."
    });
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Focus Tools</h1>
        <p className="text-muted-foreground">
          Sharpen your concentration and mental clarity during your fresh journey
        </p>
      </div>

      <Tabs defaultValue="exercises">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="exercises">Guided Exercises</TabsTrigger>
          <TabsTrigger value="quick-tools">Quick Focusers</TabsTrigger>
        </TabsList>

        <TabsContent value="exercises" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ToolExerciseCard
              title={attentionResetExercise.title}
              description={attentionResetExercise.description}
              duration="4 minutes"
              difficulty="easy"
              tags={["Mindfulness", "Brain Fog"]}
              popular={true}
              onStart={() => startExercise(attentionResetExercise)}
            />
            
            <ToolExerciseCard
              title={pomodoroExercise.title}
              description={pomodoroExercise.description}
              duration="30 minutes"
              difficulty="moderate"
              tags={["Productivity", "Time Management"]}
              onStart={() => startExercise(pomodoroExercise)}
            />
            
            <ToolExerciseCard
              title={mindfulnessExercise.title}
              description={mindfulnessExercise.description}
              duration="5 minutes"
              difficulty="moderate"
              tags={["Mindfulness", "Single-Tasking"]}
              onStart={() => startExercise(mindfulnessExercise)}
            />

            <ToolExerciseCard
              title="Brain Dump Exercise"
              description="Clear mental clutter by getting all your thoughts out of your head and onto paper."
              duration="5 minutes"
              difficulty="easy"
              tags={["Organization", "Mental Clarity"]}
              onStart={() => toast.info("This exercise will be available soon!")}
            />

            <ToolExerciseCard
              title="Focus Environment Optimization"
              description="A guided assessment of your workspace to eliminate distractions and enhance focus."
              duration="7 minutes"
              difficulty="easy"
              tags={["Environment", "Setup"]}
              onStart={() => toast.info("This exercise will be available soon!")}
            />
          </div>
        </TabsContent>

        <TabsContent value="quick-tools">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <QuickToolCard
              title="Two-Minute Rule"
              description="If a task takes less than two minutes, do it immediately instead of postponing."
              icon={Hourglass}
              iconColor="text-blue-500"
              iconBgColor="bg-blue-50"
              onClick={() => handleQuickTool("Two-Minute Rule")}
            />
            
            <QuickToolCard
              title="Focus Intention"
              description="Set a clear, specific intention for your next 30 minutes of work."
              icon={Target}
              iconColor="text-red-500"
              iconBgColor="bg-red-50"
              onClick={() => handleQuickTool("Focus Intention")}
            />
            
            <QuickToolCard
              title="Task Breakdown"
              description="Break your next task into smaller, manageable chunks to avoid feeling overwhelmed."
              icon={ClipboardList}
              iconColor="text-purple-500"
              iconBgColor="bg-purple-50"
              onClick={() => handleQuickTool("Task Breakdown")}
            />
            
            <QuickToolCard
              title="Centering Breath"
              description="Take three deep breaths while mentally repeating 'Focus' with each exhale."
              icon={AlignCenter}
              iconColor="text-green-500"
              iconBgColor="bg-green-50"
              onClick={() => handleQuickTool("Centering Breath")}
            />
            
            <QuickToolCard
              title="Reading Focus"
              description="Practice deep focus by reading one paragraph with complete attention."
              icon={BookOpen}
              iconColor="text-amber-500"
              iconBgColor="bg-amber-50"
              onClick={() => handleQuickTool("Reading Focus")}
            />
            
            <QuickToolCard
              title="Minimize Mode"
              description="Close all unnecessary tabs, apps, and notifications for 20 minutes."
              icon={FoldVertical}
              iconColor="text-indigo-500"
              iconBgColor="bg-indigo-50"
              onClick={() => handleQuickTool("Minimize Mode")}
            />
            
            <QuickToolCard
              title="Next Action Clarity"
              description="Identify the exact next physical action required to move forward on your task."
              icon={CheckSquare}
              iconColor="text-teal-500"
              iconBgColor="bg-teal-50"
              onClick={() => handleQuickTool("Next Action Clarity")}
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

export default FocusTools;
