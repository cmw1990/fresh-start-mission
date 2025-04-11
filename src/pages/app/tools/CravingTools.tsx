
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Flame, Droplets, Calendar, ClipboardCheck, Timer, Footprints } from "lucide-react";

const breathingSteps = [
  "Inhale slowly through your nose for 4 seconds",
  "Hold your breath for 2 seconds",
  "Exhale slowly through your mouth for 6 seconds",
  "Rest for 2 seconds",
];

const CravingTools = () => {
  const [currentBreathingStep, setCurrentBreathingStep] = useState(0);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(false);

  const startBreathingExercise = () => {
    setIsBreathingActive(true);
    setCurrentBreathingStep(0);
    setProgress(0);

    const duration = 14; // Total seconds for one breath cycle
    const interval = 100; // Update every 100ms for smoothness
    let elapsed = 0;

    const breathingInterval = setInterval(() => {
      elapsed += interval / 1000;
      const stepProgress = (elapsed % (duration / 4)) / (duration / 4);
      const currentStep = Math.floor((elapsed % duration) / (duration / 4));
      
      setCurrentBreathingStep(currentStep);
      setProgress(stepProgress * 100);

      if (!isBreathingActive) {
        clearInterval(breathingInterval);
      }
    }, interval);

    return () => clearInterval(breathingInterval);
  };

  const stopBreathingExercise = () => {
    setIsBreathingActive(false);
  };

  const startTimer = () => {
    setIsTimerActive(true);
    
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerInterval);
          setIsTimerActive(false);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  };

  const stopTimer = () => {
    setIsTimerActive(false);
  };

  const resetTimer = () => {
    setIsTimerActive(false);
    setTimer(300);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Craving Tools</h1>
        <p className="text-muted-foreground">
          Tools and techniques to help you manage cravings effectively
        </p>
      </div>

      <Tabs defaultValue="breathing" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="breathing">Breathing</TabsTrigger>
          <TabsTrigger value="delay">Delay & Distract</TabsTrigger>
          <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>
          <TabsTrigger value="thoughts">Challenge Thoughts</TabsTrigger>
        </TabsList>

        <TabsContent value="breathing" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-fresh-300" />
                Guided Breathing Exercise
              </CardTitle>
              <CardDescription>
                Deep breathing can reduce craving intensity and help you stay calm
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-fresh-50 p-6 rounded-lg border border-fresh-100">
                <h3 className="text-xl font-medium mb-4">
                  {isBreathingActive ? breathingSteps[currentBreathingStep] : "Ready to begin?"}
                </h3>
                {isBreathingActive && (
                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <div className="text-sm text-muted-foreground text-right">
                      Step {currentBreathingStep + 1} of 4
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">How It Works:</h3>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>Inhale slowly through your nose for 4 seconds</li>
                  <li>Hold your breath for 2 seconds</li>
                  <li>Exhale slowly through your mouth for 6 seconds</li>
                  <li>Rest for 2 seconds before repeating</li>
                </ol>
                <p className="text-sm text-muted-foreground">
                  Continue this breathing pattern for 3-5 minutes or until the
                  craving passes. The exercise helps activate your parasympathetic
                  nervous system, reducing stress and anxiety that often accompany
                  cravings.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-4">
              {!isBreathingActive ? (
                <Button 
                  className="w-full bg-fresh-300 hover:bg-fresh-400"
                  onClick={startBreathingExercise}
                >
                  Start Breathing Exercise
                </Button>
              ) : (
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={stopBreathingExercise}
                >
                  Stop Exercise
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="delay" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-fresh-300" />
                Delay & Distract Technique
              </CardTitle>
              <CardDescription>
                Most cravings pass within 5-10 minutes if you can delay and distract yourself
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-fresh-50 p-6 rounded-lg border border-fresh-100 text-center">
                <h3 className="text-2xl font-medium mb-2">
                  {formatTime(timer)}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {isTimerActive ? "Your craving will pass. Stay strong!" : "Set a 5-minute timer and try to delay using nicotine"}
                </p>
                <div className="flex gap-4 justify-center">
                  {!isTimerActive ? (
                    <Button 
                      className="bg-fresh-300 hover:bg-fresh-400"
                      onClick={startTimer}
                    >
                      Start Timer
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant="outline"
                        onClick={stopTimer}
                      >
                        Pause
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={resetTimer}
                      >
                        Reset
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Distraction Ideas:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <Footprints className="h-5 w-5 text-fresh-300 mt-0.5" />
                    <div>
                      <p className="font-medium">Take a short walk</p>
                      <p className="text-sm text-muted-foreground">Even just around your room or office</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Droplets className="h-5 w-5 text-fresh-300 mt-0.5" />
                    <div>
                      <p className="font-medium">Drink a glass of water</p>
                      <p className="text-sm text-muted-foreground">Slowly and mindfully</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-fresh-300 mt-0.5" />
                    <div>
                      <p className="font-medium">Plan your day</p>
                      <p className="text-sm text-muted-foreground">Write out a quick to-do list</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <ClipboardCheck className="h-5 w-5 text-fresh-300 mt-0.5" />
                    <div>
                      <p className="font-medium">Complete a small task</p>
                      <p className="text-sm text-muted-foreground">Something quick that gives a sense of accomplishment</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mindfulness" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-fresh-300" />
                Mindfulness for Cravings
              </CardTitle>
              <CardDescription>
                Observe your cravings without judgment to reduce their power over you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-fresh-50 p-6 rounded-lg border border-fresh-100">
                <h3 className="text-lg font-medium mb-4">
                  1-Minute Craving Observation Exercise
                </h3>
                <ol className="list-decimal list-inside space-y-4 ml-2">
                  <li className="text-muted-foreground">
                    <span className="text-foreground font-medium">Notice the craving:</span> Where do you feel it in your body? Is it a tightness, tingling, or emptiness?
                  </li>
                  <li className="text-muted-foreground">
                    <span className="text-foreground font-medium">Breathe into it:</span> Take deep breaths and imagine breathing directly into the area where you feel the craving.
                  </li>
                  <li className="text-muted-foreground">
                    <span className="text-foreground font-medium">Label it:</span> Say to yourself, "This is just a craving. It will pass."
                  </li>
                  <li className="text-muted-foreground">
                    <span className="text-foreground font-medium">Let it be:</span> Allow the sensation to be there without fighting it or acting on it.
                  </li>
                </ol>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Remember:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Cravings are temporary sensations that will pass</li>
                  <li>• You don't have to act on every thought or urge you have</li>
                  <li>• Each time you ride out a craving, you build strength</li>
                  <li>• The more you practice mindfulness, the more effective it becomes</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-fresh-300 hover:bg-fresh-400">
                Start Guided Audio Practice
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="thoughts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-fresh-300" />
                Challenge Negative Thoughts
              </CardTitle>
              <CardDescription>
                Identify and reframe the thoughts that lead to cravings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-fresh-50 rounded-lg border border-fresh-100">
                  <h3 className="font-semibold mb-2">Common Craving Thoughts:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-fresh-500">Unhelpful Thought</p>
                      <p className="text-muted-foreground">"Just one won't hurt."</p>
                    </div>
                    <div>
                      <p className="font-medium text-teal-500">Helpful Response</p>
                      <p className="text-muted-foreground">"One leads to another. I've worked too hard to go back now."</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-fresh-50 rounded-lg border border-fresh-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-fresh-500">Unhelpful Thought</p>
                      <p className="text-muted-foreground">"I can't concentrate without nicotine."</p>
                    </div>
                    <div>
                      <p className="font-medium text-teal-500">Helpful Response</p>
                      <p className="text-muted-foreground">"My brain is healing and learning to focus without nicotine. This is temporary."</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-fresh-50 rounded-lg border border-fresh-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-fresh-500">Unhelpful Thought</p>
                      <p className="text-muted-foreground">"I feel so anxious without it."</p>
                    </div>
                    <div>
                      <p className="font-medium text-teal-500">Helpful Response</p>
                      <p className="text-muted-foreground">"Nicotine actually increases anxiety over time. I can use healthier techniques to manage stress."</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-3">Practice Thought Challenging:</h3>
                <p className="text-muted-foreground mb-4">
                  When you notice a thought making you want to use nicotine, try this:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-2">
                  <li>Write down the thought exactly as it occurs to you</li>
                  <li>Ask: Is this thought 100% true? What evidence contradicts it?</li>
                  <li>What would I tell a friend who had this thought?</li>
                  <li>Write a more balanced, helpful thought to replace it</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CravingTools;
