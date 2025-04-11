
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
    icon: <Leaf className="h-10 w-10 text-teal-500" />,
    title: "Track Your Progress",
    description: "Monitor your nicotine use, cravings, and holistic metrics like mood, energy, and focus.",
  },
  {
    icon: <Battery className="h-10 w-10 text-fresh-300" />,
    title: "Get Support",
    description: "Access specialized tools for managing cravings, boosting energy, improving focus, and lifting mood.",
  },
  {
    icon: <Award className="h-10 w-10 text-teal-500" />,
    title: "Earn Rewards",
    description: "Stay motivated with our step-based rewards system that provides incentives along your journey.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white" id="how-it-works">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">
            Mission Fresh provides a simple but powerful approach to help you achieve your goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-background p-6 rounded-xl border border-border hover:shadow-md transition-shadow"
            >
              <div className="mb-5 inline-flex items-center justify-center rounded-lg bg-fresh-50 p-2">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/sign-up">
            <Button className="bg-fresh-300 hover:bg-fresh-400 text-white">Get Started</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
