
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Heart, Smile, Pencil, Music, FlowerIcon, BrainCircuit, SunMedium } from "lucide-react";
import ToolExerciseCard from "@/components/tools/ToolExerciseCard";
import QuickToolCard from "@/components/tools/QuickToolCard";
import ExerciseModal from "@/components/tools/ExerciseModal";
import { ExerciseStep } from "@/components/tools/ExerciseModal";
import { toast } from "sonner";

// Exercise definitions
const gratitudeExercise = {
  title: "Gratitude Practice",
  description: "A guided exercise to identify and appreciate positive aspects of your life, shifting your mood toward positivity.",
  steps: [
    {
      title: "Settle In",
      instructions: "Find a comfortable position. Take three slow, deep breaths to center yourself.",
      duration: 15,
    },
    {
      title: "Present Moment",
      instructions: "Bring your attention to the present moment. Notice small things around you that you can appreciate right now.",
      duration: 20,
    },
    {
      title: "Simple Pleasures",
      instructions: "Think of one simple pleasure you've experienced today. Perhaps a warm drink, a kind word, or a moment of comfort. Allow yourself to feel genuine appreciation for it.",
      duration: 30,
    },
    {
      title: "People Connection",
      instructions: "Bring to mind someone who has helped you on your fresh journey or in life generally. Feel gratitude for their presence or support.",
      duration: 30,
    },
    {
      title: "Personal Strength",
      instructions: "Acknowledge one personal strength or quality that has helped you progress on your fresh journey. Be grateful for this aspect of yourself.",
      duration: 30,
    },
    {
      title: "Body Appreciation",
      instructions: "Express gratitude for your body's resilience during this challenging process. Your body is working hard to heal and adapt.",
      duration: 30,
    },
    {
      title: "Note Your Feelings",
      instructions: "Notice how focusing on gratitude affects your emotional state. Has your mood shifted at all?",
      duration: 15,
    },
    {
      title: "Optional Journaling",
      instructions: "After this exercise, consider writing down 3-5 things you're grateful for to reinforce the practice.",
      duration: 10,
    },
  ] as ExerciseStep[],
};

const selfCompassionExercise = {
  title: "Self-Compassion Break",
  description: "A brief practice to cultivate kindness toward yourself during difficult moments in your journey.",
  steps: [
    {
      title: "Acknowledge Difficulty",
      instructions: "Take a moment to acknowledge that you're experiencing a difficult emotion or situation. Simply notice it without judgment.",
      duration: 15,
    },
    {
      title: "Common Humanity",
      instructions: "Remind yourself that struggling with nicotine withdrawal is a common human experience. Thousands of others are feeling similar challenges right now.",
      duration: 20,
    },
    {
      title: "Physical Comfort",
      instructions: "Place your hand over your heart or another spot that feels soothing. Feel the warmth and gentle pressure of your hand.",
      duration: 15,
    },
    {
      title: "Self-Kindness Phrase",
      instructions: "Silently repeat: 'This is a moment of difficulty. May I be kind to myself in this moment.'",
      duration: 30,
    },
    {
      title: "Giving Yourself Support",
      instructions: "Ask yourself: 'What do I need to hear right now to feel supported?' Offer yourself those words of kindness.",
      duration: 30,
    },
    {
      title: "Soothing Touch",
      instructions: "Continue with your hand over your heart. Breathe gently and feel the sensation of touch and support.",
      duration: 30,
    },
    {
      title: "Compassionate Message",
      instructions: "Repeat to yourself: 'I'm doing the best I can. This challenge is temporary, and I can move through it with kindness.'",
      duration: 20,
    },
    {
      title: "Reflection",
      instructions: "Notice how you feel now. Remember you can return to this practice whenever needed throughout your day.",
      duration: 15,
    },
  ] as ExerciseStep[],
};

const positiveMemoryExercise = {
  title: "Positive Memory Anchor",
  description: "Create a mental anchor to a positive memory that you can return to whenever you need a mood boost.",
  steps: [
    {
      title: "Relaxed Position",
      instructions: "Find a comfortable position and close your eyes or soften your gaze.",
      duration: 10,
    },
    {
      title: "Select a Memory",
      instructions: "Think of a positive, happy memory - a time when you felt joyful, peaceful, proud, or loved. Choose one that feels vivid and emotionally powerful.",
      duration: 20,
    },
    {
      title: "Enter the Scene",
      instructions: "Mentally place yourself back in that moment. Where are you? Who is with you? What's happening around you?",
      duration: 30,
    },
    {
      title: "Visual Details",
      instructions: "Notice the visual details of this memory. Colors, light, surroundings, faces. Make the image as clear as possible.",
      duration: 30,
    },
    {
      title: "Sounds and Smells",
      instructions: "Add in any sounds, music, voices, or smells that were part of this memory. Engage all your senses.",
      duration: 20,
    },
    {
      title: "Physical Sensations",
      instructions: "Feel the physical sensations associated with this memory - perhaps warmth, lightness, relaxation, or excitement in your body.",
      duration: 20,
    },
    {
      title: "Emotional Response",
      instructions: "Let yourself fully experience the positive emotions of this moment. Allow them to grow stronger.",
      duration: 30,
    },
    {
      title: "Create an Anchor",
      instructions: "While feeling these positive emotions, create a physical anchor - perhaps touching your thumb and finger together, or placing your hand over your heart.",
      duration: 20,
    },
    {
      title: "Seal the Practice",
      instructions: "Take three deep breaths while maintaining your anchor gesture. This gesture can now help you recall these positive feelings anytime.",
      duration: 15,
    },
  ] as ExerciseStep[],
};

