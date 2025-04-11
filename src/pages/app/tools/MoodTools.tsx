
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Heart, Music, Sun, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const MoodTools = () => {
  const [currentMood, setCurrentMood] = useState<string>("neutral");
  const [journalEntry, setJournalEntry] = useState<string>("");
  const [gratitudeItems, setGratitudeItems] = useState<string[]>(["", "", ""]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGratitudeChange = (index: number, value: string) => {
    const newItems = [...gratitudeItems];
    newItems[index] = value;
    setGratitudeItems(newItems);
  };

  const saveJournal = () => {
    if (journalEntry.trim()) {
      toast.success("Journal entry saved!", {
        description: "Your thoughts have been recorded."
      });
      setJournalEntry("");
    } else {
      toast.error("Entry cannot be empty", {
        description: "Please write something before saving."
      });
    }
  };

  const saveGratitude = () => {
    if (gratitudeItems.some(item => item.trim())) {
      toast.success("Gratitude list saved!", {
        description: "Thank you for practicing gratitude."
      });
    } else {
      toast.error("List cannot be empty", {
        description: "Please add at least one item."
      });
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Mood Lifters</h1>
        <p className="text-muted-foreground">
          Tools and exercises to stabilize mood swings and enhance emotional wellbeing
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">How are you feeling right now?</h2>
        <RadioGroup 
          value={currentMood} 
          onValueChange={setCurrentMood} 
          className="grid grid-cols-3 sm:grid-cols-5 gap-4"
        >
          <div className="flex flex-col items-center gap-2">
            <Label 
              htmlFor="sad" 
              className={`h-16 w-16 rounded-full flex items-center justify-center text-2xl border-2 ${
                currentMood === "sad" ? "border-fresh-300 bg-fresh-50" : "border-gray-200"
              } cursor-pointer hover:bg-fresh-50`}
            >
              😔
            </Label>
            <RadioGroupItem value="sad" id="sad" className="sr-only" />
            <span className="text-sm">Sad</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Label 
              htmlFor="anxious" 
              className={`h-16 w-16 rounded-full flex items-center justify-center text-2xl border-2 ${
                currentMood === "anxious" ? "border-fresh-300 bg-fresh-50" : "border-gray-200"
              } cursor-pointer hover:bg-fresh-50`}
            >
              😰
            </Label>
            <RadioGroupItem value="anxious" id="anxious" className="sr-only" />
            <span className="text-sm">Anxious</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Label 
              htmlFor="neutral" 
              className={`h-16 w-16 rounded-full flex items-center justify-center text-2xl border-2 ${
                currentMood === "neutral" ? "border-fresh-300 bg-fresh-50" : "border-gray-200"
              } cursor-pointer hover:bg-fresh-50`}
            >
              😐
            </Label>
            <RadioGroupItem value="neutral" id="neutral" className="sr-only" />
            <span className="text-sm">Neutral</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Label 
              htmlFor="content" 
              className={`h-16 w-16 rounded-full flex items-center justify-center text-2xl border-2 ${
                currentMood === "content" ? "border-fresh-300 bg-fresh-50" : "border-gray-200"
              } cursor-pointer hover:bg-fresh-50`}
            >
              🙂
            </Label>
            <RadioGroupItem value="content" id="content" className="sr-only" />
            <span className="text-sm">Content</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Label 
              htmlFor="happy" 
              className={`h-16 w-16 rounded-full flex items-center justify-center text-2xl border-2 ${
                currentMood === "happy" ? "border-fresh-300 bg-fresh-50" : "border-gray-200"
              } cursor-pointer hover:bg-fresh-50`}
            >
              😄
            </Label>
            <RadioGroupItem value="happy" id="happy" className="sr-only" />
            <span className="text-sm">Happy</span>
          </div>
        </RadioGroup>
      </div>

      <Tabs defaultValue="practices" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="practices">Mood Practices</TabsTrigger>
          <TabsTrigger value="journal">Journaling</TabsTrigger>
          <TabsTrigger value="sounds">Relaxing Sounds</TabsTrigger>
        </TabsList>

        <TabsContent value="practices" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="bg-fresh-50">
                <Heart className="h-6 w-6 text-fresh-500 mb-2" />
                <CardTitle>Gratitude Practice</CardTitle>
                <CardDescription>
                  Shift your focus to what's going well in your life
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-6">
                  Practicing gratitude has been shown to increase positive emotions, reduce stress, 
                  and improve overall well-being, making it especially helpful during nicotine withdrawal.
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      1. What's something in nature you're grateful for today?
                    </label>
                    <Textarea 
                      value={gratitudeItems[0]} 
                      onChange={(e) => handleGratitudeChange(0, e.target.value)} 
                      placeholder="E.g., The sunshine, trees outside my window..."
                      className="h-20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      2. What's a person or relationship you're grateful for?
                    </label>
                    <Textarea 
                      value={gratitudeItems[1]} 
                      onChange={(e) => handleGratitudeChange(1, e.target.value)} 
                      placeholder="E.g., My friend who called yesterday, my supportive partner..."
                      className="h-20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      3. What's something about yourself you're grateful for?
                    </label>
                    <Textarea 
                      value={gratitudeItems[2]} 
                      onChange={(e) => handleGratitudeChange(2, e.target.value)} 
                      placeholder="E.g., My determination to break free from nicotine, my creativity..."
                      className="h-20"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={saveGratitude} 
                  className="w-full bg-fresh-300 hover:bg-fresh-400"
                >
                  Save Gratitude List
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="bg-fresh-50">
                <Sun className="h-6 w-6 text-fresh-500 mb-2" />
                <CardTitle>Positive Affirmations</CardTitle>
                <CardDescription>
                  Statements to reinforce positive thinking during your fresh journey
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-6">
                  Positive affirmations can help combat negative thoughts that often accompany nicotine 
                  withdrawal. Repeat these affirmations aloud or mentally throughout your day.
                </p>
                <div className="space-y-4">
                  <div className="bg-fresh-50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">For Cravings:</h4>
                    <ul className="list-disc list-inside space-y-2 text-sm pl-2">
                      <li>"This craving is temporary and will pass."</li>
                      <li>"Each time I overcome a craving, I grow stronger."</li>
                      <li>"I am in control of my choices, not nicotine."</li>
                    </ul>
                  </div>
                  <div className="bg-fresh-50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">For Energy & Mood:</h4>
                    <ul className="list-disc list-inside space-y-2 text-sm pl-2">
                      <li>"Every day without nicotine, my energy improves."</li>
                      <li>"I deserve to feel good naturally, without substances."</li>
                      <li>"My body is healing and getting stronger each day."</li>
                    </ul>
                  </div>
                  <div className="bg-fresh-50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">For Motivation:</h4>
                    <ul className="list-disc list-inside space-y-2 text-sm pl-2">
                      <li>"I am committed to my fresh journey, one day at a time."</li>
                      <li>"I am proud of every step I take toward better health."</li>
                      <li>"I am worthy of a healthy, nicotine-free life."</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => {
                    toast.success("Daily affirmations activated!", {
                      description: "We'll send you a positive affirmation each day."
                    });
                  }} 
                  className="w-full bg-fresh-300 hover:bg-fresh-400"
                >
                  Set Daily Affirmation Reminder
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="journal" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Guided Journal</CardTitle>
              <CardDescription>
                Express your thoughts and feelings to process emotions during your fresh journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Today's Prompt</h3>
                <p className="p-4 bg-fresh-50 rounded-md">
                  {currentMood === "sad" && "What small thing could bring you a moment of joy today?"}
                  {currentMood === "anxious" && "What are you worried about? What's one small step you can take to address it?"}
                  {currentMood === "neutral" && "What are you looking forward to in the coming days?"}
                  {currentMood === "content" && "What's something that went well today, and why do you think it happened?"}
                  {currentMood === "happy" && "What's contributing to your happiness today? How can you create more of these moments?"}
                </p>
              </div>
              <Textarea 
                placeholder="Start writing your thoughts here..." 
                className="min-h-[200px]"
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
              />
            </CardContent>
            <CardFooter>
              <Button 
                onClick={saveJournal} 
                className="w-full bg-fresh-300 hover:bg-fresh-400"
              >
                Save Journal Entry
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <BookOpen className="h-6 w-6 text-fresh-500 mb-2" />
              <CardTitle>Journal Prompts Library</CardTitle>
              <CardDescription>
                Additional writing prompts to explore your emotions and journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-1">Processing Cravings</h4>
                  <p className="text-sm text-muted-foreground">
                    Describe your most recent craving in detail. What triggered it? How did it feel physically? 
                    How did you respond? What might you try next time?
                  </p>
                </div>
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-1">Celebrating Wins</h4>
                  <p className="text-sm text-muted-foreground">
                    What's a victory you've experienced in your fresh journey, no matter how small? 
                    How did it make you feel? Who can you share this win with?
                  </p>
                </div>
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-1">Future Self</h4>
                  <p className="text-sm text-muted-foreground">
                    Write a letter to yourself one year from now. What do you hope to tell them about 
                    your journey? What questions would you ask them?
                  </p>
                </div>
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-1">Values Reflection</h4>
                  <p className="text-sm text-muted-foreground">
                    How does staying nicotine-free align with your core values? What's one value 
                    that's particularly motivating for you right now?
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sounds" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="bg-fresh-50">
                <Music className="h-6 w-6 text-fresh-500 mb-2" />
                <CardTitle>Relaxing Sounds</CardTitle>
                <CardDescription>
                  Audio tracks to help calm your mind and lift your mood
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-6">
                  Sound therapy can help reduce stress and anxiety that often accompany nicotine withdrawal. 
                  Choose from our curated selection of calming sounds.
                </p>
                <div className="space-y-4">
                  <div 
                    className={`p-4 rounded-md cursor-pointer flex items-center justify-between ${isPlaying ? 'bg-fresh-100' : 'bg-fresh-50'}`}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    <div>
                      <h4 className="font-medium">Gentle Rain</h4>
                      <p className="text-sm text-muted-foreground">10 minutes</p>
                    </div>
                    <div className={`h-3 w-3 rounded-full ${isPlaying ? 'bg-fresh-500 animate-pulse' : 'bg-gray-300'}`}></div>
                  </div>
                  <div 
                    className="p-4 rounded-md cursor-pointer flex items-center justify-between bg-fresh-50"
                    onClick={() => toast.info("Coming soon!", { description: "This track will be available soon." })}
                  >
                    <div>
                      <h4 className="font-medium">Ocean Waves</h4>
                      <p className="text-sm text-muted-foreground">15 minutes</p>
                    </div>
                    <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                  </div>
                  <div 
                    className="p-4 rounded-md cursor-pointer flex items-center justify-between bg-fresh-50"
                    onClick={() => toast.info("Coming soon!", { description: "This track will be available soon." })}
                  >
                    <div>
                      <h4 className="font-medium">Forest Ambience</h4>
                      <p className="text-sm text-muted-foreground">12 minutes</p>
                    </div>
                    <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                  </div>
                  <div 
                    className="p-4 rounded-md cursor-pointer flex items-center justify-between bg-fresh-50"
                    onClick={() => toast.info("Coming soon!", { description: "This track will be available soon." })}
                  >
                    <div>
                      <h4 className="font-medium">Meditation Bells</h4>
                      <p className="text-sm text-muted-foreground">8 minutes</p>
                    </div>
                    <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-fresh-50">
                <Activity className="h-6 w-6 text-fresh-500 mb-2" />
                <CardTitle>Mood-Lifting Activities</CardTitle>
                <CardDescription>
                  Quick actions to improve your mood during challenging moments
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-6">
                  When you're feeling down during your nicotine withdrawal journey, these evidence-based 
                  activities can help lift your mood quickly.
                </p>
                <div className="space-y-4">
                  <div className="border-l-4 border-fresh-300 pl-4 py-2">
                    <h4 className="font-medium">Take a Green Break (10 min)</h4>
                    <p className="text-sm text-muted-foreground">
                      Step outside and find a spot with trees or plants. Research shows just 10 minutes in nature 
                      can significantly improve mood.
                    </p>
                  </div>
                  <div className="border-l-4 border-fresh-300 pl-4 py-2">
                    <h4 className="font-medium">Movement Snack (3-5 min)</h4>
                    <p className="text-sm text-muted-foreground">
                      Do a quick set of jumping jacks, dance to one song, or take a brisk walk around the block. 
                      Physical activity releases endorphins that boost mood.
                    </p>
                  </div>
                  <div className="border-l-4 border-fresh-300 pl-4 py-2">
                    <h4 className="font-medium">Reach Out (5 min)</h4>
                    <p className="text-sm text-muted-foreground">
                      Send a quick message or make a brief call to someone who supports your journey. 
                      Social connection is one of the strongest mood elevators.
                    </p>
                  </div>
                  <div className="border-l-4 border-fresh-300 pl-4 py-2">
                    <h4 className="font-medium">Sensory Reset (2 min)</h4>
                    <p className="text-sm text-muted-foreground">
                      Engage your senses with a pleasant scent (like an essential oil), a piece of fruit, 
                      or a quick cold shower. Sensory experiences can interrupt negative mood cycles.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => {
                    toast.success("Activity logged!", {
                      description: "Great job taking action for your mood!"
                    });
                  }} 
                  className="w-full bg-fresh-300 hover:bg-fresh-400"
                >
                  Log Completed Activity
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MoodTools;
