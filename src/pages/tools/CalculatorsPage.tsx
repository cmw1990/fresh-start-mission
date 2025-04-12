
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DollarSign, Heart, Calendar, Loader2 } from "lucide-react";
import { format, addDays, addWeeks, addMonths, addYears } from "date-fns";

// Health Timeline Milestones
const healthTimeline = [
  { time: "20 minutes", description: "Your heart rate and blood pressure begin to drop." },
  { time: "12 hours", description: "Carbon monoxide in your blood drops to normal levels." },
  { time: "24 hours", description: "Your risk of heart attack begins to decrease." },
  { time: "48 hours", description: "Your sense of smell and taste improve." },
  { time: "72 hours", description: "Nicotine is eliminated from your body. Withdrawal symptoms may peak." },
  { time: "2 weeks", description: "Circulation and lung function improve." },
  { time: "1 month", description: "Many respiratory symptoms decrease. Cilia regrow in lungs." },
  { time: "3 months", description: "Heart attack risk continues to drop. Lung function continues to improve." },
  { time: "9 months", description: "Reduced coughing and shortness of breath. Cilia regrow, increasing ability to handle mucus, clean the lungs, and reduce infection." },
  { time: "1 year", description: "Risk of coronary heart disease is cut in half." },
  { time: "5 years", description: "Risk of stroke is reduced to that of a non-smoker. Risk of mouth, throat and esophageal cancer is halved." },
  { time: "10 years", description: "Risk of death from lung cancer is about half that of a smoker. Risk of bladder, esophageal, and pancreatic cancer decreases." },
  { time: "15 years", description: "Risk of coronary heart disease is the same as a non-smoker." },
];

// Convert milestone times to actual dates based on the quit date
const calculateHealthDates = (quitDate: Date) => {
  return healthTimeline.map(milestone => {
    let date;
    
    if (milestone.time.includes("minute")) {
      const minutes = parseInt(milestone.time);
      date = new Date(quitDate.getTime() + minutes * 60000);
    } else if (milestone.time.includes("hour")) {
      const hours = parseInt(milestone.time);
      date = new Date(quitDate.getTime() + hours * 3600000);
    } else if (milestone.time.includes("day")) {
      const days = parseInt(milestone.time);
      date = addDays(quitDate, days);
    } else if (milestone.time.includes("week")) {
      const weeks = parseInt(milestone.time);
      date = addWeeks(quitDate, weeks);
    } else if (milestone.time.includes("month")) {
      const months = parseInt(milestone.time);
      date = addMonths(quitDate, months);
    } else if (milestone.time.includes("year")) {
      const years = parseInt(milestone.time);
      date = addYears(quitDate, years);
    } else {
      date = new Date(quitDate);
    }
    
    return {
      ...milestone,
      date: date
    };
  });
};

