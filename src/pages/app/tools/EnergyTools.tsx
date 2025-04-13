
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Coffee, Droplets, Utensils, SunMoon } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useHaptics, HapticImpact } from '@/hooks/useHaptics';

const EnergyTools = () => {
  const { impact } = useHaptics();
  
  const handleToolComplete = () => {
    impact(HapticImpact.MEDIUM);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Energy Boosting Tools</h1>
        <p className="text-muted-foreground">
          Tools and techniques to help manage energy slumps during your nicotine-free journey
        </p>
      </div>
      
      <Tabs defaultValue="quick" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="quick">Quick Boosts</TabsTrigger>
          <TabsTrigger value="physical">Physical Activities</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition & Hydration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="quick" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-8 w-8 text-yellow-500" />
                  Power Breathing
                </CardTitle>
                <CardDescription>Energizing breath technique for quick boosts</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2 mb-4">
                  <li>Sit up straight with shoulders relaxed</li>
                  <li>Take a quick, forceful inhale through your nose</li>
                  <li>Exhale forcefully through your mouth</li>
                  <li>Repeat 10 times in quick succession</li>
                  <li>Take a normal breath afterward</li>
                </ol>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration: 1 minute</span>
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
                <CardTitle className="flex items-center gap-2">
                  <Coffee className="h-8 w-8 text-amber-800" />
                  Caffeine Management
                </CardTitle>
                <CardDescription>Strategic caffeine use during withdrawal</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Use caffeine strategically to manage energy dips:</p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>Small amounts (50-100mg) when you feel an energy crash</li>
                  <li>Consider green tea for a gentler boost with L-theanine</li>
                  <li>Avoid after 2pm to prevent sleep disruption</li>
                  <li>Stay hydrated alongside caffeine intake</li>
                </ul>
                <div className="flex justify-end">
                  <Button 
                    onClick={handleToolComplete}
                    variant="outline"
                  >
                    Set Reminder
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SunMoon className="h-8 w-8 text-blue-400" />
                Circadian Reset
              </CardTitle>
              <CardDescription>Quick exposure to natural light to reset your energy rhythm</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Natural light exposure helps regulate your body's internal clock and boost energy levels naturally:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Step outside for 5-10 minutes in natural daylight</li>
                <li>Face the sun (safely, not staring directly) with eyes open</li>
                <li>Best times: within 1 hour of waking and mid-afternoon</li>
                <li>If indoor, sit near a window in bright natural light</li>
              </ul>
              <div className="flex justify-end">
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Start Timer
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="physical" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Desk Stretches</CardTitle>
              <CardDescription>Quick stretches to do at your desk</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>Neck Rolls:</strong> Gently circle your head in both directions</li>
                <li><strong>Shoulder Shrugs:</strong> Lift shoulders to ears, hold, release</li>
                <li><strong>Seated Twist:</strong> Place hand on opposite knee and gently twist</li>
                <li><strong>Wrist Stretches:</strong> Extend arms and flex wrists up and down</li>
                <li><strong>Chest Opener:</strong> Clasp hands behind back and gently lift</li>
              </ul>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration: 2-3 minutes</span>
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Start Routine
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Walk Break</CardTitle>
              <CardDescription>Walking to boost energy and reduce cravings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Even a short walk can significantly boost energy levels and reduce nicotine cravings:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Start with 5-10 minutes at a brisk pace</li>
                <li>Focus on your breathing and posture</li>
                <li>Swing arms naturally to increase circulation</li>
                <li>Ideally outdoors for fresh air and natural light</li>
              </ul>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration: 5-10 minutes</span>
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
              <CardTitle>Energy Boosting Yoga</CardTitle>
              <CardDescription>Simple yoga poses for energy</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Try these energizing yoga poses:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>Mountain Pose with Arms Raised:</strong> Stand tall, inhale and raise arms overhead</li>
                <li><strong>Forward Fold:</strong> Exhale and fold forward from hips</li>
                <li><strong>Downward Dog:</strong> Form an inverted V-shape with your body</li>
                <li><strong>Cobra or Upward Dog:</strong> Chest-opening backbend</li>
                <li><strong>Chair Pose:</strong> Powerful squat position with arms raised</li>
              </ul>
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
              <CardTitle>Progressive Tension-Release</CardTitle>
              <CardDescription>Energize by contracting and releasing muscles</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>Tense feet and calves for 5 seconds, then release</li>
                <li>Move to thighs, tense for 5 seconds, release</li>
                <li>Continue with abdomen, chest, hands, arms, shoulders</li>
                <li>Finally tense face muscles, hold, and release</li>
                <li>Finish with a full body stretch</li>
              </ol>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration: 3-4 minutes</span>
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
        
        <TabsContent value="nutrition" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-8 w-8 text-blue-500" />
                Hydration Check
              </CardTitle>
              <CardDescription>Combat fatigue through proper hydration</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Many energy dips during nicotine withdrawal are actually dehydration symptoms:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Aim for at least 8 glasses (2 liters) of water daily</li>
                <li>Increase intake during withdrawal (helps flush toxins)</li>
                <li>Try adding lemon, cucumber, or berries for flavor</li>
                <li>Set regular reminders to drink throughout the day</li>
              </ul>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Try: Drink a full glass now</span>
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Set Reminders
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-8 w-8 text-green-500" />
                Energy-Stabilizing Snacks
              </CardTitle>
              <CardDescription>Foods that help maintain steady energy levels</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">These snacks help maintain blood sugar and combat energy crashes:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>Protein + Complex Carb:</strong> Apple with almond butter, Greek yogurt with berries</li>
                <li><strong>Healthy Fats:</strong> Small handful of walnuts or seeds</li>
                <li><strong>Quick Energy:</strong> Banana, dates, or dark chocolate (70%+)</li>
                <li><strong>Stabilizers:</strong> Oatmeal with cinnamon, hummus with vegetables</li>
              </ul>
              <div className="flex justify-end">
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Create Shopping List
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Energy-Supporting Supplements</CardTitle>
              <CardDescription>Natural supplements that may help during withdrawal</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-1">Consider these supplements (consult healthcare provider first):</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>B-Complex Vitamins:</strong> Support energy metabolism</li>
                <li><strong>Magnesium:</strong> Aids in energy production and sleep</li>
                <li><strong>Rhodiola:</strong> Adaptogenic herb that may combat fatigue</li>
                <li><strong>CoQ10:</strong> Supports cellular energy production</li>
                <li><strong>Iron:</strong> Important if you have low levels (test first)</li>
              </ul>
              <p className="text-sm text-muted-foreground mb-4">
                Note: Always consult a healthcare provider before starting supplements.
              </p>
              <div className="flex justify-end">
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Meal Timing Strategy</CardTitle>
              <CardDescription>Optimize meal timing for stable energy</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">How you time your meals affects your energy levels:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>Breakfast:</strong> Within 1 hour of waking (protein-rich)</li>
                <li><strong>Small, Frequent Meals:</strong> Every 3-4 hours to stabilize blood sugar</li>
                <li><strong>Pre-Craving Snack:</strong> Eat before typical craving times</li>
                <li><strong>Dinner:</strong> At least 2-3 hours before bed for better sleep</li>
              </ul>
              <div className="flex justify-end">
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Set Meal Reminders
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnergyTools;
