
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Battery, Brain, Activity, Flame, Droplet, Coffee, Wind } from "lucide-react";

const HolisticHealth = () => {
  return (
    <div className="container py-12">
      <Link to="/tools" className="inline-flex items-center text-mint-500 hover:text-mint-600 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Web Tools
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Holistic Health Guides</h1>
          <p className="text-lg text-muted-foreground">
            Science-backed techniques to optimize your energy, focus, and wellbeing
          </p>
        </div>
        
        <Card className="mb-12" id="energy">
          <CardHeader className="bg-mint-50">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-mint-100 p-2">
                <Battery className="h-5 w-5 text-mint-500" />
              </div>
              <CardTitle>Energy Management</CardTitle>
            </div>
            <CardDescription>
              Practical techniques for managing energy fluctuations and combating fatigue
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Why Energy Fluctuates</h3>
              <p className="mb-3">
                Nicotine stimulates the release of adrenaline and glucose, providing an artificial energy boost. 
                When you reduce or eliminate nicotine, your body needs time to readjust its natural energy regulation systems.
              </p>
              <p>
                Energy slumps are normal and temporary. Most people report significant improvements after 1-2 weeks as the body reestablishes balance.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Effective Energy Management Strategies</h3>
              
              <Card className="border-l-4 border-mint-400">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Droplet className="h-4 w-4 text-mint-500" />
                    <h4 className="font-medium">Hydration First</h4>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Dehydration is a common cause of fatigue. Aim to drink at least 8 glasses of water daily. 
                    Keep a water bottle with you and set reminders to sip regularly.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-mint-400">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-mint-500" />
                    <h4 className="font-medium">Strategic Movement</h4>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    When energy dips, a short burst of physical activity can be more effective than caffeine. 
                    Try a 5-minute walk, 10 jumping jacks, or climbing a flight of stairs. This activates circulation and releases natural energy-boosting compounds.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-mint-400">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Coffee className="h-4 w-4 text-mint-500" />
                    <h4 className="font-medium">Caffeine Awareness</h4>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Be mindful of caffeine consumption. While it can help initially, excessive caffeine can worsen energy crashes and sleep disruption. 
                    Consider limiting intake to mornings only, and opt for green tea which provides a gentler, sustained energy boost.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-mint-400">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-mint-500" />
                    <h4 className="font-medium">Micro-Rest Periods</h4>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Schedule short 2-5 minute breaks throughout your day. Use these for deep breathing, gentle stretching, or simply closing your eyes and relaxing. 
                    These micro-rest periods can prevent energy depletion before it becomes severe.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-12" id="mood">
          <CardHeader className="bg-mint-50">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-mint-100 p-2">
                <Activity className="h-5 w-5 text-mint-500" />
              </div>
              <CardTitle>Mood Regulation</CardTitle>
            </div>
            <CardDescription>
              Strategies for stabilizing and improving mood fluctuations
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Understanding Mood Changes</h3>
              <p className="mb-3">
                Mood fluctuations are among the most challenging aspects of changing nicotine habits. 
                Nicotine affects dopamine, serotonin, and other neurotransmitters that regulate mood. 
                As your brain chemistry readjusts, emotional ups and downs are normal.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Effective Mood Stabilizing Techniques</h3>
              
              <Card className="border-l-4 border-mint-400">
                <CardHeader className="pb-2">
                  <h4 className="font-medium">Five-Minute Journaling</h4>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    When experiencing strong emotions, try writing for just five minutes. Describe what you're feeling without judgment. 
                    This simple practice can help process emotions and gain perspective. Consider noting three things you're grateful for at the end.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-mint-400">
                <CardHeader className="pb-2">
                  <h4 className="font-medium">3-3-3 Grounding Exercise</h4>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    When anxiety or irritability peaks: Name 3 things you can see, 3 things you can hear, and move 3 parts of your body. 
                    This mindfulness technique helps reconnect with the present moment and interrupts negative thought spirals.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-mint-400">
                <CardHeader className="pb-2">
                  <h4 className="font-medium">Nature Connection</h4>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Even brief exposure to natural environments can improve mood. Try a 10-minute walk in a park, sitting by a window with a view of trees, 
                    or even looking at nature photographs. Research shows these small exposures can reduce stress hormones and improve emotional regulation.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-mint-400">
                <CardHeader className="pb-2">
                  <h4 className="font-medium">Social Support Activation</h4>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    When mood is low, reaching out to a supportive person can make a significant difference. 
                    Consider creating a list of 3-5 people you can contact when struggling. Even a brief text exchange can shift perspective and provide encouragement.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-12" id="focus">
          <CardHeader className="bg-mint-50">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-mint-100 p-2">
                <Brain className="h-5 w-5 text-mint-500" />
              </div>
              <CardTitle>Focus Enhancement</CardTitle>
            </div>
            <CardDescription>
              Techniques to improve concentration and mental clarity
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">The Cognitive Performance Challenge</h3>
              <p className="mb-3">
                Many people experience difficulty concentrating or "brain fog" when changing nicotine habits. 
                This happens because nicotine affects acetylcholine receptors involved in attention and memory. 
                Your brain is adapting to function without artificial stimulation.
              </p>
              <p>
                These challenges typically improve significantly within 2-4 weeks as your brain chemistry rebalances.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Focus-Enhancing Strategies</h3>
              
              <Card className="border-l-4 border-mint-400">
                <CardHeader className="pb-2">
                  <h4 className="font-medium">Pomodoro Technique</h4>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Work in focused 25-minute sessions followed by 5-minute breaks. After four sessions, take a longer break (15-30 minutes). 
                    This structure helps maintain focus when concentration is challenging and gives your brain regular recovery periods.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-mint-400">
                <CardHeader className="pb-2">
                  <h4 className="font-medium">Single-Tasking Practice</h4>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    During withdrawal, multitasking becomes even more challenging. Choose one task, remove distractions (silence notifications, clear workspace), 
                    and focus solely on that activity. Start with 10-minute sessions and gradually increase as your concentration improves.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-mint-400">
                <CardHeader className="pb-2">
                  <h4 className="font-medium">Brain-Supporting Nutrition</h4>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Certain foods can help cognitive function during withdrawal. Incorporate omega-3 fatty acids (fatty fish, walnuts, flaxseeds), 
                    antioxidant-rich berries, and complex carbohydrates (whole grains, legumes) that provide steady glucose for brain function.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-mint-400">
                <CardHeader className="pb-2">
                  <h4 className="font-medium">External Memory Systems</h4>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    When memory and organization are affected, use external systems. Create clear to-do lists, use reminder apps, 
                    take notes during important conversations, and create designated places for frequently used items to reduce cognitive load.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-12" id="cravings">
          <CardHeader className="bg-mint-50">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-mint-100 p-2">
                <Flame className="h-5 w-5 text-mint-500" />
              </div>
              <CardTitle>Craving Management</CardTitle>
            </div>
            <CardDescription>
              Effective strategies to handle cravings and urges
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Understanding Cravings</h3>
              <p className="mb-3">
                Cravings are temporary urges that typically last 3-5 minutes, even though they may feel endless in the moment. 
                They're triggered by both physical withdrawal and psychological associations (e.g., after meals, during stress, in social situations).
              </p>
              <p>
                Remember: No matter how intense, cravings always pass, and they generally decrease in frequency and intensity over time.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Craving Management Techniques</h3>
              
              <Card className="border-l-4 border-mint-400">
                <CardHeader className="pb-2">
                  <h4 className="font-medium">4Ds Approach</h4>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    <strong>Delay:</strong> Tell yourself you'll wait just 5 minutes before giving in. Cravings often pass within this time.<br />
                    <strong>Distract:</strong> Engage in an absorbing activity that occupies your mind and hands.<br />
                    <strong>Deep breathing:</strong> Take 5-10 slow, deep breaths to activate your parasympathetic nervous system.<br />
                    <strong>Drink water:</strong> Sipping cold water can reduce craving intensity and provide a sensory distraction.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-mint-400">
                <CardHeader className="pb-2">
                  <h4 className="font-medium">Physical Displacement</h4>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    When a craving hits, change your physical environment. Step outside, move to a different room, or take a short walk. 
                    This breaks the association between your location and the urge to use nicotine.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-mint-400">
                <CardHeader className="pb-2">
                  <h4 className="font-medium">Hand-Mouth Substitution</h4>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Address the behavioral component of cravings by substituting another hand-to-mouth activity. Options include sugar-free gum, 
                    carrot sticks, flavored toothpicks, stress balls for hands, or using a drinking straw cut to cigarette length.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-mint-400">
                <CardHeader className="pb-2">
                  <h4 className="font-medium">Urge Surfing</h4>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Instead of fighting the craving, observe it with curiosity. Notice where you feel it in your body, its intensity, and how it changes. 
                    Like a wave, cravings build, peak, and subside. This mindfulness technique helps create distance between you and the urge.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-12 text-center">
          <p className="text-lg mb-6">Ready to get personalized support for your fresh journey?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-mint">
              <Link to="/sign-up">
                Create Free Account
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/tools">
                Explore More Tools
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolisticHealth;
