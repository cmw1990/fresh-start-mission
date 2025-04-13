
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, ThumbsUp, ThumbsDown, ArrowLeft } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MethodProps {
  title: string;
  description: string;
  bestFor: string[];
  considerations: string[];
  successRate: string;
  timeframe: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Very Hard';
}

const Method: React.FC<MethodProps> = ({
  title,
  description,
  bestFor,
  considerations,
  successRate,
  timeframe,
  difficulty
}) => {
  // Determine color based on difficulty
  const difficultyColor = {
    'Easy': 'text-green-600',
    'Moderate': 'text-yellow-600',
    'Hard': 'text-orange-600',
    'Very Hard': 'text-red-600'
  }[difficulty];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <ThumbsUp className="mr-2 h-4 w-4 text-green-600" />
              Best For
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              {bestFor.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <ThumbsDown className="mr-2 h-4 w-4 text-amber-600" />
              Considerations
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              {considerations.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6 bg-gray-50 p-4 rounded-lg">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Success Rate</h4>
            <p className="font-medium">{successRate}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Timeframe</h4>
            <p className="font-medium">{timeframe}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Difficulty</h4>
            <p className={`font-medium ${difficultyColor}`}>{difficulty}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const QuitMethods = () => {
  return (
    <div className="container py-12 px-4 mx-auto max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Quit & Reduction Methods</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Every journey is different. Find the approach that works best for you.
        </p>
      </div>

      <div className="bg-gradient-to-r from-fresh-50 to-blue-50 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Finding Your Path</h2>
        <p className="mb-4">
          There's no single "right way" to quit or reduce nicotine use. What works for one person may not work for another.
          Many people try several methods before finding success. Some combine multiple approaches.
        </p>
        <p>
          At Mission Fresh, we support <span className="font-medium">all paths</span> to reducing nicotine dependency,
          whether you choose to quit completely ("Stay Afresh") or reduce your usage ("Stay Fresher").
        </p>
      </div>

      <Method
        title="Cold Turkey"
        description="Stopping all nicotine use abruptly with no medication or replacement therapy."
        bestFor={[
          "People with strong determination and support systems",
          "Those who prefer a clean break approach",
          "Individuals who've had success with this method before",
          "Those who've had a significant health scare related to nicotine use"
        ]}
        considerations={[
          "Typically causes the most intense withdrawal symptoms",
          "Higher risk of early relapse due to discomfort",
          "May be challenging for heavy/long-term users",
          "Requires exceptional mental preparation"
        ]}
        successRate="~5% long-term success without additional support"
        timeframe="Withdrawal peaks within 3-5 days, significant improvement by 2-4 weeks"
        difficulty="Very Hard"
      />
      
      <Method
        title="Gradual Reduction"
        description="Systematically decreasing nicotine use over time until reaching zero or a manageable level."
        bestFor={[
          "People who feel overwhelmed by the idea of quitting abruptly",
          "Those who want to minimize withdrawal symptoms",
          "Individuals who benefit from tracking progress with measurable goals",
          "People who've tried cold turkey unsuccessfully"
        ]}
        considerations={[
          "Takes discipline to stick to a reduction plan",
          "Withdrawal symptoms last longer but are less intense",
          "May prolong the quitting process",
          "Risk of stalling at a reduced level indefinitely"
        ]}
        successRate="~10-15% with structured approach"
        timeframe="Typically 4-12 weeks depending on starting point and goals"
        difficulty="Moderate"
      />
      
      <Method
        title="Nicotine Replacement Therapy (NRT)"
        description="Using FDA-approved products that deliver controlled amounts of nicotine without harmful chemicals."
        bestFor={[
          "Moderate to heavy users who want to address physical dependency",
          "Those who want to separate the behavioral habits from the chemical dependency",
          "People who experienced severe withdrawal symptoms in previous quit attempts",
          "Those with a methodical approach to quitting"
        ]}
        considerations={[
          "Requires following proper usage instructions",
          "Success often depends on correct dosing and duration",
          "Some products have specific techniques for effective use",
          "Doesn't address psychological aspects of addiction"
        ]}
        successRate="~15-20% when used as directed"
        timeframe="Typically 8-12 weeks, starting with higher doses and tapering down"
        difficulty="Moderate"
      />
      
      <Method
        title="Harm Reduction"
        description="Switching to less harmful nicotine delivery systems while maintaining nicotine use."
        bestFor={[
          "People not ready or willing to eliminate nicotine completely",
          "Those primarily concerned about specific harms of their current products",
          "Individuals who have tried quitting multiple times without success",
          "People using the highest-risk nicotine products (combustible tobacco)"
        ]}
        considerations={[
          "Not all alternatives are equally safer - research is key",
          "Maintaining nicotine addiction but potentially reducing health risks",
          "Long-term effects of some newer products aren't fully understood",
          "May be a stepping stone to eventually quitting completely"
        ]}
        successRate="Varies widely based on products chosen and individual goals"
        timeframe="Ongoing management rather than a finite process"
        difficulty="Easy to Moderate"
      />
      
      <div className="mt-10 mb-16 p-6 bg-purple-50 border border-purple-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Combining Methods for Better Results</h3>
        <p className="mb-4">
          Research suggests that combining approaches often yields the best results. For example:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Using NRT products while gradually reducing overall nicotine intake</li>
          <li>Combining a long-acting NRT (patch) with a short-acting option (gum, lozenge) for breakthrough cravings</li>
          <li>Implementing behavioral strategies alongside medication approaches</li>
          <li>Starting with harm reduction, then transitioning to a complete cessation plan</li>
        </ul>
        <p className="mt-4 font-medium">
          The Mission Fresh app supports all these approaches and their combinations, allowing you to customize your journey.
        </p>
      </div>
      
      <div className="flex justify-between">
        <Link to="/tools">
          <Button variant="outline" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </Link>
        <Link to="/tools/nrt-guide">
          <Button variant="default" className="bg-fresh-500 hover:bg-fresh-600">
            Explore NRT Guide
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default QuitMethods;