const MoodTools = () => {
  const [activeExercise, setActiveExercise] = useState<any | null>(null);
  const [exerciseModalOpen, setExerciseModalOpen] = useState(false);

  const startExercise = (exercise: any) => {
    setActiveExercise(exercise);
    setExerciseModalOpen(true);
  };

  const handleQuickTool = (toolName: string) => {
    // For now just show a toast - these could be expanded into mini-exercises later
    toast.success(`${toolName} activated!`, {
      description: "This mood tool would provide immediate support."
    });
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Mood Tools</h1>
        <p className="text-muted-foreground">
          Elevate your mood and cultivate emotional balance during your fresh journey
        </p>
      </div>

      <Tabs defaultValue="exercises">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="exercises">Guided Exercises</TabsTrigger>
          <TabsTrigger value="quick-tools">Quick Lifters</TabsTrigger>
        </TabsList>

        <TabsContent value="exercises" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ToolExerciseCard
              title={gratitudeExercise.title}
              description={gratitudeExercise.description}
              duration="3 minutes"
              difficulty="easy"
              tags={["Gratitude", "Positivity"]}
              popular={true}
              onStart={() => startExercise(gratitudeExercise)}
            />
            
            <ToolExerciseCard
              title={selfCompassionExercise.title}
              description={selfCompassionExercise.description}
              duration="3 minutes"
              difficulty="easy"
              tags={["Self-care", "Compassion"]}
              onStart={() => startExercise(selfCompassionExercise)}
            />
            
            <ToolExerciseCard
              title={positiveMemoryExercise.title}
              description={positiveMemoryExercise.description}
              duration="4 minutes"
              difficulty="moderate"
              tags={["Visualization", "Memory"]}
              onStart={() => startExercise(positiveMemoryExercise)}
            />

            <ToolExerciseCard
              title="Mood Tracking Reflection"
              description="Review your mood patterns and identify triggers for low moods as well as effective mood boosters."
              duration="5 minutes"
              difficulty="moderate"
              tags={["Self-awareness", "Analysis"]}
              onStart={() => toast.info("This exercise will be available soon!")}
            />

            <ToolExerciseCard
              title="Progressive Relaxation"
              description="Systematically relax each part of your body to release tension and improve your mood."
              duration="6 minutes"
              difficulty="easy"
              tags={["Relaxation", "Physical"]}
              onStart={() => toast.info("This exercise will be available soon!")}
            />
          </div>
        </TabsContent>

        <TabsContent value="quick-tools">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <QuickToolCard
              title="Smile Practice"
              description="Hold a genuine smile for 30 seconds to trigger positive neural circuits."
              icon={Smile}
              iconColor="text-yellow-500"
              iconBgColor="bg-yellow-50"
              onClick={() => handleQuickTool("Smile Practice")}
            />
            
            <QuickToolCard
              title="3 Good Things"
              description="Quickly list three positive things that have happened today, no matter how small."
              icon={Heart}
              iconColor="text-red-500"
              iconBgColor="bg-red-50"
              onClick={() => handleQuickTool("3 Good Things")}
            />
            
            <QuickToolCard
              title="Mood Playlist"
              description="Access a curated list of mood-boosting songs for an instant lift."
              icon={Music}
              iconColor="text-purple-500"
              iconBgColor="bg-purple-50"
              onClick={() => handleQuickTool("Mood Playlist")}
            />
            
            <QuickToolCard
              title="Nature Connection"
              description="Step outside or look at nature photos to improve your mood."
              icon={FlowerIcon}
              iconColor="text-green-500"
              iconBgColor="bg-green-50"
              onClick={() => handleQuickTool("Nature Connection")}
            />
            
            <QuickToolCard
              title="One-Minute Journal"
              description="Express your feelings briefly to acknowledge and process emotions."
              icon={Pencil}
              iconColor="text-blue-500"
              iconBgColor="bg-blue-50"
              onClick={() => handleQuickTool("One-Minute Journal")}
            />
            
            <QuickToolCard
              title="Mood Mantra"
              description="Repeat a personalized positive phrase to shift your mindset."
              icon={BrainCircuit}
              iconColor="text-indigo-500"
              iconBgColor="bg-indigo-50"
              onClick={() => handleQuickTool("Mood Mantra")}
            />
            
            <QuickToolCard
              title="Light Therapy"
              description="Spend 2 minutes in bright natural light to boost mood neurotransmitters."
              icon={SunMedium}
              iconColor="text-amber-500"
              iconBgColor="bg-amber-50"
              onClick={() => handleQuickTool("Light Therapy")}
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

export default MoodTools;
