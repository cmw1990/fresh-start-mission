
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Battery, Droplets, Salad, Coffee, Wind, Sunrise } from "lucide-react";
import { toast } from "sonner";

const EnergyTools = () => {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  
  const startExercise = (name: string, duration: number = 0) => {
    setActiveExercise(name);
    if (duration > 0) {
      setTimer(duration);
      setIsTimerActive(true);
      
      const interval = setInterval(() => {
        setTimer(prevTime => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setIsTimerActive(false);
            toast.success("Exercise completed!", {
              description: "Great job boosting your energy!"
            });
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  };
  
  const completeExercise = () => {
    toast.success("Exercise completed!", {
      description: "Great job boosting your energy!"
    });
    setActiveExercise(null);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Energy Boosters</h1>
        <p className="text-muted-foreground">
          Tools to combat fatigue and boost your energy levels
        </p>
      </div>

      <Tabs defaultValue="quick-boost" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="quick-boost">Quick Boosts</TabsTrigger>
          <TabsTrigger value="hydration">Hydration & Nutrition</TabsTrigger>
          <TabsTrigger value="routines">Daily Routines</TabsTrigger>
        </TabsList>

        <TabsContent value="quick-boost" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="bg-fresh-50">
                <Battery className="h-6 w-6 text-fresh-500 mb-2" />
                <CardTitle>Power Breathing</CardTitle>
                <CardDescription>
                  A 2-minute breathing exercise to quickly boost oxygen levels and energy
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {activeExercise === "power-breathing" ? (
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-4">{timer} seconds</div>
                    <ul className="text-left space-y-4 mb-6">
                      <li>1. Sit or stand with a straight back</li>
                      <li>2. Inhale deeply through your nose for 4 seconds</li>
                      <li>3. Hold your breath for 2 seconds</li>
                      <li>4. Exhale forcefully through your mouth for 4 seconds</li>
                      <li>5. Repeat until timer ends</li>
                    </ul>
                  </div>
                ) : (
                  <p className="mb-6">
                    This exercise delivers a quick energy boost by increasing oxygen flow to your brain and muscles, 
                    perfect for fighting nicotine withdrawal fatigue.
                  </p>
                )}
              </CardContent>
              <CardFooter>
                {activeExercise === "power-breathing" ? (
                  <Button 
                    onClick={completeExercise} 
                    className="w-full bg-fresh-300 hover:bg-fresh-400"
                    disabled={isTimerActive}
                  >
                    {isTimerActive ? "Exercise in progress..." : "Complete Exercise"}
                  </Button>
                ) : (
                  <Button 
                    onClick={() => startExercise("power-breathing", 120)} 
                    className="w-full bg-fresh-300 hover:bg-fresh-400"
                  >
                    Start Exercise (2 min)
                  </Button>
                )}
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="bg-fresh-50">
                <Wind className="h-6 w-6 text-fresh-500 mb-2" />
                <CardTitle>Energizing Stretches</CardTitle>
                <CardDescription>
                  Simple stretches to wake up your body and increase blood flow
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {activeExercise === "stretches" ? (
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-4">{timer} seconds</div>
                    <ul className="text-left space-y-4 mb-6">
                      <li>1. Standing arm circles (30 sec)</li>
                      <li>2. Neck stretches (30 sec)</li>
                      <li>3. Standing side bends (30 sec)</li>
                      <li>4. Shoulder rolls (30 sec)</li>
                      <li>5. Light marching in place (60 sec)</li>
                    </ul>
                  </div>
                ) : (
                  <p className="mb-6">
                    These gentle stretches increase circulation and oxygen flow throughout your body,
                    helping to combat the lethargy often felt during nicotine withdrawal.
                  </p>
                )}
              </CardContent>
              <CardFooter>
                {activeExercise === "stretches" ? (
                  <Button 
                    onClick={completeExercise} 
                    className="w-full bg-fresh-300 hover:bg-fresh-400"
                    disabled={isTimerActive}
                  >
                    {isTimerActive ? "Exercise in progress..." : "Complete Exercise"}
                  </Button>
                ) : (
                  <Button 
                    onClick={() => startExercise("stretches", 180)} 
                    className="w-full bg-fresh-300 hover:bg-fresh-400"
                  >
                    Start Exercise (3 min)
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hydration" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="bg-fresh-50">
                <Droplets className="h-6 w-6 text-fresh-500 mb-2" />
                <CardTitle>Hydration Tracker</CardTitle>
                <CardDescription>
                  Monitor your daily water intake to maintain energy levels
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-6">
                  Proper hydration is essential for maintaining energy levels. During nicotine withdrawal,
                  you may experience dry mouth or dehydration symptoms.
                </p>
                <div className="bg-fresh-50 p-4 rounded-md mb-4">
                  <h4 className="font-medium mb-2">Hydration Tips:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Aim for 8-10 glasses of water daily</li>
                    <li>Keep a water bottle with you at all times</li>
                    <li>Set reminders to drink water every hour</li>
                    <li>Add slices of lemon or cucumber for flavor</li>
                    <li>Monitor urine color (pale yellow indicates good hydration)</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-fresh-300 hover:bg-fresh-400">
                  Log Water Intake
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="bg-fresh-50">
                <Salad className="h-6 w-6 text-fresh-500 mb-2" />
                <CardTitle>Energy-Boosting Foods</CardTitle>
                <CardDescription>
                  Nutrition tips for sustained energy during your fresh journey
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-6">
                  What you eat can significantly impact your energy levels. Here are foods that can help
                  stabilize your energy during nicotine withdrawal.
                </p>
                <div className="space-y-4">
                  <div className="bg-fresh-50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Energy-Boosting Foods:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Complex carbs (oats, brown rice, sweet potatoes)</li>
                      <li>Lean protein (chicken, fish, beans, eggs)</li>
                      <li>Nuts and seeds (almonds, walnuts, chia seeds)</li>
                      <li>Fresh fruits (especially bananas and berries)</li>
                      <li>Leafy greens (spinach, kale)</li>
                    </ul>
                  </div>
                  <div className="bg-fresh-50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Foods to Avoid:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Excessive caffeine (can trigger cravings)</li>
                      <li>Sugary foods (cause energy crashes)</li>
                      <li>Highly processed foods</li>
                      <li>Alcohol (disrupts sleep and energy levels)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-fresh-300 hover:bg-fresh-400">
                  View Meal Plan Ideas
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="routines" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="bg-fresh-50">
                <Sunrise className="h-6 w-6 text-fresh-500 mb-2" />
                <CardTitle>Morning Energy Routine</CardTitle>
                <CardDescription>
                  Start your day with energy-boosting habits
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-6">
                  How you start your morning sets the tone for your energy levels throughout the day.
                  This routine helps combat the fatigue often felt during nicotine withdrawal.
                </p>
                <ol className="list-decimal list-inside space-y-3">
                  <li className="pl-2">
                    <span className="font-medium">Morning Light Exposure (5 min)</span>
                    <p className="text-muted-foreground text-sm pl-6">Open curtains or step outside to reset your circadian rhythm</p>
                  </li>
                  <li className="pl-2">
                    <span className="font-medium">Hydration (1 min)</span>
                    <p className="text-muted-foreground text-sm pl-6">Drink a full glass of water to rehydrate</p>
                  </li>
                  <li className="pl-2">
                    <span className="font-medium">Deep Breathing (2 min)</span>
                    <p className="text-muted-foreground text-sm pl-6">10 deep belly breaths to oxygenate your body</p>
                  </li>
                  <li className="pl-2">
                    <span className="font-medium">Light Movement (5 min)</span>
                    <p className="text-muted-foreground text-sm pl-6">Gentle stretches or brief walk to increase blood flow</p>
                  </li>
                  <li className="pl-2">
                    <span className="font-medium">Protein-Rich Breakfast (15 min)</span>
                    <p className="text-muted-foreground text-sm pl-6">Stabilizes blood sugar and provides sustained energy</p>
                  </li>
                </ol>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => {
                    toast.success("Routine added to your calendar!", {
                      description: "We'll remind you to follow this routine tomorrow morning."
                    });
                  }} 
                  className="w-full bg-fresh-300 hover:bg-fresh-400"
                >
                  Set Morning Reminder
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="bg-fresh-50">
                <Coffee className="h-6 w-6 text-fresh-500 mb-2" />
                <CardTitle>Afternoon Energy Dips</CardTitle>
                <CardDescription>
                  Strategies to overcome mid-day fatigue without nicotine
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-6">
                  Many people experience afternoon energy dips, which can be particularly challenging during
                  nicotine withdrawal. Here are research-backed strategies to overcome them.
                </p>
                <div className="space-y-4">
                  <div className="border-l-4 border-fresh-300 pl-4 py-2">
                    <h4 className="font-medium">Physical Reset (2-5 min)</h4>
                    <p className="text-sm text-muted-foreground">
                      Stand up, stretch, or take a brief walk around your home or office.
                      Physical movement increases circulation and wakes up your body.
                    </p>
                  </div>
                  <div className="border-l-4 border-fresh-300 pl-4 py-2">
                    <h4 className="font-medium">Strategic Snacking</h4>
                    <p className="text-sm text-muted-foreground">
                      Choose protein + complex carb combinations like apple with almond butter
                      or yogurt with berries to stabilize blood sugar.
                    </p>
                  </div>
                  <div className="border-l-4 border-fresh-300 pl-4 py-2">
                    <h4 className="font-medium">Hydration Check</h4>
                    <p className="text-sm text-muted-foreground">
                      Drink a full glass of water - dehydration often masquerades as fatigue.
                    </p>
                  </div>
                  <div className="border-l-4 border-fresh-300 pl-4 py-2">
                    <h4 className="font-medium">Cold Exposure (30 sec)</h4>
                    <p className="text-sm text-muted-foreground">
                      Splash cold water on your face or run cold water over your wrists to
                      trigger alertness.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => startExercise("afternoon-reset", 120)} 
                  className="w-full bg-fresh-300 hover:bg-fresh-400"
                >
                  Start Afternoon Reset (2 min)
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnergyTools;
