
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Calendar, Heart, Clock, Lungs, Brain, ThumbsUp } from "lucide-react";

const SavingsCalculator = () => {
  const [productType, setProductType] = useState("cigarette");
  const [costPerUnit, setCostPerUnit] = useState("10");
  const [unitsPerDay, setUnitsPerDay] = useState("20");
  const [results, setResults] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0,
    fiveYears: 0,
  });
  const [calculated, setCalculated] = useState(false);

  const handleCalculate = () => {
    const cost = parseFloat(costPerUnit);
    const units = parseFloat(unitsPerDay);
    
    if (isNaN(cost) || isNaN(units) || cost <= 0 || units <= 0) {
      return;
    }
    
    const daily = cost * units;
    const weekly = daily * 7;
    const monthly = daily * 30;
    const yearly = daily * 365;
    const fiveYears = yearly * 5;
    
    setResults({
      daily,
      weekly,
      monthly,
      yearly,
      fiveYears
    });
    
    setCalculated(true);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="h-5 w-5 text-green-500 mr-2" />
            Savings Calculator
          </CardTitle>
          <CardDescription>
            Calculate how much money you could save by quitting nicotine products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="productType">Product Type</Label>
              <Select value={productType} onValueChange={setProductType}>
                <SelectTrigger id="productType">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cigarette">Cigarettes</SelectItem>
                  <SelectItem value="vape">Vape</SelectItem>
                  <SelectItem value="pouch">Nicotine Pouches</SelectItem>
                  <SelectItem value="dip">Dip/Chewing Tobacco</SelectItem>
                  <SelectItem value="cigar">Cigars</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="costPerUnit">
                Cost Per {productType === "cigarette" ? "Pack" : 
                         productType === "vape" ? "Pod/Cartridge" : 
                         productType === "pouch" ? "Can" : 
                         productType === "dip" ? "Can" : "Unit"} ($)
              </Label>
              <Input 
                id="costPerUnit" 
                type="number"
                min="0.01"
                step="0.01"
                value={costPerUnit}
                onChange={(e) => setCostPerUnit(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="unitsPerDay">
                {productType === "cigarette" ? "Packs" : 
                 productType === "vape" ? "Pods/Cartridges" : 
                 productType === "pouch" ? "Cans" : 
                 productType === "dip" ? "Cans" : "Units"} Per Day
              </Label>
              <Input 
                id="unitsPerDay" 
                type="number"
                min="0.1"
                step="0.1"
                value={unitsPerDay}
                onChange={(e) => setUnitsPerDay(e.target.value)}
              />
            </div>
          </div>
          
          <Button 
            className="w-full mt-6 bg-fresh-300 hover:bg-fresh-400"
            onClick={handleCalculate}
          >
            Calculate Savings
          </Button>
          
          {calculated && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Your Potential Savings</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <div className="bg-fresh-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Daily</p>
                  <p className="text-2xl font-bold text-fresh-700">{formatCurrency(results.daily)}</p>
                </div>
                <div className="bg-fresh-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Weekly</p>
                  <p className="text-2xl font-bold text-fresh-700">{formatCurrency(results.weekly)}</p>
                </div>
                <div className="bg-fresh-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Monthly</p>
                  <p className="text-2xl font-bold text-fresh-700">{formatCurrency(results.monthly)}</p>
                </div>
                <div className="bg-fresh-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Yearly</p>
                  <p className="text-2xl font-bold text-fresh-700">{formatCurrency(results.yearly)}</p>
                </div>
                <div className="bg-fresh-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">5 Years</p>
                  <p className="text-2xl font-bold text-fresh-700">{formatCurrency(results.fiveYears)}</p>
                </div>
              </div>
              
              <div className="mt-6 bg-blue-50 p-4 rounded-md">
                <div className="flex items-start">
                  <ThumbsUp className="h-5 w-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-blue-700">
                      With these savings, you could: 
                      {results.yearly >= 2000 && " take a vacation,"}
                      {results.yearly >= 5000 && " make a down payment on a car,"}
                      {results.yearly >= 1000 && " start an investment portfolio,"}
                      {results.yearly >= 500 && " upgrade your electronics,"}
                      {results.yearly >= 100 && " treat yourself to nice dinners,"} or build your emergency fund.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const HealthTimeline = () => {
  const [quitDate, setQuitDate] = useState<Date | null>(new Date());
  const [showTimeline, setShowTimeline] = useState(false);
  
  const handleViewTimeline = () => {
    if (quitDate) {
      setShowTimeline(true);
    }
  };
  
  const daysSince = (date: Date | null): number => {
    if (!date) return 0;
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const milestones = [
    { 
      time: "20 minutes", 
      description: "Heart rate begins to drop", 
      icon: <Heart className="h-6 w-6 text-red-500" /> 
    },
    { 
      time: "12 hours", 
      description: "Carbon monoxide levels in blood normalize", 
      icon: <Lungs className="h-6 w-6 text-blue-500" /> 
    },
    { 
      time: "24 hours", 
      description: "Anxiety and irritability peak as nicotine leaves your body", 
      icon: <Brain className="h-6 w-6 text-purple-500" /> 
    },
    { 
      time: "48 hours", 
      description: "Nerve endings begin to regrow; taste and smell improve", 
      icon: <Brain className="h-6 w-6 text-purple-500" /> 
    },
    { 
      time: "72 hours", 
      description: "Nicotine is eliminated from the body; breathing becomes easier", 
      icon: <Lungs className="h-6 w-6 text-blue-500" /> 
    },
    { 
      time: "1 week", 
      description: "Success probability increases significantly if you've made it this far", 
      icon: <ThumbsUp className="h-6 w-6 text-green-500" /> 
    },
    { 
      time: "2 weeks", 
      description: "Circulation and lung function improve; exercise becomes easier", 
      icon: <Lungs className="h-6 w-6 text-blue-500" /> 
    },
    { 
      time: "1 month", 
      description: "Cilia in lungs begin to repair, increasing ability to handle mucus and clean the lungs", 
      icon: <Lungs className="h-6 w-6 text-blue-500" /> 
    },
    { 
      time: "3-9 months", 
      description: "Coughing and shortness of breath decrease; lung function continues to improve", 
      icon: <Lungs className="h-6 w-6 text-blue-500" /> 
    },
    { 
      time: "1 year", 
      description: "Risk of coronary heart disease is half that of a smoker", 
      icon: <Heart className="h-6 w-6 text-red-500" /> 
    },
    { 
      time: "5 years", 
      description: "Risk of stroke reduced to that of a non-smoker", 
      icon: <Brain className="h-6 w-6 text-purple-500" /> 
    },
    { 
      time: "10 years", 
      description: "Lung cancer death rate drops to half that of a smoker", 
      icon: <Lungs className="h-6 w-6 text-blue-500" /> 
    },
    { 
      time: "15 years", 
      description: "Risk of heart disease is the same as a non-smoker", 
      icon: <Heart className="h-6 w-6 text-red-500" /> 
    }
  ];
  
  const days = daysSince(quitDate);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 text-blue-500 mr-2" />
            Health Timeline
          </CardTitle>
          <CardDescription>
            See how your body recovers after quitting nicotine
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label htmlFor="quitDate">When did you quit? (or when do you plan to quit?)</Label>
            <div className="flex mt-2">
              <Input 
                id="quitDate"
                type="date"
                value={quitDate ? quitDate.toISOString().split('T')[0] : ''}
                onChange={(e) => setQuitDate(e.target.value ? new Date(e.target.value) : null)}
                className="mr-4"
              />
              <Button 
                onClick={handleViewTimeline} 
                disabled={!quitDate}
                className="bg-fresh-300 hover:bg-fresh-400"
              >
                View Timeline
              </Button>
            </div>
          </div>
          
          {showTimeline && quitDate && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Your Health Recovery Timeline</h3>
              <p className="text-muted-foreground mb-6">
                You've been nicotine-free for <span className="font-medium text-fresh-700">{days} days</span>.
                Here's how your body is recovering:
              </p>
              
              <div className="relative border-l-2 border-fresh-200 pl-6 ml-3 space-y-8">
                {milestones.map((milestone, index) => {
                  // Determine if this milestone has been reached
                  let isReached = false;
                  let timeInDays = 0;
                  
                  if (milestone.time.includes("minute")) {
                    timeInDays = parseInt(milestone.time) / (24 * 60);
                  } else if (milestone.time.includes("hour")) {
                    timeInDays = parseInt(milestone.time) / 24;
                  } else if (milestone.time.includes("week")) {
                    timeInDays = parseInt(milestone.time) * 7;
                  } else if (milestone.time.includes("month")) {
                    // Approximate
                    if (milestone.time.includes("-")) {
                      const [min, max] = milestone.time.split("-");
                      timeInDays = parseInt(min) * 30;
                    } else {
                      timeInDays = parseInt(milestone.time) * 30;
                    }
                  } else if (milestone.time.includes("year")) {
                    timeInDays = parseInt(milestone.time) * 365;
                  } else {
                    // Assume days
                    timeInDays = parseInt(milestone.time);
                  }
                  
                  isReached = days >= timeInDays;
                  
                  return (
                    <div key={index} className="relative">
                      <div className="absolute -left-[35px] bg-white">
                        <div className={`flex items-center justify-center w-6 h-6 rounded-full ${
                          isReached ? "bg-fresh-200" : "bg-gray-200"
                        }`}>
                          <div className={`w-3 h-3 rounded-full ${
                            isReached ? "bg-fresh-500" : "bg-gray-400"
                          }`} />
                        </div>
                      </div>
                      <div className={`${isReached ? "opacity-100" : "opacity-60"}`}>
                        <div className="flex items-center mb-1">
                          {milestone.icon}
                          <h4 className="font-medium ml-2">{milestone.time}</h4>
                        </div>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8 bg-blue-50 p-4 rounded-md">
                <p className="text-sm text-blue-700">
                  This timeline is based on general research and may vary from person to person. Continue your fresh journey and track your personal improvements!
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const CalculatorsPage = () => {
  const [activeTab, setActiveTab] = useState<string>("savings");
  
  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Interactive Calculators</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Calculate the benefits of quitting nicotine, from financial savings to health improvements
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="savings">Financial Savings</TabsTrigger>
          <TabsTrigger value="health">Health Timeline</TabsTrigger>
        </TabsList>
        
        <TabsContent value="savings">
          <SavingsCalculator />
        </TabsContent>
        
        <TabsContent value="health">
          <HealthTimeline />
        </TabsContent>
      </Tabs>
      
      <div className="mt-12 p-6 bg-fresh-50 border border-fresh-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Ready to start your fresh journey?</h2>
        <div className="space-y-2">
          <p>Mission Fresh provides personalized tracking and support to help you achieve your goals.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <a href="/app/dashboard" className="inline-flex items-center justify-center rounded-md bg-fresh-300 hover:bg-fresh-400 text-white px-4 py-2">
              Get Started
            </a>
            <a href="/tools/nrt-guide" className="inline-flex items-center justify-center rounded-md border border-fresh-200 bg-white hover:bg-fresh-50 px-4 py-2">
              NRT Guide
            </a>
            <a href="/tools/quit-methods" className="inline-flex items-center justify-center rounded-md border border-fresh-200 bg-white hover:bg-fresh-50 px-4 py-2">
              Quitting Methods
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorsPage;
