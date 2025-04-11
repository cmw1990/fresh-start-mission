
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Timer, Zap, CheckCircle, List } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FocusTools = () => {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60); // 25 minutes in seconds
  const [totalTime, setTotalTime] = useState(25 * 60);
  const [timerType, setTimerType] = useState<"pomodoro" | "break">("pomodoro");
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState<{id: number, text: string, completed: boolean}[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsTimerActive(false);
            toast.success(
              timerType === "pomodoro" 
                ? "Focus session completed!" 
                : "Break completed!", 
              {
                description: timerType === "pomodoro"
                  ? "Great work! Time for a short break."
                  : "Ready to focus again?"
              }
            );
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timerType]);
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = (minutes: number, type: "pomodoro" | "break") => {
    const seconds = minutes * 60;
    setTimeRemaining(seconds);
    setTotalTime(seconds);
    setTimerType(type);
    setIsTimerActive(true);
  };

  const pauseTimer = () => {
    setIsTimerActive(false);
  };

  const resetTimer = () => {
    setIsTimerActive(false);
    setTimeRemaining(totalTime);
  };
  
  const addTask = () => {
    if (!newTask.trim()) return;
    
    setTaskList(prev => [...prev, {
      id: Date.now(),
      text: newTask,
      completed: false
    }]);
    setNewTask("");
  };
  
  const toggleTaskCompletion = (id: number) => {
    setTaskList(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const deleteTask = (id: number) => {
    setTaskList(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Focus Enhancers</h1>
        <p className="text-muted-foreground">
          Tools to improve concentration and mental clarity during withdrawal periods
        </p>
      </div>

      <Tabs defaultValue="pomodoro" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pomodoro">Pomodoro Timer</TabsTrigger>
          <TabsTrigger value="techniques">Focus Techniques</TabsTrigger>
          <TabsTrigger value="tasks">Task Management</TabsTrigger>
        </TabsList>

        <TabsContent value="pomodoro" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="bg-fresh-50">
                  <Timer className="h-6 w-6 text-fresh-500 mb-2" />
                  <CardTitle>Pomodoro Focus Timer</CardTitle>
                  <CardDescription>
                    Work in focused intervals with short breaks to maximize productivity
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <div className="text-center mb-6">
                      <span className="text-6xl font-bold text-fresh-500">{formatTime(timeRemaining)}</span>
                      <p className="text-sm text-muted-foreground mt-2">
                        {timerType === "pomodoro" ? "Focus Session" : "Break Time"}
                      </p>
                    </div>
                    <Progress 
                      value={(timeRemaining / totalTime) * 100} 
                      className="h-2 mb-4" 
                    />
                    <div className="flex space-x-4 justify-center">
                      {isTimerActive ? (
                        <Button 
                          variant="outline" 
                          onClick={pauseTimer}
                        >
                          Pause
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => startTimer(25, "pomodoro")}
                          className="bg-fresh-300 hover:bg-fresh-400"
                        >
                          Start 25 min Focus
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        onClick={resetTimer}
                      >
                        Reset
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => startTimer(5, "break")}
                      >
                        5 min Break
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="current-task">What are you focusing on?</Label>
                      <Input 
                        id="current-task"
                        placeholder="E.g., Complete work report, Read chapter 3..."
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => {
                      if (task.trim()) {
                        setTaskList(prev => [...prev, {
                          id: Date.now(),
                          text: task,
                          completed: false
                        }]);
                        toast.success("Task added to your list!");
                        setTask("");
                      }
                    }} 
                    className="w-full bg-fresh-300 hover:bg-fresh-400"
                  >
                    Save Task
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>About The Pomodoro Technique</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    The Pomodoro Technique helps maintain focus and combat brain fog during nicotine withdrawal.
                  </p>
                  <div className="space-y-3">
                    <div className="pl-4 border-l-2 border-fresh-300">
                      <p className="font-medium">1. Focus for 25 minutes</p>
                      <p className="text-sm text-muted-foreground">Commit to a single task</p>
                    </div>
                    <div className="pl-4 border-l-2 border-fresh-300">
                      <p className="font-medium">2. Take a 5 minute break</p>
                      <p className="text-sm text-muted-foreground">Rest and recharge</p>
                    </div>
                    <div className="pl-4 border-l-2 border-fresh-300">
                      <p className="font-medium">3. Repeat 4 times</p>
                      <p className="text-sm text-muted-foreground">Build a productive rhythm</p>
                    </div>
                    <div className="pl-4 border-l-2 border-fresh-300">
                      <p className="font-medium">4. Take a longer break</p>
                      <p className="text-sm text-muted-foreground">15-30 minutes to recover</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-fresh-50 rounded-md text-sm">
                    <p className="font-medium">Why It Works During Withdrawal</p>
                    <p className="text-muted-foreground mt-1">
                      Short, focused intervals are easier to manage when concentration is affected by nicotine withdrawal. 
                      The structure helps overcome brain fog and reduced attention span.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="techniques" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="bg-fresh-50">
                <Zap className="h-6 w-6 text-fresh-500 mb-2" />
                <CardTitle>Brain Fog Busters</CardTitle>
                <CardDescription>
                  Quick exercises to improve mental clarity
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h4 className="font-medium mb-2">Box Breathing (2 minutes)</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Increases oxygen to your brain and helps clear mental fog. Especially helpful when a 
                      craving is affecting your concentration.
                    </p>
                    <ol className="text-sm space-y-1 pl-5 list-decimal">
                      <li>Inhale through your nose for 4 seconds</li>
                      <li>Hold your breath for 4 seconds</li>
                      <li>Exhale through your mouth for 4 seconds</li>
                      <li>Hold your breath for 4 seconds</li>
                      <li>Repeat 4 times</li>
                    </ol>
                    <Button 
                      className="mt-4 w-full bg-fresh-300 hover:bg-fresh-400"
                      size="sm"
                      onClick={() => {
                        toast.success("Starting Box Breathing", { description: "Follow along with the prompts" });
                      }}
                    >
                      Start Box Breathing
                    </Button>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h4 className="font-medium mb-2">Mental Clarity Exercise (3 minutes)</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      This exercise helps sort through the mental noise that often accompanies 
                      nicotine withdrawal.
                    </p>
                    <ol className="text-sm space-y-1 pl-5 list-decimal">
                      <li>Take a blank page (digital or physical)</li>
                      <li>Write down every thought that's occupying your mind right now</li>
                      <li>Circle the 3 most important items</li>
                      <li>Choose 1 action step for each circled item</li>
                    </ol>
                    <Button 
                      className="mt-4 w-full bg-fresh-300 hover:bg-fresh-400"
                      size="sm"
                      onClick={() => {
                        toast.success("Exercise started", { description: "Open your note app or grab a paper" });
                      }}
                    >
                      Start Mental Clarity Exercise
                    </Button>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Brain Refresher (30 seconds)</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      A quick physical reset when brain fog hits during important tasks.
                    </p>
                    <ol className="text-sm space-y-1 pl-5 list-decimal">
                      <li>Stand up and stretch your arms overhead</li>
                      <li>Gently tilt your head back</li>
                      <li>Take 3 deep breaths</li>
                      <li>Gently massage your temples for 10 seconds</li>
                    </ol>
                    <Button 
                      className="mt-4 w-full bg-fresh-300 hover:bg-fresh-400"
                      size="sm"
                      onClick={() => {
                        toast.success("Brain refresher activated", { description: "Take 30 seconds for yourself" });
                      }}
                    >
                      Start Brain Refresher
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-fresh-50">
                <Brain className="h-6 w-6 text-fresh-500 mb-2" />
                <CardTitle>Concentration Strategies</CardTitle>
                <CardDescription>
                  Practical approaches to maintain focus during withdrawal
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h4 className="font-medium mb-2">The 5-Second Rule</h4>
                    <p className="text-sm text-muted-foreground">
                      When you feel your concentration slipping or a craving hits:
                    </p>
                    <ol className="text-sm mt-2 space-y-1 pl-5 list-decimal">
                      <li>Count down from 5 in your mind: 5-4-3-2-1</li>
                      <li>Immediately take one small action (write one sentence, organize one item)</li>
                      <li>This interrupts the distraction pattern and reactivates your focus</li>
                    </ol>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h4 className="font-medium mb-2">Environment Optimization</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Make these adjustments to create a focus-friendly environment:
                    </p>
                    <ul className="text-sm space-y-1 pl-5 list-disc">
                      <li>Remove all smoking/vaping paraphernalia from your workspace</li>
                      <li>Keep a full water bottle within reach</li>
                      <li>Have healthy snacks available (nuts, fruit, gum)</li>
                      <li>Turn on "Do Not Disturb" on devices when focusing</li>
                      <li>Add a small plant to your workspace (improves air quality and mood)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Task Sizing Technique</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      During withdrawal, your ability to focus may be reduced. Adjust by:
                    </p>
                    <ul className="text-sm space-y-1 pl-5 list-disc">
                      <li>Breaking large tasks into 10-15 minute mini-tasks</li>
                      <li>Setting clear, concrete outcomes for each mini-task</li>
                      <li>Celebrating the completion of each mini-task</li>
                      <li>Taking short breaks (2-3 minutes) between mini-tasks</li>
                    </ul>
                    <div className="mt-4 p-3 bg-fresh-50 rounded-md">
                      <p className="text-sm font-medium">Expert Tip</p>
                      <p className="text-xs text-muted-foreground">
                        Your focus will naturally improve as you progress in your fresh journey.
                        Nicotine withdrawal typically impacts concentration most severely in the first 2 weeks.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <List className="h-6 w-6 text-fresh-500 mr-2" />
                Focus Task List
              </CardTitle>
              <CardDescription>
                Break down your work into manageable tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input 
                    placeholder="Add a new task..." 
                    value={newTask} 
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addTask();
                      }
                    }}
                  />
                  <Button onClick={addTask} className="bg-fresh-300 hover:bg-fresh-400">
                    Add
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {taskList.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">
                      No tasks yet. Add some tasks to get started!
                    </div>
                  ) : (
                    taskList.map(task => (
                      <div 
                        key={task.id} 
                        className={`p-3 border rounded-md flex items-center justify-between ${
                          task.completed ? 'bg-fresh-50 border-fresh-200' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <CheckCircle 
                            className={`h-5 w-5 cursor-pointer ${
                              task.completed ? 'text-fresh-500' : 'text-gray-300'
                            }`}
                            onClick={() => toggleTaskCompletion(task.id)}
                          />
                          <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                            {task.text}
                          </span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => deleteTask(task.id)}
                        >
                          ×
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                {taskList.filter(t => t.completed).length} of {taskList.length} tasks completed
              </div>
              {taskList.some(t => t.completed) && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setTaskList(prev => prev.filter(t => !t.completed));
                    toast.success("Completed tasks cleared!");
                  }}
                >
                  Clear completed
                </Button>
              )}
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="bg-fresh-50">
              <CardTitle>Focus Tips During Withdrawal</CardTitle>
              <CardDescription>
                Research-backed strategies for maintaining concentration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="pl-4 border-l-2 border-fresh-300">
                  <h4 className="font-medium">Work With Your Body's Rhythm</h4>
                  <p className="text-sm text-muted-foreground">
                    Schedule your most demanding tasks for times of day when you typically feel most alert.
                    Many ex-smokers report mid-morning (9-11am) is their best focus window.
                  </p>
                </div>
                <div className="pl-4 border-l-2 border-fresh-300">
                  <h4 className="font-medium">The 2-Minute Rule</h4>
                  <p className="text-sm text-muted-foreground">
                    If a task takes less than 2 minutes, do it immediately. This builds momentum and reduces
                    the mental load that can feel overwhelming during nicotine withdrawal.
                  </p>
                </div>
                <div className="pl-4 border-l-2 border-fresh-300">
                  <h4 className="font-medium">Strategic Caffeine Use</h4>
                  <p className="text-sm text-muted-foreground">
                    Small amounts of caffeine (50-100mg) can help with focus, but too much can worsen anxiety
                    and cravings. Consider green tea for a gentler mental boost with L-theanine.
                  </p>
                </div>
                <div className="pl-4 border-l-2 border-fresh-300">
                  <h4 className="font-medium">Replace the Ritual</h4>
                  <p className="text-sm text-muted-foreground">
                    If you used smoking as a thinking/focusing ritual, create a new pre-focus routine:
                    brewing tea, a short walk, or a specific breathing exercise can be effective alternatives.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FocusTools;
