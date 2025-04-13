
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Coffee, Droplets, Dumbbell, Sun, UtensilsCrossed } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EnergyTools = () => {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Energy Boosters</h1>
        <p className="text-muted-foreground mt-1">
          Combat fatigue and boost your energy levels during nicotine withdrawal
        </p>
      </div>

      <Tabs defaultValue="quick" className="space-y-6">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="quick">Quick Boosts</TabsTrigger>
          <TabsTrigger value="habits">Daily Habits</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
        </TabsList>
        
        <TabsContent value="quick" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Dumbbell className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle>Power Stretch Routine</CardTitle>
                <CardDescription>2-minute energy booster (no equipment)</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>25 jumping jacks (30 seconds)</li>
                  <li>10 bodyweight squats (30 seconds)</li>
                  <li>High knees in place (30 seconds)</li>
                  <li>Full body stretch (30 seconds)</li>
                </ol>
                <p className="text-muted-foreground mt-4">
                  Moving your body activates your circulation and releases endorphins. This quick routine gets your heart pumping and can provide an instant energy boost.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Droplets className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle>Cold Water Splash</CardTitle>
                <CardDescription>Reset your system with cold water</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Splash your face with cold water for an instant energy boost. Cold water triggers your body's "fight or flight" response, increasing alertness and energy levels.
                </p>
                <div className="mt-4 space-y-2">
                  <h3 className="font-medium">For extra effect:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Focus on wrists and neck too (major pulse points)</li>
                    <li>Take 3 deep breaths while doing this</li>
                    <li>If available, hold an ice cube in your hands</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Sun className="h-8 w-8 text-amber-500 mb-2" />
                <CardTitle>Sunlight Exposure</CardTitle>
                <CardDescription>Use natural light to boost energy</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Take a 5-minute break outside in sunlight. Sunlight helps regulate your circadian rhythm and boosts vitamin D production, which can increase energy levels and improve mood.
                </p>
                <div className="mt-4 space-y-2">
                  <h3 className="font-medium">While outside:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Look at distant objects to rest your eyes</li>
                    <li>Take deep breaths of fresh air</li>
                    <li>Stretch your arms overhead</li>
                    <li>Try to find something beautiful to appreciate</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="habits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Energy-Building Daily Habits</CardTitle>
              <CardDescription>Consistent practices to maintain higher energy levels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Battery className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-medium">Consistent Sleep Schedule</h3>
                    <p className="text-muted-foreground">
                      Nicotine withdrawal often disrupts sleep patterns. Try to go to bed and wake up at the same times each day, even on weekends. This helps regulate your body's internal clock and improves sleep quality.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Dumbbell className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-medium">Regular Physical Activity</h3>
                    <p className="text-muted-foreground">
                      Aim for 30 minutes of moderate exercise most days. Regular physical activity increases energy levels by improving circulation and oxygen delivery to tissues. It also helps with sleep quality at night.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Droplets className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-medium">Hydration Routine</h3>
                    <p className="text-muted-foreground">
                      Dehydration is a common cause of fatigue. Try to drink at least 8 glasses of water daily, and more if you're physically active. Keep a water bottle with you and set reminders to drink regularly.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Sun className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-medium">Morning Light Exposure</h3>
                    <p className="text-muted-foreground">
                      Get at least 10-15 minutes of natural light exposure in the morning. This helps reset your circadian rhythm, improves mood, and increases daytime alertness.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="nutrition" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Energy-Supporting Nutrition</CardTitle>
              <CardDescription>Foods and eating patterns that help maintain energy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <UtensilsCrossed className="h-5 w-5 text-amber-500 mt-1" />
                  <div>
                    <h3 className="font-medium">Energy-Boosting Foods</h3>
                    <p className="text-muted-foreground mb-2">
                      Focus on foods that provide sustained energy rather than quick spikes followed by crashes:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Complex carbohydrates (whole grains, brown rice, oats)</li>
                      <li>Lean proteins (chicken, fish, beans, eggs)</li>
                      <li>Healthy fats (avocados, nuts, olive oil)</li>
                      <li>Iron-rich foods (spinach, liver, legumes)</li>
                      <li>B-vitamin rich foods (leafy greens, meat, whole grains)</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Coffee className="h-5 w-5 text-amber-500 mt-1" />
                  <div>
                    <h3 className="font-medium">Caffeine Management</h3>
                    <p className="text-muted-foreground">
                      While caffeine can provide a temporary energy boost, it can also disrupt sleep if consumed too late. Limit caffeine to the morning hours, and consider switching to green tea which provides a more balanced energy boost with L-theanine.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <UtensilsCrossed className="h-5 w-5 text-amber-500 mt-1" />
                  <div>
                    <h3 className="font-medium">Meal Timing and Sizing</h3>
                    <p className="text-muted-foreground">
                      Eat smaller, more frequent meals to maintain steady blood sugar and energy levels. Very large meals require significant energy for digestion, which can leave you feeling tired. Avoid sugar-heavy snacks which cause energy crashes.
                    </p>
                  </div>
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
