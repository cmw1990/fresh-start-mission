
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronRight, Dumbbell, Droplets, Coffee, Apple } from 'lucide-react';
import { toast } from 'sonner';

const EnergyTools: React.FC = () => {
  const notifyComplete = () => {
    toast.success("Exercise completed! How are your energy levels now?");
  };
  
  return (
    <div className="container max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-2">Energy Tools</h1>
      <p className="text-muted-foreground mb-6">
        Combat the energy dips commonly experienced during nicotine withdrawal with these science-backed techniques.
      </p>
      
      <Tabs defaultValue="physical" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="physical" className="flex flex-col items-center gap-2 py-3">
            <Dumbbell className="h-5 w-5" />
            <span>Physical</span>
          </TabsTrigger>
          <TabsTrigger value="hydration" className="flex flex-col items-center gap-2 py-3">
            <Droplets className="h-5 w-5" />
            <span>Hydration</span>
          </TabsTrigger>
          <TabsTrigger value="nutrition" className="flex flex-col items-center gap-2 py-3">
            <Apple className="h-5 w-5" />
            <span>Nutrition</span>
          </TabsTrigger>
          <TabsTrigger value="stimulation" className="flex flex-col items-center gap-2 py-3">
            <Coffee className="h-5 w-5" />
            <span>Stimulation</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="physical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Energy Boosters</CardTitle>
              <CardDescription>Physical activities to increase your energy levels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">2-Minute Energy Routines</h3>
                <p className="text-muted-foreground">
                  These quick exercises can be done anywhere and will immediately boost your energy when you're feeling sluggish.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Card className="border-muted hover:border-primary transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Power Posing</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm">
                        Stand tall with feet hip-width apart, hands on hips, chest open, and chin slightly lifted.
                        Hold for 2 minutes while taking deep breaths.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={notifyComplete}>
                        Start Exercise <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="border-muted hover:border-primary transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Desktop Exercises</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm">
                        While seated: shoulder rolls, neck stretches, torso twists, ankle circles, and arm stretches.
                        10 seconds each.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={notifyComplete}>
                        Start Exercise <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-muted hover:border-primary transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Jumping Jacks</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm">
                        30 seconds of jumping jacks will immediately increase blood flow and oxygen levels,
                        providing a quick surge of energy.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={notifyComplete}>
                        Start Exercise <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="border-muted hover:border-primary transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Brisk Walk</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm">
                        Even a 2-minute walk at a fast pace can increase energy levels and reduce fatigue.
                        Try walking up and down stairs if possible.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={notifyComplete}>
                        Start Exercise <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-2">Mini-Routines for Bigger Energy Boosts</h3>
                <Button className="w-full mb-2" onClick={() => toast.info("This feature will be available soon!")}>5-Minute Energy-Boosting Routine</Button>
                <Button className="w-full" variant="outline" onClick={() => toast.info("This feature will be available soon!")}>10-Minute Full Body Wake-Up</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="hydration">
          <Card>
            <CardHeader>
              <CardTitle>Hydration for Energy</CardTitle>
              <CardDescription>Optimize your hydration to combat energy dips</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Dehydration & Nicotine Withdrawal</h3>
                  <p className="text-sm">
                    Dehydration can mimic or worsen nicotine withdrawal symptoms, including fatigue, 
                    headaches, and difficulty focusing. Staying properly hydrated is essential during 
                    the quitting process.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Quick Hydration Tips</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="bg-blue-100 rounded-full p-1 mr-2 text-blue-700">1</span>
                      <span>Start your day with 16oz (500ml) of water before any caffeine</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 rounded-full p-1 mr-2 text-blue-700">2</span>
                      <span>For immediate energy, try cold water with a squeeze of lemon</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 rounded-full p-1 mr-2 text-blue-700">3</span>
                      <span>Set hourly reminders to drink water throughout the day</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 rounded-full p-1 mr-2 text-blue-700">4</span>
                      <span>Consider electrolyte drinks if you're experiencing headaches</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 rounded-full p-1 mr-2 text-blue-700">5</span>
                      <span>Eat water-rich foods like cucumbers, watermelon, and oranges</span>
                    </li>
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Hydration Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" onClick={() => toast.info("This feature will be available soon!")}>
                        Calculate Your Needs
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Hydration Tracker</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" onClick={() => toast.info("This feature will be available soon!")}>
                        Track Today's Intake
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="nutrition">
          <Card>
            <CardHeader>
              <CardTitle>Energy-Boosting Nutrition</CardTitle>
              <CardDescription>Support your energy levels with smart food choices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Why Nutrition Matters During Nicotine Withdrawal</h3>
                <p>
                  Nicotine affects blood sugar levels and metabolism. As your body adjusts to life without nicotine, 
                  strategic nutrition can help stabilize energy levels and reduce withdrawal symptoms.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-green-700">Best Energy-Boosting Snacks</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="bg-green-100 p-1 rounded-full mr-2">✓</span>
                      Apple with 1 tbsp almond butter
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-100 p-1 rounded-full mr-2">✓</span>
                      Greek yogurt with berries and honey
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-100 p-1 rounded-full mr-2">✓</span>
                      Small handful of nuts and dried fruit
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-100 p-1 rounded-full mr-2">✓</span>
                      Hummus with vegetable sticks
                    </li>
                    <li className="flex items-center">
                      <span className="bg-green-100 p-1 rounded-full mr-2">✓</span>
                      Oatmeal with cinnamon and banana
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-red-700">Foods That May Cause Energy Crashes</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="bg-red-100 p-1 rounded-full mr-2">✗</span>
                      Sugary sodas and energy drinks
                    </li>
                    <li className="flex items-center">
                      <span className="bg-red-100 p-1 rounded-full mr-2">✗</span>
                      Candy and sweets
                    </li>
                    <li className="flex items-center">
                      <span className="bg-red-100 p-1 rounded-full mr-2">✗</span>
                      White bread and pasta
                    </li>
                    <li className="flex items-center">
                      <span className="bg-red-100 p-1 rounded-full mr-2">✗</span>
                      Fried, greasy foods
                    </li>
                    <li className="flex items-center">
                      <span className="bg-red-100 p-1 rounded-full mr-2">✗</span>
                      Excessive alcohol
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Meal Timing for Stable Energy</h3>
                <p className="mb-4">
                  Eating small, frequent meals and snacks (every 3-4 hours) helps maintain stable blood 
                  sugar levels, which can minimize energy dips during nicotine withdrawal.
                </p>
                <Button className="w-full" onClick={() => toast.info("This feature will be available soon!")}>
                  View Energy-Optimized Meal Planner
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stimulation">
          <Card>
            <CardHeader>
              <CardTitle>Mental Energy Stimulation</CardTitle>
              <CardDescription>Alternative ways to feel more alert</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p>
                  Many people use nicotine for mental stimulation and focus. These alternative techniques 
                  can provide similar alertness without nicotine.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Cold Exposure</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm">
                        A 30-second cold water splash on your face or a cold shower can immediately increase alertness.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full" onClick={notifyComplete}>
                        Try It Now
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Peppermint Aromatherapy</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm">
                        The scent of peppermint has been shown to enhance alertness and memory.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full" onClick={() => toast.info("This feature will be available soon!")}>
                        Learn More
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Acupressure Points</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm">
                        Stimulate specific points on your body to increase energy and alertness.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full" onClick={() => toast.info("This feature will be available soon!")}>
                        View Guide
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Caffeine Strategy</h3>
                  <p className="mb-4">
                    Carefully timed caffeine consumption can help manage energy dips during nicotine withdrawal. 
                    Start with small amounts (50-100mg) and avoid caffeine after 2pm.
                  </p>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-1">Caffeine Content Reference</h4>
                    <ul className="text-sm space-y-1">
                      <li>8oz coffee: ~95mg</li>
                      <li>8oz green tea: ~28mg</li>
                      <li>8oz black tea: ~47mg</li>
                      <li>12oz cola: ~34mg</li>
                    </ul>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-3">Energizing Music</h3>
                  <p className="mb-2">Upbeat music with 120-140 BPM has been shown to increase energy levels.</p>
                  <Button className="w-full" onClick={() => toast.info("This feature will be available soon!")}>
                    Play Energy Playlist
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnergyTools;
