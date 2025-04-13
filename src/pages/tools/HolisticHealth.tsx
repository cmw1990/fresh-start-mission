
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Brain, Heart, Zap, ExternalLink, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";

const HolisticHealth = () => {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Holistic Health Resources</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Discover evidence-based approaches to managing energy, mood, focus, and cravings during your fresh journey.
        </p>
      </div>

      <Tabs defaultValue="energy" className="mb-10">
        <TabsList className="mb-6">
          <TabsTrigger value="energy" className="flex items-center gap-2">
            <Activity className="h-4 w-4" /> Energy
          </TabsTrigger>
          <TabsTrigger value="mood" className="flex items-center gap-2">
            <Heart className="h-4 w-4" /> Mood
          </TabsTrigger>
          <TabsTrigger value="focus" className="flex items-center gap-2">
            <Brain className="h-4 w-4" /> Focus
          </TabsTrigger>
          <TabsTrigger value="cravings" className="flex items-center gap-2">
            <Zap className="h-4 w-4" /> Cravings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="energy" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Energy Management</h2>
            <p className="text-muted-foreground mb-6">
              Low energy levels are one of the most common challenges when reducing nicotine. These research-backed strategies can help you manage fatigue and maintain natural energy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResourceCard
              title="Physical Activity for Energy"
              description="Short bursts of physical activity can significantly boost energy levels during nicotine withdrawal."
              type="Article"
              content={
                <div className="space-y-4">
                  <h3 className="font-medium">Key Strategies:</h3>
                  <ul className="space-y-2">
                    <ResourceListItem>
                      Try a 5-minute walk when energy dips - research shows even brief movement can increase energy by 20%
                    </ResourceListItem>
                    <ResourceListItem>
                      Simple stretching at your desk can improve circulation and reduce fatigue
                    </ResourceListItem>
                    <ResourceListItem>
                      Morning exercise has been shown to improve energy levels throughout the entire day
                    </ResourceListItem>
                  </ul>
                  <p className="text-sm text-muted-foreground italic">
                    Based on studies from the University of Georgia showing a 65% reduction in fatigue among previously sedentary individuals who began regular, low-intensity exercise.
                  </p>
                </div>
              }
            />
            
            <ResourceCard
              title="Optimal Hydration & Nutrition"
              description="What you eat and drink directly impacts your energy levels, especially during nicotine withdrawal."
              type="Guide"
              content={
                <div className="space-y-4">
                  <h3 className="font-medium">Energy-Boosting Nutrition:</h3>
                  <ul className="space-y-2">
                    <ResourceListItem>
                      Stay hydrated - even mild dehydration reduces energy levels by up to 30%
                    </ResourceListItem>
                    <ResourceListItem>
                      Balance blood sugar with protein+complex carb meals (e.g., oatmeal with nuts, not sugary cereals)
                    </ResourceListItem>
                    <ResourceListItem>
                      B vitamins support energy production - consider foods like leafy greens, whole grains, and eggs
                    </ResourceListItem>
                    <ResourceListItem>
                      Magnesium-rich foods (nuts, seeds, dark chocolate) help combat the fatigue often experienced during withdrawal
                    </ResourceListItem>
                  </ul>
                </div>
              }
            />
            
            <ResourceCard
              title="Strategic Rest & Recovery"
              description="Proper rest techniques can significantly reduce withdrawal-related fatigue."
              type="Techniques"
              content={
                <div className="space-y-4">
                  <h3 className="font-medium">Evidence-Based Rest Techniques:</h3>
                  <ul className="space-y-2">
                    <ResourceListItem>
                      10-20 minute power naps boost alertness without grogginess (avoid longer naps)
                    </ResourceListItem>
                    <ResourceListItem>
                      Practice the 90-minute work/rest cycle - matches your body's natural ultradian rhythm
                    </ResourceListItem>
                    <ResourceListItem>
                      "Rest breaks" differ from "stress breaks" - research shows nature views restore mental energy
                    </ResourceListItem>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">
                    These techniques are especially valuable during the first 2-3 weeks of nicotine reduction when energy fluctuations are most intense.
                  </p>
                </div>
              }
            />
            
            <ResourceCard
              title="Breathing for Energy"
              description="Specific breathing techniques can quickly boost energy and counteract fatigue."
              type="Exercise"
              content={
                <div className="space-y-4">
                  <h3 className="font-medium">Try This Energizing Breath Technique:</h3>
                  <ol className="space-y-2 list-decimal pl-4">
                    <li>Sit comfortably with good posture</li>
                    <li>Inhale rapidly through your nose for 2-3 seconds</li>
                    <li>Exhale gently through the mouth for 3-4 seconds</li>
                    <li>Repeat for 1 minute (about 10-12 breaths)</li>
                  </ol>
                  <p className="text-sm">
                    This technique increases oxygen flow and can activate your sympathetic nervous system, providing a natural energy boost without caffeine.
                  </p>
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Full Breathing Guide
                    </Button>
                  </div>
                </div>
              }
            />
          </div>
        </TabsContent>
        
        <TabsContent value="mood" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Mood Regulation</h2>
            <p className="text-muted-foreground mb-6">
              Mood fluctuations are a normal part of reducing nicotine intake. These techniques can help stabilize emotions and reduce irritability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResourceCard
              title="Mindfulness for Emotional Balance"
              description="Research-backed mindfulness practices specifically designed for nicotine reduction."
              type="Techniques"
              content={
                <div className="space-y-4">
                  <h3 className="font-medium">Simple Mindfulness Practices:</h3>
                  <ul className="space-y-2">
                    <ResourceListItem>
                      3-minute breathing space: focus on breath, body sensations, and then expand awareness
                    </ResourceListItem>
                    <ResourceListItem>
                      RAIN technique: Recognize emotions, Allow them to exist, Investigate with curiosity, Non-identification
                    </ResourceListItem>
                    <ResourceListItem>
                      Body scan: systematically notice sensations throughout your body without judgment
                    </ResourceListItem>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    Clinical studies show regular mindfulness practice reduces irritability during nicotine withdrawal by up to 40%.
                  </p>
                </div>
              }
            />
            
            <ResourceCard
              title="Nature Connection for Mood"
              description="How natural environments can stabilize mood during nicotine reduction."
              type="Article"
              content={
                <div className="space-y-4">
                  <h3 className="font-medium">Nature-Based Mood Boosters:</h3>
                  <ul className="space-y-2">
                    <ResourceListItem>
                      Just 20 minutes in nature reduces stress hormones by 10-20%
                    </ResourceListItem>
                    <ResourceListItem>
                      "Forest bathing" (mindful time among trees) has been shown to reduce irritability
                    </ResourceListItem>
                    <ResourceListItem>
                      Even viewing nature photos can help - keep calming nature images on your phone
                    </ResourceListItem>
                  </ul>
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Find Green Spaces Near You
                    </Button>
                  </div>
                </div>
              }
            />
            
            <ResourceCard
              title="Physical Movement for Mood"
              description="How specific types of movement can regulate emotions during nicotine withdrawal."
              type="Guide"
              content={
                <div className="space-y-4">
                  <h3 className="font-medium">Movement-Based Mood Regulation:</h3>
                  <ul className="space-y-2">
                    <ResourceListItem>
                      Rhythmic activities (walking, swimming, cycling) are most effective for mood
                    </ResourceListItem>
                    <ResourceListItem>
                      Movement releases endorphins that counteract the dopamine drop from reduced nicotine
                    </ResourceListItem>
                    <ResourceListItem>
                      Even 5-10 minutes of movement can shift your emotional state
                    </ResourceListItem>
                  </ul>
                </div>
              }
            />
            
            <ResourceCard
              title="Social Connection & Mood"
              description="How relationships impact emotional stability during your fresh journey."
              type="Article"
              content={
                <div className="space-y-4">
                  <h3 className="font-medium">Social Support Strategies:</h3>
                  <ul className="space-y-2">
                    <ResourceListItem>
                      Identify your "support team" - who can you reach out to when emotions are intense?
                    </ResourceListItem>
                    <ResourceListItem>
                      Consider which relationships might trigger cravings and plan accordingly
                    </ResourceListItem>
                    <ResourceListItem>
                      Online communities with similar goals provide validation and understanding
                    </ResourceListItem>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    Research shows people with strong social support are 2-3 times more likely to successfully reduce or quit nicotine use.
                  </p>
                </div>
              }
            />
          </div>
        </TabsContent>
        
        <TabsContent value="focus" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Focus Enhancement</h2>
            <p className="text-muted-foreground mb-6">
              Difficulty concentrating is a common temporary side effect of nicotine reduction. These strategies can help maintain mental clarity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResourceCard
              title="Optimal Work Environment"
              description="How to structure your workspace for maximum focus during nicotine reduction."
              type="Guide"
              content={
                <div className="space-y-4">
                  <h3 className="font-medium">Environment Optimization:</h3>
                  <ul className="space-y-2">
                    <ResourceListItem>
                      Remove visual distractions - clear desk space reduces cognitive load
                    </ResourceListItem>
                    <ResourceListItem>
                      Use noise-cancelling headphones or ambient sound to mask distracting noises
                    </ResourceListItem>
                    <ResourceListItem>
                      Natural light improves focus by 15-20% compared to artificial lighting
                    </ResourceListItem>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    During nicotine withdrawal, your brain is more sensitive to distractions - optimizing your environment becomes even more important.
                  </p>
                </div>
              }
            />
            
            <ResourceCard
              title="Time Management Techniques"
              description="Focus strategies specifically adapted for the nicotine reduction period."
              type="Techniques"
              content={
                <div className="space-y-4">
                  <h3 className="font-medium">Focus Enhancement Methods:</h3>
                  <ul className="space-y-2">
                    <ResourceListItem>
                      Pomodoro Technique: 25 minutes of focused work followed by 5 minute breaks
                    </ResourceListItem>
                    <ResourceListItem>
                      Time-blocking: schedule specific focus periods when your energy is naturally higher
                    </ResourceListItem>
                    <ResourceListItem>
                      Task batching: group similar tasks to reduce context switching
                    </ResourceListItem>
                  </ul>
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Focus Techniques Guide
                    </Button>
                  </div>
                </div>
              }
            />
            
            <ResourceCard
              title="Cognitive Enhancement"
              description="Natural ways to support brain function during nicotine reduction."
              type="Article"
              content={
                <div className="space-y-4">
                  <h3 className="font-medium">Brain-Supporting Strategies:</h3>
                  <ul className="space-y-2">
                    <ResourceListItem>
                      Hydration - even mild dehydration reduces cognitive performance by 5-10%
                    </ResourceListItem>
                    <ResourceListItem>
                      Omega-3 fatty acids support brain function (fish, flaxseeds, walnuts)
                    </ResourceListItem>
                    <ResourceListItem>
                      B vitamins help maintain mental clarity during withdrawal
                    </ResourceListItem>
                    <ResourceListItem>
                      Natural light exposure helps regulate neurotransmitters affected by nicotine
                    </ResourceListItem>
                  </ul>
                </div>
              }
            />
            
            <ResourceCard
              title="Focus Exercises"
              description="Practice these exercises to strengthen attention during nicotine reduction."
              type="Exercises"
              content={
                <div className="space-y-4">
                  <h3 className="font-medium">Attention-Building Practices:</h3>
                  <ul className="space-y-2">
                    <ResourceListItem>
                      Single-point focus: practice focusing on one object for 1-3 minutes
                    </ResourceListItem>
                    <ResourceListItem>
                      Breath counting: count 1-10 breaths repeatedly, starting over when mind wanders
                    </ResourceListItem>
                    <ResourceListItem>
                      Progressive focus training: gradually increase focused work periods by 5 minutes
                    </ResourceListItem>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    These exercises can help rebuild attentional capacity that may be temporarily affected by changing nicotine levels.
                  </p>
                </div>
              }
            />
          </div>
        </TabsContent>
        
        <TabsContent value="cravings" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Craving Management</h2>
            <p className="text-muted-foreground mb-6">
              Evidence-based techniques to navigate through cravings effectively as your brain adapts to changing nicotine levels.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResourceCard
              title="The Science of Cravings"
              description="Understanding what happens in your brain during a craving and why they fade."
              type="Article"
              content={
                <div className="space-y-4">
                  <h3 className="font-medium">Key Craving Facts:</h3>
                  <ul className="space-y-2">
                    <ResourceListItem>
                      Most cravings peak within 3-5 minutes before naturally subsiding
                    </ResourceListItem>
                    <ResourceListItem>
                      Cravings activate the same brain regions as physical thirst
                    </ResourceListItem>
                    <ResourceListItem>
                      Each successfully weathered craving weakens the neural pathway, making future cravings less intense
                    </ResourceListItem>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    Understanding that cravings are temporary and diminish with time gives you power over them.
                  </p>
                </div>
              }
            />
            
            <ResourceCard
              title="Urge Surfing Technique"
              description="A powerful mindfulness approach to riding out cravings without giving in."
              type="Technique"
              content={
                <div className="space-y-4">
                  <h3 className="font-medium">How to Practice Urge Surfing:</h3>
                  <ol className="space-y-2 list-decimal pl-4">
                    <li>Notice the craving arising - where do you feel it in your body?</li>
                    <li>Observe the sensations with curiosity, not judgment</li>
                    <li>Breathe into the sensations, imagining them as a wave</li>
                    <li>Notice how the intensity changes, rises and falls</li>
                    <li>Remind yourself this is temporary and will pass</li>
                  </ol>
                  <p className="text-sm text-muted-foreground">
                    Clinical studies show urge surfing can reduce craving intensity by 20-30% compared to distraction techniques.
                  </p>
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Guided Urge Surfing Audio
                    </Button>
                  </div>
                </div>
              }
            />
            
            <ResourceCard
              title="H.A.L.T. Method"
              description="Identify and address the underlying needs that intensify cravings."
              type="Framework"
              content={
                <div className="space-y-4">
                  <h3 className="font-medium">The H.A.L.T. Framework:</h3>
                  <p>When a craving hits, check if you are:</p>
                  <ul className="space-y-2">
                    <ResourceListItem>
                      <strong>H</strong>ungry - Have a healthy snack to stabilize blood sugar
                    </ResourceListItem>
                    <ResourceListItem>
                      <strong>A</strong>ngry - Practice a quick calming technique
                    </ResourceListItem>
                    <ResourceListItem>
                      <strong>L</strong>onely - Reach out to a supportive person
                    </ResourceListItem>
                    <ResourceListItem>
                      <strong>T</strong>ired - Take a short rest or change activities
                    </ResourceListItem>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    Addressing these underlying needs can reduce craving intensity by up to 50%.
                  </p>
                </div>
              }
            />
            
            <ResourceCard
              title="Tactical Breathing"
              description="Used by military personnel in high-stress situations, now adapted for craving management."
              type="Exercise"
              content={
                <div className="space-y-4">
                  <h3 className="font-medium">4-4-4 Tactical Breathing:</h3>
                  <ol className="space-y-2 list-decimal pl-4">
                    <li>Inhale deeply through the nose for 4 seconds</li>
                    <li>Hold your breath for 4 seconds</li>
                    <li>Exhale completely through the mouth for 4 seconds</li>
                    <li>Repeat 4 times</li>
                  </ol>
                  <p className="text-sm">
                    This technique activates your parasympathetic nervous system, counteracting the stress response that often triggers cravings. It can reduce perceived craving intensity by 15-25% within 60 seconds.
                  </p>
                </div>
              }
            />
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-10 pt-6 border-t">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold mb-2">Ready for personalized support?</h2>
            <p className="text-muted-foreground">Create a free account to access tailored tools and track your progress.</p>
          </div>
          <Button asChild className="bg-fresh-500 hover:bg-fresh-600">
            <Link to="/sign-up" className="flex items-center gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const ResourceListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start">
    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
    <span className="text-sm">{children}</span>
  </li>
);

interface ResourceCardProps {
  title: string;
  description: string;
  type: string;
  content: React.ReactNode;
}

const ResourceCard = ({ title, description, type, content }: ResourceCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-1">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {type}
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default HolisticHealth;
