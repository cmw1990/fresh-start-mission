import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Target, 
  Leaf, 
  Battery, 
  Award, 
  BookOpen, 
  Clock, 
  Rocket, 
  ListChecks, 
  HeartHandshake,
  UserPlus,
  LineChart,
  AreaChart,
  Wrench,
  Gift
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const stepsData = [
  {
    icon: <UserPlus className="h-12 w-12 text-fresh-300" />,
    number: "1",
    title: "Sign Up & Define Your Journey",
    description: "Create an account and tell us about your nicotine habits. Choose between 'Staying Afresh' (quitting) or 'Staying Fresher' (reducing) and select the method that works best for you: cold turkey, gradual reduction, NRT, or harm reduction.",
    detail: "Our guided setup process helps you create a personalized plan based on scientific research about what works for different types of nicotine users."
  },
  {
    icon: <LineChart className="h-12 w-12 text-fresh-300" />,
    number: "2",
    title: "Track Your Daily Journey",
    description: "Log your nicotine use, cravings, and holistic metrics like mood, energy levels, and mental focus to build a complete picture of your health journey.",
    detail: "Research shows that tracking creates accountability and helps identify patterns that can be addressed with targeted interventions."
  },
  {
    icon: <AreaChart className="h-12 w-12 text-fresh-300" />,
    number: "3",
    title: "Visualize Your Progress",
    description: "Watch your journey unfold through intuitive charts and dashboards showing your nicotine reduction, money saved, and improvements in your overall wellbeing.",
    detail: "Seeing your progress visually reinforces positive behavior change and helps maintain motivation during challenging periods."
  },
  {
    icon: <Wrench className="h-12 w-12 text-fresh-300" />,
    number: "4",
    title: "Access Support When Needed",
    description: "Use our specialized tools designed specifically for managing cravings, boosting energy, improving focus, and regulating mood – the four biggest challenges in nicotine reduction.",
    detail: "Our tools are based on cognitive behavioral therapy, mindfulness, and other evidence-based approaches to behavior change."
  },
  {
    icon: <Gift className="h-12 w-12 text-fresh-300" />,
    number: "5",
    title: "Earn Rewards Along the Way",
    description: "Stay motivated with our unique step-based reward system that turns physical activity into tangible benefits for your fresh journey.",
    detail: "Physical activity has been shown to reduce cravings and improve mood during nicotine withdrawal. Our reward system incentivizes this healthy behavior."
  },
];

const featuresData = [
  {
    icon: <Target className="h-10 w-10 text-fresh-300" />,
    title: "Personalized Goals",
    description: "Set goals tailored to your specific needs, whether quitting entirely or reducing usage.",
  },
  {
    icon: <Leaf className="h-10 w-10 text-fresh-300" />,
    title: "Holistic Tracking",
    description: "Monitor not just nicotine use but energy, mood, focus, and sleep quality.",
  },
  {
    icon: <Battery className="h-10 w-10 text-fresh-300" />,
    title: "Multi-Faceted Support",
    description: "Access specialized tools addressing the major challenges of nicotine reduction.",
  },
  {
    icon: <Award className="h-10 w-10 text-fresh-300" />,
    title: "Movement Rewards",
    description: "Convert your physical activity into rewards that support your journey.",
  },
  {
    icon: <BookOpen className="h-10 w-10 text-fresh-300" />,
    title: "Educational Resources",
    description: "Learn about different quitting methods and nicotine alternatives.",
  },
  {
    icon: <Clock className="h-10 w-10 text-fresh-300" />,
    title: "Flexible Timeline",
    description: "Progress at your own pace with customizable reduction schedules.",
  },
  {
    icon: <Rocket className="h-10 w-10 text-fresh-300" />,
    title: "Milestone Celebrations",
    description: "Recognize and celebrate your achievements to maintain motivation.",
  },
  {
    icon: <ListChecks className="h-10 w-10 text-fresh-300" />,
    title: "Customizable Experience",
    description: "Arrange your dashboard to focus on what matters most to you.",
  },
];

const keyDifferentiators = [
  {
    title: "Beyond Willpower",
    description: "Mission Fresh recognizes that willpower alone is often insufficient. We address the physiological and psychological impacts of nicotine reduction that make sustainable change difficult.",
  },
  {
    title: "Judgment-Free Approach",
    description: "We support multiple paths to success, whether completely quitting or simply reducing, using traditional or alternative methods. Your journey is personal, and we respect that.",
  },
  {
    title: "Holistic Wellness Focus",
    description: "By tracking and supporting energy, mood, focus, and cravings, we address the whole person, not just the nicotine habit itself.",
  },
  {
    title: "Scientific Foundation",
    description: "Our approach is built on behavioral science, cognitive psychology, and addiction research to maximize your chances of success.",
  },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-fresh-50 to-background">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">How Mission Fresh Works</h1>
              <p className="text-xl text-muted-foreground">
                Our science-backed approach supports your journey to a nicotine-free life
                or reduced nicotine use with personalized tools and guidance.
              </p>
            </div>
          </div>
        </section>
        
        {/* The Process Section */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Your Fresh Journey</h2>
              <p className="text-lg text-muted-foreground">
                A step-by-step approach designed to maximize your chances of success
              </p>
            </div>
            
            <div className="space-y-12 mb-16">
              {stepsData.map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/3">
                    <div className="bg-fresh-50 h-64 rounded-xl flex flex-col items-center justify-center p-6">
                      {step.icon}
                      <span className="text-6xl font-bold text-fresh-500 mt-4">{step.number}</span>
                      <h3 className="text-xl font-semibold mt-2 text-center">{step.title}</h3>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-bold mb-4 md:hidden">{step.title}</h3>
                    <p className="text-lg text-muted-foreground mb-4">
                      {step.description}
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Features Grid */}
        <section className="py-20 bg-fresh-50">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Key Features</h2>
              <p className="text-lg text-muted-foreground">
                Tools and capabilities designed to support every aspect of your journey
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuresData.map((feature, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="mb-2">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* What Makes Us Different */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">The Mission Fresh Difference</h2>
              <p className="text-lg text-muted-foreground">
                What sets our approach apart from traditional nicotine reduction methods
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {keyDifferentiators.map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-xl border border-border">
                  <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 bg-fresh-100 rounded-xl p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold mb-4">Our Philosophy</h3>
                  <p className="text-lg mb-4">
                    At Mission Fresh, we believe that achieving a nicotine-free life ("Staying Afresh") 
                    or reducing intake ("Staying Fresher") requires addressing the real physiological 
                    and psychological challenges that make traditional approaches difficult.
                  </p>
                  <p className="text-lg">
                    By focusing on energy, mood, focus, and cravings – the four horsemen of nicotine 
                    withdrawal – we provide targeted support when and where you need it most.
                  </p>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <HeartHandshake className="h-32 w-32 text-fresh-300" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary/10">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Ready to Start Your Fresh Journey?</h2>
              <p className="text-lg mb-8">
                Join thousands of others who are discovering a fresher way to live.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/sign-up">
                  <Button size="lg" className="bg-fresh-300 hover:bg-fresh-400 text-white px-8">
                    Get Started Now
                  </Button>
                </Link>
                <Link to="/features">
                  <Button size="lg" variant="outline" className="px-8">
                    Explore Features
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

export default HowItWorks;
