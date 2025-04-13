
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, Wind, Clock, Dumbbell } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useHaptics, HapticImpact } from '@/hooks/useHaptics';

const CravingTools = () => {
  const { impact } = useHaptics();
  
  const handleToolComplete = () => {
    impact(HapticImpact.MEDIUM);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Craving Management Tools</h1>
        <p className="text-muted-foreground">
          Tools and techniques to help you manage your cravings effectively
        </p>
      </div>
      
      <Tabs defaultValue="quick" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="quick">Quick Relief</TabsTrigger>
          <TabsTrigger value="exercises">Breathing Exercises</TabsTrigger>
          <TabsTrigger value="distraction">Distraction Techniques</TabsTrigger>
        </TabsList>
        
        <TabsContent value="quick" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BreathingExercise 
              title="4-7-8 Breathing"
              description="Breathe in for 4 seconds, hold for 7, exhale for 8"
              duration="1 minute"
              icon={<Wind className="h-8 w-8 text-blue-500" />}
              onComplete={handleToolComplete}
            />
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-8 w-8 text-amber-500" />
                  Delay Tactic
                </CardTitle>
                <CardDescription>Delay your craving for just 5 minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Set a 5-minute timer and promise yourself to wait until it ends before giving in to the craving. Often the urge will pass.</p>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration: 5 minutes</span>
                  <Button 
                    onClick={handleToolComplete}
                    variant="outline"
                  >
                    Start Timer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="h-8 w-8 text-green-500" />
                  Physical Distraction
                </CardTitle>
                <CardDescription>Quick physical activities to redirect focus</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>10 jumping jacks</li>
                  <li>Walk around for 2 minutes</li>
                  <li>5 push-ups or wall push-ups</li>
                  <li>Stretch your arms and legs</li>
                </ul>
                <div className="flex justify-end">
                  <Button 
                    onClick={handleToolComplete}
                    variant="outline"
                  >
                    Mark Complete
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="h-8 w-8 text-purple-500" />
                  Urge Surfing
                </CardTitle>
                <CardDescription>Ride the wave of your craving without acting on it</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Notice the craving sensation in your body without judging. Observe how it rises, peaks, and eventually fades, just like a wave.</p>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration: 3 minutes</span>
                  <Button 
                    onClick={handleToolComplete}
                    variant="outline"
                  >
                    Start Practice
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="exercises" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BreathingExercise 
            title="Box Breathing"
            description="Equal counts of inhale, hold, exhale, and hold"
            duration="2 minutes"
            icon={<Wind className="h-8 w-8 text-blue-500" />}
            onComplete={handleToolComplete}
          />
          
          <BreathingExercise 
            title="Pursed Lip Breathing"
            description="Slow breathing through pursed lips to reduce anxiety"
            duration="3 minutes"
            icon={<Wind className="h-8 w-8 text-teal-500" />}
            onComplete={handleToolComplete}
          />
          
          <BreathingExercise 
            title="Alternate Nostril Breathing"
            description="Ancient breathing technique to balance energy"
            duration="5 minutes"
            icon={<Wind className="h-8 w-8 text-indigo-500" />}
            onComplete={handleToolComplete}
          />
          
          <BreathingExercise 
            title="Belly Breathing"
            description="Deep diaphragmatic breathing to activate relaxation"
            duration="4 minutes"
            icon={<Wind className="h-8 w-8 text-green-500" />}
            onComplete={handleToolComplete}
          />
        </TabsContent>
        
        <TabsContent value="distraction" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sensory Grounding (5-4-3-2-1)</CardTitle>
              <CardDescription>Use your senses to ground yourself in the present</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>5 things you can see</strong> around you</li>
                <li><strong>4 things you can touch/feel</strong> right now</li>
                <li><strong>3 things you can hear</strong> in your environment</li>
                <li><strong>2 things you can smell</strong> or like the smell of</li>
                <li><strong>1 thing you can taste</strong> or would like to taste</li>
              </ul>
              <div className="flex justify-end">
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
              <CardTitle>Mental Challenges</CardTitle>
              <CardDescription>Distract your mind with these mental tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Count backwards from 100 by 7s</li>
                <li>Name a city for each letter of the alphabet</li>
                <li>Recite a poem or song lyrics from memory</li>
                <li>Solve a quick puzzle or brain teaser</li>
              </ul>
              <div className="flex justify-end">
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Try These
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Hand Exercises</CardTitle>
              <CardDescription>Keep your hands busy to manage cravings</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Squeeze a stress ball</li>
                <li>Roll a coin across your knuckles</li>
                <li>Play with a fidget spinner or cube</li>
                <li>Interlock your fingers and stretch</li>
                <li>Tap each finger to your thumb in sequence</li>
              </ul>
              <div className="flex justify-end">
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Mark Complete
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Journaling</CardTitle>
              <CardDescription>Write down your thoughts to process them</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Take 2 minutes to write down:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>What triggered this craving?</li>
                <li>How does your body feel right now?</li>
                <li>What would happen if you don't give in to the craving?</li>
                <li>One reason you're proud of your progress</li>
              </ul>
              <div className="flex justify-end">
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Start Writing
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface BreathingExerciseProps {
  title: string;
  description: string;
  duration: string;
  icon: React.ReactNode;
  onComplete: () => void;
}

const BreathingExercise: React.FC<BreathingExerciseProps> = ({ 
  title, 
  description, 
  duration, 
  icon,
  onComplete
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Follow the animation and breathe along with the pattern. Focus only on your breath.</p>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Duration: {duration}</span>
          <Button 
            onClick={onComplete}
            variant="outline"
          >
            Start Exercise
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CravingTools;
