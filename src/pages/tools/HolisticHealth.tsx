
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Droplets, Brain, Heart, Utensils, Dumbbell, Wind } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HolisticHealth = () => {
  return (
    <div className="container py-12 px-4 mx-auto max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Holistic Health Guide</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Evidence-based strategies to support your energy, mood, focus, and overall wellbeing 
          throughout your fresh journey.
        </p>
      </div>

      <Tabs defaultValue="energy" className="mb-12">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="energy" className="flex items-center justify-center">
            <Droplets className="mr-2 h-4 w-4" />
            Energy Support
          </TabsTrigger>
          <TabsTrigger value="mood" className="flex items-center justify-center">
            <Heart className="mr-2 h-4 w-4" />
            Mood Regulation
          </TabsTrigger>
          <TabsTrigger value="focus" className="flex items-center justify-center">
            <Brain className="mr-2 h-4 w-4" />
            Focus Enhancement
          </TabsTrigger>
          <TabsTrigger value="cravings" className="flex items-center justify-center">
            <Wind className="mr-2 h-4 w-4" />
            Cravings Management
          </TabsTrigger>
        </TabsList>

        {/* Energy Support Content */}
        <TabsContent value="energy">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Understanding Energy Fluctuations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Many people experience temporary energy fluctuations when reducing nicotine. This is normal and happens because:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Nicotine is a stimulant that artificially boosts your energy levels</li>
                  <li>Your body is adjusting to functioning without this artificial stimulant</li>
                  <li>The quality of your sleep may temporarily change</li>
                  <li>Stress hormones are rebalancing</li>
                </ul>
                <p className="font-medium text-fresh-600">The good news: These effects are temporary, and there are effective strategies to manage them!</p>
              </CardContent>
            </Card>

            <h2 className="text-2xl font-bold mt-8 mb-4">Practical Strategies for Energy Management</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                    <Droplets className="h-6 w-6" />
                  </div>
                  <CardTitle>Hydration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Even mild dehydration can significantly impact energy levels. When reducing nicotine:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Aim for 8-10 glasses of water daily</li>
                    <li>Start your day with a full glass of water</li>
                    <li>Consider herbal teas as a soothing alternative</li>
                    <li>Limit caffeine to morning hours to prevent sleep disruption</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-4">
                    <Utensils className="h-6 w-6" />
                  </div>
                  <CardTitle>Nutrition</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Strategic eating can help stabilize energy levels throughout the day:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Incorporate protein with each meal to maintain steady energy</li>
                    <li>Choose complex carbohydrates (whole grains, vegetables) over simple sugars</li>
                    <li>Eat smaller, more frequent meals if energy dips between larger meals</li>
                    <li>Consider B-vitamin rich foods (leafy greens, whole grains) which support energy metabolism</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
                    <Dumbbell className="h-6 w-6" />
                  </div>
                  <CardTitle>Physical Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Movement is one of the most effective natural energy boosters:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Start with brief (5-10 minute) walks when feeling an energy dip</li>
                    <li>Incorporate gentle stretching throughout the day</li>
                    <li>Build up to 30 minutes of moderate activity most days</li>
                    <li>Consider morning exercise to energize your day naturally</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M12 2v8"></path><path d="M12 18v4"></path><path d="M4.93 4.93l5.66 5.66"></path><path d="M13.41 13.41l5.66 5.66"></path><path d="M2 12h8"></path><path d="M18 12h4"></path><path d="M4.93 19.07l5.66-5.66"></path><path d="M13.41 10.59l5.66-5.66"></path></svg>
                  </div>
                  <CardTitle>Energy Rhythms</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Working with your body's natural energy patterns:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Identify your peak energy times and schedule important tasks then</li>
                    <li>Plan for an afternoon dip with lighter activities</li>
                    <li>Create a consistent sleep-wake schedule</li>
                    <li>Consider a short (10-20 minute) afternoon nap if needed</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="bg-fresh-50 p-6 rounded-lg mt-8">
              <h3 className="font-bold text-lg mb-2">Quick Energy Boost Exercise</h3>
              <p className="mb-4">When you need an immediate energy lift, try this simple technique:</p>
              <ol className="list-decimal pl-6 space-y-3">
                <li>Stand up and gently shake out your limbs for 10 seconds</li>
                <li>Take 5 deep breaths, inhaling through your nose for 4 counts, and exhaling through your mouth for 6 counts</li>
                <li>Roll your shoulders backward 5 times, then forward 5 times</li>
                <li>March in place with high knees for 30 seconds</li>
                <li>Finish with a gentle stretch reaching your arms overhead</li>
              </ol>
              <p className="mt-4 text-sm italic">This takes less than 2 minutes but can significantly increase blood flow, oxygen, and energy.</p>
            </div>
          </div>
        </TabsContent>

        {/* Mood Regulation Content */}
        <TabsContent value="mood">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Understanding Mood Changes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Fluctuations in mood are one of the most common experiences when reducing nicotine. Here's why:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Nicotine directly affects dopamine, your brain's reward chemical</li>
                  <li>Your brain is recalibrating its natural mood regulation systems</li>
                  <li>Temporary irritability is part of the adjustment process</li>
                  <li>Emotions that were previously numbed may feel more intense</li>
                </ul>
                <p className="font-medium text-fresh-600">Remember: These mood changes are temporary and signify your brain healing!</p>
              </CardContent>
            </Card>

            <h2 className="text-2xl font-bold mt-8 mb-4">Effective Mood Management Techniques</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mindfulness Practice</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Mindfulness helps create space between emotions and reactions:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Start with brief (3-5 minute) daily meditation sessions</li>
                    <li>Practice "STOP": Stop, Take a breath, Observe feelings, Proceed mindfully</li>
                    <li>Notice emotions without judgment or immediate reaction</li>
                    <li>Use gentle curiosity when exploring difficult feelings</li>
                  </ul>
                  <div className="bg-slate-50 p-4 rounded-md mt-2">
                    <p className="text-sm italic">"Mindfulness isn't about suppressing emotions, but understanding them better so they have less control over your behavior."</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Physical Movement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Movement is one of the most effective mood regulators:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Even a 10-minute walk can significantly improve mood</li>
                    <li>Regular exercise increases endorphins, your natural mood lifters</li>
                    <li>Physical activities provide a healthy outlet for stress or frustration</li>
                    <li>Gentle stretching or yoga can calm an agitated mind</li>
                  </ul>
                  <div className="bg-slate-50 p-4 rounded-md mt-2">
                    <p className="text-sm italic">"Movement doesn't just change your body; it changes your brain chemistry in ways that directly support emotional stability."</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Social Connection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Quality social interaction helps stabilize mood:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Share your journey with at least one supportive person</li>
                    <li>Schedule regular check-ins with friends or family</li>
                    <li>Consider joining a support group (online or in-person)</li>
                    <li>Helping others has been shown to boost mood and purpose</li>
                  </ul>
                  <p className="text-sm mt-2">Tip: Be selective about who you share with—choose people who are supportive of your journey.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expressive Techniques</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Expressing emotions in healthy ways prevents buildup:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Journal for 5-10 minutes daily about your feelings</li>
                    <li>Try creative outlets like drawing, music, or crafts</li>
                    <li>Practice "emotion naming"—specifically identifying what you feel</li>
                    <li>Use physical practices like pillow punching or tension release for strong emotions</li>
                  </ul>
                  <p className="text-sm mt-2">Research shows that naming emotions reduces their intensity.</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-fresh-50 p-6 rounded-lg mt-8">
              <h3 className="font-bold text-lg mb-2">Quick Mood Reset Technique</h3>
              <p className="mb-4">When experiencing a difficult mood, try this evidence-based grounding exercise:</p>
              <p className="mb-2 font-medium">The 5-4-3-2-1 Method:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>5:</strong> Notice FIVE things you can see around you</li>
                <li><strong>4:</strong> Acknowledge FOUR things you can touch or feel</li>
                <li><strong>3:</strong> Listen for THREE sounds in your environment</li>
                <li><strong>2:</strong> Identify TWO things you can smell</li>
                <li><strong>1:</strong> Note ONE thing you can taste</li>
              </ul>
              <p className="mt-4 text-sm italic">This exercise brings you back to the present moment and engages your senses, helping to interrupt negative thought patterns.</p>
            </div>
          </div>
        </TabsContent>

        {/* Focus Enhancement Content */}
        <TabsContent value="focus">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Understanding Focus Changes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Many people notice concentration difficulties when reducing nicotine. This happens because:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Nicotine temporarily enhances attention by stimulating acetylcholine receptors</li>
                  <li>Your brain is creating new neural pathways for focus without nicotine</li>
                  <li>Withdrawal symptoms like irritability can distract attention</li>
                  <li>Sleep quality changes can impact cognitive function</li>
                </ul>
                <p className="font-medium text-fresh-600">Focus typically improves within 2-4 weeks as your brain adjusts, often becoming better than before!</p>
              </CardContent>
            </Card>

            <h2 className="text-2xl font-bold mt-8 mb-4">Effective Focus Enhancement Strategies</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Work Structure Techniques</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Strategic work approaches can maximize existing focus:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>The Pomodoro Technique:</strong> Work in focused 25-minute blocks with 5-minute breaks between</li>
                    <li><strong>Task Batching:</strong> Group similar tasks together to reduce context switching</li>
                    <li><strong>Important-First Scheduling:</strong> Handle complex tasks during your peak focus hours</li>
                    <li><strong>Distraction Blocking:</strong> Use apps or browser extensions to limit digital interruptions</li>
                  </ul>
                  <p className="text-sm italic">These approaches maximize your available focus rather than demanding sustained attention for long periods.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Physical Focus Enhancers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Your physical state directly impacts cognitive function:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Proper Hydration:</strong> Even mild dehydration reduces concentration by up to 13%</li>
                    <li><strong>Protein-Based Snacks:</strong> Provide steady energy without crashes</li>
                    <li><strong>Brief Exercise:</strong> A 5-minute movement break can reset attention</li>
                    <li><strong>Proper Lighting:</strong> Natural light improves focus and reduces eye strain</li>
                  </ul>
                  <p className="text-sm italic">Physical interventions can often have more immediate effects than cognitive strategies alone.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cognitive Training</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Strengthen your focus "muscles" with regular practice:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Single-Tasking:</strong> Deliberately practice doing one thing at a time</li>
                    <li><strong>Reading:</strong> Regular reading of physical books builds sustained attention</li>
                    <li><strong>Mindfulness Practice:</strong> Meditation directly enhances focus networks</li>
                    <li><strong>Attention Games:</strong> Puzzles, sudoku, or specific brain training apps</li>
                  </ul>
                  <p className="text-sm italic">Just like physical strength, cognitive focus improves with regular training and deteriorates without use.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Environment Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Your surroundings significantly impact your ability to focus:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Decluttering:</strong> Physical mess creates cognitive load and distraction</li>
                    <li><strong>Noise Management:</strong> Use white noise, nature sounds, or noise-canceling headphones</li>
                    <li><strong>Temperature Control:</strong> Cognitive performance peaks around 70-72°F (21-22°C)</li>
                    <li><strong>Digital Minimalism:</strong> Close unnecessary apps, tabs, and silence notifications</li>
                  </ul>
                  <p className="text-sm italic">Your brain constantly processes environmental stimuli—reducing unnecessary input preserves cognitive resources.</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-fresh-50 p-6 rounded-lg mt-8">
              <h3 className="font-bold text-lg mb-2">Quick Focus Restoration Exercise</h3>
              <p className="mb-4">When your mind feels scattered, try this 60-second reset technique:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Close your eyes or soften your gaze</li>
                <li>Take 3 deep breaths, focusing completely on the sensation of breathing</li>
                <li>Gently roll your head in a circle, once in each direction</li>
                <li>Place your hands on your desk/table and feel the texture for 10 seconds</li>
                <li>Set a clear, specific intention for what you'll focus on next</li>
              </ol>
              <p className="mt-4 text-sm italic">This mini-reset interrupts scattered thinking and provides a clear transition back to focused work.</p>
            </div>
          </div>
        </TabsContent>

        {/* Cravings Management Content */}
        <TabsContent value="cravings">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Understanding Cravings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Cravings are temporary urges that typically follow a predictable pattern:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>They generally build, peak, and subside within 3-5 minutes</li>
                  <li>Cravings are triggered by specific cues (situations, emotions, etc.)</li>
                  <li>The intensity naturally decreases over time with abstinence</li>
                  <li>Each successfully managed craving weakens future ones</li>
                </ul>
                <p className="font-medium text-fresh-600">Remember: No matter how intense, a craving is temporary and will pass whether or not you use nicotine.</p>
              </CardContent>
            </Card>

            <h2 className="text-2xl font-bold mt-8 mb-4">Evidence-Based Craving Management Strategies</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Delay and Distract</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>One of the most effective strategies is simply outlasting the urge:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>The 5-Minute Rule:</strong> When a craving hits, commit to waiting just 5 minutes before deciding</li>
                    <li><strong>Engage in a brief, absorbing activity:</strong> Puzzle games, physical tasks, or conversations</li>
                    <li><strong>Change your environment:</strong> Simply moving to a different room can interrupt the craving cycle</li>
                    <li><strong>Use a timer:</strong> Setting a concrete endpoint helps maintain resolve</li>
                  </ul>
                  <div className="bg-slate-50 p-4 rounded-md mt-2">
                    <p className="text-sm italic">"Between stimulus and response there is a space. In that space is our power to choose our response." — Viktor Frankl</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Physical Techniques</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Physical interventions can rapidly reduce craving intensity:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Deep breathing:</strong> 4 counts in, hold for 2, 6 counts out (repeat 5 times)</li>
                    <li><strong>Progressive muscle relaxation:</strong> Tense and release muscle groups sequentially</li>
                    <li><strong>Water drinking:</strong> Slowly drink a full glass of cold water</li>
                    <li><strong>Brief exercise:</strong> 20 jumping jacks, a quick walk, or stretch session</li>
                  </ul>
                  <p className="text-sm mt-2">These techniques activate your parasympathetic nervous system, naturally counteracting the stress response of cravings.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cognitive Reframing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Change how you think about cravings to reduce their power:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Urge surfing:</strong> Visualize cravings as waves that you can ride without being swept away</li>
                    <li><strong>Challenge thoughts:</strong> "I need nicotine" becomes "My body is adjusting to functioning without nicotine"</li>
                    <li><strong>Future self:</strong> Imagine yourself in 30 minutes, grateful you didn't give in</li>
                    <li><strong>Progress protection:</strong> Remember how far you've come and what you'd be giving up</li>
                  </ul>
                  <p className="text-sm mt-2">Changing your relationship with cravings transforms them from emergencies into passing discomforts.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Replacement Behaviors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Strategically substitute other activities for nicotine use:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Oral substitutes:</strong> Sugar-free gum, cinnamon sticks, carrot sticks, toothpicks</li>
                    <li><strong>Hand activities:</strong> Stress balls, fidget toys, beads, crafting</li>
                    <li><strong>Breath activities:</strong> Deep breathing with essential oils, breathing exercises</li>
                    <li><strong>Similar routine:</strong> Taking a "fresh air break" instead of a "smoke break"</li>
                  </ul>
                  <p className="text-sm mt-2">Substitution works because it addresses the habitual and sensory aspects of nicotine use beyond the chemical dependency.</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-fresh-50 p-6 rounded-lg mt-8">
              <h3 className="font-bold text-lg mb-2">S.T.O.P Method for Intense Cravings</h3>
              <p className="mb-4">When facing a powerful urge, follow this structured approach:</p>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">S: <span className="font-normal">STOP what you're doing</span></p>
                  <p className="text-sm pl-4">Pause and interrupt your automatic patterns.</p>
                </div>
                <div>
                  <p className="font-medium">T: <span className="font-normal">TAKE a deep breath</span></p>
                  <p className="text-sm pl-4">Breathe in for 4 seconds, hold for 2, exhale for 6. Repeat 3 times.</p>
                </div>
                <div>
                  <p className="font-medium">O: <span className="font-normal">OBSERVE your experience</span></p>
                  <p className="text-sm pl-4">Notice physical sensations, thoughts, and emotions without judgment.</p>
                </div>
                <div>
                  <p className="font-medium">P: <span className="font-normal">PROCEED mindfully</span></p>
                  <p className="text-sm pl-4">Choose your next action deliberately rather than automatically.</p>
                </div>
              </div>
              <p className="mt-4 text-sm italic">This method creates a vital space between stimulus (craving) and response, allowing you to act from intention rather than impulse.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="border-t pt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Establish a Support System</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Research shows that social support significantly improves success rates. Consider:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Sharing your journey with a trusted friend</li>
                <li>Joining an online community</li>
                <li>Working with a healthcare professional</li>
                <li>Using the Mission Fresh app's community features</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Track Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Monitoring your journey provides motivation and insights:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Notice patterns in your energy, mood, and cravings</li>
                <li>Celebrate improvements in your well-being</li>
                <li>Identify triggers or difficult times</li>
                <li>Use data to refine your approach</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/sign-up">Start Tracking Now</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Calculate Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p>See the tangible benefits of your fresh journey:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Financial savings from reduced nicotine use</li>
                <li>Health improvements timeline</li>
                <li>Projected long-term benefits</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/tools/calculators">Use Calculators</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="mt-16 bg-gradient-to-br from-fresh-50 to-fresh-100 p-8 rounded-xl shadow-sm text-center">
        <h2 className="text-2xl font-bold mb-4">Ready for Personalized Support?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          The Mission Fresh app offers customized tools for energy, mood, focus, and craving management 
          based on your specific needs and goals.
        </p>
        <Button asChild size="lg" className="bg-fresh-500 hover:bg-fresh-600 text-white">
          <Link to="/sign-up">Start Your Fresh Journey</Link>
        </Button>
      </div>

      <div className="flex justify-between mt-12">
        <Link to="/tools">
          <Button variant="outline" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </Link>
        <Link to="/tools/calculators">
          <Button variant="default" className="bg-fresh-500 hover:bg-fresh-600">
            Explore Calculators
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HolisticHealth;
