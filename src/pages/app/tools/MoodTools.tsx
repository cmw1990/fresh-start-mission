
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useHaptics, HapticImpact } from '@/hooks/useHaptics';
import { Heart, Music, Book, Sun } from 'lucide-react';
import { ExerciseModal } from '@/components/tools/ExerciseModal';
import { toast } from 'sonner';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MoodTools = () => {
  const { impact } = useHaptics();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [journalEntry, setJournalEntry] = useState("");
  const [gratitudeItems, setGratitudeItems] = useState(["", "", ""]);
  
  const openTool = (toolName: string) => {
    setSelectedTool(toolName);
    setIsModalOpen(true);
    impact(HapticImpact.LIGHT);
  };
  
  const handleToolComplete = () => {
    impact(HapticImpact.MEDIUM);
    setIsModalOpen(false);
    
    // Clear form data
    setJournalEntry("");
    setGratitudeItems(["", "", ""]);
    
    toast.success("Mood exercise completed!", {
      description: "Taking time for your emotional wellbeing is an important part of your journey."
    });
  };
  
  const updateGratitudeItem = (index: number, value: string) => {
    const newItems = [...gratitudeItems];
    newItems[index] = value;
    setGratitudeItems(newItems);
  };
  
  const journalingPrompts = [
    { 
      name: "Mood Reflection",
      description: "Explore your current emotions and their connection to nicotine cravings.",
      icon: <Heart className="h-12 w-12 text-rose-500" />,
      prompt: "How am I feeling right now, and how might these feelings be connected to my cravings? What triggered these emotions?"
    },
    { 
      name: "Future Self",
      description: "Write a letter to your future self who has successfully achieved your nicotine goals.",
      icon: <Heart className="h-12 w-12 text-pink-500" />,
      prompt: "Dear Future Me, I'm writing to you now that you've successfully [achieved your goal]. I want you to know..."
    },
    { 
      name: "Challenge Navigator",
      description: "Work through a specific challenge you're facing in your journey.",
      icon: <Heart className="h-12 w-12 text-fuchsia-500" />,
      prompt: "The specific challenge I'm facing right now is... My options for handling this are... The approach I'm going to try is..."
    }
  ];
  
  const relaxationTools = [
    {
      name: "Guided Visualization",
      description: "Brief guided imagery exercise to create mental calmness and reduce stress.",
      icon: <Sun className="h-12 w-12 text-yellow-500" />,
      duration: "3 minutes"
    },
    {
      name: "Progressive Muscle Relaxation",
      description: "Systematically tense and release muscle groups to reduce physical tension.",
      icon: <Sun className="h-12 w-12 text-amber-500" />,
      duration: "5 minutes"
    },
    {
      name: "Gratitude Practice",
      description: "Identify specific things you're grateful for to shift focus and improve mood.",
      icon: <Sun className="h-12 w-12 text-orange-500" />,
      duration: "2 minutes"
    }
  ];
  
  const soundTherapies = [
    {
      name: "Calming Nature Sounds",
      description: "Ocean waves, rainfall, forest sounds, and other natural ambient sounds.",
      icon: <Music className="h-12 w-12 text-cyan-500" />,
      duration: "Variable"
    },
    {
      name: "Binaural Beats",
      description: "Sound technology designed to induce relaxation and reduce stress.",
      icon: <Music className="h-12 w-12 text-blue-500" />,
      duration: "10-15 minutes"
    },
    {
      name: "Guided Meditation",
      description: "Voice-guided meditation specifically for mood regulation during withdrawal.",
      icon: <Music className="h-12 w-12 text-indigo-500" />,
      duration: "5-10 minutes"
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
              {tool.duration && <CardDescription>{tool.duration}</CardDescription>}
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
  
  const getSelectedPrompt = () => {
    const prompt = journalingPrompts.find(p => p.name === selectedTool);
    return prompt ? prompt.prompt : "";
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Mood Regulation Tools</h1>
        <p className="text-muted-foreground mt-1">
          Techniques to manage mood fluctuations during your nicotine-free journey.
        </p>
      </div>
      
      <div className="mb-6 p-4 bg-purple-50 border border-purple-100 rounded-md">
        <h3 className="text-lg font-medium text-purple-800 mb-2">Why Focus on Mood?</h3>
        <p className="text-purple-700 text-sm">
          Nicotine withdrawal commonly affects mood due to changes in brain chemistry. The tools on this page are specifically designed to help regulate emotions during this temporary adjustment period. Consistent practice can significantly reduce mood-related withdrawal symptoms.
        </p>
      </div>
      
      <div className="grid gap-8">      
        <Tabs defaultValue="journaling">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="journaling">Journaling</TabsTrigger>
            <TabsTrigger value="relaxation">Relaxation</TabsTrigger>
            <TabsTrigger value="sound">Sound Therapy</TabsTrigger>
          </TabsList>
          
          <TabsContent value="journaling" className="space-y-4">
            {renderToolCards(journalingPrompts)}
          </TabsContent>
          
          <TabsContent value="relaxation" className="space-y-4">
            {renderToolCards(relaxationTools)}
          </TabsContent>
          
          <TabsContent value="sound" className="space-y-4">
            {renderToolCards(soundTherapies)}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Modal for tools */}
      <ExerciseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onComplete={handleToolComplete}
        title={selectedTool || "Mood Tool"}
      >
        {/* Journaling Prompts */}
        {journalingPrompts.find(p => p.name === selectedTool) && (
          <div className="p-6">
            <p className="italic text-muted-foreground mb-4">{getSelectedPrompt()}</p>
            <div className="mb-6">
              <Textarea 
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                placeholder="Start writing here..."
                className="min-h-[200px]"
              />
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleToolComplete}>Complete</Button>
            </div>
          </div>
        )}
        
        {/* Gratitude Practice */}
        {selectedTool === "Gratitude Practice" && (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Gratitude Practice</h3>
            <p className="mb-4">List three things you're grateful for today:</p>
            <div className="space-y-4 mb-6">
              {gratitudeItems.map((item, index) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={`gratitude-${index}`}>{index + 1}.</Label>
                  <Input 
                    id={`gratitude-${index}`}
                    value={item}
                    onChange={(e) => updateGratitudeItem(index, e.target.value)}
                    placeholder="I'm grateful for..."
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Research shows that regular gratitude practice can help reduce negative emotions and improve resilience during challenging times like nicotine withdrawal.
            </p>
            <Button onClick={handleToolComplete} className="w-full">
              Complete Practice
            </Button>
          </div>
        )}
        
        {/* Guided Visualization */}
        {selectedTool === "Guided Visualization" && (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Guided Visualization</h3>
            <div className="mb-6 space-y-4">
              <p>Find a comfortable position and follow these steps:</p>
              <ol className="space-y-3">
                <li className="p-2 bg-slate-50 rounded-md">Close your eyes and take three deep breaths.</li>
                <li className="p-2 bg-slate-50 rounded-md">Imagine yourself in a peaceful place - perhaps a beach, forest, or mountain top.</li>
                <li className="p-2 bg-slate-50 rounded-md">Visualize the details: What do you see? What sounds do you hear? What can you smell?</li>
                <li className="p-2 bg-slate-50 rounded-md">Feel yourself becoming calmer in this safe, peaceful place.</li>
                <li className="p-2 bg-slate-50 rounded-md">Imagine your stress and cravings dissolving away in this environment.</li>
                <li className="p-2 bg-slate-50 rounded-md">When ready, take three more deep breaths and slowly open your eyes.</li>
              </ol>
            </div>
            <Button onClick={handleToolComplete} className="w-full">
              Complete Visualization
            </Button>
          </div>
        )}
        
        {/* Sound Therapies */}
        {selectedTool === "Calming Nature Sounds" && (
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">Calming Nature Sounds</h3>
            <div className="mb-6">
              <p className="mb-4">Select a nature sound to play:</p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto py-3 flex flex-col">
                  <span className="block mb-1">🌊</span>
                  <span className="text-sm">Ocean Waves</span>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex flex-col">
                  <span className="block mb-1">🌧️</span>
                  <span className="text-sm">Gentle Rain</span>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex flex-col">
                  <span className="block mb-1">🌳</span>
                  <span className="text-sm">Forest Sounds</span>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex flex-col">
                  <span className="block mb-1">🔥</span>
                  <span className="text-sm">Crackling Fire</span>
                </Button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                (Audio playback would be implemented in a production version)
              </p>
            </div>
            <Button onClick={handleToolComplete}>
              Complete Session
            </Button>
          </div>
        )}
        
        {/* Fallback content for other tools */}
        {!["Mood Reflection", "Future Self", "Challenge Navigator", "Gratitude Practice", "Guided Visualization", "Calming Nature Sounds"].includes(selectedTool || "") && (
          <div className="p-6 text-center">
            <p className="mb-6">
              This tool will include more detailed content in the complete version.
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

export default MoodTools;
