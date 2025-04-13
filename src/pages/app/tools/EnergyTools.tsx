
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useHaptics, HapticImpact } from '@/hooks/useHaptics';
import { Droplet, Utensils, Dumbbell, Battery } from 'lucide-react';
import { ExerciseModal } from '@/components/tools/ExerciseModal';
import { toast } from 'sonner';
import { Alert, AlertDescription } from "@/components/ui/alert";

const EnergyTools = () => {
  const { impact } = useHaptics();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openTool = (toolName: string) => {
    setSelectedTool(toolName);
    setIsModalOpen(true);
    impact(HapticImpact.LIGHT);
  };
  
  const handleToolComplete = () => {
    impact(HapticImpact.MEDIUM);
    setIsModalOpen(false);
    toast.success("Energy boost complete!", {
      description: "Remember to use these techniques whenever you feel an energy slump."
    });
  };
  
  const hydrationTools = [
    { 
      name: "Water Intake Calculator",
      description: "Determine your optimal daily water intake based on weight and activity level.",
      icon: <Droplet className="h-12 w-12 text-blue-500" />,
      duration: "1 minute"
    },
    { 
      name: "Hydration Reminder Setup",
      description: "Set up customized reminders to stay hydrated throughout the day.",
      icon: <Droplet className="h-12 w-12 text-cyan-500" />,
      duration: "2 minutes"
    },
    { 
      name: "Hydration Benefits",
      description: "Learn how proper hydration specifically helps with nicotine withdrawal symptoms.",
      icon: <Droplet className="h-12 w-12 text-teal-500" />,
      duration: "3 minutes"
    }
  ];
  
  const nutritionTools = [
    {
      name: "Energy-Boosting Foods",
      description: "Quick guide to foods that can help sustain energy during nicotine withdrawal.",
      icon: <Utensils className="h-12 w-12 text-green-500" />,
      duration: "3 minutes"
    },
    {
      name: "Blood Sugar Balancing Tips",
      description: "Techniques to maintain stable blood sugar levels to prevent energy crashes.",
      icon: <Utensils className="h-12 w-12 text-emerald-500" />,
      duration: "4 minutes"
    },
    {
      name: "Simple Energy-Boosting Recipes",
      description: "Quick, easy recipes specifically designed to combat withdrawal fatigue.",
      icon: <Utensils className="h-12 w-12 text-lime-500" />,
      duration: "5 minutes"
    }
  ];
  
  const exerciseTools = [
    {
      name: "2-Minute Energy Burst",
      description: "Ultra-quick movement routine to immediately increase energy levels.",
      icon: <Dumbbell className="h-12 w-12 text-orange-500" />,
      duration: "2 minutes"
    },
    {
      name: "5-Minute Office Energizer",
      description: "Simple exercises you can do at your desk to combat afternoon slumps.",
      icon: <Dumbbell className="h-12 w-12 text-amber-500" />,
      duration: "5 minutes"
    },
    {
      name: "10-Minute Full Energy Reset",
      description: "Comprehensive routine combining movement, breathing and stretching.",
      icon: <Dumbbell className="h-12 w-12 text-yellow-500" />,
      duration: "10 minutes"
    }
  ];

  const renderToolCards = (tools: any[]) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tools.map((tool, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow hover-scale">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-2">{tool.icon}</div>
              <CardTitle>{tool.name}</CardTitle>
              <CardDescription>{tool.duration}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-center">{tool.description}</p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                variant="default" 
                onClick={() => openTool(tool.name)}
              >
                Open Tool
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Energy Boosting Tools</h1>
        <p className="text-muted-foreground mt-1">
          Combat fatigue and energy slumps during your nicotine-free journey.
        </p>
      </div>
      
      <Alert className="mb-6 bg-amber-50 border-amber-200">
        <Battery className="h-4 w-4 text-amber-500" />
        <AlertDescription className="text-amber-800">
          Energy levels commonly decrease during the first 2-3 weeks of nicotine withdrawal as your body adjusts. The tools below can help you manage this temporary phase.
        </AlertDescription>
      </Alert>
      
      <div className="grid gap-8">      
        <Tabs defaultValue="exercise">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="exercise">Quick Exercises</TabsTrigger>
            <TabsTrigger value="hydration">Hydration</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          </TabsList>
          
          <TabsContent value="exercise" className="space-y-4">
            {renderToolCards(exerciseTools)}
          </TabsContent>
          
          <TabsContent value="hydration" className="space-y-4">
            {renderToolCards(hydrationTools)}
          </TabsContent>
          
          <TabsContent value="nutrition" className="space-y-4">
            {renderToolCards(nutritionTools)}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Modal for tools */}
      <ExerciseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onComplete={handleToolComplete}
        title={selectedTool || "Energy Tool"}
      >
        {selectedTool === "2-Minute Energy Burst" && (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">2-Minute Energy Burst</h3>
            <p className="mb-4">Follow along with these quick movements:</p>
            <ol className="space-y-3 mb-6">
              <li className="p-2 bg-slate-50 rounded-md">30 seconds: March in place with high knees</li>
              <li className="p-2 bg-slate-50 rounded-md">30 seconds: Arm circles (15s forward, 15s backward)</li>
              <li className="p-2 bg-slate-50 rounded-md">30 seconds: Gentle squat pulses</li>
              <li className="p-2 bg-slate-50 rounded-md">30 seconds: Torso twists with arms extended</li>
            </ol>
            <p className="mb-4 text-sm">Perform at your own pace and modify as needed for your fitness level.</p>
            <Button onClick={handleToolComplete} className="w-full">
              Complete Energy Burst
            </Button>
          </div>
        )}
        
        {selectedTool === "Water Intake Calculator" && (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Water Intake Calculator</h3>
            <div className="mb-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your weight (lbs):</label>
                <input type="number" className="w-full p-2 border rounded" placeholder="Enter your weight" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Activity level:</label>
                <select className="w-full p-2 border rounded">
                  <option>Low (mostly sedentary)</option>
                  <option>Moderate (some exercise)</option>
                  <option>High (very active)</option>
                </select>
              </div>
              <div className="p-4 bg-blue-50 rounded-md">
                <p className="font-semibold text-blue-800">Recommended daily intake:</p>
                <p className="text-2xl text-blue-700">64 oz (8 cups)</p>
                <p className="text-xs text-blue-600 mt-1">This is a baseline recommendation. Adjust based on climate, exercise intensity, and individual needs.</p>
              </div>
            </div>
            <Button onClick={handleToolComplete} className="w-full">
              Save Recommendation
            </Button>
          </div>
        )}
        
        {selectedTool === "Energy-Boosting Foods" && (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Energy-Boosting Foods</h3>
            <div className="space-y-4 mb-6">
              <div className="p-3 bg-green-50 rounded-md">
                <h4 className="font-medium text-green-800">Complex Carbohydrates</h4>
                <p className="text-sm text-green-700 mt-1">Oatmeal, whole grain bread, brown rice, sweet potatoes</p>
                <p className="text-xs text-green-600 mt-1">Provide sustained energy release without crashes</p>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-md">
                <h4 className="font-medium text-blue-800">Protein-Rich Foods</h4>
                <p className="text-sm text-blue-700 mt-1">Eggs, Greek yogurt, lean meats, legumes</p>
                <p className="text-xs text-blue-600 mt-1">Help stabilize blood sugar and promote satiety</p>
              </div>
              
              <div className="p-3 bg-amber-50 rounded-md">
                <h4 className="font-medium text-amber-800">Healthy Fats</h4>
                <p className="text-sm text-amber-700 mt-1">Avocados, nuts, seeds, olive oil</p>
                <p className="text-xs text-amber-600 mt-1">Provide long-lasting energy and support brain function</p>
              </div>
              
              <div className="p-3 bg-red-50 rounded-md">
                <h4 className="font-medium text-red-800">Foods to Minimize</h4>
                <p className="text-sm text-red-700 mt-1">Sugary snacks, processed foods, excessive caffeine</p>
                <p className="text-xs text-red-600 mt-1">Can cause energy crashes and worsen withdrawal symptoms</p>
              </div>
            </div>
            <Button onClick={handleToolComplete} className="w-full">
              Got It
            </Button>
          </div>
        )}
        
        {/* Fallback content for other tools */}
        {!["2-Minute Energy Burst", "Water Intake Calculator", "Energy-Boosting Foods"].includes(selectedTool || "") && (
          <div className="p-6 text-center">
            <p className="mb-6">
              This tool is coming soon with more detailed content.
            </p>
            <Button onClick={handleToolComplete}>
              Close
            </Button>
          </div>
        )}
      </ExerciseModal>
    </div>
  );
};

export default EnergyTools;
