
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Activity, Heart, Zap, Target } from "lucide-react";

const features = [
  {
    icon: <Activity className="h-12 w-12 text-fresh-400" />,
    title: "Energy Support",
    description:
      "Combat the energy slumps that often come with reducing nicotine. Our tools and techniques help you maintain vitality throughout your journey."
  },
  {
    icon: <Heart className="h-12 w-12 text-fresh-400" />,
    title: "Mood Enhancement",
    description:
      "Stabilize your emotions and find balance with specialized exercises designed to counter the mood swings associated with nicotine reduction."
  },
  {
    icon: <Brain className="h-12 w-12 text-fresh-400" />,
    title: "Focus Improvement",
    description:
      "Maintain mental clarity and concentration with targeted techniques that help overcome the brain fog that can accompany nicotine withdrawal."
  },
  {
    icon: <Zap className="h-12 w-12 text-fresh-400" />,
    title: "Craving Management",
    description:
      "Powerful tools to help you navigate through cravings effectively, breaking the cycle of dependency with evidence-based approaches."
  },
  {
    icon: <Target className="h-12 w-12 text-fresh-400" />,
    title: "Flexible Goals",
    description:
      "Whether you want to quit completely or just reduce usage, we support all paths with personalized tracking and non-judgmental guidance."
  }
];

const KeyFeatures = () => {
  return (
    <section className="py-20 bg-white" id="features">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Features Designed For Real Success</h2>
          <p className="text-lg text-muted-foreground">
            We address the true challenges of nicotine reduction - not just willpower, but the physical and mental impacts
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-gray-600">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
