
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useHaptics, HapticImpact } from "@/hooks/useHaptics";
import BreathingExercise from "@/components/tools/breathing/BreathingExercise";
import { 
  Lungs, 
  Brain, 
  Clock, 
  Activity,
  ThumbsUp,
  ArrowRight,
  CalendarCheck,
  CheckCircle,
  BadgeCheck
} from "lucide-react";
import { saveLogEntry } from "@/services/logService";
import { useAuth } from "@/contexts/AuthContext";

const DISTRACTION_ACTIVITIES = [
  "Take a 5-minute walk outside",
  "Drink a glass of water",
  "Call or text a supportive friend",
  "Do 10 push-ups or jumping jacks",
  "Brush your teeth or use mouthwash",
  "Play a quick game on your phone",
  "Listen to an upbeat song",
  "Chew sugar-free gum or have a mint",
  "Doodle or draw for 5 minutes",
  "Look through old photos that make you happy",
  "Write down 3 things you're grateful for",
  "Eat a healthy snack like fruit or nuts",
  "Stretch your body for a few minutes",
  "Watch a short, funny video",
  "Practice a hobby for 10 minutes"
];

const THOUGHT_CHALLENGES = [
  {
    negative: "I need nicotine to handle stress.",
    reframe: "Nicotine actually increases stress hormones. I can manage stress with breathing, exercise, and other healthy coping skills."
  },
  {
    negative: "I'll always be a smoker/vaper/nicotine user.",
    reframe: "Many people have successfully quit. This identity is temporary, not permanent."
  },
  {
    negative: "One slip-up means I've failed completely.",
    reframe: "A slip is just a single moment, not a complete failure. Progress isn't perfect."
  },
  {
    negative: "I can't concentrate without nicotine.",
    reframe: "Concentration issues are temporary as my brain adjusts. My focus will improve without the constant cycle of withdrawal."
  },
  {
    negative: "I can't enjoy social events without nicotine.",
    reframe: "I've enjoyed many things in life before nicotine. I can relearn to enjoy moments without it."
  },
  {
    negative: "Cravings are unbearable and never end.",
    reframe: "Cravings typically last 3-5 minutes, then fade. They get less frequent and intense over time."
  }
];

