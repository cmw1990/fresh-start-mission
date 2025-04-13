
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Sun, Brain, Heart, Zap, CheckCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface TechniqueProps {
  title: string;
  description: string;
  steps: string[];
  benefits: string[];
  timeNeeded: string;
}

const Technique: React.FC<TechniqueProps> = ({
  title,
  description,
  steps,
  benefits,
  timeNeeded
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">How to practice:</h4>
          <ol className="list-decimal pl-5 space-y-1">
            {steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Benefits:</h4>
          <ul className="pl-5 space-y-1">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-md inline-block">
          <span className="text-sm font-medium">Time needed: </span>
          <span className="text-sm">{timeNeeded}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const HolisticHealth = () => {
  return (
    <div className="container py-12 px-4 mx-auto max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Holistic Health Guide</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Managing energy, mood, focus, and cravings during your fresh journey
        </p>
      </div>

      <div className="bg-gradient-to-r from-fresh-50 to-blue-50 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">The Holistic Approach to Nicotine Reduction</h2>
        <p className="mb-4">
          Quitting or reducing nicotine isn't just about willpower - it's about managing the real 
          physical and mental challenges that come with it. Energy dips, mood swings, focus issues, 
          and cravings are all connected aspects of the withdrawal process.
        </p>
        <p>
          At Mission Fresh, we believe addressing these holistic factors is key to a successful journey. 
          These science-backed techniques can help you navigate the challenging moments and build resilience 
          for long-term success.
        </p>
      </div>

      <Tabs defaultValue="energy" className="mb-12">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="energy" className="flex flex-col items-center gap-2 py-4">
            <Sun className="h-5 w-5 text-blue-600" />
            <span>Energy</span>
          </TabsTrigger>
          <TabsTrigger value="mood" className="flex flex-col items-center gap-2 py-4">
            <Heart className="h-5 w-5 text-green-600" />
            <span>Mood</span>
          </TabsTrigger>
          <TabsTrigger value="focus" className="flex flex-col items-center gap-2 py-4">
            <Brain className="h-5 w-5 text-purple-600" />
            <span>Focus</span>
          </TabsTrigger>
          <TabsTrigger value="cravings" className="flex flex-col items-center gap-2 py-4">
            <Zap className="h-5 w-5 text-amber-600" />
            <span>Cravings</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="energy">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2 text-blue-700">Energy Management</h3>
            <p className="text-lg mb-6">
              Many people experience fatigue and energy dips when reducing nicotine. These evidence-based 
              techniques can help maintain natural energy levels throughout the day.
            </p>
          </div>
          
          <Technique 
            title="5-Minute Energy Boost Breathing"
            description="A quick breathing technique that stimulates the sympathetic nervous system to increase alertness."
            steps={[
              "Find a comfortable seated position with your back straight.",
              "Inhale quickly through your nose for 2 counts.",
              "Exhale forcefully through your mouth for 1 count.",
              "Repeat this pattern for 1 minute.",
              "Return to normal breathing for 30 seconds.",
              "Repeat the cycle 3 times."
            ]}
            benefits={[
              "Increases oxygen flow to your brain for improved alertness",
              "Can be done anywhere, anytime you feel an energy slump",
              "Acts as a healthier alternative to the stimulant effect of nicotine",
              "Helps reset your focus when feeling scattered"
            ]}
            timeNeeded="5 minutes"
          />
          
          <Technique 
            title="Strategic Hydration Protocol"
            description="A scheduled approach to hydration that helps maintain energy levels and reduce fatigue."
            steps={[
              "Start your day with 16oz (500ml) of room temperature water before anything else.",
              "Set a timer to drink 8oz (250ml) of water every 2 hours.",
              "Add a squeeze of lemon or a splash of fruit juice for electrolytes if desired.",
              "Reduce caffeine intake after 2pm to avoid sleep disruption."
            ]}
            benefits={[
              "Prevents dehydration-related fatigue which is common during nicotine withdrawal",
              "Helps flush toxins from your system",
              "Creates a healthy routine to replace nicotine habits",
              "Improves cognitive function and concentration"
            ]}
            timeNeeded="All day (minimal effort)"
          />
          
          <Technique 
            title="3-Minute Movement Reset"
            description="Short bursts of physical activity that can quickly elevate energy levels when you're feeling sluggish."
            steps={[
              "Stand up and stretch your arms overhead for 20 seconds.",
              "Do 15 jumping jacks or march in place vigorously for 30 seconds.",
              "Perform 10 body-weight squats.",
              "Do 10 wall or desk push-ups.",
              "Finish with 5 deep breaths, inhaling for 4 counts and exhaling for 6."
            ]}
            benefits={[
              "Increases heart rate and blood flow to deliver more oxygen throughout your body",
              "Triggers release of energy-boosting endorphins",
              "Can be done in normal clothing without getting sweaty",
              "Reduces the perceived need for the stimulant effects of nicotine"
            ]}
            timeNeeded="3 minutes"
          />
        </TabsContent>
        
        <TabsContent value="mood">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2 text-green-700">Mood Enhancement</h3>
            <p className="text-lg mb-6">
              Nicotine withdrawal can cause irritability and mood swings. These techniques help 
              stabilize emotions and create a more positive mindset.
            </p>
          </div>
          
          <Technique 
            title="RAIN Method for Emotional Regulation"
            description="A mindfulness technique to process difficult emotions without reacting impulsively."
            steps={[
              "R - Recognize what you're feeling without judgment.",
              "A - Allow the feeling to be there, giving yourself permission to feel it.",
              "I - Investigate with curiosity where you feel it in your body and what thoughts accompany it.",
              "N - Non-identification: remind yourself 'This is a feeling, not who I am.'"
            ]}
            benefits={[
              "Creates space between emotions and reactions",
              "Reduces the intensity of negative emotions",
              "Builds emotional intelligence and self-awareness",
              "Prevents emotional triggers from leading to nicotine use"
            ]}
            timeNeeded="2-5 minutes"
          />
          
          <Technique 
            title="3-3-3 Grounding Practice"
            description="A quick sensory awareness exercise that brings you back to the present moment when emotions feel overwhelming."
            steps={[
              "Name 3 things you can see around you right now.",
              "Name 3 sounds you can hear right now.",
              "Move 3 parts of your body (wiggle toes, rotate shoulders, stretch fingers).",
              "Take 3 slow, deep breaths."
            ]}
            benefits={[
              "Interrupts spiraling negative thought patterns",
              "Reconnects you with the present moment",
              "Reduces anxiety by activating the parasympathetic nervous system",
              "Can be done discreetly in any situation"
            ]}
            timeNeeded="1-2 minutes"
          />
          
          <Technique 
            title="Gratitude Pivot"
            description="A practiced method to shift perspective from negative to positive by focusing on gratitude."
            steps={[
              "When you notice irritability or a negative mood, pause.",
              "Take one deep breath.",
              "Name three specific things you're grateful for right now (be as specific as possible).",
              "For each item, take a moment to really feel the appreciation in your body.",
              "Think of one small positive action you can take in this moment."
            ]}
            benefits={[
              "Activates positive neural pathways in the brain",
              "Releases dopamine naturally (similar to what nicotine artificially triggered)",
              "Builds resilience against stress and negative emotions",
              "Creates a healthy alternative response to emotional triggers"
            ]}
            timeNeeded="3-5 minutes"
          />
        </TabsContent>
        
        <TabsContent value="focus">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2 text-purple-700">Focus Improvement</h3>
            <p className="text-lg mb-6">
              Many people experience "brain fog" and concentration issues when reducing nicotine. These 
              techniques can help you maintain mental clarity and productivity.
            </p>
          </div>
          
          <Technique 
            title="Pomodoro Focus Method"
            description="A time management technique that uses focused work sessions and brief breaks to maintain concentration."
            steps={[
              "Choose one specific task to focus on.",
              "Set a timer for 25 minutes of uninterrupted work.",
              "Work only on that task until the timer rings.",
              "Take a 5-minute break (stand up, stretch, get water).",
              "After 4 cycles, take a longer 15-30 minute break."
            ]}
            benefits={[
              "Creates structure to overcome scattered attention",
              "Makes focus manageable in shorter bursts",
              "Regular breaks prevent mental fatigue",
              "Builds confidence in your ability to focus without nicotine"
            ]}
            timeNeeded="30 minutes per cycle"
          />
          
          <Technique 
            title="Brain-Dump Clearing"
            description="A quick writing exercise to clear mental distractions and improve focus."
            steps={[
              "Take a blank sheet of paper or open a notes app.",
              "Set a timer for 2 minutes.",
              "Write down everything that's on your mind - tasks, worries, ideas, anything.",
              "Don't edit or organize, just get it all out of your head.",
              "When done, circle 1-3 items that need immediate attention.",
              "File the rest for later or let them go."
            ]}
            benefits={[
              "Clears the 'mental RAM' that's slowing down your thinking",
              "Reduces anxiety about forgetting important things",
              "Creates mental space for focused attention",
              "Helps prioritize what truly matters right now"
            ]}
            timeNeeded="2-5 minutes"
          />
          
          <Technique 
            title="5-4-3-2-1 Concentration Reset"
            description="A multisensory focus exercise that can quickly improve concentration and mental clarity."
            steps={[
              "Sit comfortably and take a few deep breaths.",
              "Notice 5 things you can SEE in detail around you.",
              "Notice 4 things you can FEEL (textures, temperature, etc.).",
              "Notice 3 things you can HEAR in your environment.",
              "Notice 2 things you can SMELL (or like to smell).",
              "Notice 1 thing you can TASTE (or would like to taste).",
              "Return to your task with renewed focus."
            ]}
            benefits={[
              "Fully engages your brain in the present moment",
              "Interrupts rumination and circular thinking",
              "Activates multiple brain regions to enhance overall cognition",
              "Creates a clean mental slate before beginning focused work"
            ]}
            timeNeeded="3 minutes"
          />
        </TabsContent>
        
        <TabsContent value="cravings">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2 text-amber-700">Craving Management</h3>
            <p className="text-lg mb-6">
              Cravings are a normal part of reducing nicotine intake. These evidence-based techniques 
              help you navigate through cravings effectively.
            </p>
          </div>
          
          <Technique 
            title="The 4Ds Technique"
            description="A comprehensive approach to managing cravings using four proven strategies."
            steps={[
              "Delay: Tell yourself you'll wait just 5 more minutes before giving in.",
              "Distract: Immediately do something that requires attention (call someone, play a game on your phone, solve a quick puzzle).",
              "Drink water: Slowly drink a full glass of water.",
              "Deep breathe: Take 10 slow, deep breaths, focusing on the sensation of breathing."
            ]}
            benefits={[
              "Works with your brain's natural timing - most cravings peak and fade within 5-10 minutes",
              "Gives you specific actions to take rather than just resisting",
              "Introduces healthier habits (hydration, mindfulness)",
              "Builds confidence with each successful craving management experience"
            ]}
            timeNeeded="5-10 minutes"
          />
          
          <Technique 
            title="Urge Surfing Meditation"
            description="A mindfulness technique that helps you ride out cravings rather than fighting them."
            steps={[
              "When a craving hits, sit comfortably and close your eyes.",
              "Notice where in your body you feel the craving (throat, chest, hands, etc.).",
              "Observe the sensation with curiosity rather than judgment.",
              "Imagine the craving as a wave that rises, peaks, and eventually falls.",
              "Breathe deeply while you 'surf' the wave, knowing it will diminish.",
              "Notice when the intensity begins to decrease."
            ]}
            benefits={[
              "Reduces the anxiety and frustration of fighting cravings",
              "Helps you understand cravings as temporary sensations, not commands",
              "Builds mindfulness skills that benefit many areas of life",
              "Each practice makes the next craving easier to manage"
            ]}
            timeNeeded="3-5 minutes"
          />
          
          <Technique 
            title="HALT Check-In"
            description="A quick self-assessment to identify and address the triggers behind cravings."
            steps={[
              "When a craving hits, pause and ask yourself if you are:",
              "H - Hungry? (If yes, have a healthy snack)",
              "A - Angry? (If yes, take a few deep breaths or briefly journal)",
              "L - Lonely? (If yes, reach out to someone or engage in a community)",
              "T - Tired? (If yes, take a short break, nap, or stretch)",
              "Address the underlying need you identified."
            ]}
            benefits={[
              "Identifies the true need behind many cravings",
              "Provides specific, effective actions to take",
              "Increases self-awareness of your personal triggers",
              "Addresses root causes rather than just symptoms"
            ]}
            timeNeeded="2-10 minutes"
          />
        </TabsContent>
      </Tabs>
      
      <div className="mt-10 mb-16 p-6 bg-purple-50 border border-purple-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Your Holistic Fresh Journey</h3>
        <p className="mb-4">
          Remember that nicotine reduction is a holistic process. Your energy levels, mood, focus, and cravings 
          are all interconnected. Improving one area often benefits the others.
        </p>
        <p className="mb-4">
          We recommend experimenting with techniques from each category and discovering what works best for you. 
          Everyone's body and mind respond differently, so personalization is key.
        </p>
        <p className="font-medium">
          For more personalized support, daily tracking, and a full suite of interactive tools, the Mission Fresh 
          app provides comprehensive guidance for your entire journey.
        </p>
      </div>
      
      <div className="flex justify-between">
        <Link to="/tools">
          <Button variant="outline" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </Link>
        <Link to="/tools/calculators">
          <Button variant="default" className="bg-fresh-500 hover:bg-fresh-600">
            Try Our Calculators
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HolisticHealth;
