
import { useState } from "react";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Accordion, AccordionContent, AccordionItem, AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  BatteryCharging, Brain, Activity, Flame, 
  Coffee, Droplets, Heart, Moon, Utensils, 
  Dumbbell, Sun, BookOpen, Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TipCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tips: string[];
  color: string;
}

const TipCard = ({ title, description, icon, tips, color }: TipCardProps) => {
  return (
    <Card>
      <CardHeader className={cn("pb-3", `bg-${color}-50`)}>
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-lg bg-white", `text-${color}-500`)}>
            {icon}
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <ul className="list-disc pl-5 space-y-1.5">
          {tips.map((tip, index) => (
            <li key={index} className="text-sm">{tip}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const EnergyContent = () => {
  return (
    <div className="space-y-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-muted-foreground mb-6">
          Nicotine withdrawal often leads to fatigue and energy slumps as your body adjusts to functioning without the stimulant effects.
          These evidence-based strategies can help you manage energy dips during your fresh journey.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <TipCard 
          title="Physical Activity Boosts"
          description="Use strategic movement to counteract fatigue"
          icon={<Dumbbell className="h-5 w-5" />}
          color="green"
          tips={[
            "Take a brisk 10-minute walk when energy dips - even brief activity increases circulation and energizes the body",
            "Try 'exercise snacking' - short 2-3 minute bursts of moderate activity throughout the day",
            "Do 5 minutes of stretching when feeling sluggish to release tension and improve blood flow",
            "Stand up and do 10 jumping jacks or march in place to quickly elevate heart rate",
            "Consider morning exercise to set a more energetic tone for the entire day"
          ]}
        />
        
        <TipCard 
          title="Strategic Hydration"
          description="Combat fatigue through proper fluid intake"
          icon={<Droplets className="h-5 w-5" />}
          color="blue"
          tips={[
            "Drink a full glass of water when a craving or energy slump hits - dehydration often masquerades as fatigue",
            "Aim for at least 8 glasses of water daily during withdrawal",
            "Use a marked water bottle to track intake throughout the day",
            "Infuse water with lemon, cucumber, or mint for flavor without caffeine or sugar",
            "Limit alcohol as it disrupts sleep quality and worsens fatigue"
          ]}
        />
        
        <TipCard 
          title="Nutrition Strategies"
          description="Eat to stabilize energy levels"
          icon={<Utensils className="h-5 w-5" />}
          color="amber"
          tips={[
            "Eat smaller, more frequent meals to prevent blood sugar crashes",
            "Include protein with every meal and snack to maintain steady energy levels",
            "Choose complex carbohydrates (whole grains, legumes) for sustained energy",
            "Prepare healthy snacks in advance for when energy dips occur",
            "Consider B-vitamin rich foods like eggs, leafy greens, and whole grains which support energy metabolism"
          ]}
        />
        
        <TipCard 
          title="Caffeine Management"
          description="Use caffeine strategically, not as a crutch"
          icon={<Coffee className="h-5 w-5" />}
          color="orange"
          tips={[
            "Limit caffeine to mornings to avoid sleep disruption",
            "Consider green tea for a gentler caffeine boost with L-theanine for focus",
            "Gradually reduce caffeine if you were using it with nicotine to avoid compounding withdrawal",
            "Stay under 400mg of caffeine daily (about 4 small cups of coffee)",
            "Be aware that caffeine can trigger nicotine cravings in some people"
          ]}
        />
        
        <TipCard 
          title="Sleep Optimization"
          description="Improve sleep quality for better daytime energy"
          icon={<Moon className="h-5 w-5" />}
          color="indigo"
          tips={[
            "Maintain a consistent sleep-wake schedule, even on weekends",
            "Create a wind-down routine to signal your body it's time for sleep",
            "Avoid screens 1 hour before bedtime to improve melatonin production",
            "Keep your bedroom cool, dark, and quiet for optimal sleep",
            "Consider temporary sleep aids like melatonin if withdrawal is severely disrupting sleep (consult healthcare provider)"
          ]}
        />
        
        <TipCard 
          title="Environmental Adjustments"
          description="Modify your surroundings for energy management"
          icon={<Sun className="h-5 w-5" />}
          color="purple"
          tips={[
            "Exposure to bright natural light for 15-20 minutes in the morning helps regulate energy levels",
            "Take outdoor breaks during the day to combat afternoon slumps",
            "Keep your workspace well-ventilated and at a comfortable temperature",
            "Use energizing scents like peppermint, citrus, or rosemary via essential oils",
            "Listen to upbeat music to boost energy when feeling sluggish"
          ]}
        />
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="science">
          <AccordionTrigger>The Science Behind Energy Fluctuations During Withdrawal</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p>
                Nicotine stimulates the release of glucose from your liver and adrenaline from your adrenal glands, giving you a temporary energy boost. 
                When you quit, your body needs time to readjust to regulating energy naturally.
              </p>
              <p>
                Three key processes contribute to fatigue during withdrawal:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <strong>Neurotransmitter rebalancing:</strong> Your brain is normalizing dopamine and other neurotransmitters previously affected by nicotine, causing temporary energy fluctuations.
                </li>
                <li>
                  <strong>Blood sugar adaptation:</strong> Your body is learning to regulate blood glucose without nicotine's interference, sometimes resulting in feelings of fatigue.
                </li>
                <li>
                  <strong>Sleep disruption:</strong> Many people experience changes in sleep patterns during withdrawal, leading to daytime tiredness.
                </li>
              </ol>
              <p>
                The good news is that these energy disruptions are temporary. Most people report improved energy levels within 2-4 weeks after quitting, once the body has adjusted to functioning without nicotine.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const FocusContent = () => {
  return (
    <div className="space-y-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-muted-foreground mb-6">
          Many people experience concentration difficulties during nicotine withdrawal. This "brain fog" occurs as your brain 
          chemistry adjusts to functioning without nicotine. These science-backed approaches can help maintain focus during this transition.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <TipCard 
          title="Attention Training Techniques"
          description="Structured exercises to rebuild focus capacity"
          icon={<Brain className="h-5 w-5" />}
          color="purple"
          tips={[
            "Practice the Pomodoro technique: 25 minutes of focused work followed by a 5-minute break",
            "Try mindfulness meditation starting with short 5-minute sessions to strengthen attention control",
            "Engage in single-tasking - deliberately focus on one activity without multitasking",
            "Use the '5 More' rule - when concentration wanes, commit to just 5 more minutes, then reassess",
            "Schedule challenging cognitive tasks during your peak energy periods of the day"
          ]}
        />
        
        <TipCard 
          title="Environment Optimization"
          description="Create spaces that support concentration"
          icon={<Sun className="h-5 w-5" />}
          color="amber"
          tips={[
            "Minimize digital distractions by silencing notifications during focus periods",
            "Use noise-cancelling headphones or white noise to mask disruptive sounds",
            "Keep your workspace organized to reduce cognitive load",
            "Try working in different environments to determine where you focus best",
            "Consider using blue-enriched lighting which has been shown to enhance alertness"
          ]}
        />
        
        <TipCard 
          title="Cognitive Support Strategies"
          description="Tools and techniques for mental clarity"
          icon={<BookOpen className="h-5 w-5" />}
          color="green"
          tips={[
            "Use written lists and notes more frequently during withdrawal to compensate for working memory impacts",
            "Break complex tasks into smaller, more manageable chunks",
            "Verbalize tasks out loud to strengthen your attention to them",
            "Try the 'brain dump' technique - write down all thoughts, concerns, and to-dos to clear mental space",
            "Use visualization techniques before starting tasks to mentally rehearse completion"
          ]}
        />
        
        <TipCard 
          title="Physiological Focus Enhancers"
          description="Physical approaches to sharpen mental clarity"
          icon={<Droplets className="h-5 w-5" />}
          color="blue"
          tips={[
            "Stay well-hydrated - even mild dehydration can impair concentration",
            "Take short movement breaks every 30-45 minutes to boost circulation to the brain",
            "Practice 4-7-8 breathing (inhale for 4, hold for 7, exhale for 8) when focus starts to drift",
            "Ensure adequate protein intake to support neurotransmitter production",
            "Consider omega-3 fatty acids (fish, flaxseeds, walnuts) which support cognitive function"
          ]}
        />
        
        <TipCard 
          title="Timing and Rhythms"
          description="Work with your body's natural cycles"
          icon={<Clock className="h-5 w-5" />}
          color="red"
          tips={[
            "Identify your personal high-focus hours and schedule important tasks during those times",
            "Take advantage of the 90-minute ultradian rhythm by working in 90-minute focused sessions",
            "Schedule complex cognitive tasks earlier in the day when possible",
            "Take a short 10-20 minute nap if afternoon focus severely deteriorates (set an alarm)",
            "Consider brief exposure to bright light when concentration dips to reset alertness"
          ]}
        />
        
        <TipCard 
          title="Supplements and Consumption"
          description="What to consume (and avoid) for better focus"
          icon={<Coffee className="h-5 w-5" />}
          color="orange"
          tips={[
            "Use caffeine strategically rather than constantly - small amounts when needed most",
            "Consider L-theanine (found in tea or supplements) which pairs with caffeine for focused alertness without jitters",
            "Avoid high-sugar snacks which can cause energy and focus crashes",
            "Stay adequately fed - low blood sugar impairs concentration",
            "Consult a healthcare provider about temporary supplements like B vitamins or rhodiola that may support focus during withdrawal"
          ]}
        />
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="science">
          <AccordionTrigger>Why Nicotine Withdrawal Affects Concentration</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p>
                The concentration difficulties experienced during nicotine withdrawal have a clear neurobiological basis:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <strong>Acetylcholine receptor adjustment:</strong> Nicotine binds to acetylcholine receptors in the brain that play a crucial role in attention and memory. When nicotine is removed, these receptors must readjust, temporarily affecting cognitive function.
                </li>
                <li>
                  <strong>Dopamine recalibration:</strong> Nicotine triggers dopamine release, which helps with focus and attention. Your brain is working to normalize dopamine signaling without nicotine's influence.
                </li>
                <li>
                  <strong>Stress response:</strong> Withdrawal often increases stress hormones like cortisol, which can impair prefrontal cortex function - the brain region responsible for focus and executive function.
                </li>
              </ol>
              <p>
                These cognitive effects typically peak within the first week and gradually improve over 2-4 weeks. For some, subtle focus challenges may persist longer but will continue to improve with time and the strategies outlined above.
              </p>
              <p className="text-fresh-700 font-medium">
                Remember: The cognitive improvements from quitting nicotine ultimately far outweigh the temporary challenges. Long-term nicotine abstinence is associated with better overall cognitive function compared to continued use.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const MoodContent = () => {
  return (
    <div className="space-y-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-muted-foreground mb-6">
          Mood disturbances are among the most challenging aspects of nicotine withdrawal. Irritability, anxiety, and even depressive symptoms 
          can emerge as your brain chemistry rebalances. These evidence-based approaches can help stabilize your mood during this transition.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <TipCard 
          title="Cognitive Behavioral Approaches"
          description="Change your thinking patterns to improve mood"
          icon={<Brain className="h-5 w-5" />}
          color="indigo"
          tips={[
            "Practice thought challenging - identify negative thoughts and test their accuracy",
            "Use the RAIN technique: Recognize, Allow, Investigate, and Non-identify with difficult emotions",
            "Maintain a 'wins journal' recording daily successes, no matter how small",
            "Set realistic expectations - understanding that mood fluctuations are normal and temporary",
            "Practice gratitude listing - writing 3 things you're grateful for each day can significantly improve mood"
          ]}
        />
        
        <TipCard 
          title="Physical Mood Regulators"
          description="Leverage body-mind connections"
          icon={<Dumbbell className="h-5 w-5" />}
          color="green"
          tips={[
            "Exercise for at least 20-30 minutes daily - physical activity is one of the most effective mood regulators",
            "Get exposure to morning sunlight - this helps regulate serotonin and melatonin for mood stability",
            "Try 'power posing' - standing in expansive, confident postures for 2 minutes can reduce stress hormones",
            "Practice progressive muscle relaxation to release physical tension that contributes to irritability",
            "Use rhythmic, bilateral movements like walking or drumming which can help regulate emotional states"
          ]}
        />
        
        <TipCard 
          title="Social Approaches"
          description="Harness social connections for mood support"
          icon={<Heart className="h-5 w-5" />}
          color="red"
          tips={[
            "Schedule regular contact with supportive friends or family during the withdrawal period",
            "Consider joining a cessation support group to connect with others having similar experiences",
            "Communicate clearly with close ones about what you're experiencing and what support you need",
            "Practice prosocial behaviors like helping others, which activates reward circuits in the brain",
            "Use strategic social withdrawal when irritability peaks to prevent relationship damage"
          ]}
        />
        
        <TipCard 
          title="Mindfulness & Relaxation"
          description="Calming techniques for emotional balance"
          icon={<Activity className="h-5 w-5" />}
          color="blue"
          tips={[
            "Try box breathing (4-4-4-4): Inhale for 4, hold for 4, exhale for 4, hold for 4",
            "Practice body scanning - systematically noticing sensations throughout the body without judgment",
            "Use 'urge surfing' for emotional waves - observe feelings rise and fall without acting on them",
            "Set aside 5-10 minutes daily for a simple mindfulness practice to build emotional regulation skills",
            "Try apps like Headspace, Calm, or Insight Timer for guided emotional regulation exercises"
          ]}
        />
        
        <TipCard 
          title="Sensory Regulation"
          description="Use sensory experiences to shift mood"
          icon={<Sun className="h-5 w-5" />}
          color="amber"
          tips={[
            "Create a 'sensory first aid kit' with items that appeal to each sense for mood regulation",
            "Try aromatherapy - scents like lavender, orange, or peppermint can alter mood states",
            "Use music strategically - create playlists for different emotional needs",
            "Try temperature-based interventions like a warm shower or holding an ice cube when emotions are intense",
            "Engage in sensory-rich activities like cooking, gardening, or crafting to shift focus away from negative moods"
          ]}
        />
        
        <TipCard 
          title="Lifestyle Foundations"
          description="Build a stable base for emotional health"
          icon={<Moon className="h-5 w-5" />}
          color="purple"
          tips={[
            "Prioritize sleep hygiene - mood regulation is significantly impaired by sleep deprivation",
            "Stabilize blood sugar with regular meals - hunger can exacerbate irritability",
            "Limit alcohol which can worsen mood swings and disrupt sleep",
            "Consider temporary scaling back of responsibilities during peak withdrawal",
            "Structure your day with a predictable routine to provide a sense of control and stability"
          ]}
        />
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="science">
          <AccordionTrigger>Understanding Mood Changes During Withdrawal</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p>
                The mood disturbances experienced during nicotine withdrawal are linked to several neurobiological processes:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <strong>Dopamine deficit:</strong> Nicotine triggers dopamine release in the brain's reward pathway. When nicotine is removed, there's a temporary deficit in dopamine signaling, which can manifest as anhedonia (reduced pleasure) and irritability.
                </li>
                <li>
                  <strong>Altered stress response:</strong> Nicotine affects the hypothalamic-pituitary-adrenal (HPA) axis, which regulates stress hormones. During withdrawal, this system becomes temporarily dysregulated, leading to increased anxiety and stress reactivity.
                </li>
                <li>
                  <strong>Glutamate and GABA imbalance:</strong> These neurotransmitters, which regulate excitation and inhibition in the brain, are thrown off balance during withdrawal, contributing to irritability and mood swings.
                </li>
              </ol>
              <p>
                The good news is that these neurochemical changes are temporary. Most people see significant mood improvements within 2-4 weeks, with subtle changes continuing to normalize over 2-3 months.
              </p>
              <div className="bg-blue-50 p-4 rounded-md mt-4">
                <p className="text-blue-700 font-medium">When to Seek Professional Help</p>
                <p className="text-sm text-blue-600">
                  While temporary mood changes are normal during withdrawal, consult a healthcare provider if you experience:
                </p>
                <ul className="list-disc pl-5 mt-2 text-sm text-blue-600">
                  <li>Severe depression or persistent thoughts of self-harm</li>
                  <li>Anxiety that significantly interferes with daily functioning</li>
                  <li>Mood symptoms that worsen rather than improve over time</li>
                  <li>History of mental health conditions that may be exacerbated by withdrawal</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const CravingContent = () => {
  return (
    <div className="space-y-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-muted-foreground mb-6">
          Cravings are the brain's natural response when a habit is interrupted. During nicotine withdrawal, these urges 
          can be intense but always temporary. Understanding and effectively managing cravings is essential for successful cessation.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <TipCard 
          title="Urge Surfing Techniques"
          description="Ride the wave instead of fighting it"
          icon={<Activity className="h-5 w-5" />}
          color="blue"
          tips={[
            "Observe cravings with curiosity rather than judgment or fear",
            "Note physical sensations associated with the craving - where do you feel it in your body?",
            "Remember that cravings typically peak at 3-5 minutes before subsiding",
            "Use the phrase 'This feeling will pass, whether or not I use nicotine'",
            "Practice the RAIN approach: Recognize, Accept, Investigate, Non-identify with the craving"
          ]}
        />
        
        <TipCard 
          title="Distraction Strategies"
          description="Refocus your mind effectively"
          icon={<Brain className="h-5 w-5" />}
          color="purple"
          tips={[
            "Have a list of 5-minute activities ready for when cravings hit",
            "Try the 'second activity' technique - always do something else while experiencing a craving",
            "Use games or puzzles on your phone that require full concentration",
            "Change your physical environment immediately when a craving begins",
            "Engage with sensory distractions - strong flavors, scents, or tactile objects"
          ]}
        />
        
        <TipCard 
          title="Physical Interventions"
          description="Use your body to overcome urges"
          icon={<Dumbbell className="h-5 w-5" />}
          color="green"
          tips={[
            "Drink water or brush teeth when cravings hit - these interrupt the craving cycle",
            "Try rapid physical exercise - even 1 minute of jumping jacks can reduce craving intensity",
            "Practice deep breathing to activate the parasympathetic nervous system",
            "Use progressive muscle relaxation to release tension associated with cravings",
            "Try 'urge tapping' - tapping specific acupressure points during cravings"
          ]}
        />
        
        <TipCard 
          title="Cognitive Reframing"
          description="Change how you think about cravings"
          icon={<Activity className="h-5 w-5" />}
          color="indigo"
          tips={[
            "Challenge thoughts like 'I need nicotine' by recognizing them as withdrawal symptoms, not truths",
            "Reframe each resisted craving as strengthening your 'quitting muscle'",
            "Use visualization - imagine the craving as a wave that rises and falls",
            "Remind yourself of your reasons for quitting when cravings occur",
            "Practice the 'future self' technique - imagine yourself in 1 hour, grateful you didn't give in"
          ]}
        />
        
        <TipCard 
          title="Environmental Management"
          description="Control your surroundings for success"
          icon={<Sun className="h-5 w-5" />}
          color="amber"
          tips={[
            "Remove all nicotine products and paraphernalia from your environment",
            "Temporarily avoid high-risk situations where you commonly used nicotine",
            "Create physical barriers to usage - give away products, delete delivery apps",
            "Use environmental cues like motivational notes in key locations",
            "Reorganize spaces associated with nicotine use to break environmental triggers"
          ]}
        />
        
        <TipCard 
          title="Social and Behavioral Strategies"
          description="Leverage others and new habits"
          icon={<Heart className="h-5 w-5" />}
          color="red"
          tips={[
            "Call or text a supportive person when experiencing strong cravings",
            "Develop a replacement behavior for every situation where you typically used nicotine",
            "Use public accountability by sharing your quit journey with others",
            "Keep a craving journal to identify patterns and triggers",
            "Establish a 'craving buddy' - someone who agrees to be available for support"
          ]}
        />
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="science">
          <AccordionTrigger>The Neuroscience of Cravings</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p>
                Nicotine cravings involve two distinct brain systems working in tandem:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <strong>The mesolimbic reward pathway:</strong> Nicotine stimulates dopamine release in this circuit, creating pleasure and reinforcement. During withdrawal, this system signals for more nicotine to restore dopamine levels.
                </li>
                <li>
                  <strong>The prefrontal cortex and insula:</strong> These regions process drug-associated cues and memories, triggering cravings when you encounter situations, emotions, or environments linked to nicotine use.
                </li>
              </ol>
              <p>
                Understanding the time course of cravings can be helpful:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Acute cravings typically last 3-5 minutes if not reinforced</li>
                <li>Cravings are most frequent in the first 2-3 days after quitting</li>
                <li>By the 4-7 day mark, their frequency begins to decrease</li>
                <li>After 2-4 weeks, most people experience significant reduction in craving intensity and frequency</li>
                <li>Occasional cravings may persist for months but become increasingly rare and less intense</li>
              </ul>
              <div className="bg-blue-50 p-4 rounded-md mt-4">
                <p className="text-blue-700 font-medium">Craving Facts That Help</p>
                <ul className="list-disc pl-5 mt-2 text-sm text-blue-600">
                  <li>Each craving you successfully resist weakens the neural pathways associated with nicotine use</li>
                  <li>Cravings cannot physically harm you - they're uncomfortable but not dangerous</li>
                  <li>The brain forms new neural pathways surprisingly quickly - each day without nicotine strengthens these healthy circuits</li>
                  <li>Cravings are conditioned responses that can be "unconditioned" through repeated exposure to triggers without nicotine</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const HolisticHealth = () => {
  const [selectedTab, setSelectedTab] = useState("energy");

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Holistic Support Guides</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Evidence-based strategies for managing the real challenges beyond just cravings. 
          These approaches help address the physical and mental impacts of nicotine withdrawal.
        </p>
      </div>
      
      <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 max-w-3xl mx-auto mb-8">
          <TabsTrigger value="energy" id="energy">
            <BatteryCharging className="h-4 w-4 mr-2" />
            Energy
          </TabsTrigger>
          <TabsTrigger value="focus" id="focus">
            <Brain className="h-4 w-4 mr-2" />
            Focus
          </TabsTrigger>
          <TabsTrigger value="mood" id="mood">
            <Activity className="h-4 w-4 mr-2" />
            Mood
          </TabsTrigger>
          <TabsTrigger value="cravings" id="cravings">
            <Flame className="h-4 w-4 mr-2" />
            Cravings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="energy">
          <EnergyContent />
        </TabsContent>
        
        <TabsContent value="focus">
          <FocusContent />
        </TabsContent>
        
        <TabsContent value="mood">
          <MoodContent />
        </TabsContent>
        
        <TabsContent value="cravings">
          <CravingContent />
        </TabsContent>
      </Tabs>
      
      <div className="mt-12 p-6 bg-fresh-50 border border-fresh-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Ready for personalized support?</h2>
        <div className="space-y-2">
          <p>Get interactive tools and personalized tracking by creating a Mission Fresh account.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <a href="/app/dashboard" className="inline-flex items-center justify-center rounded-md bg-fresh-300 hover:bg-fresh-400 text-white px-4 py-2">
              Get Started
            </a>
            <a href="/tools/nrt-guide" className="inline-flex items-center justify-center rounded-md border border-fresh-200 bg-white hover:bg-fresh-50 px-4 py-2">
              NRT Guide
            </a>
            <a href="/tools/quit-methods" className="inline-flex items-center justify-center rounded-md border border-fresh-200 bg-white hover:bg-fresh-50 px-4 py-2">
              Quitting Methods
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolisticHealth;
