
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Calculator, Book, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";

const tools = [
  {
    icon: <ClipboardList className="h-8 w-8 text-fresh-300" />,
    title: "NRT Guide",
    description: "Comprehensive information about nicotine replacement therapy options including patches, gums, lozenges, inhalers, and sprays.",
    link: "/tools/nrt-guide",
  },
  {
    icon: <Droplets className="h-8 w-8 text-fresh-300" />,
    title: "Smokeless Directory",
    description: "Detailed directory of smokeless nicotine products with filtering, reviews, and expert notes on each option.",
    link: "/tools/smokeless-directory",
  },
  {
    icon: <Book className="h-8 w-8 text-fresh-300" />,
    title: "Quitting Methods",
    description: "Detailed guides on different approaches to quitting, from cold turkey to gradual reduction and harm reduction.",
    link: "/tools/quit-methods",
  },
  {
    icon: <Calculator className="h-8 w-8 text-fresh-300" />,
    title: "Interactive Calculators",
    description: "Calculate potential savings from quitting and view a health improvement timeline based on your quit date.",
    link: "/tools/calculators",
  },
];

const WebTools = () => {
  return (
    <section className="py-20 bg-white" id="web-tools">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Free Web Tools</h2>
          <p className="text-lg text-muted-foreground">
            Valuable resources available to everyone, no account needed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <Card key={index} className="hover-scale">
              <CardHeader>
                <div className="mb-2">{tool.icon}</div>
                <CardTitle>{tool.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{tool.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Link to={tool.link} className="w-full">
                  <Button variant="outline" className="w-full">
                    Access Tool
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/tools" className="inline-block">
            <Button className="bg-fresh-300 hover:bg-fresh-400 text-white">
              Explore All Web Tools
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WebTools;