const CalculatorsPage = () => {
  const [activeTab, setActiveTab] = useState("savings");
  
  // Savings Calculator State
  const [cost, setCost] = useState<number | string>("");
  const [dailyAmount, setDailyAmount] = useState<number | string>("");
  const [savings, setSavings] = useState<{
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
    fiveYear: number;
  } | null>(null);
  
  // Health Timeline Calculator State
  const [quitDate, setQuitDate] = useState<string>("");
  const [healthMilestones, setHealthMilestones] = useState<any[]>([]);
  const [calculatingHealth, setCalculatingHealth] = useState(false);
  
  const calculateSavings = () => {
    const costPerItem = parseFloat(cost as string) || 0;
    const itemsPerDay = parseFloat(dailyAmount as string) || 0;
    
    const daily = costPerItem * itemsPerDay;
    const weekly = daily * 7;
    const monthly = daily * 30;
    const yearly = daily * 365;
    const fiveYear = yearly * 5;
    
    setSavings({ daily, weekly, monthly, yearly, fiveYear });
  };
  
  const calculateHealth = () => {
    if (!quitDate) return;
    
    setCalculatingHealth(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const date = new Date(quitDate);
      const milestones = calculateHealthDates(date);
      setHealthMilestones(milestones);
      setCalculatingHealth(false);
    }, 500);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">Interactive Calculators</h1>
      <p className="text-muted-foreground mb-8">
        Calculate your potential savings and view your health improvement timeline
      </p>
      
      <Tabs defaultValue="savings" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="savings">Savings Calculator</TabsTrigger>
          <TabsTrigger value="health">Health Timeline</TabsTrigger>
        </TabsList>
        
        <TabsContent value="savings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Savings Calculator</CardTitle>
              <CardDescription>
                Calculate how much money you'll save by staying afresh
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cost">Cost per pack/vape/pouch ($)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="cost"
                      type="number"
                      placeholder="0.00"
                      className="pl-8"
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                      min={0}
                      step="0.01"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Daily usage (amount)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0"
                    value={dailyAmount}
                    onChange={(e) => setDailyAmount(e.target.value)}
                    min={0}
                  />
                </div>
                
                <Button 
                  className="bg-fresh-300 hover:bg-fresh-400 w-full sm:w-auto" 
                  onClick={calculateSavings}
                  disabled={!cost || !dailyAmount}
                >
                  Calculate Savings
                </Button>
              </div>
              
              {savings && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Your Savings</h3>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    <Card className="bg-fresh-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Daily</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">${savings.daily.toFixed(2)}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-fresh-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Weekly</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">${savings.weekly.toFixed(2)}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-fresh-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Monthly</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">${savings.monthly.toFixed(2)}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-fresh-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Yearly</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">${savings.yearly.toFixed(2)}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-fresh-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">5 Years</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">${savings.fiveYear.toFixed(2)}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-4">
                    Imagine what you could do with these savings! A vacation, new gadget, home improvement, or financial security.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="health" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Health Improvement Timeline</CardTitle>
              <CardDescription>
                See how your body recovers after staying afresh
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label htmlFor="quit-date">Your quit date</Label>
                  <Input
                    id="quit-date"
                    type="date"
                    value={quitDate}
                    onChange={(e) => setQuitDate(e.target.value)}
                  />
                </div>
                
                <Button 
                  className="bg-fresh-300 hover:bg-fresh-400 w-full sm:w-auto" 
                  onClick={calculateHealth}
                  disabled={!quitDate || calculatingHealth}
                >
                  {calculatingHealth ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    "Generate Timeline"
                  )}
                </Button>
              </div>
              
              {healthMilestones.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Your Health Journey</h3>
                  <div className="relative">
                    <div className="absolute h-full w-px bg-fresh-200 left-2.5 top-0"></div>
                    <div className="space-y-8">
                      {healthMilestones.map((milestone, index) => {
                        const isInPast = new Date() > new Date(milestone.date);
                        const isPresentDay = format(milestone.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
                        
                        return (
                          <div key={index} className="relative pl-10">
                            <div className={`absolute left-0 top-1.5 h-5 w-5 rounded-full flex items-center justify-center ${isInPast || isPresentDay ? 'bg-fresh-300' : 'bg-gray-200'}`}>
                              {isInPast ? (
                                <Heart className="h-3 w-3 text-white" />
                              ) : isPresentDay ? (
                                <Calendar className="h-3 w-3 text-white" />
                              ) : (
                                <DollarSign className="h-3 w-3 text-gray-400" />
                              )}
                            </div>
                            
                            <div className={`py-2 px-4 border rounded-lg ${isInPast ? 'border-fresh-300 bg-fresh-50' : isPresentDay ? 'border-fresh-300 bg-fresh-100' : 'border-gray-200'}`}>
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                <div>
                                  <h4 className="font-medium">{milestone.time}</h4>
                                  <p className="text-muted-foreground text-sm">{milestone.description}</p>
                                </div>
                                <div className="text-sm font-medium">
                                  {format(new Date(milestone.date), 'MMM d, yyyy')}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CalculatorsPage;
