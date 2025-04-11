
import { 
  ActivitySquare, 
  BatteryCharging, 
  Brain as BrainIcon, 
  Cigarette, 
  Flame, 
  LineChart, 
  ListChecks, 
  Footprints,
  Sparkles
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: <BatteryCharging className="h-10 w-10 text-fresh-300" />,
    title: "Energy Support",
    description: "Tools to combat fatigue and boost energy levels during nicotine reduction or abstinence.",
  },
  {
    icon: <Sparkles className="h-10 w-10 text-teal-500" />,
    title: "Mood Lifters",
    description: "Exercises and techniques to stabilize mood swings and enhance overall emotional wellbeing.",
  },
  {
    icon: <BrainIcon className="h-10 w-10 text-fresh-300" />,
    title: "Focus Enhancers",
    description: "Strategies to improve concentration and mental clarity during withdrawal periods.",
  },
  {
    icon: <Flame className="h-10 w-10 text-teal-500" />,
    title: "Craving Management",
    description: "Immediate tools and techniques to cope with and overcome nicotine cravings.",
  },
  {
    icon: <ListChecks className="h-10 w-10 text-fresh-300" />,
    title: "Flexible Goals",
    description: "Support for multiple approaches: cold turkey, gradual reduction, NRT, or harm reduction.",
  },
  {
    icon: <Cigarette className="h-10 w-10 text-teal-500" />,
    title: "All Products Tracking",
    description: "Track use of any nicotine product: cigarettes, vapes, pouches, gums, and more.",
  },
  {
    icon: <LineChart className="h-10 w-10 text-fresh-300" />,
    title: "Progress Visualization",
    description: "Clear, intuitive charts that show your progress and identify patterns.",
  },
  {
    icon: <Footprints className="h-10 w-10 text-teal-500" />,
    title: "Step Rewards",
    description: "Stay active and earn rewards based on your daily steps and progress.",
  },
  {
    icon: <ActivitySquare className="h-10 w-10 text-fresh-300" />,
    title: "Holistic Tracking",
    description: "Monitor all aspects of wellbeing: sleep, energy, mood, and focus alongside nicotine use.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-background" id="features">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
          <p className="text-lg text-muted-foreground">
            Mission Fresh provides comprehensive support for your entire journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow border-border hover-scale">
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
  );
};

export default Features;
