
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Cloud, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Features = () => {
  return (
    <div className="container py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">All Features</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Everything you need to break free from nicotine and stay Afresh
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
        <Card>
          <CardHeader>
            <CheckCircle2 className="h-8 w-8 text-fresh-500 mb-2" />
            <CardTitle>Daily Tracking</CardTitle>
            <CardDescription>
              Log your nicotine use, cravings, and wellness metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-fresh-300 mr-2" />
                <span>Nicotine use logging</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-fresh-300 mr-2" />
                <span>Craving intensity and triggers</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-fresh-300 mr-2" />
                <span>Mood, energy, and focus tracking</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-fresh-300 mr-2" />
                <span>Sleep quality monitoring</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Zap className="h-8 w-8 text-fresh-500 mb-2" />
            <CardTitle>Personalized Insights</CardTitle>
            <CardDescription>
              Data-driven feedback on your fresh journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-fresh-300 mr-2" />
                <span>Craving pattern analysis</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-fresh-300 mr-2" />
                <span>Financial savings calculator</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-fresh-300 mr-2" />
                <span>Health improvement timeline</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-fresh-300 mr-2" />
                <span>Trigger-based recommendations</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 text-fresh-500 mb-2" />
            <CardTitle>Craving Defense Tools</CardTitle>
            <CardDescription>
              Practical tools to overcome nicotine cravings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-fresh-300 mr-2" />
                <span>Breathing exercises</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-fresh-300 mr-2" />
                <span>Distraction techniques</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-fresh-300 mr-2" />
                <span>Urge surfing guidance</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-fresh-300 mr-2" />
                <span>Emotional regulation tools</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Cloud className="h-8 w-8 text-fresh-500 mb-2" />
            <CardTitle>Holistic Wellness</CardTitle>
            <CardDescription>
              Support for your complete wellbeing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-fresh-300 mr-2" />
                <span>Mood enhancement activities</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-fresh-300 mr-2" />
                <span>Energy boosting exercises</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-fresh-300 mr-2" />
                <span>Focus improvement techniques</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-fresh-300 mr-2" />
                <span>Sleep quality guidance</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CheckCircle2 className="h-8 w-8 text-fresh-500 mb-2" />
            <CardTitle>Achievement System</CardTitle>
            <CardDescription>
              Celebrate your progress with rewards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-fresh-300 mr-2" />
                <span>Milestone celebration</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-fresh-300 mr-2" />
                <span>Personalized achievements</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-fresh-300 mr-2" />
                <span>Reward suggestions</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-fresh-300 mr-2" />
                <span>Progress visualization</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CheckCircle2 className="h-8 w-8 text-fresh-500 mb-2" />
            <CardTitle>Community Support</CardTitle>
            <CardDescription>
              Connect with others on their fresh journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-fresh-300 mr-2" />
                <span>Success stories</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-fresh-300 mr-2" />
                <span>Peer motivation</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-fresh-300 mr-2" />
                <span>Expert guidance</span>
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-fresh-300 mr-2" />
                <span>Resource sharing</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to start your Fresh journey?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/sign-up">
            <Button size="lg" className="bg-fresh-300 hover:bg-fresh-400">
              Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Features;
