
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Calculator, Book, Droplets, BatteryCharging, Brain as BrainIcon, Sparkles, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

const webTools = [
  {
    icon: <ClipboardList className="h-8 w-8 text-mint-500" />,
    title: "NRT Guide",
    description: "Comprehensive information about nicotine replacement therapy options including patches, gums, lozenges, inhalers, and sprays.",
    link: "/tools/nrt-guide",
  },
  {
    icon: <Droplets className="h-8 w-8 text-mint-500" />,
    title: "Smokeless Directory",
    description: "Detailed directory of smokeless nicotine products with filtering, reviews, and expert notes on each option.",
    link: "/tools/smokeless-directory",
  },
  {
    icon: <Book className="h-8 w-8 text-mint-500" />,
    title: "Quitting Methods",
    description: "Detailed guides on different approaches to quitting, from cold turkey to gradual reduction and harm reduction.",
    link: "/tools/quit-methods",
  },
  {
    icon: <Calculator className="h-8 w-8 text-mint-500" />,
    title: "Interactive Calculators",
    description: "Calculate potential savings from quitting and view a health improvement timeline based on your quit date.",
    link: "/tools/calculators",
  },
];

const holisticTools = [
  {
    icon: <BatteryCharging className="h-8 w-8 text-mint-500" />,
    title: "Energy Management",
    description: "Practical tips and techniques for managing energy slumps and combating fatigue during withdrawal.",
    link: "/tools/holistic-health#energy",
  },
  {
    icon: <Sparkles className="h-8 w-8 text-mint-500" />,
    title: "Mood Regulation",
    description: "Strategies for stabilizing and improving mood swings often experienced during the quitting process.",
    link: "/tools/holistic-health#mood",
  },
  {
    icon: <BrainIcon className="h-8 w-8 text-mint-500" />,
    title: "Focus Enhancement",
    description: "Techniques to improve concentration and mental clarity during nicotine reduction or abstinence.",
    link: "/tools/holistic-health#focus",
  },
  {
    icon: <Flame className="h-8 w-8 text-mint-500" />,
    title: "Craving Management",
    description: "Effective strategies to handle cravings and urges without using nicotine products.",
    link: "/tools/holistic-health#cravings",
  },
];

const WebToolsIndex = () => {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Free Web Tools</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mission Fresh provides these valuable resources to everyone, no account needed. 
            Our goal is to support your journey whether you're quitting, reducing, or just exploring options.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Product & Method Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {webTools.map((tool, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow hover-scale">
                <CardHeader className="pb-3">
                  <div className="flex justify-center mb-3">
                    <div className="rounded-full bg-mint-100 p-3">
                      {tool.icon}
                    </div>
                  </div>
                  <CardTitle className="text-center">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-center">{tool.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Link to={tool.link} className="w-full">
                    <Button variant="outline" className="w-full hover:bg-mint-50 hover:text-mint-700">
                      Access Tool
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Holistic Health Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {holisticTools.map((tool, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow hover-scale">
                <CardHeader className="pb-3">
                  <div className="flex justify-center mb-3">
                    <div className="rounded-full bg-mint-100 p-3">
                      {tool.icon}
                    </div>
                  </div>
                  <CardTitle className="text-center">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-center">{tool.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Link to={tool.link} className="w-full">
                    <Button variant="outline" className="w-full hover:bg-mint-50 hover:text-mint-700">
                      Access Guide
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg mb-6">Ready to start optimizing your energy and focus?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/sign-up">
              <Button className="btn-mint">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebToolsIndex;
