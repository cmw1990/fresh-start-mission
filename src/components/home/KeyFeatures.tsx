
import React from "react";
import { Link } from "react-router-dom";
import { Heart, Activity, Target, Box, Footprints } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: <Heart className="h-8 w-8 text-fresh-600" />,
    title: "Holistic Support",
    description: "Tools for energy, mood, focus, and craving management - addressing the real challenges of quitting.",
    link: "/sign-up",
    color: "bg-fresh-50"
  },
  {
    icon: <Activity className="h-8 w-8 text-blue-600" />,
    title: "Comprehensive Tracking",
    description: "Track any nicotine product with detailed metrics on physical and mental wellbeing.",
    link: "/sign-up",
    color: "bg-blue-50"
  },
  {
    icon: <Target className="h-8 w-8 text-purple-600" />,
    title: "Flexible Goals",
    description: "Stay Afresh (quit) or Fresher (reduce) - your path, your choice. All methods supported.",
    link: "/sign-up",
    color: "bg-purple-50"
  },
  {
    icon: <Box className="h-8 w-8 text-green-600" />,
    title: "Smokeless Directory",
    description: "Comprehensive guide to alternatives with expert health notes and verified vendor listings.",
    link: "/tools/smokeless-directory",
    color: "bg-green-50"
  },
  {
    icon: <Footprints className="h-8 w-8 text-amber-600" />,
    title: "Step Rewards",
    description: "Turn your daily steps into rewards while improving your physical health and reducing cravings.",
    link: "/sign-up",
    color: "bg-amber-50"
  },
];

const KeyFeatures = () => {
  return (
    <section className="py-24 bg-white" id="features">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
          <p className="text-lg text-muted-foreground">
            Mission Fresh offers a unique approach to nicotine reduction and quitting
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="rounded-lg border border-gray-100 overflow-hidden transition hover:shadow-md"
            >
              <div className="p-6">
                <div className={`w-14 h-14 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <Link to={feature.link}>
                  <Button variant="link" className="p-0 h-auto">
                    Learn more
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button asChild size="lg" className="bg-fresh-300 hover:bg-fresh-400 text-white">
            <Link to="/sign-up">Start Your Fresh Journey</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
