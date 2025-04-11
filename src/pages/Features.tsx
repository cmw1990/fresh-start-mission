
import { Button } from "@/components/ui/button";
import Features from "@/components/home/Features";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-fresh-50 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">A Fresh Approach to Nicotine Freedom</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Mission Fresh provides comprehensive support for your entire journey,
              whether you're quitting completely or reducing your nicotine intake.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/sign-up">
                <Button className="bg-fresh-300 hover:bg-fresh-400 text-white">
                  Start Your Fresh Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <Features />

      {/* Holistic Support Section */}
      <section className="py-16 md:py-20 bg-fresh-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Holistic Support System</h2>
            <p className="text-lg text-muted-foreground">
              We address the real challenges of nicotine reduction: energy drain, mood swings, 
              focus issues, and persistent cravings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-fresh-100 text-fresh-500 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flame"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Craving Management</h3>
              <p className="text-muted-foreground">
                Interactive tools to handle cravings in the moment, including guided breathing, 
                distraction techniques, and CBT-inspired exercises.
              </p>
            </div>

            <div className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-teal-100 text-teal-500 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-battery-charging"><path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/><path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1"/><path d="m11 7-3 5h4l-3 5"/><line x1="22" x2="22" y1="11" y2="13"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Energy Support</h3>
              <p className="text-muted-foreground">
                Practical activities and techniques to combat fatigue and boost energy levels 
                during nicotine reduction or abstinence.
              </p>
            </div>

            <div className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-fresh-100 text-fresh-500 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Mood Lifters</h3>
              <p className="text-muted-foreground">
                Exercises and techniques to stabilize mood swings and enhance overall emotional 
                wellbeing during the challenging transition.
              </p>
            </div>

            <div className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-teal-100 text-teal-500 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Focus Enhancers</h3>
              <p className="text-muted-foreground">
                Strategies and tools to improve concentration and mental clarity during 
                withdrawal periods, helping you stay productive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Flexible Approach Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Journey, Your Way</h2>
              <p className="text-lg mb-6">
                Mission Fresh adapts to your goals and preferences, whether you're looking to:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-fresh-100 p-2 rounded-full mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fresh-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-1">Stay Afresh</h3>
                    <p className="text-muted-foreground">Complete nicotine abstinence with expert support every step of the way</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-fresh-100 p-2 rounded-full mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fresh-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-1">Stay Fresher</h3>
                    <p className="text-muted-foreground">Reduce your nicotine intake gradually with personalized goals and tracking</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-fresh-100 p-2 rounded-full mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fresh-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-1">Multiple Approaches</h3>
                    <p className="text-muted-foreground">Cold turkey, gradual reduction, NRT assisted, or harm reduction - we support your choice</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-fresh-100 p-2 rounded-full mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fresh-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-1">All Products</h3>
                    <p className="text-muted-foreground">Track use of any nicotine product: cigarettes, vapes, pouches, gums, and more</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-fresh-50 p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-semibold mb-6">Track What Matters</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-background rounded-lg p-4 flex items-center">
                  <div className="mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Energy Levels</h4>
                    <p className="text-sm text-muted-foreground">Monitor daily fluctuations</p>
                  </div>
                </div>
                
                <div className="bg-background rounded-lg p-4 flex items-center">
                  <div className="mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fresh-500"><path d="m2 10 2-2v8"/><path d="m6 12 2-2v4"/><path d="m10 10 2-2v8"/><path d="m14 8 2-2v10"/><path d="m18 5 2-2v16"/><path d="M2 18h20"/></svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Mood</h4>
                    <p className="text-sm text-muted-foreground">Track emotional wellness</p>
                  </div>
                </div>
                
                <div className="bg-background rounded-lg p-4 flex items-center">
                  <div className="mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500"><circle cx="12" cy="12" r="10"/><path d="M18 16v.01"/><path d="M6 16v.01"/><path d="M12 18v.01"/><path d="M12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M6 9v-.01"/><path d="M18 9v-.01"/><path d="M12 6v.01"/></svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Focus</h4>
                    <p className="text-sm text-muted-foreground">Gauge mental clarity</p>
                  </div>
                </div>
                
                <div className="bg-background rounded-lg p-4 flex items-center">
                  <div className="mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fresh-500"><path d="M18.5 8.5a2.5 2.5 0 0 0-5 0c0 1.5.5 2 2.5 3.5s2.5 3.5 2.5 5a2.5 2.5 0 0 1-5 0"/><path d="M7.5 8.5a2.5 2.5 0 0 1 5 0c0 1.5-.5 2-2.5 3.5s-2.5 3.5-2.5 5a2.5 2.5 0 0 0 5 0"/></svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Cravings</h4>
                    <p className="text-sm text-muted-foreground">Identify patterns & triggers</p>
                  </div>
                </div>
                
                <div className="bg-background rounded-lg p-4 flex items-center">
                  <div className="mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500"><path d="M6 20h12"/><path d="M6 20v-2"/><path d="M18 20v-1"/><path d="M6 13v-3"/><path d="M18 15v-8"/><path d="M18 5V4"/><path d="M6 9V4"/></svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Sleep Quality</h4>
                    <p className="text-sm text-muted-foreground">Track restful sleep</p>
                  </div>
                </div>
                
                <div className="bg-background rounded-lg p-4 flex items-center">
                  <div className="mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fresh-500"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Day Streaks</h4>
                    <p className="text-sm text-muted-foreground">Build your momentum</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Visualization */}
      <section className="py-16 md:py-20 bg-fresh-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-background p-6 rounded-xl shadow-sm">
                {/* Sample Chart Mockup */}
                <div className="mb-4">
                  <h4 className="text-lg font-medium mb-2">Your Holistic Progress</h4>
                  <div className="h-64 bg-gradient-to-r from-fresh-100 to-teal-100 rounded-lg flex items-end px-4 pb-4">
                    <div className="w-1/5 h-20 bg-teal-500 rounded-t-md mx-1"></div>
                    <div className="w-1/5 h-32 bg-teal-500 rounded-t-md mx-1"></div>
                    <div className="w-1/5 h-24 bg-teal-500 rounded-t-md mx-1"></div>
                    <div className="w-1/5 h-40 bg-teal-500 rounded-t-md mx-1"></div>
                    <div className="w-1/5 h-48 bg-teal-500 rounded-t-md mx-1"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                  </div>
                </div>
                
                {/* Sample Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-fresh-50 rounded-md p-3">
                    <p className="text-sm text-muted-foreground">Days Afresh</p>
                    <p className="text-xl font-semibold">7</p>
                  </div>
                  <div className="bg-fresh-50 rounded-md p-3">
                    <p className="text-sm text-muted-foreground">Money Saved</p>
                    <p className="text-xl font-semibold">$73.50</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Clear Visualization of Progress</h2>
              <p className="text-lg mb-6">
                Track your journey with intuitive charts and metrics that help identify patterns 
                and celebrate achievements.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fresh-500 mt-1 mr-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Visualize usage patterns and identify triggers</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fresh-500 mt-1 mr-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Track financial savings from reduced nicotine use</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fresh-500 mt-1 mr-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Monitor how energy, mood and focus improve over time</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fresh-500 mt-1 mr-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>See your health improvements on a personalized timeline</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Step Rewards Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Step Rewards</h2>
            <p className="text-lg text-muted-foreground">
              Stay active and earn rewards based on your daily steps and progress
            </p>
          </div>

          <div className="bg-fresh-50 rounded-xl p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Walk Your Way to Rewards</h3>
                <p className="mb-6">
                  Mission Fresh syncs with your phone's health tracking to reward your physical activity,
                  creating a positive feedback loop that supports your fresh journey.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fresh-500 mt-1 mr-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Automatic step tracking through HealthKit/Google Fit</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fresh-500 mt-1 mr-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Earn points for reaching daily step goals</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fresh-500 mt-1 mr-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Redeem points for subscription discounts and more</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fresh-500 mt-1 mr-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Walking helps reduce cravings - win-win!</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm">
                {/* Step Counter Mockup */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-fresh-100 text-fresh-500 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 4v16"/><path d="M17 4v16"/><path d="M21 4v16"/><path d="M9 4.5v15"/><path d="M5 4.5v15"/><path d="M1 5.5v13"/></svg>
                  </div>
                  <p className="text-sm text-muted-foreground">Today's Steps</p>
                  <p className="text-3xl font-bold">8,247</p>
                </div>
                
                {/* Rewards Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress to next reward</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-fresh-300 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">15,000 more steps to earn 100 points</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-background to-fresh-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Fresh Journey?</h2>
            <p className="text-xl mb-8">
              Join thousands of others who are finding their path to a fresher, healthier life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/sign-up">
                <Button size="lg" className="bg-fresh-300 hover:bg-fresh-400 text-white">
                  Create Your Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
