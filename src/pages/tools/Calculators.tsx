import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, DollarSign, Calendar, Heart, Clock, Activity, Brain, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Calculators = () => {
  // Savings Calculator State
  const [product, setProduct] = useState("cigarettes");
  const [costPerUnit, setCostPerUnit] = useState("");
  const [unitsPerDay, setUnitsPerDay] = useState("");
  const [savings, setSavings] = useState<{
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  } | null>(null);

  // Timeline Calculator State
  const [quitDate, setQuitDate] = useState<string>("");
  const [timeElapsed, setTimeElapsed] = useState<{
    days: number;
    hours: number;
    minutes: number;
  } | null>(null);
  const [milestones, setMilestones] = useState<Array<{
    name: string;
    description: string;
    timeframe: string;
    reached: boolean;
    progress: number;
    icon: JSX.Element;
  }>>([]);

  // Effect for updating the timeline and progress when quit date changes
  useEffect(() => {
    if (!quitDate) return;

    const quitDateTime = new Date(quitDate).getTime();
    const now = new Date().getTime();
    
    // Calculate time elapsed
    if (quitDateTime <= now) {
      const diffMs = now - quitDateTime;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHrs = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeElapsed({
        days: diffDays,
        hours: diffHrs,
        minutes: diffMins
      });
      
      // Define health milestones
      const definedMilestones = [
        {
          name: "20 Minutes",
          description: "Blood pressure and pulse rate begin to drop to normal levels.",
          timeframe: "20 minutes",
          timeInMs: 20 * 60 * 1000,
          icon: <Heart className="h-5 w-5 text-red-500" />
        },
        {
          name: "8 Hours",
          description: "Carbon monoxide levels in blood drop by half; oxygen levels return to normal.",
          timeframe: "8 hours",
          timeInMs: 8 * 60 * 60 * 1000,
          icon: <Activity className="h-5 w-5 text-blue-500" />
        },
        {
          name: "24 Hours",
          description: "Risk of heart attack begins to decrease.",
          timeframe: "24 hours",
          timeInMs: 24 * 60 * 60 * 1000,
          icon: <Heart className="h-5 w-5 text-red-500" />
        },
        {
          name: "48 Hours",
          description: "Nerve endings start to regrow; sense of smell and taste begin to improve.",
          timeframe: "48 hours",
          timeInMs: 48 * 60 * 60 * 1000,
          icon: <Brain className="h-5 w-5 text-purple-500" />
        },
        {
          name: "72 Hours",
          description: "Breathing becomes easier as bronchial tubes relax; energy levels increase.",
          timeframe: "72 hours",
          timeInMs: 72 * 60 * 60 * 1000,
          icon: <Activity className="h-5 w-5 text-blue-500" />
        },
        {
          name: "2 Weeks",
          description: "Circulation improves and lung function increases up to 30%.",
          timeframe: "2 weeks",
          timeInMs: 14 * 24 * 60 * 60 * 1000,
          icon: <Heart className="h-5 w-5 text-red-500" />
        },
        {
          name: "1 Month",
          description: "Cilia in lungs regrow, increasing ability to handle mucus, clean lungs, and reduce infection.",
          timeframe: "1 month",
          timeInMs: 30 * 24 * 60 * 60 * 1000,
          icon: <Activity className="h-5 w-5 text-blue-500" />
        },
        {
          name: "3 Months",
          description: "Circulation and lung function improve significantly; coughing and shortness of breath decrease.",
          timeframe: "3 months",
          timeInMs: 90 * 24 * 60 * 60 * 1000,
          icon: <Clock className="h-5 w-5 text-amber-500" />
        },
        {
          name: "9 Months",
          description: "Lungs have significantly healed; cilia have recovered to sweep clean lungs and reduce infection risk.",
          timeframe: "9 months",
          timeInMs: 270 * 24 * 60 * 60 * 1000,
          icon: <PlusCircle className="h-5 w-5 text-green-500" />
        },
        {
          name: "1 Year",
          description: "Risk of coronary heart disease is cut in half compared to a smoker.",
          timeframe: "1 year",
          timeInMs: 365 * 24 * 60 * 60 * 1000,
          icon: <Calendar className="h-5 w-5 text-fresh-500" />
        },
      ];
      
      // Calculate progress for each milestone
      const updatedMilestones = definedMilestones.map(milestone => {
        const reached = diffMs >= milestone.timeInMs;
        const progress = reached ? 100 : (diffMs / milestone.timeInMs) * 100;
        
        return {
          name: milestone.name,
          description: milestone.description,
          timeframe: milestone.timeframe,
          reached,
          progress: Math.min(100, progress),
          icon: milestone.icon
        };
      });
      
      setMilestones(updatedMilestones);
    }
  }, [quitDate]);

  // Calculate savings
  const calculateSavings = () => {
    const cost = parseFloat(costPerUnit) || 0;
    const units = parseFloat(unitsPerDay) || 0;
    
    if (cost <= 0 || units <= 0) {
      return;
    }
    
    const dailySavings = cost * units;
    
    setSavings({
      daily: dailySavings,
      weekly: dailySavings * 7,
      monthly: dailySavings * 30,
      yearly: dailySavings * 365
    });
  };

  // Set today as default max date for quit date input
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="container py-12">
      <Link to="/" className="inline-flex items-center text-fresh-500 hover:text-fresh-600 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Interactive Calculators</h1>
        <p className="text-lg text-muted-foreground">
          Visualize your progress and the benefits of your fresh journey
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="savings" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="savings">
              <DollarSign className="mr-2 h-4 w-4" />
              Savings Calculator
            </TabsTrigger>
            <TabsTrigger value="timeline">
              <Calendar className="mr-2 h-4 w-4" />
              Health Timeline
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="savings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Calculate Your Savings</CardTitle>
                <CardDescription>
                  See how much money you can save by quitting or reducing nicotine use
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="product-type">Product Type</Label>
                    <Select value={product} onValueChange={setProduct}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cigarettes">Cigarettes</SelectItem>
                        <SelectItem value="vape">Vape Products</SelectItem>
                        <SelectItem value="pouches">Nicotine Pouches</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="cost-per-unit">
                      Cost per {product === 'cigarettes' ? 'pack' : product === 'vape' ? 'pod/cartridge' : 'can/tin'}
                    </Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 bg-muted border border-r-0 border-input rounded-l-md">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                      </span>
                      <Input
                        id="cost-per-unit"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={costPerUnit}
                        onChange={(e) => setCostPerUnit(e.target.value)}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="units-per-day">
                      {product === 'cigarettes' ? 'Packs' : product === 'vape' ? 'Pods/Cartridges' : 'Cans/Tins'} used per day
                    </Label>
                    <Input
                      id="units-per-day"
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="Enter amount"
                      value={unitsPerDay}
                      onChange={(e) => setUnitsPerDay(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      For partial units, use decimals (e.g., 0.5 for half a pack per day)
                    </p>
                  </div>
                  
                  <Button 
                    onClick={calculateSavings}
                    className="w-full bg-fresh-300 hover:bg-fresh-400"
                    disabled={!costPerUnit || !unitsPerDay}
                  >
                    Calculate Savings
                  </Button>
                </div>
              </CardContent>
              
              {savings && (
                <CardFooter className="flex flex-col">
                  <div className="bg-fresh-50 p-4 rounded-md w-full mb-4">
                    <h3 className="font-semibold text-lg mb-2">Your Potential Savings</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Daily</p>
                        <p className="text-xl font-bold text-fresh-600">${savings.daily.toFixed(2)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Weekly</p>
                        <p className="text-xl font-bold text-fresh-600">${savings.weekly.toFixed(2)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Monthly</p>
                        <p className="text-xl font-bold text-fresh-600">${savings.monthly.toFixed(2)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Yearly</p>
                        <p className="text-xl font-bold text-fresh-600">${savings.yearly.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 w-full">
                    <h4 className="font-medium text-sm">What you could buy instead:</h4>
                    <div className="flex flex-wrap gap-2">
                      {savings.monthly > 100 && (
                        <Badge variant="outline" className="bg-background">
                          Monthly gym membership
                        </Badge>
                      )}
                      {savings.yearly > 500 && (
                        <Badge variant="outline" className="bg-background">
                          Weekend getaway
                        </Badge>
                      )}
                      {savings.yearly > 1000 && (
                        <Badge variant="outline" className="bg-background">
                          New smartphone
                        </Badge>
                      )}
                      {savings.yearly > 2000 && (
                        <Badge variant="outline" className="bg-background">
                          Vacation
                        </Badge>
                      )}
                      <Badge variant="outline" className="bg-background">
                        {Math.floor(savings.monthly / 15)} nice meals out
                      </Badge>
                    </div>
                  </div>
                </CardFooter>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="timeline" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Health Improvement Timeline</CardTitle>
                <CardDescription>
                  See how your body recovers after quitting nicotine
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="quit-date">When did you quit or when do you plan to quit?</Label>
                    <Input
                      id="quit-date"
                      type="date"
                      max={today}
                      value={quitDate}
                      onChange={(e) => setQuitDate(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  {timeElapsed && (
                    <div className="bg-fresh-50 p-4 rounded-md">
                      <h3 className="font-semibold mb-2">Time Nicotine Free</h3>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-fresh-600">{timeElapsed.days}</p>
                          <p className="text-sm text-muted-foreground">Days</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-fresh-600">{timeElapsed.hours}</p>
                          <p className="text-sm text-muted-foreground">Hours</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-fresh-600">{timeElapsed.minutes}</p>
                          <p className="text-sm text-muted-foreground">Minutes</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              
              {milestones.length > 0 && (
                <CardFooter className="flex flex-col">
                  <h3 className="font-semibold text-lg mb-4 w-full">Health Milestone Progress</h3>
                  <div className="space-y-6 w-full">
                    {milestones.map((milestone, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            {milestone.icon}
                            <span className="font-medium">{milestone.name}</span>
                          </div>
                          <Badge 
                            variant={milestone.reached ? "default" : "outline"}
                            className={milestone.reached ? "bg-green-500" : ""}
                          >
                            {milestone.reached ? "Reached!" : milestone.progress.toFixed(0) + "%"}
                          </Badge>
                        </div>
                        <Progress value={milestone.progress} className="h-2" />
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="w-full mt-6 pt-6 border-t">
                    <p className="text-sm text-muted-foreground">
                      Note: This is a generalized timeline based on research. Individual experiences may vary.
                    </p>
                    <div className="mt-4">
                      <Button asChild className="bg-fresh-300 hover:bg-fresh-400">
                        <Link to="/sign-up">
                          Track Your Full Journey
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Calculators;
