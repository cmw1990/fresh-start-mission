
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smile, Heart, Music, SunMoon, Flower } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useHaptics, HapticImpact } from '@/hooks/useHaptics';

const MoodTools = () => {
  const { impact } = useHaptics();
  
  const handleToolComplete = () => {
    impact(HapticImpact.MEDIUM);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Mood Support Tools</h1>
        <p className="text-muted-foreground">
          Tools and exercises to improve your mood during your nicotine-free journey
        </p>
      </div>
      
      <Tabs defaultValue="practices" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="practices">Quick Practices</TabsTrigger>
          <TabsTrigger value="journal">Journaling</TabsTrigger>
          <TabsTrigger value="relaxation">Relaxation</TabsTrigger>
          <TabsTrigger value="gratitude">Gratitude</TabsTrigger>
        </TabsList>
        
        <TabsContent value="practices" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smile className="h-8 w-8 text-amber-500" />
                3-Minute Mood Shifter
              </CardTitle>
              <CardDescription>Quick practice to elevate your mood</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>Close your eyes or soften your gaze</li>
                <li>Take 5 slow, deep breaths</li>
                <li>Recall a memory when you felt strong and capable</li>
                <li>Notice the feelings in your body as you remember</li>
                <li>Set an intention for how you want to feel moving forward</li>
              </ol>
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
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-8 w-8 text-red-500" />
                Self-Compassion Break
              </CardTitle>
              <CardDescription>Be kind to yourself during withdrawal challenges</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">When you're being hard on yourself about cravings or slip-ups:</p>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>Notice your self-critical thoughts and feelings</li>
                <li>Say to yourself: "This is a moment of suffering"</li>
                <li>Acknowledge: "Struggling is part of the shared human experience"</li>
                <li>Place your hand on your heart and say: "May I be kind to myself"</li>
                <li>Continue with self-supportive words you need to hear</li>
              </ol>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration: 2 minutes</span>
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
              <CardTitle>Movement for Mood</CardTitle>
              <CardDescription>Physical activities that release feel-good hormones</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Even brief movement can significantly improve mood:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>Dance Break:</strong> Put on a favorite song and dance for 2-3 minutes</li>
                <li><strong>Victory Pose:</strong> Stand tall with arms raised for 2 minutes</li>
                <li><strong>Walking:</strong> A 5-minute brisk walk, ideally outdoors</li>
                <li><strong>Stretching:</strong> Full-body stretch sequence</li>
                <li><strong>Jumping Jacks:</strong> 1 minute to get your heart rate up</li>
              </ul>
              <p className="text-sm text-muted-foreground mb-4">
                Movement helps release endorphins that can counter the mood dips during nicotine withdrawal.
              </p>
              <div className="flex justify-end">
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Set Movement Reminder
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-8 w-8 text-indigo-500" />
                Music Intervention
              </CardTitle>
              <CardDescription>Use music strategically to boost your mood</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Music can rapidly shift your emotional state:</p>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>Create playlists for different moods (uplifting, calming, energizing)</li>
                <li>Listen actively for 5 minutes (not as background)</li>
                <li>Focus on the sounds, rhythm, and emotional qualities</li>
                <li>Allow yourself to move or respond physically</li>
                <li>Notice how your mood shifts during and after</li>
              </ol>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration: 5 minutes</span>
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Start Listening
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="journal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Guided Journal Prompts</CardTitle>
              <CardDescription>Write your responses to these mood-enhancing prompts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Prompt 1: Celebrating Efforts</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Write about 3 efforts you've made in your journey, no matter how small. They don't have to be "successes" - just acknowledge your attempts and courage.
                </p>
                <Textarea 
                  placeholder="I'm proud that I..."
                  className="min-h-[100px]"
                />
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Prompt 2: Future Self</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Write a short letter from your future self (1 month from now) who has made progress on their goals. What advice and encouragement would they give you?
                </p>
                <Textarea 
                  placeholder="Dear present me,"
                  className="min-h-[100px]"
                />
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Prompt 3: Reframing Challenges</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Describe a recent challenge in your journey. Then rewrite it from a perspective of growth - what did it teach you? How did it make you stronger?
                </p>
                <Textarea 
                  placeholder="A recent challenge was... Looking at it differently..."
                  className="min-h-[100px]"
                />
                <div className="flex justify-end mt-2">
                  <Button 
                    onClick={handleToolComplete}
                    variant="outline"
                  >
                    Save Journal Entry
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Expressive Writing</CardTitle>
              <CardDescription>Release difficult emotions through writing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">This powerful technique involves writing continuously for 10-15 minutes about your deepest thoughts and feelings, especially those you may be suppressing:</p>
              <ol className="list-decimal pl-5 space-y-2 mb-6">
                <li>Find a private, quiet space where you won't be interrupted</li>
                <li>Write continuously without concern for grammar, spelling, or structure</li>
                <li>Write only for yourself - this won't be shared with anyone</li>
                <li>Write about what you're feeling right now, especially about your nicotine journey</li>
                <li>When finished, you can keep it or destroy it - the benefit comes from the expression</li>
              </ol>
              <Textarea 
                placeholder="Begin writing here about whatever you're feeling..."
                className="min-h-[200px]"
              />
              <div className="flex justify-end mt-2">
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Complete Writing Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="relaxation" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SunMoon className="h-8 w-8 text-sky-400" />
                Progressive Relaxation
              </CardTitle>
              <CardDescription>Release physical tension to improve mood</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Nicotine withdrawal can cause physical tension, which affects mood:</p>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>Sit or lie in a comfortable position</li>
                <li>Tense each muscle group for 5 seconds, then release for 10 seconds</li>
                <li>Start with feet, then calves, thighs, abdomen, hands, arms, shoulders, neck, face</li>
                <li>Focus on the difference between tension and relaxation</li>
                <li>End with taking three deep breaths</li>
              </ol>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration: 8 minutes</span>
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Start Guided Practice
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>4-7-8 Breathing</CardTitle>
              <CardDescription>Calming breath technique for anxiety and mood</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>Sit with your back straight</li>
                <li>Place the tip of your tongue behind your upper front teeth</li>
                <li>Exhale completely through your mouth</li>
                <li>Close your mouth and inhale through your nose for 4 counts</li>
                <li>Hold your breath for 7 counts</li>
                <li>Exhale completely through your mouth for 8 counts</li>
                <li>Repeat cycle 3-4 times</li>
              </ol>
              <p className="text-sm text-muted-foreground mb-4">
                This breathing pattern activates your parasympathetic nervous system, reducing stress hormones that can worsen mood during nicotine withdrawal.
              </p>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration: 2 minutes</span>
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Start Breathing Exercise
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Guided Visualization</CardTitle>
              <CardDescription>Mental imagery for relaxation and mood improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">This practice helps calm your mind and shift your emotional state:</p>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>Find a comfortable position and close your eyes</li>
                <li>Take several deep breaths to relax</li>
                <li>Imagine a peaceful place where you feel safe and calm</li>
                <li>Use all your senses: what do you see, hear, smell, feel there?</li>
                <li>Spend 5 minutes exploring this place in your mind</li>
                <li>Before returning, imagine bringing this calm feeling back with you</li>
              </ol>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration: 5 minutes</span>
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Start Visualization
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flower className="h-8 w-8 text-pink-500" />
                Body Scan Meditation
              </CardTitle>
              <CardDescription>Relieve physical discomfort affecting mood</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>Lie down or sit comfortably</li>
                <li>Close your eyes and bring awareness to your breathing</li>
                <li>Gradually direct attention from your toes to the top of your head</li>
                <li>Notice sensations without judgment (tension, temperature, etc.)</li>
                <li>If you find areas of tension, breathe into them</li>
                <li>End with awareness of your whole body</li>
              </ol>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration: 10 minutes</span>
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Start Body Scan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="gratitude" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Three Good Things Practice</CardTitle>
              <CardDescription>Scientifically validated method for mood improvement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="mb-2">Write down three good things that happened today, no matter how small. For each one, answer:</p>
              
              <div>
                <h3 className="font-medium mb-2">Good Thing #1:</h3>
                <Textarea 
                  placeholder="Something good that happened today..."
                  className="min-h-[50px] mb-2"
                />
                <p className="text-sm font-medium mt-2">Why did this good thing happen?</p>
                <Textarea 
                  placeholder="It happened because..."
                  className="min-h-[50px]"
                />
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Good Thing #2:</h3>
                <Textarea 
                  placeholder="Another good thing that happened today..."
                  className="min-h-[50px] mb-2"
                />
                <p className="text-sm font-medium mt-2">Why did this good thing happen?</p>
                <Textarea 
                  placeholder="It happened because..."
                  className="min-h-[50px]"
                />
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Good Thing #3:</h3>
                <Textarea 
                  placeholder="A third good thing that happened today..."
                  className="min-h-[50px] mb-2"
                />
                <p className="text-sm font-medium mt-2">Why did this good thing happen?</p>
                <Textarea 
                  placeholder="It happened because..."
                  className="min-h-[50px]"
                />
                <div className="flex justify-end mt-2">
                  <Button 
                    onClick={handleToolComplete}
                    variant="outline"
                  >
                    Save Gratitude Entry
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Gratitude Letter</CardTitle>
              <CardDescription>Express gratitude towards someone who's supporting your journey</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Write a letter expressing gratitude to someone who has supported you during your journey to reduce/quit nicotine. You don't have to send it - the act of writing is powerful enough.</p>
              
              <Textarea 
                placeholder="Dear [Name], I want to express my gratitude for the way you've supported me during my journey to quit nicotine..."
                className="min-h-[300px]"
              />
              
              <div className="flex justify-end mt-4">
                <Button 
                  onClick={handleToolComplete}
                  variant="outline"
                >
                  Complete Letter
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MoodTools;
