
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useHaptics, HapticImpact } from '@/hooks/useHaptics';
import { Timer, Brain, Target, RotateCw, Pause, Play } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from "@/components/ui/badge";

const FocusTools = () => {
  const { impact } = useHaptics();
  const [activeTimer, setActiveTimer] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timerCompleted, setTimerCompleted] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Effect for running the timer
  useEffect(() => {
    let timerId: number | null = null;
    
    if (isRunning && timeRemaining > 0) {
      timerId = window.setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (isRunning && timeRemaining === 0 && !timerCompleted) {
      setIsRunning(false);
      setTimerCompleted(true);
      impact(HapticImpact.MEDIUM);
      toast.success("Focus session completed!", {
        description: "Great job staying focused. Take a short break before starting another session."
      });
    }
    
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isRunning, timeRemaining, impact, timerCompleted]);

  const startTimer = (minutes: number, timerName: string) => {
    // Convert minutes to seconds
    const seconds = minutes * 60;
    setTimeRemaining(seconds);
    setTotalTime(seconds);
    setActiveTimer(timerName);
    setIsRunning(true);
    setTimerCompleted(false);
    setIsPaused(false);
    impact(HapticImpact.LIGHT);
    
    toast.info(`${timerName} started`, {
      description: `${minutes} minute focus session has begun. Stay focused!`
    });
  };
  
  const togglePause = () => {
    setIsPaused(!isPaused);
    setIsRunning(!isRunning);
    impact(HapticImpact.LIGHT);
    
    if (isRunning) {
      toast.info("Timer paused", { description: "Resume when you're ready." });
    } else {
      toast.info("Timer resumed", { description: "Keep going!" });
    }
  };
  
  const resetTimer = () => {
    setIsRunning(false);
    setActiveTimer(null);
    setTimeRemaining(0);
    setTotalTime(0);
    setTimerCompleted(false);
    setIsPaused(false);
    impact(HapticImpact.LIGHT);
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const calculateProgress = (): number => {
    if (totalTime === 0) return 0;
    return ((totalTime - timeRemaining) / totalTime) * 100;
  };
  
  const pomodoroTimers = [
    { name: "Short Focus", duration: 25, icon: <Timer className="h-8 w-8 text-red-500" /> },
    { name: "Standard Focus", duration: 45, icon: <Timer className="h-8 w-8 text-orange-500" /> },
    { name: "Deep Focus", duration: 90, icon: <Timer className="h-8 w-8 text-amber-500" /> }
  ];
  
  const focusTechniques = [
    {
      name: "Eliminate Distractions",
      description: "Practical steps to create a distraction-free environment for maximum focus.",
      icon: <Brain className="h-6 w-6 text-indigo-500" />,
      tips: [
        "Put your phone in another room or on Do Not Disturb mode",
        "Close browser tabs and applications not needed for your task",
        "Use noise-cancelling headphones or play ambient background sounds",
        "Clear your physical workspace of clutter",
        "Let others know you need uninterrupted time"
      ]
    },
    {
      name: "Task Breakdown",
      description: "Techniques for breaking overwhelming tasks into manageable chunks.",
      icon: <Target className="h-6 w-6 text-violet-500" />,
      tips: [
        "Divide large tasks into smaller, specific subtasks",
        "Start with the easiest part to build momentum",
        "Set a clear, achievable goal for each focus session",
        "Focus on one subtask at a time, ignoring the others temporarily",
        "Celebrate completing each chunk to maintain motivation"
      ]
    },
    {
      name: "The 2-Minute Rule",
      description: "If a task takes less than 2 minutes, do it immediately without delay.",
      icon: <RotateCw className="h-6 w-6 text-purple-500" />,
      tips: [
        "Identify quick tasks that can be completed immediately",
        "Don't procrastinate on small tasks - they accumulate mental load",
        "For longer tasks, just commit to 2 minutes to overcome initial resistance",
        "Build momentum by clearing small tasks before tackling bigger ones",
        "Apply this rule consistently to reduce cognitive overwhelm"
      ]
    }
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Focus Enhancement Tools</h1>
        <p className="text-muted-foreground mt-1">
          Improve concentration during nicotine withdrawal with these evidence-based techniques.
        </p>
      </div>
      
      {/* Active Timer Section */}
      {activeTimer && (
        <Card className="mb-8 border-2 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>{activeTimer}</span>
              <Badge variant="outline" className={timerCompleted ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                {timerCompleted ? "Completed" : "In Progress"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <span className="text-4xl font-mono font-semibold">{formatTime(timeRemaining)}</span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={resetTimer}
              className="w-1/3"
            >
              Reset
            </Button>
            <Button 
              onClick={togglePause} 
              className="w-2/3 ml-2"
              disabled={timerCompleted}
            >
              {isPaused ? (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Resume
                </>
              ) : (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Pomodoro Timers Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Focus Timers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pomodoroTimers.map((timer, i) => (
            <Card key={i} className={`hover:shadow-md transition-shadow ${activeTimer === timer.name ? 'border-primary/50 bg-primary/5' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-center">
                  {timer.icon}
                </div>
                <CardTitle className="text-center">{timer.name}</CardTitle>
                <CardDescription className="text-center">{timer.duration} minutes</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => startTimer(timer.duration, timer.name)}
                  disabled={isRunning && activeTimer !== timer.name}
                >
                  {activeTimer === timer.name && isRunning ? 'In Progress...' : 'Start Timer'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Focus Technique Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Focus Techniques</h2>
        <div className="space-y-4">
          {focusTechniques.map((technique, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <span className="mr-2">{technique.icon}</span>
                  {technique.name}
                </CardTitle>
                <CardDescription>{technique.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {technique.tips.map((tip, j) => (
                    <li key={j} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FocusTools;