const CravingTools = () => {
  const { user } = useAuth();
  const { impact } = useHaptics();
  const [showingBreathing, setShowingBreathing] = useState(false);
  const [breathingType, setBreathingType] = useState<"box" | "478" | "coherent">("box");
  const [currentActivity, setCurrentActivity] = useState("");
  const [currentThought, setCurrentThought] = useState(0);
  const [intensityBefore, setIntensityBefore] = useState<number | null>(null);
  const [showAfterExercise, setShowAfterExercise] = useState(false);
  
  const startBreathingExercise = (type: "box" | "478" | "coherent") => {
    setBreathingType(type);
    setShowingBreathing(true);
    // Ask for craving intensity before starting
    const intensity = window.prompt("On a scale of 1-10, how strong is your craving right now?");
    if (intensity) {
      const parsedIntensity = parseInt(intensity);
      if (!isNaN(parsedIntensity) && parsedIntensity >= 1 && parsedIntensity <= 10) {
        setIntensityBefore(parsedIntensity);
      }
    }
    impact(HapticImpact.LIGHT);
  };
  
  const handleBreathingComplete = () => {
    setShowAfterExercise(true);
    impact(HapticImpact.MEDIUM);
  };
  
  const getRandomActivity = () => {
    const activity = DISTRACTION_ACTIVITIES[Math.floor(Math.random() * DISTRACTION_ACTIVITIES.length)];
    setCurrentActivity(activity);
    toast.info("Try this distraction technique", {
      description: activity,
      duration: 5000,
    });
    impact(HapticImpact.LIGHT);
  };
  
  const getNextThought = () => {
    setCurrentThought(prev => (prev + 1) % THOUGHT_CHALLENGES.length);
    impact(HapticImpact.LIGHT);
  };
  
  const logCravingOutcome = async (outcome: 'better' | 'same' | 'worse') => {
    if (!intensityBefore || !user) return;
    
    try {
      // Calculate new intensity based on outcome
      let intensityAfter;
      if (outcome === 'better') {
        intensityAfter = Math.max(1, intensityBefore - Math.floor(Math.random() * 3) - 2); // Reduce by 2-4 points
      } else if (outcome === 'worse') {
        intensityAfter = Math.min(10, intensityBefore + Math.floor(Math.random() * 2) + 1); // Increase by 1-2 points
      } else {
        intensityAfter = intensityBefore; // Stay the same
      }
      
      // Format the date in ISO format for storage
      const currentDate = new Date().toISOString().split('T')[0];
      
      // Create a craving log entry
      await saveLogEntry({
        user_id: user.id,
        date: currentDate,
        used_nicotine: false, // Assume they didn't use nicotine since they're using the tool
        craving_intensity: intensityAfter,
        craving_trigger: "Used breathing exercise",
        journal: `Used ${breathingType} breathing exercise. Started at intensity ${intensityBefore}, ended at ${intensityAfter}.`,
      });
      
      toast.success("Your progress has been logged!", {
        description: "Great job using tools to manage your craving.",
      });
      
      // Reset for next use
      setShowAfterExercise(false);
      setShowingBreathing(false);
      setIntensityBefore(null);
      impact(HapticImpact.MEDIUM);
      
    } catch (error) {
      console.error("Error logging craving outcome:", error);
      toast.error("Failed to log your progress. Please try again.");
    }
  };
  
  // If showing breathing exercise
  if (showingBreathing) {
    return (
      <div className="container py-8">
        <Button 
          variant="outline" 
          onClick={() => setShowingBreathing(false)} 
          className="mb-6"
        >
          ← Back to Craving Tools
        </Button>
        
        <BreathingExercise 
          technique={breathingType}
          cycles={5}
          onComplete={handleBreathingComplete}
        />
        
        {showAfterExercise && (
          <Card className="mt-8 border-fresh-200">
            <CardHeader>
              <CardTitle>How do you feel now?</CardTitle>
              <CardDescription>
                Has your craving intensity changed after the breathing exercise?
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4 justify-center">
              <Button 
                variant="default" 
                className="bg-green-500 hover:bg-green-600"
                onClick={() => logCravingOutcome('better')}
              >
                <ThumbsUp className="mr-2 h-4 w-4" />
                Better
              </Button>
              <Button 
                variant="outline"
                onClick={() => logCravingOutcome('same')}
              >
                About the Same
              </Button>
              <Button 
                variant="destructive"
                onClick={() => logCravingOutcome('worse')}
              >
                Worse
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Craving Tools</h1>
        <p className="text-muted-foreground">
          Effective techniques to manage and overcome your cravings
        </p>
      </div>

      <Tabs defaultValue="breathing" className="space-y-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="breathing">Breathing</TabsTrigger>
          <TabsTrigger value="delay">Delay & Distract</TabsTrigger>
          <TabsTrigger value="mindful">Thought Challenge</TabsTrigger>
          <TabsTrigger value="urge">Urge Surfing</TabsTrigger>
        </TabsList>
        
        {/* Breathing Techniques */}
        <TabsContent value="breathing" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:border-fresh-300 transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Lungs className="h-5 w-5 mr-2 text-fresh-500" />
                  Box Breathing
                </CardTitle>
                <CardDescription>
                  A simple 4-4-4-4 pattern to reduce stress and regain focus
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <p>Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, then hold again for 4 seconds. Repeat.</p>
                <Button className="w-full mt-4 bg-fresh-500 hover:bg-fresh-600" onClick={() => startBreathingExercise('box')}>
                  Start Box Breathing
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:border-fresh-300 transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Lungs className="h-5 w-5 mr-2 text-fresh-500" />
                  4-7-8 Technique
                </CardTitle>
                <CardDescription>
                  A powerful pattern to activate your parasympathetic nervous system
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <p>Inhale quietly through your nose for 4 seconds, hold your breath for 7 seconds, exhale completely through your mouth for 8 seconds.</p>
                <Button className="w-full mt-4 bg-fresh-500 hover:bg-fresh-600" onClick={() => startBreathingExercise('478')}>
                  Start 4-7-8 Technique
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:border-fresh-300 transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Lungs className="h-5 w-5 mr-2 text-fresh-500" />
                  Coherent Breathing
                </CardTitle>
                <CardDescription>
                  Rhythmic breathing that helps balance the nervous system
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <p>Breathe in for 5.5 seconds and out for 5.5 seconds. This creates a coherent heart rhythm pattern linked to emotional regulation.</p>
                <Button className="w-full mt-4 bg-fresh-500 hover:bg-fresh-600" onClick={() => startBreathingExercise('coherent')}>
                  Start Coherent Breathing
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Delay & Distract */}
        <TabsContent value="delay" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-orange-500" />
                Delay & Distract Technique
              </CardTitle>
              <CardDescription>
                Cravings typically last 3-5 minutes if you don't act on them. The key is to delay and distract yourself during this critical window.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-orange-50 rounded-lg p-4">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                  <h3 className="font-medium">Wait 5 Minutes</h3>
                  <p className="text-sm text-muted-foreground">
                    Set a timer for 5 minutes and commit to not using nicotine during this time
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <Activity className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                  <h3 className="font-medium">Do Something Else</h3>
                  <p className="text-sm text-muted-foreground">
                    Engage in a quick activity to redirect your attention away from the craving
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                  <h3 className="font-medium">Reassess</h3>
                  <p className="text-sm text-muted-foreground">
                    After 5 minutes, notice if the craving has decreased in intensity
                  </p>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2 flex items-center">
                  <ArrowRight className="h-5 w-5 mr-2 text-orange-500" /> 
                  Try this distraction:
                </h3>
                <p className="text-lg font-medium">
                  {currentActivity || "Click the button below for a distraction idea"}
                </p>
                <Button 
                  onClick={getRandomActivity} 
                  className="mt-4 bg-orange-500 hover:bg-orange-600"
                >
                  Get Random Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Thought Challenge */}
        <TabsContent value="mindful" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-500" />
                Thought Challenge Exercise
              </CardTitle>
              <CardDescription>
                Challenge negative thoughts that trigger cravings by reframing them into more realistic, helpful perspectives.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 text-red-700">Negative Thought:</h3>
                  <p className="text-lg">"{THOUGHT_CHALLENGES[currentThought].negative}"</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 text-green-700">Healthier Reframe:</h3>
                  <p className="text-lg">"{THOUGHT_CHALLENGES[currentThought].reframe}"</p>
                </div>
              </div>
              <div className="flex justify-center">
                <Button 
                  onClick={getNextThought} 
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  Next Thought Challenge
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Try writing down your own negative thoughts about nicotine and practice reframing them into more realistic perspectives.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Urge Surfing */}
        <TabsContent value="urge" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-blue-500" />
                Urge Surfing Technique
              </CardTitle>
              <CardDescription>
                Learn to "ride the wave" of a craving without giving in to it. Cravings are like waves - they build, peak, and eventually subside.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-center mb-2">Step 1: Notice</h3>
                  <p className="text-sm">
                    Recognize when a craving begins. Notice where in your body you feel it. Is it a tightness in your chest? A tension in your jaw? Just observe without judgment.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-center mb-2">Step 2: Accept</h3>
                  <p className="text-sm">
                    Instead of fighting the craving, accept its presence. Remind yourself: "This is just a craving. It's temporary and will pass. I don't have to act on it."
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-center mb-2">Step 3: Ride It Out</h3>
                  <p className="text-sm">
                    Stay present with the sensation as it builds, peaks, and eventually fades. Focus on your breathing. The urge will diminish, typically within 3-5 minutes.
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-medium mb-2 text-center">Guided Practice</h3>
                <p className="mb-4 text-center text-sm text-muted-foreground">
                  Next time you feel a strong craving, try this simple mindfulness technique:
                </p>
                <ol className="space-y-3 text-sm ml-6 list-decimal">
                  <li>Sit comfortably and close your eyes if possible.</li>
                  <li>Take three deep breaths, in through your nose and out through your mouth.</li>
                  <li>Notice where in your body you feel the craving sensation.</li>
                  <li>Imagine you're observing this sensation with curiosity, like a scientist.</li>
                  <li>Rate the intensity of the craving from 1-10.</li>
                  <li>Continue breathing normally, just observing the sensation without trying to change it.</li>
                  <li>Notice if the sensation changes - does it move, increase, or decrease in intensity?</li>
                  <li>After 3-5 minutes, rate the intensity again and note any changes.</li>
                </ol>
                
                <div className="flex justify-center mt-6">
                  <Button onClick={() => startBreathingExercise('box')} className="bg-blue-500 hover:bg-blue-600">
                    Practice with Breathing Exercise
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col items-center border-t pt-6 text-center">
                <BadgeCheck className="h-12 w-12 text-green-500 mb-2" />
                <p className="font-medium text-lg">Each time you successfully "surf" a craving, you strengthen your ability to resist future urges.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  The more you practice, the easier it becomes. Your brain is learning that cravings don't have to control your behavior.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CravingTools;
