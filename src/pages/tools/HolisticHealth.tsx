
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BatteryCharging, Brain, Sparkles, Flame } from "lucide-react";

const HolisticHealth = () => {
  const location = useLocation();
  const hash = location.hash.substring(1) || "energy";
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Holistic Health Guides</h1>
          <p className="text-lg text-muted-foreground">
            Practical advice for managing common challenges during the nicotine reduction or abstinence journey.
          </p>
        </div>
        
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Why a Holistic Approach?</CardTitle>
              <CardDescription>
                Quitting or reducing nicotine impacts more than just cravings. It affects your energy levels, mood, focus, and stress management.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Research shows that addressing these holistic aspects can significantly improve your chances of success. The guides below provide evidence-based strategies to help you feel better throughout the process.
              </p>
              <p>
                Simply choose the area you're struggling with most right now, or explore all four domains to develop a comprehensive toolkit for your journey.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div ref={contentRef}>
          <Tabs defaultValue={hash} className="mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-8">
              <TabsTrigger value="energy" className="flex gap-2 items-center">
                <BatteryCharging className="h-4 w-4" />
                <span>Energy</span>
              </TabsTrigger>
              <TabsTrigger value="mood" className="flex gap-2 items-center">
                <Sparkles className="h-4 w-4" />
                <span>Mood</span>
              </TabsTrigger>
              <TabsTrigger value="focus" className="flex gap-2 items-center">
                <Brain className="h-4 w-4" />
                <span>Focus</span>
              </TabsTrigger>
              <TabsTrigger value="cravings" className="flex gap-2 items-center">
                <Flame className="h-4 w-4" />
                <span>Cravings</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="energy">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <BatteryCharging className="h-6 w-6 text-fresh-300" />
                    <CardTitle>Managing Energy Slumps</CardTitle>
                  </div>
                  <CardDescription>
                    Practical strategies to combat fatigue during nicotine withdrawal and reduction
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Why Nicotine Affects Energy</h3>
                    <p>
                      Nicotine stimulates the release of glucose and adrenaline, creating an artificial energy boost. When you reduce or eliminate nicotine, your body temporarily struggles to regulate energy naturally, leading to fatigue and lethargy. This is completely normal and typically improves within 2-4 weeks.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Immediate Energy Boosters</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Quick Movement:</strong> Just 5 minutes of brisk walking, stretching, or climbing stairs can trigger energy-boosting endorphins.
                      </li>
                      <li>
                        <strong>Cold Water:</strong> Splash cold water on your face or take a quick cold shower to activate your sympathetic nervous system.
                      </li>
                      <li>
                        <strong>Proper Hydration:</strong> Even mild dehydration can worsen fatigue. Aim for at least 8-10 glasses of water daily.
                      </li>
                      <li>
                        <strong>Power Breathing:</strong> Try 10 deep "power breaths" - inhale through your nose for 4 counts, hold for 2, exhale forcefully through your mouth for 6.
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Strategic Energy Management</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Protein-Rich Snacks:</strong> Maintain stable blood sugar with small, protein-rich snacks every 3-4 hours (nuts, yogurt, hard-boiled eggs).
                      </li>
                      <li>
                        <strong>Strategic Caffeine:</strong> A small cup of coffee or tea can help, but avoid after 2pm or excessive amounts which can worsen energy crashes.
                      </li>
                      <li>
                        <strong>Power Naps:</strong> A 10-20 minute nap (no longer) can boost alertness without disrupting nighttime sleep.
                      </li>
                      <li>
                        <strong>Energy Mapping:</strong> Track your energy levels throughout the day. Schedule important tasks during natural energy peaks and plan rest during dips.
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Long-term Energy Foundations</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Sleep Optimization:</strong> Prioritize 7-9 hours of quality sleep. Create a consistent sleep schedule and bedtime routine.
                      </li>
                      <li>
                        <strong>Regular Exercise:</strong> Even 20 minutes of moderate activity 3 times weekly significantly improves energy levels.
                      </li>
                      <li>
                        <strong>Stress Management:</strong> Chronic stress depletes energy. Include regular stress-reduction practices (meditation, yoga, hobbies).
                      </li>
                      <li>
                        <strong>Vitamins B12 and D:</strong> Consider having these levels checked, as deficiencies are common and can cause fatigue.
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="mood">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="h-6 w-6 text-fresh-300" />
                    <CardTitle>Mood Regulation Techniques</CardTitle>
                  </div>
                  <CardDescription>
                    Evidence-based strategies to stabilize and lift your mood during nicotine withdrawal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Understanding Mood Changes</h3>
                    <p>
                      Nicotine affects dopamine and serotonin - key neurotransmitters regulating mood. As your brain adjusts to functioning without nicotine, temporary mood disturbances are normal. Most people experience improvements in overall mood within 4-8 weeks of quitting.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Quick Mood Lifters</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Sunshine Exposure:</strong> Even 10-15 minutes of natural sunlight can boost serotonin and vitamin D production.
                      </li>
                      <li>
                        <strong>Physical Movement:</strong> Any form of exercise releases endorphins that quickly elevate mood.
                      </li>
                      <li>
                        <strong>Music Therapy:</strong> Listen to music that either matches your current mood and gradually shifts to more uplifting tunes.
                      </li>
                      <li>
                        <strong>Gratitude Practice:</strong> Write down three specific things you're grateful for right now.
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Emotional Regulation Strategies</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Name It to Tame It:</strong> Simply labeling your emotion ("I'm feeling frustrated") reduces its intensity.
                      </li>
                      <li>
                        <strong>Thought Challenging:</strong> Question negative thoughts: "Is this thought helpful? Is there another perspective?"
                      </li>
                      <li>
                        <strong>RAIN Technique:</strong> Recognize, Allow, Investigate, and Nurture difficult emotions rather than avoiding them.
                      </li>
                      <li>
                        <strong>Social Connection:</strong> Brief positive social interactions trigger oxytocin release, improving mood and resilience.
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Lifestyle Mood Foundations</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Sleep Quality:</strong> Poor sleep directly impacts mood regulation. Prioritize consistent sleep schedules.
                      </li>
                      <li>
                        <strong>Nutrition:</strong> Emphasize omega-3 fatty acids, complex carbohydrates, and foods rich in folate and B vitamins.
                      </li>
                      <li>
                        <strong>Limit Alcohol:</strong> While it may temporarily seem to improve mood, alcohol is a depressant that worsens mood over time.
                      </li>
                      <li>
                        <strong>Professional Support:</strong> If mood disturbances are severe or persistent, don't hesitate to seek professional help.
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="focus">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Brain className="h-6 w-6 text-fresh-300" />
                    <CardTitle>Enhancing Concentration</CardTitle>
                  </div>
                  <CardDescription>
                    Practical methods to improve focus and mental clarity during nicotine withdrawal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Why Focus Suffers</h3>
                    <p>
                      Nicotine temporarily enhances attention and working memory by stimulating acetylcholine receptors in the brain. As these receptors adjust to functioning without nicotine, temporary cognitive fog and attention difficulties are common. Most people see improvements within 2-4 weeks.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Immediate Focus Enhancers</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Focused Breathing:</strong> Practice 4-7-8 breathing (inhale for 4 counts, hold for 7, exhale for 8) to reset attention.
                      </li>
                      <li>
                        <strong>Environment Optimization:</strong> Remove distractions, use noise-cancelling headphones, ensure proper lighting.
                      </li>
                      <li>
                        <strong>Movement Breaks:</strong> Brief physical activity every 30-45 minutes refreshes cognitive function.
                      </li>
                      <li>
                        <strong>Hydration:</strong> Even mild dehydration significantly impairs attention and working memory.
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Concentration Techniques</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Pomodoro Technique:</strong> Work in focused 25-minute intervals with 5-minute breaks between.
                      </li>
                      <li>
                        <strong>Task Chunking:</strong> Break complex tasks into smaller, manageable segments with clear completion points.
                      </li>
                      <li>
                        <strong>Implementation Intentions:</strong> Plan specific actions for potential distractions (e.g., "If I feel the urge to check social media, I will drink water instead").
                      </li>
                      <li>
                        <strong>Single-Tasking:</strong> Focus on one task at a time. Multitasking reduces efficiency by up to 40%.
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Cognitive Health Support</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Omega-3 Fatty Acids:</strong> Found in fatty fish, flaxseeds, and walnuts - support neural communication.
                      </li>
                      <li>
                        <strong>Regular Aerobic Exercise:</strong> Improves brain-derived neurotrophic factor (BDNF), enhancing learning and memory.
                      </li>
                      <li>
                        <strong>Adequate Sleep:</strong> REM sleep is crucial for cognitive processing and memory consolidation.
                      </li>
                      <li>
                        <strong>Mental Stimulation:</strong> Learning new skills or engaging in cognitive challenges strengthens neural networks.
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="cravings">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Flame className="h-6 w-6 text-fresh-300" />
                    <CardTitle>Craving Management Strategies</CardTitle>
                  </div>
                  <CardDescription>
                    Effective techniques to overcome nicotine cravings and urges
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Understanding Cravings</h3>
                    <p>
                      Nicotine cravings typically last 3-5 minutes, though they can feel much longer. They're triggered by both physical dependence and psychological associations. The frequency and intensity of cravings decrease significantly after the first 2-4 weeks.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">5-Minute Craving Busters</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Delay Tactic:</strong> Tell yourself you'll wait just 5 minutes before deciding whether to use nicotine. Cravings often pass in this time.
                      </li>
                      <li>
                        <strong>Deep Breathing:</strong> Six deep breaths, focusing on the sensation of air filling and leaving your lungs.
                      </li>
                      <li>
                        <strong>Cold Water:</strong> Drink a glass of cold water slowly, or wash your hands and face with cold water.
                      </li>
                      <li>
                        <strong>Distraction:</strong> Call someone, watch a short video, play a quick game on your phone, or complete a simple task.
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Cognitive Techniques</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>DEADS Strategy:</strong> Delay, Escape, Avoid, Distract, Substitute.
                      </li>
                      <li>
                        <strong>Urge Surfing:</strong> Observe the craving like a wave - it builds, crests, and eventually subsides. Don't fight it, just observe.
                      </li>
                      <li>
                        <strong>Thought Challenging:</strong> Ask yourself: "What's the evidence that I need nicotine right now?" or "Will using nicotine now help me reach my goals?"
                      </li>
                      <li>
                        <strong>Visualization:</strong> Imagine yourself successfully overcoming the craving and feeling proud afterward.
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Replacement Strategies</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Oral Substitutes:</strong> Sugar-free gum, mints, toothpicks, cinnamon sticks, carrot sticks.
                      </li>
                      <li>
                        <strong>Hand Occupiers:</strong> Stress balls, fidget toys, paper clips, rubber bands.
                      </li>
                      <li>
                        <strong>Physical Release:</strong> Quick bursts of exercise (push-ups, jumping jacks, brisk walk).
                      </li>
                      <li>
                        <strong>NRT Options:</strong> Consider appropriate nicotine replacement therapy as a temporary aid (see our NRT Guide).
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default HolisticHealth;
