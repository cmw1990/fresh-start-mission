
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Box, Compass, Calculator, SunMoon, Tablet, ArrowRight } from 'lucide-react';

const WebToolsIndex = () => {
  return (
    <div className="container py-12 px-4 mx-auto max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Free Resources for Your Fresh Journey</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore our collection of valuable tools to help you understand your options
          and make informed decisions on your path to a fresh start.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ToolCard 
          title="NRT Guide" 
          description="Comprehensive information about nicotine replacement therapy options with expert recommendations."
          icon={<Tablet className="h-8 w-8" />}
          link="/tools/nrt-guide"
          bgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        
        <ToolCard 
          title="Smokeless Directory" 
          description="Browse and compare smokeless nicotine alternatives with expert analysis and user reviews."
          icon={<Box className="h-8 w-8" />}
          link="/tools/smokeless-directory"
          bgColor="bg-green-50"
          iconColor="text-green-600"
        />
        
        <ToolCard 
          title="Quit Methods" 
          description="Learn about different approaches to quitting or reducing nicotine use with pros and cons of each."
          icon={<Compass className="h-8 w-8" />}
          link="/tools/quit-methods"
          bgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
        
        <ToolCard 
          title="Calculators" 
          description="Estimate your savings and health improvements when you reduce or quit using nicotine products."
          icon={<Calculator className="h-8 w-8" />}
          link="/tools/calculators"
          bgColor="bg-amber-50"
          iconColor="text-amber-600"
        />
        
        <ToolCard 
          title="Holistic Health" 
          description="Resources for managing energy, mood, focus and overall wellbeing during your fresh journey."
          icon={<SunMoon className="h-8 w-8" />}
          link="/tools/holistic-health"
          bgColor="bg-rose-50"
          iconColor="text-rose-600"
        />
      </div>
      
      <div className="mt-16 bg-gradient-to-br from-fresh-50 to-fresh-100 p-8 rounded-xl shadow-sm">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Want More Personalized Support?</h2>
          <p className="text-lg mb-6">
            The Mission Fresh app offers personalized tracking, holistic support tools,
            step rewards, and a community of people on the same journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-fresh-500 hover:bg-fresh-600 text-white">
              <Link to="/sign-up">Create Free Account</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  bgColor: string;
  iconColor: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, description, icon, link, bgColor, iconColor }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md border-t-4 border-t-fresh-500 hover:border-t-fresh-600">
      <CardHeader className="pb-2">
        <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center ${iconColor} mb-4`}>
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-2">
        <Button asChild variant="ghost" className="text-fresh-600 hover:text-fresh-700 hover:bg-fresh-50 p-0 group">
          <Link to={link} className="flex items-center">
            Explore Tool
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WebToolsIndex;
