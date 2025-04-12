
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { 
  Calendar, Clock, ArrowDownToLine, BarChart4, BookOpen, Lightbulb, 
  CheckCircle, XCircle, AlertCircle, Flame
} from "lucide-react";
import { cn } from "@/lib/utils";

const QuitMethods = () => {
  const [selectedTab, setSelectedTab] = useState("cold-turkey");

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Quitting Method Guides</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore different approaches to becoming nicotine-free. Each method has its own benefits and challenges – 
          find the one that best matches your preferences and lifestyle.
        </p>
      </div>

      <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-5 max-w-3xl mx-auto mb-8">
          <TabsTrigger value="cold-turkey">Cold Turkey</TabsTrigger>
          <TabsTrigger value="gradual">Gradual Reduction</TabsTrigger>
          <TabsTrigger value="tapering">Tapering</TabsTrigger>
          <TabsTrigger value="nrt">NRT Assisted</TabsTrigger>
          <TabsTrigger value="harm-reduction">Harm Reduction</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cold-turkey">
          <div className="grid gap-6">
            <Card>
              <div className="md:flex">
                <div className="md:w-1/3 bg-fresh-50 p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-full inline-block mb-4 shadow-sm">
                      <Calendar className="h-12 w-12 text-fresh-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-fresh-700">Cold Turkey</h2>
                    <p className="text-fresh-600 mt-2">Complete and immediate cessation</p>
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <p className="mb-4">
                    The cold turkey approach involves stopping the use of nicotine products completely and immediately. 
                    This method relies on willpower and determination to overcome withdrawal symptoms without gradually 
                    reducing nicotine intake or using cessation aids.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Timeline</p>
                      <p className="font-medium">Immediate</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Success Rate</p>
                      <p className="font-medium">3-5% per attempt</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Challenge Level</p>
                      <p className="font-medium">High</p>
                    </div>
                  </div>
                  <p>
                    Cold turkey is often considered the most challenging method but can be effective for those with strong motivation 
                    and determination. With proper preparation and support, many people successfully quit using this approach.
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Advantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>No prolonged withdrawal – symptoms peak and then begin to subside</li>
                    <li>Avoids dependence on cessation aids or replacement products</li>
                    <li>No cost for additional products or therapies</li>
                    <li>Empowering sense of accomplishment</li>
                    <li>Breaks both physical and psychological habits simultaneously</li>
                    <li>Quick transition to a nicotine-free life</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Intense withdrawal symptoms in the first 72 hours</li>
                    <li>Higher potential for relapse during initial withdrawal</li>
                    <li>Requires significant willpower and determination</li>
                    <li>Can be particularly difficult for heavy or long-term users</li>
                    <li>May cause temporary irritability affecting relationships</li>
                    <li>Sleep disturbances and concentration issues may impact daily life</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="preparation">
                <AccordionTrigger>How to Prepare</AccordionTrigger>
                <AccordionContent>
                  <ol className="list-decimal pl-5 space-y-4">
                    <li>
                      <strong>Set a firm quit date:</strong> Choose a specific date to stop using all nicotine products. Consider selecting a date with symbolic importance or a time when stress levels will be lower.
                    </li>
                    <li>
                      <strong>Identify triggers:</strong> Spend a week noting when and why you use nicotine to identify your personal triggers (e.g., after meals, during breaks, while driving).
                    </li>
                    <li>
                      <strong>Create a coping plan:</strong> Develop specific strategies for handling each trigger and the withdrawal symptoms you're likely to experience.
                    </li>
                    <li>
                      <strong>Remove temptations:</strong> Discard all nicotine products, lighters, ashtrays, and other related items the night before your quit date.
                    </li>
                    <li>
                      <strong>Build a support system:</strong> Inform friends and family about your plan, join support groups, or consider using a quit buddy or counselor.
                    </li>
                    <li>
                      <strong>Stock up on substitutes:</strong> Have plenty of healthy snacks, sugar-free gum, toothpicks, or other oral substitutes available.
                    </li>
                    <li>
                      <strong>Plan distractions:</strong> Schedule activities, especially during times when you would typically use nicotine, to keep your mind and hands busy.
                    </li>
                    <li>
                      <strong>Prepare for withdrawal:</strong> Stock up on water, healthy food, and consider arranging lighter work schedules for the first few days if possible.
                    </li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="first-week">
                <AccordionTrigger>The First Week: What to Expect</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <h4 className="font-medium">Physical Symptoms</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Days 1-3:</strong> Peak physical withdrawal symptoms including irritability, anxiety, headaches, increased appetite, insomnia, and difficulty concentrating. Cravings can be intense and frequent.
                      </li>
                      <li>
                        <strong>Days 4-5:</strong> Physical symptoms begin to diminish, though cravings may still be strong. Energy levels may fluctuate, and some irritability often persists.
                      </li>
                      <li>
                        <strong>Days 6-7:</strong> Physical withdrawal symptoms continue to subside. Cravings typically become less frequent but may still be intense when they occur.
                      </li>
                    </ul>
                    
                    <h4 className="font-medium">Psychological Challenges</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Mood swings:</strong> Rapid changes in mood are common as your brain adjusts to functioning without nicotine.
                      </li>
                      <li>
                        <strong>Mental fog:</strong> Difficulty concentrating is normal and typically improves after the first week.
                      </li>
                      <li>
                        <strong>Cravings:</strong> Psychological cravings triggered by habits and associations rather than physical need.
                      </li>
                      <li>
                        <strong>Sleep disturbances:</strong> Vivid dreams or nightmares are common as REM sleep patterns normalize.
                      </li>
                    </ul>
                    
                    <div className="bg-blue-50 p-4 rounded-md">
                      <h4 className="font-medium text-blue-700 mb-2">Survival Strategies</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Follow the 4Ds: Delay, Deep breathe, Drink water, Do something else</li>
                        <li>Use Mission Fresh's Craving Tools when urges hit</li>
                        <li>Stay hydrated and maintain blood sugar levels with regular, healthy meals</li>
                        <li>Exercise daily, even if just a short walk, to boost mood and reduce cravings</li>
                        <li>Celebrate small wins - each hour and day nicotine-free is an achievement</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="success-stories">
                <AccordionTrigger>Success Stories & Tips</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="font-medium">Michael, 42 - Quit after 20 years</h4>
                      <p className="text-sm mb-2 italic">
                        "The first three days were brutal, but I kept reminding myself that the discomfort was temporary and the benefits permanent. 
                        I drank tons of water, went for walks whenever cravings hit hard, and used smartphone games to keep my hands busy. 
                        By day 5, I started feeling significantly better, and after two weeks, I knew I could do this for good."
                      </p>
                      <p className="text-sm font-medium">Michael's Top Tip:</p>
                      <p className="text-sm">
                        Break each day into manageable chunks. Just focus on staying nicotine-free until lunch, then until dinner, then bedtime.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="font-medium">Sarah, 35 - Cold turkey success after multiple attempts</h4>
                      <p className="text-sm mb-2 italic">
                        "I tried cutting down gradually three times before, but it never worked for me - I'd always find excuses. 
                        Going cold turkey was like ripping off a bandaid. Yes, it hurt more initially, but it was cleaner and more definitive. 
                        What made the difference was preparation - I spent two weeks planning every aspect of my quit before my actual quit date."
                      </p>
                      <p className="text-sm font-medium">Sarah's Top Tip:</p>
                      <p className="text-sm">
                        Change your routines completely for the first week. Different driving routes, different break locations at work, even rearranging furniture can help break associations.
                      </p>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Community-Sourced Tips</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          <strong>The toothbrush technique:</strong> Brush your teeth when a strong craving hits. The clean feeling and mint taste can diminish the urge.
                        </li>
                        <li>
                          <strong>The water challenge:</strong> Drink a full glass of water slowly during each craving - by the time you finish, the peak intensity often passes.
                        </li>
                        <li>
                          <strong>Sensory replacement:</strong> Use strong mints, cinnamon sticks, or lemon slices to stimulate your senses during cravings.
                        </li>
                        <li>
                          <strong>The money jar:</strong> Put the money you would have spent on nicotine products in a visible jar each day and watch it grow.
                        </li>
                        <li>
                          <strong>The craving journal:</strong> Write down every craving - the time, trigger, intensity, and how long it lasted. This helps identify patterns and shows that cravings do pass.
                        </li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-6">
              <div className="flex items-center mb-4">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                <h3 className="font-medium">Who This Method Is Best For</h3>
              </div>
              <ul className="list-disc pl-8 space-y-2">
                <li>People with high motivation and strong determination</li>
                <li>Those who prefer a clean break rather than prolonged withdrawal</li>
                <li>Individuals who have tried other methods without success</li>
                <li>Those who respond well to challenging themselves</li>
                <li>People with supportive environments and lower stress levels</li>
                <li>Individuals who are well-prepared with coping strategies</li>
              </ul>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="gradual">
          <div className="grid gap-6">
            <Card>
              <div className="md:flex">
                <div className="md:w-1/3 bg-fresh-50 p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-full inline-block mb-4 shadow-sm">
                      <ArrowDownToLine className="h-12 w-12 text-fresh-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-fresh-700">Gradual Reduction</h2>
                    <p className="text-fresh-600 mt-2">Step-by-step decrease in usage</p>
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <p className="mb-4">
                    Gradual reduction involves systematically decreasing your nicotine use over time. This method allows your body to slowly adjust to lower nicotine levels, potentially making the withdrawal process less intense than cold turkey.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Timeline</p>
                      <p className="font-medium">2-8 weeks</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Success Rate</p>
                      <p className="font-medium">5-7% per attempt</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Challenge Level</p>
                      <p className="font-medium">Moderate</p>
                    </div>
                  </div>
                  <p>
                    With gradual reduction, you set specific targets to progressively reduce your nicotine consumption until you reach zero. This approach requires careful tracking and disciplined adherence to your reduction schedule.
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Advantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Less intense withdrawal symptoms</li>
                    <li>Time to develop coping strategies</li>
                    <li>Builds confidence through incremental successes</li>
                    <li>More gradual adjustment for your body and brain</li>
                    <li>Can be more manageable around work/life commitments</li>
                    <li>Multiple opportunities to identify and address triggers</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Prolonged period of withdrawal symptoms</li>
                    <li>Requires careful tracking and discipline</li>
                    <li>Easy to stall at a certain level of consumption</li>
                    <li>Risk of rationalization to delay further reduction</li>
                    <li>Each reduction step can trigger renewed cravings</li>
                    <li>Final step to zero can still be challenging</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Lightbulb className="h-5 w-5 text-amber-500 mr-2" />
                    Effective Approaches
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Percentage method:</strong> Reduce by a set percentage each week (e.g., 25%)
                    </li>
                    <li>
                      <strong>Unit reduction:</strong> Decrease by a specific number of cigarettes/vape sessions each day
                    </li>
                    <li>
                      <strong>Delayed first use:</strong> Progressively delay your first nicotine use of the day
                    </li>
                    <li>
                      <strong>Scheduled use:</strong> Only use at predetermined times, gradually increasing the gaps
                    </li>
                    <li>
                      <strong>Brand switching:</strong> Transition to progressively lower nicotine content products
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Additional content for gradual reduction could go here */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-center text-muted-foreground">
                More detailed guidance for the Gradual Reduction method coming soon! Check back for complete implementation strategies and success stories.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="tapering">
          <div className="grid gap-6">
            <Card>
              <div className="md:flex">
                <div className="md:w-1/3 bg-fresh-50 p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-full inline-block mb-4 shadow-sm">
                      <BarChart4 className="h-12 w-12 text-fresh-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-fresh-700">Tapering Schedule</h2>
                    <p className="text-fresh-600 mt-2">Structured nicotine reduction</p>
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <p className="mb-4">
                    Tapering involves following a precise schedule that gradually reduces your nicotine intake over a specified period. This structured approach uses careful planning to minimize withdrawal symptoms while progressing toward cessation.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Timeline</p>
                      <p className="font-medium">3-12 weeks</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Success Rate</p>
                      <p className="font-medium">7-9% per attempt</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Challenge Level</p>
                      <p className="font-medium">Moderate</p>
                    </div>
                  </div>
                  <p>
                    Unlike general gradual reduction, tapering uses a specific, often personalized schedule with clear milestones. This approach works well for those who benefit from structure and measurable progress tracking.
                  </p>
                </div>
              </div>
            </Card>

            {/* Additional content for tapering could go here */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-center text-muted-foreground">
                More detailed guidance for the Tapering Schedule method coming soon! Check back for complete implementation strategies and sample tapering plans.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="nrt">
          <div className="grid gap-6">
            <Card>
              <div className="md:flex">
                <div className="md:w-1/3 bg-fresh-50 p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-full inline-block mb-4 shadow-sm">
                      <BookOpen className="h-12 w-12 text-fresh-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-fresh-700">NRT Assisted</h2>
                    <p className="text-fresh-600 mt-2">Using approved replacement therapies</p>
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <p className="mb-4">
                    Nicotine Replacement Therapy (NRT) uses FDA-approved products like patches, gum, lozenges, inhalers, or sprays to provide controlled amounts of nicotine without the harmful chemicals found in tobacco or vapes.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Timeline</p>
                      <p className="font-medium">8-12 weeks</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Success Rate</p>
                      <p className="font-medium">15-20% per attempt</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Challenge Level</p>
                      <p className="font-medium">Low-Moderate</p>
                    </div>
                  </div>
                  <p>
                    NRT helps manage physical withdrawal symptoms while you work on breaking the psychological habit. This method has strong scientific evidence supporting its effectiveness, particularly when combined with behavioral support.
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex justify-center">
              <Button 
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => window.location.href = '/tools/nrt-guide'}
              >
                <BookOpen size={16} />
                View Detailed NRT Guide
              </Button>
            </div>
            
            {/* Additional content for NRT could go here */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-center text-muted-foreground">
                For comprehensive information on NRT options, please visit our <a href="/tools/nrt-guide" className="text-fresh-500 hover:underline">NRT Guide</a> page, which provides detailed information on each type of nicotine replacement therapy.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="harm-reduction">
          <div className="grid gap-6">
            <Card>
              <div className="md:flex">
                <div className="md:w-1/3 bg-fresh-50 p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-full inline-block mb-4 shadow-sm">
                      <Flame className="h-12 w-12 text-fresh-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-fresh-700">Harm Reduction</h2>
                    <p className="text-fresh-600 mt-2">Reducing harm while maintaining nicotine use</p>
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <p className="mb-4">
                    Harm reduction focuses on minimizing the negative health impacts of nicotine use rather than complete cessation. This often involves switching from high-risk products (like cigarettes) to potentially less harmful alternatives.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Timeline</p>
                      <p className="font-medium">Ongoing</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Harm Reduction</p>
                      <p className="font-medium">50-95%</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-500">Challenge Level</p>
                      <p className="font-medium">Variable</p>
                    </div>
                  </div>
                  <p>
                    While complete abstinence is the healthiest choice, harm reduction recognizes that not everyone is ready or able to quit entirely. This approach can be a step toward eventual cessation or a long-term strategy for those unable to quit.
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex justify-center">
              <Button 
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => window.location.href = '/tools/smokeless-directory'}
              >
                <BookOpen size={16} />
                Explore Smokeless Alternatives
              </Button>
            </div>
            
            {/* Additional content for harm reduction could go here */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-center text-muted-foreground">
                For more information on smokeless nicotine alternatives, please visit our <a href="/tools/smokeless-directory" className="text-fresh-500 hover:underline">Smokeless Directory</a> page, which provides a comprehensive catalog of potentially less harmful nicotine products.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 p-6 bg-fresh-50 border border-fresh-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Ready to start your fresh journey?</h2>
        <div className="space-y-2">
          <p>Mission Fresh can provide personalized support for whichever method you choose.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <a href="/app/dashboard" className="inline-flex items-center justify-center rounded-md bg-fresh-300 hover:bg-fresh-400 text-white px-4 py-2">
              Get Started
            </a>
            <a href="/tools/nrt-guide" className="inline-flex items-center justify-center rounded-md border border-fresh-200 bg-white hover:bg-fresh-50 px-4 py-2">
              NRT Guide
            </a>
            <a href="/tools/calculators" className="inline-flex items-center justify-center rounded-md border border-fresh-200 bg-white hover:bg-fresh-50 px-4 py-2">
              Savings Calculator
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuitMethods;
