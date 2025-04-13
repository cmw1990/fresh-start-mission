
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BreathingExercise from '@/components/tools/breathing/BreathingExercise';
import { toast } from 'sonner';
import { CheckCircle, HeartPulse, Timer, Wind } from 'lucide-react';

const CravingTools = () => {
  const [activeTab, setActiveTab] = useState("breathing");
  const [showExercise, setShowExercise] = useState(false);
  const [exerciseType, setExerciseType] = useState<'box' | 'relaxing' | 'energizing'>('box');

  const handleExerciseComplete = () => {
    toast.success("Great job!", {
      description: "You've completed your breathing exercise."
    });
  };

  const startExercise = (type: 'box' | 'relaxing' | 'energizing') => {
    setExerciseType(type);
    setShowExercise(true);
  };

  const backToExercises = () => {
    setShowExercise(false);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Craving Management Tools</h1>
        <p className="text-muted-foreground mt-1">
          Proven techniques to help manage cravings and stay on track
        </p>
      </div>

      {showExercise ? (
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={backToExercises}
            className="mb-6"
          >
            ← Back to all techniques
          </Button>
          <BreathingExercise 
            exerciseType={exerciseType}
            onComplete={handleExerciseComplete}
          />
        </div>
      ) : (
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="breathing">Breathing</TabsTrigger>
            <TabsTrigger value="distraction">Distraction</TabsTrigger>
            <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>
          </TabsList>
          
          <TabsContent value="breathing" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Wind className="h-8 w-8 text-blue-500 mb-2" />
                  <CardTitle>Box Breathing</CardTitle>
                  <CardDescription>
                    4-4-4-4 breath pattern to reduce stress and manage cravings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    This Navy SEAL technique helps you quickly calm your nervous system. Inhale for 4, hold for 4, exhale for 4, rest for 4.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => startExercise('box')} className="w-full">
                    Start Exercise
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <HeartPulse className="h-8 w-8 text-amber-500 mb-2" />
                  <CardTitle>Relaxing Breath</CardTitle>
                  <CardDescription>
                    4-7-8 breath pattern to calm your mind and body
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    This technique is perfect for when you're feeling anxious or stressed. Inhale for 4, hold for 7, exhale for 8.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => startExercise('relaxing')} className="w-full">
                    Start Exercise
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <Timer className="h-8 w-8 text-green-500 mb-2" />
                  <CardTitle>Energizing Breath</CardTitle>
                  <CardDescription>
                    6-2 breath pattern to boost energy and focus
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    When nicotine withdrawal leaves you feeling sluggish, this technique can help. Inhale for 6, exhale for 2.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => startExercise('energizing')} className="w-full">
                    Start Exercise
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="distraction" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Distraction Techniques</CardTitle>
                <CardDescription>
                  Effective ways to redirect your attention when a craving hits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">5-4-3-2-1 Technique</h3>
                  <p className="text-muted-foreground">
                    Focus on your surroundings and identify:
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>5 things you can see</li>
                      <li>4 things you can touch</li>
                      <li>3 things you can hear</li>
                      <li>2 things you can smell</li>
                      <li>1 thing you can taste</li>
                    </ul>
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Delay Tactic</h3>
                  <p className="text-muted-foreground">
                    When a craving hits, tell yourself you'll wait just 10 minutes before giving in. During those 10 minutes, do something else. Most cravings pass within this time window.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Physical Activity</h3>
                  <p className="text-muted-foreground">
                    Do 10 pushups, take a quick walk, or stretch. Physical activity diverts your attention and reduces craving intensity.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mindfulness" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mindfulness Practices</CardTitle>
                <CardDescription>
                  Using awareness and acceptance to manage cravings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Urge Surfing</h3>
                  <p className="text-muted-foreground">
                    Instead of fighting the craving, observe it with curiosity. Notice how it feels in your body, where you feel it, and how it changes moment by moment. Cravings are like waves - they rise, peak, and eventually subside.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">RAIN Technique</h3>
                  <p className="text-muted-foreground">
                    <strong>R</strong>ecognize the craving<br/>
                    <strong>A</strong>llow it to be there without judgment<br/>
                    <strong>I</strong>nvestigate how it feels in your body<br/>
                    <strong>N</strong>on-identification (remember you are not your cravings)
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Mindful Check-In</h3>
                  <p className="text-muted-foreground">
                    When a craving arises, check in with your HALT status: Are you Hungry, Angry, Lonely, or Tired? Often cravings are triggered by these states. Addressing the underlying need can reduce the craving.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default CravingTools;
