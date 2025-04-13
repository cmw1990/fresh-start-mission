
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, TrendingUp } from 'lucide-react';

const AiInsights: React.FC = () => {
  // In a real implementation, these insights would come from a backend AI processing of the user's data
  // For now, we'll use static examples
  const insights = [
    {
      title: "Stress Connection",
      description: "Your cravings tend to spike during high-stress periods, especially weekday afternoons.",
      actionable: "Try scheduling a 3-minute breathing exercise around 2:30 PM when stress typically peaks."
    },
    {
      title: "Sleep Quality Impact",
      description: "On days when you report poor sleep quality, your cravings are 40% more intense.",
      actionable: "Consider practicing the sleep-focused relaxation exercise in the evenings."
    },
    {
      title: "Progress Trend",
      description: "Your overall craving intensity has decreased by 15% in the past week.",
      actionable: "You're making great progress! Keep using the coping techniques that are working for you."
    }
  ];

  return (
    <Card className="border-fresh-100 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 pb-4">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold">Fresh Insights</CardTitle>
        </div>
        <CardDescription>
          AI-powered observations based on your tracking data
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="pb-3">
              <div className="flex items-center mb-1">
                <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                <h4 className="font-medium text-base">{insight.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{insight.description}</p>
              <p className="text-sm font-medium text-primary">{insight.actionable}</p>
              {index < insights.length - 1 && <div className="border-t my-3" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AiInsights;
