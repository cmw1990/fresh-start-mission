
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  ActivitySquare, 
  BatteryCharging, 
  Brain, 
  Cigarette, 
  Flame, 
  LineChart, 
  ListChecks, 
  Footprints,
  Sparkles,
  Target,
  HeartPulse,
  Coffee,
  Gauge,
  Medal,
  CalendarCheck,
  Users,
  LucideIcon,
  DollarSign,
  TrendingDown,
  ChartBar
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FeatureCategory {
  id: string;
  title: string;
  description: string;
  features: Feature[];
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  detail?: string;
}

const coreFeatures: Feature[] = [
  {
    icon: <Target className="h-12 w-12 text-fresh-300" />,
    title: "Flexible Goals",
    description: "'Staying Afresh' or 'Staying Fresher' - set personalized goals with support for multiple approaches.",
    detail: "Choose cold turkey, gradual reduction, NRT, or harm reduction methods, all with full support and tracking. Your journey, your choice."
  },
  {
    icon: <Cigarette className="h-12 w-12 text-fresh-300" />,
    title: "All Products Tracking",
    description: "Comprehensive tracking for any nicotine product: cigarettes, vapes, pouches, gums, patches, and more.",
    detail: "Add custom products to track exactly what you use. Mission Fresh adapts to your specific needs without judgment."
  },
  {
    icon: <LineChart className="h-12 w-12 text-fresh-300" />,
    title: "Progress Visualization",
    description: "See your journey with clear, motivating charts showing nicotine reduction, money saved, and health improvements.",
    detail: "Interactive dashboards provide insights into your patterns and progress over time, keeping you motivated and informed."
  },
  {
    icon: <ActivitySquare className="h-12 w-12 text-fresh-300" />,
    title: "Holistic Tracking",
    description: "Monitor all aspects of wellbeing: sleep quality, energy levels, mood stability, and mental focus alongside nicotine use.",
    detail: "Our holistic approach recognizes that nicotine reduction affects your whole self - tracking these metrics helps identify patterns and trigger points."
  },
  {
    icon: <Footprints className="h-12 w-12 text-fresh-300" />,
    title: "Step Rewards",
    description: "Turn physical activity into tangible benefits with our step-tracking reward system.",
    detail: "Physical activity reduces cravings and improves mood. Our unique system rewards movement with points redeemable for benefits that support your journey."
  },
  {
    icon: <CalendarCheck className="h-12 w-12 text-fresh-300" />,
    title: "Custom Schedules",
    description: "Create personalized reduction schedules that fit your lifestyle and goals.",
    detail: "Whether you're reducing gradually over weeks or months, our system helps you set and stick to a realistic timeline that works for you."
  }
];

const supportFeatures: Feature[] = [
  {
    icon: <Flame className="h-12 w-12 text-fresh-500" />,
    title: "Craving Management",
    description: "Immediate, science-backed tools to overcome intense nicotine cravings in the moment.",
    detail: "Access breathing exercises, distraction techniques, mindfulness practices, and cognitive reframing tools specifically designed to manage cravings when they hit hardest."
  },
  {
    icon: <BatteryCharging className="h-12 w-12 text-fresh-500" />,
    title: "Energy Support",
    description: "Combat fatigue often experienced during nicotine withdrawal with targeted tools.",
    detail: "Access micro-exercises, nutritional guidance, and energy-boosting activities specifically designed to counteract withdrawal fatigue."
  },
  {
    icon: <Sparkles className="h-12 w-12 text-fresh-500" />,
    title: "Mood Regulation",
    description: "Practical exercises and techniques to stabilize mood swings during the quitting process.",
    detail: "From guided journaling to cognitive reframing exercises, our tools help you navigate the emotional rollercoaster of nicotine withdrawal."
  },
  {
    icon: <Brain className="h-12 w-12 text-fresh-500" />,
    title: "Focus Enhancement",
    description: "Effective strategies to improve mental clarity and concentration during nicotine reduction.",
    detail: "Access focus meditation, brain training exercises, and productivity techniques that help restore cognitive function affected by nicotine withdrawal."
  }
];

const analyticsFeatures: Feature[] = [
  {
    icon: <DollarSign className="h-12 w-12 text-teal-500" />,
    title: "Financial Impact Analysis",
    description: "Visualize money saved by reducing nicotine use and see projections for future savings.",
    detail: "Our calculator shows both cumulative savings and what that money could buy instead - a powerful motivator for many users."
  },
  {
    icon: <TrendingDown className="h-12 w-12 text-teal-500" />,
    title: "Usage Pattern Detection",
    description: "Identify your trigger times, situations, and emotional states to develop better coping strategies.",
    detail: "Advanced analytics help you understand when and why you reach for nicotine, allowing for more targeted interventions."
  },
  {
    icon: <HeartPulse className="h-12 w-12 text-teal-500" />,
    title: "Health Improvement Timeline",
    description: "Track physiological improvements as your body recovers from nicotine dependence.",
    detail: "Based on medical research, our timeline shows you the health benefits you're achieving at each stage of your journey."
  },
  {
    icon: <ChartBar className="h-12 w-12 text-teal-500" />,
    title: "Correlation Analysis",
    description: "Understand how your nicotine use relates to sleep, mood, energy, and focus.",
    detail: "Our analytics engine finds connections between your nicotine use and well-being metrics, providing insights that support your journey."
  }
];

const communityFeatures: Feature[] = [
  {
    icon: <Users className="h-12 w-12 text-indigo-500" />,
    title: "Community Support",
    description: "Connect with others on similar journeys through our moderated community spaces.",
    detail: "Share experiences, ask questions, and receive encouragement from people who understand exactly what you're going through."
  },
  {
    icon: <Medal className="h-12 w-12 text-indigo-500" />,
    title: "Achievement Recognition",
    description: "Earn badges and celebrate milestones with a community that understands their significance.",
    detail: "Whether it's your first day without nicotine or your 1000th, our achievement system recognizes and celebrates your progress."
  }
];

