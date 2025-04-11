
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Leaf, Battery, Target, Award } from "lucide-react";

const features = [
  {
    icon: <Target className="h-10 w-10 text-fresh-300" />,
    title: "Set Your Goal",
    description: "Whether you want to stay afresh (quit) or stay fresher (reduce), we support your unique journey.",
  },
  {
    icon: <Leaf className="h-10 w-10 text-fresh-300" />,
    title: "Track Your Progress",
    description: "Monitor your nicotine use, cravings, and holistic metrics like mood, energy, and focus.",
  },
  {
    icon: <Battery className="h-10 w-10 text-fresh-300" />,
    title: "Get Support",
    description: "Access specialized tools for managing cravings, boosting energy, improving focus, and lifting mood.",
  },
  {
    icon: <Award className="h-10 w-10 text-fresh-300" />,
    title: "Earn Rewards",
    description: "Stay motivated with our step-based rewards system that provides incentives along your journey.",
  },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-1">
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">How Mission Fresh Works</h1>
              <p className="text-xl text-muted-foreground">
                Our holistic approach supports your journey to a nicotine-free life
                or reduced nicotine use with personalized tools and guidance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-background p-8 rounded-xl border border-border hover:shadow-md transition-shadow"
                >
                  <div className="mb-5 inline-flex items-center justify-center rounded-lg bg-fresh-50 p-3">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground text-lg">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-fresh-50 rounded-xl p-8 mb-16">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Philosophy</h2>
                <p className="text-lg mb-4">
                  At Mission Fresh, we believe that achieving a nicotine-free life ("Staying Afresh") 
                  or reducing intake ("Staying Fresher") is intrinsically linked to holistic well-being.
                </p>
                <p className="text-lg mb-4">
                  We recognize the real barriers are often not willpower alone, but the physiological and 
                  psychological impacts: energy drain, focus loss, mood swings, and persistent cravings.
                </p>
                <p className="text-lg">
                  That's why our platform provides targeted, world-class support for these challenges 
                  alongside robust tracking and goal management, all within a supportive, non-judgmental framework.
                </p>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Your Journey With Mission Fresh</h2>
              
              <div className="space-y-12 mb-16">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/2">
                    <div className="bg-fresh-50 h-64 rounded-xl flex items-center justify-center">
                      <span className="text-6xl font-bold text-fresh-500">1</span>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-bold mb-4">Sign Up & Set Your Goals</h3>
                    <p className="text-lg text-muted-foreground mb-4">
                      Create an account and define what success looks like for you. Choose between 
                      "Staying Afresh" (quitting) or "Staying Fresher" (reducing), select your method, 
                      and set your timeline.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                  <div className="md:w-1/2">
                    <div className="bg-fresh-50 h-64 rounded-xl flex items-center justify-center">
                      <span className="text-6xl font-bold text-fresh-500">2</span>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-bold mb-4">Track Your Progress</h3>
                    <p className="text-lg text-muted-foreground mb-4">
                      Log your nicotine use, cravings, mood, energy levels, and focus daily. 
                      Our intuitive dashboard and detailed charts help you visualize your progress 
                      and identify patterns.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/2">
                    <div className="bg-fresh-50 h-64 rounded-xl flex items-center justify-center">
                      <span className="text-6xl font-bold text-fresh-500">3</span>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-bold mb-4">Access Support Tools</h3>
                    <p className="text-lg text-muted-foreground mb-4">
                      Whenever you need help, our specialized tools for cravings, energy, mood, 
                      and focus are just a click away. From guided breathing exercises to journaling 
                      prompts, we've got you covered.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                  <div className="md:w-1/2">
                    <div className="bg-fresh-50 h-64 rounded-xl flex items-center justify-center">
                      <span className="text-6xl font-bold text-fresh-500">4</span>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-bold mb-4">Earn Rewards</h3>
                    <p className="text-lg text-muted-foreground mb-4">
                      Stay motivated with our step-based rewards system. The more active you are,
                      the more points you earn towards discounts and other perks to help you on your journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Start Your Fresh Journey?</h2>
              <Link to="/sign-up">
                <Button size="lg" className="bg-fresh-300 hover:bg-fresh-400 text-white text-lg px-8 py-6">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default HowItWorks;
