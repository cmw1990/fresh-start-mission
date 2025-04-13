
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, Brain, ListChecks, Focus as FocusIcon, Headphones } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useHaptics, HapticImpact } from '@/hooks/useHaptics';

const FocusTools = () => {
  const { impact } = useHaptics();
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  
  const handleToolComplete = () => {
    impact(HapticImpact.MEDIUM);
  };

  const startTimer = () => {
    setTimerRunning(true);
    impact(HapticImpact.MEDIUM);
    
    // In a real app, we'd implement the actual timer functionality here
    setTimeout(() => {
      setTimerRunning(false);
      impact(HapticImpact.HEAVY);
    }, 5000); // Just for demo, real timer would use the actual time
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Focus Enhancement Tools</h1>
        <p className="text-muted-foreground">
          Tools and techniques to improve concentration and mental clarity
        </p>
      </div>
      
      <Tabs defaultValue="pomodoro" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
          <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>
          <TabsTrigger value="techniques">Techniques</TabsTrigger>
          <TabsTrigger value="environment">Environment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pomodoro" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="h-8 w-8 text-red-500" />
                Pomodoro Timer
              </CardTitle>
              <CardDescription>Focus intensely for 25 minutes, then take a 5-minute break</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-8">
                <div className="text-6xl font-bold tabular-nums">
                  {String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}
                </div>
                
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  <Button 
                    onClick={startTimer}
                    disabled={timerRunning}
                    variant="default"
                    className="bg-fresh-400 hover:bg-fresh-500"
                  >
                    {timerRunning ? 'In Progress...' : 'Start Focus Session'}
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      setTimerRunning(false);
                      setTimerMinutes(25);
                      setTimerSeconds(0);
                      impact(HapticImpact.LIGHT);
                    }}
                    variant="outline"
                    disabled={!timerRunning}
                  >
                    Reset
                  </Button>
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-medium">Pomodoro Technique:</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Work with complete focus for 25 minutes</li>
                  <li>Take a 5-minute break</li>
                  <li>After 4 cycles, take a longer 15-30 minute break</li>
                  <li>During focus time, avoid all distractions</li>
                </ol>
                
                <div className="bg-muted p-4 rounded-md mt-4">
                  <h4 className="font-medium">Why it works:</h4>
                  <p className="text-sm mt-1">This technique is especially helpful during nicotine withdrawal when concentration is impaired. The structured format makes focus more manageable, and the frequent breaks give your brain recovery time.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="mindfulness" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-8 w-8 text-purple-500" />
                Focused Attention Meditation
              </CardTitle>
              <CardDescription>Train your attention with this brief meditation</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>Sit comfortably with your back straight</li>
                <li>Focus your attention on your breath</li>
                <li>When your mind wanders (it will), gently return focus to breath</li>
                <li>Continue for 5 minutes, gradually increasing duration</li>
                <li>This practice strengthens your "attention muscle"</li>
              </ol>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration: 5 minutes</span>
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Start Practice
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Single-Tasking Practice</CardTitle>
              <CardDescription>Train yourself to focus on one task at a time</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">This exercise helps reset your focus capacity:</p>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>Choose one simple task (reading, writing, etc.)</li>
                <li>Set a timer for 10 minutes</li>
                <li>Focus ONLY on that task - no checking phone, no other windows open</li>
                <li>If distracted, gently bring focus back to the task</li>
                <li>Gradually increase the time as your focus improves</li>
              </ol>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration: 10 minutes</span>
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Start Exercise
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Body Scan for Focus</CardTitle>
              <CardDescription>Ground your attention through body awareness</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">This practice helps bring your scattered attention back to the present:</p>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>Sit or lie down comfortably</li>
                <li>Direct your attention to your feet</li>
                <li>Slowly move attention up through each body part</li>
                <li>Notice sensations without judgment</li>
                <li>End by bringing awareness to your whole body</li>
              </ol>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration: 5 minutes</span>
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Start Practice
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Box Breathing for Mental Clarity</CardTitle>
              <CardDescription>Clear your mind with this breathing technique</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>Inhale slowly for 4 counts</li>
                <li>Hold your breath for 4 counts</li>
                <li>Exhale slowly for 4 counts</li>
                <li>Hold your breath out for 4 counts</li>
                <li>Repeat for 2-5 minutes</li>
              </ol>
              <p className="text-sm text-muted-foreground mb-4">
                This technique balances your nervous system and promotes mental clarity. It's especially helpful when nicotine withdrawal causes brain fog or anxiety.
              </p>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration: 2 minutes</span>
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Start Breathing
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="techniques" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListChecks className="h-8 w-8 text-sky-500" />
                Task Chunking
              </CardTitle>
              <CardDescription>Break tasks into manageable chunks</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">During nicotine withdrawal, your focus capacity may be reduced. Break tasks into smaller steps:</p>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>Identify one task you need to complete</li>
                <li>Break it down into 3-5 smaller subtasks</li>
                <li>Make each chunk small enough to feel doable</li>
                <li>Focus on completing one chunk at a time</li>
                <li>Take a brief break between chunks</li>
              </ol>
              <div className="flex justify-end">
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Try This Method
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Two-Minute Rule</CardTitle>
              <CardDescription>Start with tiny commitments to overcome resistance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">When focus is challenging, use this technique:</p>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>Commit to just 2 minutes of focused work</li>
                <li>After 2 minutes, decide if you want to continue</li>
                <li>If yes, continue for another short period</li>
                <li>If no, take a break and try again later</li>
              </ol>
              <p className="text-sm text-muted-foreground mb-4">
                Starting is often the hardest part. This technique lowers the barrier to beginning, after which momentum often carries you forward.
              </p>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration: 2+ minutes</span>
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Start Timer
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Focus After Distraction Recovery</CardTitle>
              <CardDescription>Quick reset when you've lost focus</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">When you notice you've been distracted:</p>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>Take 3 deep, slow breaths</li>
                <li>State your intention: "I'm going to focus on [task] now"</li>
                <li>Close or minimize distracting tabs/apps</li>
                <li>Set a timer for 10 minutes of focused work</li>
                <li>Start with the smallest next action</li>
              </ol>
              <div className="flex justify-end">
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Practice Reset
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FocusIcon className="h-8 w-8 text-emerald-500" />
                Attention Training Exercise
              </CardTitle>
              <CardDescription>Strengthen focus like a muscle</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>Choose a mundane object (pen, paperclip, etc.)</li>
                <li>Set a timer for 3 minutes</li>
                <li>Focus exclusively on the object, examining details</li>
                <li>When mind wanders, gently bring it back</li>
                <li>Gradually increase time as your focus improves</li>
              </ol>
              <p className="text-sm text-muted-foreground mb-4">
                This practice develops concentration when nicotine isn't providing artificial focus enhancement.
              </p>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration: 3 minutes</span>
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Start Exercise
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="environment" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Distraction-Free Zone</CardTitle>
              <CardDescription>Create an environment for optimal focus</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Set up your workspace to minimize distractions:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>Clear Visual Space:</strong> Remove clutter from your desk and visual field</li>
                <li><strong>Phone Distance:</strong> Place phone out of sight, on silent</li>
                <li><strong>Browser Hygiene:</strong> Close unrelated tabs, use focus mode</li>
                <li><strong>Notification Pause:</strong> Turn off all non-essential alerts</li>
                <li><strong>Signal to Others:</strong> Use headphones or a "do not disturb" sign</li>
              </ul>
              <div className="flex justify-end">
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Create Checklist
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="h-8 w-8 text-indigo-500" />
                Focus-Enhancing Sounds
              </CardTitle>
              <CardDescription>Audio environments that promote concentration</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">These sounds can help sustain attention:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>White Noise:</strong> Masks distracting environmental sounds</li>
                <li><strong>Nature Sounds:</strong> Rain, ocean waves, forest soundscapes</li>
                <li><strong>Instrumental Music:</strong> Ambient, classical, lo-fi (no lyrics)</li>
                <li><strong>Binaural Beats:</strong> Can promote specific brain states</li>
              </ul>
              <p className="text-sm text-muted-foreground mb-4">
                Some people are more focused with background sound, others with silence. Experiment to find what works for you.
              </p>
              <div className="flex justify-end">
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Try Sample Sounds
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Focus Triggers</CardTitle>
              <CardDescription>Create cues that signal "focus time" to your brain</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Establish rituals that prepare your mind for focus:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>Physical Cue:</strong> Wear specific glasses, special workspace lighting</li>
                <li><strong>Scent Anchor:</strong> Use a specific essential oil or scent</li>
                <li><strong>Focus Playlist:</strong> Play the same music to signal focus time</li>
                <li><strong>Start-Up Ritual:</strong> 2-minute breathing exercise before work</li>
                <li><strong>Positioning:</strong> A specific posture or seating arrangement</li>
              </ul>
              <div className="flex justify-end">
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Create Your Ritual
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Digital Focus Tools</CardTitle>
              <CardDescription>Apps and extensions to support concentration</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Technology can help manage digital distractions:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>Website Blockers:</strong> Temporarily block distracting sites</li>
                <li><strong>Focus Mode:</strong> Enable on your device/browser</li>
                <li><strong>Time Tracking:</strong> Visualize how you spend time</li>
                <li><strong>Digital Wellbeing:</strong> Set app usage limits</li>
              </ul>
              <div className="flex justify-end">
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  View Recommendations
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FocusTools;