const featureCategories: FeatureCategory[] = [
  {
    id: "core",
    title: "Core Features",
    description: "The essential tools that form the foundation of your Mission Fresh journey",
    features: coreFeatures
  },
  {
    id: "support",
    title: "Support Tools",
    description: "Specialized resources targeting the four key challenges of nicotine reduction",
    features: supportFeatures
  },
  {
    id: "analytics",
    title: "Analytics & Insights",
    description: "Data-driven tools to help you understand and improve your journey",
    features: analyticsFeatures
  },
  {
    id: "community",
    title: "Community & Achievements",
    description: "Connect with others and celebrate your progress",
    features: communityFeatures
  }
];

const FeaturesPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-fresh-50 to-background">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">A Fresh World is Mission Possible</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Mission Fresh transcends the typical "quit smoking" app by addressing the root causes that make quitting or reducing nicotine so challenging.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/sign-up">
                  <Button size="lg" className="bg-fresh-300 hover:bg-fresh-400 text-white">
                    Start Your Fresh Journey
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button size="lg" variant="outline">
                    See How It Works
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Categories Tabs */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-3xl font-bold mb-4">Comprehensive Features</h2>
              <p className="text-lg text-muted-foreground">
                Explore our full suite of tools designed to support every aspect of your nicotine reduction journey
              </p>
            </div>
            
            <Tabs defaultValue="core" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
                {featureCategories.map((category) => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="py-3"
                  >
                    {category.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {featureCategories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.features.map((feature, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="mb-4">{feature.icon}</div>
                          <CardTitle className="text-xl">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="font-medium">{feature.description}</p>
                          {feature.detail && (
                            <p className="text-sm text-muted-foreground">{feature.detail}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Unique Approach Section */}
        <section className="py-20 bg-fresh-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Unique Approach</h2>
                <p className="text-lg text-muted-foreground">
                  Why Mission Fresh succeeds where other methods often fail
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">The Four Pillars</h3>
                    <p className="mb-6">
                      Mission Fresh is built on addressing the four key challenges that most nicotine users face:
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <Gauge className="h-6 w-6 text-fresh-500 flex-shrink-0 mt-1" />
                        <div>
                          <span className="font-semibold">Energy Drain</span>
                          <p className="text-sm text-muted-foreground">Nicotine withdrawal often causes fatigue, making it harder to stay motivated.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Sparkles className="h-6 w-6 text-fresh-500 flex-shrink-0 mt-1" />
                        <div>
                          <span className="font-semibold">Mood Swings</span>
                          <p className="text-sm text-muted-foreground">Emotional regulation becomes difficult, leading many to return to nicotine for relief.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Brain className="h-6 w-6 text-fresh-500 flex-shrink-0 mt-1" />
                        <div>
                          <span className="font-semibold">Focus Loss</span>
                          <p className="text-sm text-muted-foreground">Brain fog and concentration issues affect work and daily tasks.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Flame className="h-6 w-6 text-fresh-500 flex-shrink-0 mt-1" />
                        <div>
                          <span className="font-semibold">Persistent Cravings</span>
                          <p className="text-sm text-muted-foreground">Both physical and psychological cravings require different management techniques.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Holistic Support</h3>
                    <p className="mb-6">
                      Instead of focusing solely on nicotine reduction, we address the whole person:
                    </p>
                    
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <Coffee className="h-6 w-6 text-teal-500 flex-shrink-0 mt-1" />
                        <div>
                          <span className="font-semibold">Energy Management</span>
                          <p className="text-sm text-muted-foreground">Specific tools to counteract fatigue and maintain natural energy levels.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <HeartPulse className="h-6 w-6 text-teal-500 flex-shrink-0 mt-1" />
                        <div>
                          <span className="font-semibold">Emotional Wellbeing</span>
                          <p className="text-sm text-muted-foreground">Support for navigating the emotional challenges of changing ingrained habits.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Brain className="h-6 w-6 text-teal-500 flex-shrink-0 mt-1" />
                        <div>
                          <span className="font-semibold">Cognitive Function</span>
                          <p className="text-sm text-muted-foreground">Tools to restore and enhance mental clarity during the transition.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <ListChecks className="h-6 w-6 text-teal-500 flex-shrink-0 mt-1" />
                        <div>
                          <span className="font-semibold">Behavioral Replacement</span>
                          <p className="text-sm text-muted-foreground">Strategies to replace nicotine use with healthier alternatives.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials placeholder */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Fresh Success Stories</h2>
              <p className="text-lg text-muted-foreground">
                Hear from people who have transformed their relationship with nicotine using Mission Fresh
              </p>
            </div>
            
            {/* Testimonial cards would go here */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((_, i) => (
                <Card key={i} className="bg-fresh-50">
                  <CardContent className="pt-6">
                    <p className="italic mb-4">
                      "This placeholder represents where user testimonials would appear, sharing their success stories and experiences with the Mission Fresh platform."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-fresh-200"></div>
                      <div>
                        <p className="font-medium">Future User</p>
                        <p className="text-sm text-muted-foreground">Success Story</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary/10">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 tracking-tight">Ready to Experience These Features?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Start your journey today with the most comprehensive nicotine reduction support system available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/sign-up">
                  <Button size="lg" className="bg-fresh-300 hover:bg-fresh-400 text-white">
                    Start Your Fresh Journey
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button size="lg" variant="outline">
                    Learn How It Works
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
