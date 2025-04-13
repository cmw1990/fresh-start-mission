
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lungs, Brain, Clock, Timer } from 'lucide-react';
import BreathingExercise from '@/components/tools/breathing/BreathingExercise';
import { toast } from 'sonner';

const CravingTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState('breathing');
  
  const handleExerciseComplete = () => {
    toast.success("Exercise completed! Great job managing your craving.");
  };
  
  return (
    <div className="container max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Craving Management Tools</h1>
      
      <p className="text-muted-foreground mb-6">
        These evidence-based techniques can help you manage cravings as they arise. 
        Practice them regularly for best results. When a craving hits, try one of these 
        exercises instead of reaching for nicotine.
      </p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="breathing" className="flex flex-col items-center gap-2 py-3">
            <Lungs className="h-5 w-5" />
            <span>Breathing</span>
          </TabsTrigger>
          <TabsTrigger value="distraction" className="flex flex-col items-center gap-2 py-3">
            <Brain className="h-5 w-5" />
            <span>Distraction</span>
          </TabsTrigger>
          <TabsTrigger value="delay" className="flex flex-col items-center gap-2 py-3">
            <Clock className="h-5 w-5" />
            <span>Delay</span>
          </TabsTrigger>
          <TabsTrigger value="mindfulness" className="flex flex-col items-center gap-2 py-3">
            <Timer className="h-5 w-5" />
            <span>Mindfulness</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="breathing" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="cursor-pointer hover:border-primary transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Box Breathing</CardTitle>
                <CardDescription>4-4-4-4 pattern</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">
                  Equal counts for inhale, hold, exhale, and rest. Great for reducing anxiety during cravings.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setActiveTab('box-breathing')}
                >
                  Start Exercise
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="cursor-pointer hover:border-primary transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Relaxing Breath</CardTitle>
                <CardDescription>4-7-8 pattern</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">
                  Activate your parasympathetic nervous system to calm intense cravings.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setActiveTab('relaxing-breathing')}
                >
                  Start Exercise
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="cursor-pointer hover:border-primary transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Energizing Breath</CardTitle>
                <CardDescription>6-0-2 pattern</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">
                  Use when cravings are associated with low energy or fatigue.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setActiveTab('energizing-breathing')}
                >
                  Start Exercise
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="distraction">
          <Card>
            <CardHeader>
              <CardTitle>Distraction Techniques</CardTitle>
              <CardDescription>Redirect your focus away from cravings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>When a craving strikes, try these evidence-based distraction techniques:</p>
                
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <span className="font-medium">The 5-Minute Rule</span>: 
                    Promise yourself to wait just 5 minutes before giving into a craving. 
                    Most cravings pass within this timeframe.
                  </li>
                  <li>
                    <span className="font-medium">Physical Displacement</span>: 
                    Change your physical location immediately. Go to a different room, 
                    step outside, or walk around the block.
                  </li>
                  <li>
                    <span className="font-medium">Mental Distraction</span>: 
                    Play a quick game on your phone, call a friend, or do a crossword puzzle.
                  </li>
                  <li>
                    <span className="font-medium">Sensory Replacement</span>: 
                    Try sugar-free gum, hard candy, or a cold glass of water to engage your senses.
                  </li>
                  <li>
                    <span className="font-medium">Hand Occupation</span>: 
                    Find something to do with your hands, like squeezing a stress ball or fidgeting with a pen.
                  </li>
                </ol>
                
                <p className="text-sm text-muted-foreground mt-4">
                  Remember: The more you practice different distraction techniques, 
                  the better you'll become at finding what works specifically for you.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="delay">
          <Card>
            <CardHeader>
              <CardTitle>Delay & Disconnect</CardTitle>
              <CardDescription>Learn to ride the wave of a craving</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Cravings typically last 3-5 minutes if you don't feed them. Learning to delay, wait them out, 
                and disconnect from the urge is a powerful technique.
              </p>
              
              <div className="space-y-4 mb-4">
                <h3 className="font-medium">Urge Surfing Technique:</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Notice the craving without immediately reacting</li>
                  <li>Observe where you feel it in your body (chest tightness, tingling, etc.)</li>
                  <li>Imagine the craving as a wave that rises, peaks, and eventually falls</li>
                  <li>Focus on "riding" this wave rather than fighting it</li>
                  <li>Remind yourself that the wave will pass, no matter how intense it feels</li>
                </ol>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Start a Delay Timer:</h3>
                <div className="flex justify-center gap-4">
                  <Button variant="outline">3 Minutes</Button>
                  <Button variant="outline">5 Minutes</Button>
                  <Button variant="outline">10 Minutes</Button>
                </div>
                <p className="text-sm text-muted-foreground text-center mt-4">
                  Set a timer and promise not to use nicotine until it ends. 
                  Most cravings will subside before the timer is up.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="mindfulness">
          <Card>
            <CardHeader>
              <CardTitle>Mindfulness Techniques</CardTitle>
              <CardDescription>Develop awareness of cravings without judgment</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Mindfulness helps you observe cravings without automatically acting on them. 
                With practice, this creates space between stimulus and response.
              </p>
              
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Craving Observation Practice:</h3>
                  <p className="text-sm mb-2">
                    Try this 2-minute exercise when you feel a craving:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 text-sm">
                    <li>Sit comfortably and focus on your breathing</li>
                    <li>Notice the craving sensations in your body without judging them</li>
                    <li>Label what you're experiencing: "This is just a craving"</li>
                    <li>Remind yourself that cravings are temporary states, not commands</li>
                    <li>Notice how the sensations change moment to moment</li>
                    <li>Return focus to your breathing whenever your mind wanders</li>
                  </ol>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-medium mb-2">RAIN Technique for Cravings:</h3>
                  <ul className="space-y-2">
                    <li><span className="font-bold">R</span>ecognize the craving</li>
                    <li><span className="font-bold">A</span>llow it to exist without fighting it</li>
                    <li><span className="font-bold">I</span>nvestigate how it feels in your body</li>
                    <li><span className="font-bold">N</span>on-identification - remember you are not your cravings</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Specific breathing exercises */}
        <TabsContent value="box-breathing">
          <Button 
            variant="ghost" 
            className="mb-4"
            onClick={() => setActiveTab('breathing')}
          >
            ← Back to Breathing Exercises
          </Button>
          <BreathingExercise 
            exerciseType="box" 
            onComplete={handleExerciseComplete} 
          />
        </TabsContent>
        
        <TabsContent value="relaxing-breathing">
          <Button 
            variant="ghost" 
            className="mb-4"
            onClick={() => setActiveTab('breathing')}
          >
            ← Back to Breathing Exercises
          </Button>
          <BreathingExercise 
            exerciseType="relaxing" 
            onComplete={handleExerciseComplete} 
          />
        </TabsContent>
        
        <TabsContent value="energizing-breathing">
          <Button 
            variant="ghost" 
            className="mb-4"
            onClick={() => setActiveTab('breathing')}
          >
            ← Back to Breathing Exercises
          </Button>
          <BreathingExercise 
            exerciseType="energizing" 
            onComplete={handleExerciseComplete} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CravingTools;
