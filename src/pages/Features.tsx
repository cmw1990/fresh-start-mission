
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BatteryCharging, Brain as BrainIcon, Sparkles, Flame, LineChart, ListChecks, Footprints, ActivitySquare } from "lucide-react";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-mint-50 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Optimize Your Energy & Performance</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Mission Fresh provides comprehensive support for your entire journey,
              whether you're quitting completely or reducing your nicotine intake.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/sign-up">
                <Button className="btn-mint">
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

      {/* Categories Section */}
      <section className="py-12 bg-mint-50/50">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Available Everywhere You Need It</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            <Card className="hover:shadow-md transition-shadow text-center">
              <CardContent className="pt-6 flex flex-col items-center">
                <div className="rounded-full bg-mint-100 p-3 mb-3">
                  <BrainIcon className="h-6 w-6 text-mint-500" />
                </div>
                <p className="text-sm font-medium">Web App</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow text-center">
              <CardContent className="pt-6 flex flex-col items-center">
                <div className="rounded-full bg-mint-100 p-3 mb-3">
                  <ActivitySquare className="h-6 w-6 text-mint-500" />
                </div>
                <p className="text-sm font-medium">iOS App</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow text-center">
              <CardContent className="pt-6 flex flex-col items-center">
                <div className="rounded-full bg-mint-100 p-3 mb-3">
                  <Sparkles className="h-6 w-6 text-mint-500" />
                </div>
                <p className="text-sm font-medium">Android App</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow text-center">
              <CardContent className="pt-6 flex flex-col items-center">
                <div className="rounded-full bg-mint-100 p-3 mb-3">
                  <Flame className="h-6 w-6 text-mint-500" />
                </div>
                <p className="text-sm font-medium">Chrome Extension</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow text-center">
              <CardContent className="pt-6 flex flex-col items-center">
                <div className="rounded-full bg-mint-100 p-3 mb-3">
                  <LineChart className="h-6 w-6 text-mint-500" />
                </div>
                <p className="text-sm font-medium">Mac App</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow text-center">
              <CardContent className="pt-6 flex flex-col items-center">
                <div className="rounded-full bg-mint-100 p-3 mb-3">
                  <Footprints className="h-6 w-6 text-mint-500" />
                </div>
                <p className="text-sm font-medium">Windows App</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
            <p className="text-lg text-muted-foreground">
              Mission Fresh provides comprehensive support for your entire journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="overflow-hidden hover:shadow-md transition-shadow border-border hover-scale">
              <CardHeader className="pb-2">
                <div className="rounded-full bg-mint-100 p-3 w-12 h-12 flex items-center justify-center mb-3">
                  <BatteryCharging className="h-6 w-6 text-mint-500" />
                </div>
                <CardTitle>Energy Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Tools to combat fatigue and boost energy levels during nicotine reduction or abstinence.</CardDescription>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-md transition-shadow border-border hover-scale">
              <CardHeader className="pb-2">
                <div className="rounded-full bg-mint-100 p-3 w-12 h-12 flex items-center justify-center mb-3">
                  <Sparkles className="h-6 w-6 text-mint-500" />
                </div>
                <CardTitle>Mood Lifters</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Exercises and techniques to stabilize mood swings and enhance overall emotional wellbeing.</CardDescription>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-md transition-shadow border-border hover-scale">
              <CardHeader className="pb-2">
                <div className="rounded-full bg-mint-100 p-3 w-12 h-12 flex items-center justify-center mb-3">
                  <BrainIcon className="h-6 w-6 text-mint-500" />
                </div>
                <CardTitle>Focus Enhancers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Strategies to improve concentration and mental clarity during withdrawal periods.</CardDescription>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-md transition-shadow border-border hover-scale">
              <CardHeader className="pb-2">
                <div className="rounded-full bg-mint-100 p-3 w-12 h-12 flex items-center justify-center mb-3">
                  <Flame className="h-6 w-6 text-mint-500" />
                </div>
                <CardTitle>Craving Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Immediate tools and techniques to cope with and overcome nicotine cravings.</CardDescription>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-md transition-shadow border-border hover-scale">
              <CardHeader className="pb-2">
                <div className="rounded-full bg-mint-100 p-3 w-12 h-12 flex items-center justify-center mb-3">
                  <ListChecks className="h-6 w-6 text-mint-500" />
                </div>
                <CardTitle>Flexible Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Support for multiple approaches: cold turkey, gradual reduction, NRT, or harm reduction.</CardDescription>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-md transition-shadow border-border hover-scale">
              <CardHeader className="pb-2">
                <div className="rounded-full bg-mint-100 p-3 w-12 h-12 flex items-center justify-center mb-3">
                  <LineChart className="h-6 w-6 text-mint-500" />
                </div>
                <CardTitle>Progress Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">Clear, intuitive charts that show your progress and identify patterns.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-16 md:py-20 bg-mint-50/50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Tools & Guides</h2>
            <p className="text-lg text-muted-foreground">
              Access our extensive collection of science-backed tools to enhance your wellbeing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="rounded-full bg-mint-100 p-3 w-12 h-12 flex items-center justify-center mb-3">
                  <BatteryCharging className="h-6 w-6 text-mint-500" />
                </div>
                <CardTitle>Energy Management</CardTitle>
                <CardDescription>Science-backed tools and strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Optimize your energy levels with our guides and tracking tools
                </p>
                <Link to="/tools/holistic-health#energy">
                  <Button variant="outline" className="w-full">Access Tool</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="rounded-full bg-mint-100 p-3 w-12 h-12 flex items-center justify-center mb-3">
                  <BrainIcon className="h-6 w-6 text-mint-500" />
                </div>
                <CardTitle>Focus Enhancement</CardTitle>
                <CardDescription>Cognitive performance tools</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Enhance focus and productivity with customizable white noise and techniques
                </p>
                <Link to="/tools/holistic-health#focus">
                  <Button variant="outline" className="w-full">Access Tool</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="rounded-full bg-mint-100 p-3 w-12 h-12 flex items-center justify-center mb-3">
                  <Sparkles className="h-6 w-6 text-mint-500" />
                </div>
                <CardTitle>Supplement Guide</CardTitle>
                <CardDescription>Evidence-based nootropics guide</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive guide to supplements for cognitive enhancement and energy
                </p>
                <Link to="/tools/quit-methods">
                  <Button variant="outline" className="w-full">Access Tool</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Track What Matters</h2>
              <p className="mb-6 text-lg">
                Our comprehensive tracking system helps you understand your patterns and optimize your performance.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-2">Energy Level</h3>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Daily Progress</span>
                    <span>85%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-value" style={{ width: "85%" }}></div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Mental Focus</h3>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Daily Progress</span>
                    <span>72%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-value" style={{ width: "72%" }}></div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Mood</h3>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Daily Progress</span>
                    <span>90%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-value" style={{ width: "90%" }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Card className="overflow-hidden">
                <CardHeader className="bg-mint-50 pb-2">
                  <CardTitle>Weekly Progress Summary</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-mint-100 p-3">
                        <BatteryCharging className="h-5 w-5 text-mint-500" />
                      </div>
                      <div>
                        <p className="font-medium">Energy Level</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <ArrowRight className="h-3 w-3 text-mint-500 mr-1" />
                          <span>15% improvement this week</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-mint-100 p-3">
                        <BrainIcon className="h-5 w-5 text-mint-500" />
                      </div>
                      <div>
                        <p className="font-medium">Focus Sessions</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <ArrowRight className="h-3 w-3 text-mint-500 mr-1" />
                          <span>8 productive sessions completed</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-mint-100 p-3">
                        <Flame className="h-5 w-5 text-mint-500" />
                      </div>
                      <div>
                        <p className="font-medium">Craving Management</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <ArrowRight className="h-3 w-3 text-mint-500 mr-1" />
                          <span>63% fewer cravings reported</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-background to-mint-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Fresh Journey?</h2>
            <p className="text-xl mb-8">
              Join thousands of others who are finding their path to a fresher, healthier life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/sign-up">
                <Button size="lg" className="btn-mint">
                  Create Your Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/tools">
                <Button size="lg" variant="outline">
                  Explore Tools
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
