import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Calculator, Calendar, DollarSign } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format, addDays, addHours, addMonths, addYears, differenceInDays } from 'date-fns';

const Calculators = () => {
  // Savings Calculator State
  const [productType, setProductType] = useState<string>('cigarettes');
  const [costPerUnit, setCostPerUnit] = useState<string>('10');
  const [unitsPerDay, setUnitsPerDay] = useState<string>('20');
  const [calculatedSavings, setCalculatedSavings] = useState<{
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  } | null>(null);
  
  // Health Timeline Calculator State
  const [quitDate, setQuitDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [timelineGenerated, setTimelineGenerated] = useState<boolean>(false);
  
  const healthMilestones = [
    { time: '20 minutes', description: 'Your heart rate and blood pressure drop.' },
    { time: '12 hours', description: 'Carbon monoxide level in your blood drops to normal.' },
    { time: '24 hours', description: 'Your risk of heart attack begins to decrease.' },
    { time: '48 hours', description: 'Your sense of smell and taste begin to improve.' },
    { time: '72 hours', description: 'Nicotine is eliminated from your body. Breathing becomes easier.' },
    { time: '2 weeks to 3 months', description: 'Your circulation improves. Lung function increases up to 30%.' },
    { time: '1 to 9 months', description: 'Coughing and shortness of breath decrease. Lungs regain ability to self-clean.' },
    { time: '1 year', description: 'Your risk of coronary heart disease is half that of someone still using nicotine products.' },
    { time: '5 years', description: 'Your risk of stroke is reduced to that of a non-smoker.' },
    { time: '10 years', description: 'Your risk of lung cancer falls to about half that of someone still smoking.' },
    { time: '15 years', description: 'Your risk of coronary heart disease is that of a non-smoker.' },
  ];
  
  const [personalMilestones, setPersonalMilestones] = useState<any[]>([]);
  
  const calculateSavings = () => {
    const cost = parseFloat(costPerUnit) || 0;
    const units = parseFloat(unitsPerDay) || 0;
    
    const daily = cost * units;
    const weekly = daily * 7;
    const monthly = daily * 30;
    const yearly = daily * 365;
    
    setCalculatedSavings({
      daily,
      weekly,
      monthly,
      yearly
    });
  };
  
  const generateTimeline = () => {
    const parsedQuitDate = new Date(quitDate);
    
    const milestones = healthMilestones.map(milestone => {
      let achieveDate;
      const time = milestone.time;
      
      if (time === '20 minutes') {
        achieveDate = addHours(parsedQuitDate, 0.33); // 20 minutes
      } else if (time === '12 hours') {
        achieveDate = addHours(parsedQuitDate, 12);
      } else if (time === '24 hours') {
        achieveDate = addDays(parsedQuitDate, 1);
      } else if (time === '48 hours') {
        achieveDate = addDays(parsedQuitDate, 2);
      } else if (time === '72 hours') {
        achieveDate = addDays(parsedQuitDate, 3);
      } else if (time === '2 weeks to 3 months') {
        achieveDate = addDays(parsedQuitDate, 14); // Using the earliest time (2 weeks)
      } else if (time === '1 to 9 months') {
        achieveDate = addMonths(parsedQuitDate, 1); // Using the earliest time (1 month)
      } else if (time === '1 year') {
        achieveDate = addYears(parsedQuitDate, 1);
      } else if (time === '5 years') {
        achieveDate = addYears(parsedQuitDate, 5);
      } else if (time === '10 years') {
        achieveDate = addYears(parsedQuitDate, 10);
      } else if (time === '15 years') {
        achieveDate = addYears(parsedQuitDate, 15);
      } else {
        achieveDate = parsedQuitDate;
      }
      
      const today = new Date();
      const isAchieved = today >= achieveDate;
      const daysUntil = differenceInDays(achieveDate, today);
      
      return {
        ...milestone,
        achieveDate,
        isAchieved,
        daysUntil
      };
    });
    
    setPersonalMilestones(milestones);
    setTimelineGenerated(true);
  };

  return (
    <div className="container py-12 px-4 mx-auto max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Interactive Calculators</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          See the real benefits of reducing nicotine use in terms of health improvements and financial savings.
        </p>
      </div>

      <Tabs defaultValue="savings" className="mb-12">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="savings" className="flex items-center justify-center">
            <DollarSign className="mr-2 h-4 w-4" />
            Savings Calculator
          </TabsTrigger>
          <TabsTrigger value="health" className="flex items-center justify-center">
            <Calendar className="mr-2 h-4 w-4" />
            Health Timeline
          </TabsTrigger>
        </TabsList>
        
        {/* Savings Calculator Tab Content */}
        <TabsContent value="savings">
          <Card>
            <CardHeader>
              <CardTitle>Financial Savings Calculator</CardTitle>
              <CardDescription>
                See how much money you'll save by reducing or eliminating nicotine products.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="product-type">Product Type</Label>
                  <Select value={productType} onValueChange={setProductType}>
                    <SelectTrigger id="product-type">
                      <SelectValue placeholder="Select product type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cigarettes">Cigarettes</SelectItem>
                      <SelectItem value="vape">Vape Products</SelectItem>
                      <SelectItem value="pouches">Nicotine Pouches</SelectItem>
                      <SelectItem value="dip">Dip/Chew</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="cost-per-unit">
                    Cost per {productType === 'cigarettes' ? 'pack' : productType === 'vape' ? 'cartridge/pod' : 'tin/can'} ($)
                  </Label>
                  <Input
                    id="cost-per-unit"
                    type="number"
                    value={costPerUnit}
                    onChange={(e) => setCostPerUnit(e.target.value)}
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="units-per-day">
                    {productType === 'cigarettes' ? 'Cigarettes' : productType === 'vape' ? 'Puffs/Sessions' : 'Pouches/Portions'} per day
                  </Label>
                  <Input 
                    id="units-per-day"
                    type="number"
                    value={unitsPerDay}
                    onChange={(e) => setUnitsPerDay(e.target.value)}
                    min="0"
                  />
                </div>
                
                <Button onClick={calculateSavings} className="w-full">Calculate Savings</Button>
              </div>

              {calculatedSavings && (
                <div className="mt-8 p-6 bg-green-50 rounded-lg">
                  <h3 className="text-xl font-bold text-green-800 mb-4">Your Projected Savings</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                      <h4 className="font-medium text-sm text-gray-500">Daily</h4>
                      <p className="text-xl font-bold text-green-600">${calculatedSavings.daily.toFixed(2)}</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                      <h4 className="font-medium text-sm text-gray-500">Weekly</h4>
                      <p className="text-xl font-bold text-green-600">${calculatedSavings.weekly.toFixed(2)}</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                      <h4 className="font-medium text-sm text-gray-500">Monthly</h4>
                      <p className="text-xl font-bold text-green-600">${calculatedSavings.monthly.toFixed(2)}</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                      <h4 className="font-medium text-sm text-gray-500">Yearly</h4>
                      <p className="text-xl font-bold text-green-700 text-2xl">${calculatedSavings.yearly.toFixed(2)}</p>
                    </div>
                  </div>
                  <p className="text-sm text-green-700 mt-4">
                    That's potentially ${Math.round(calculatedSavings.yearly * 5).toLocaleString()} over 5 years and ${Math.round(calculatedSavings.yearly * 10).toLocaleString()} over 10 years that could go toward vacations, education, retirement, or other goals!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Health Timeline Tab Content */}
        <TabsContent value="health">
          <Card>
            <CardHeader>
              <CardTitle>Health Recovery Timeline</CardTitle>
              <CardDescription>
                See how your body heals after quitting or reducing nicotine products.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="quit-date">Your Quit Date</Label>
                  <Input
                    id="quit-date"
                    type="date"
                    value={quitDate}
                    onChange={(e) => setQuitDate(e.target.value)}
                  />
                  <p className="text-sm text-gray-500">
                    For reduction journeys, use the date you significantly decreased your usage.
                  </p>
                </div>
                
                <Button onClick={generateTimeline} className="w-full">
                  Generate Health Timeline
                </Button>
              </div>

              {timelineGenerated && personalMilestones.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Your Personal Health Timeline</h3>
                  <div className="relative border-l-2 border-fresh-200 pl-6 ml-6">
                    {personalMilestones.map((milestone, index) => {
                      const isAchieved = milestone.isAchieved;
                      return (
                        <div key={index} className={`mb-8 relative ${isAchieved ? 'opacity-100' : 'opacity-80'}`}>
                          <div className="absolute -left-[30px] w-[14px] h-[14px] rounded-full bg-fresh-500"></div>
                          <div className={`p-4 rounded-lg ${isAchieved ? 'bg-green-50' : 'bg-blue-50'}`}>
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-semibold text-gray-800">{milestone.time}</h4>
                              {isAchieved ? (
                                <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800">Achieved!</span>
                              ) : (
                                <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                                  {milestone.daysUntil} days to go
                                </span>
                              )}
                            </div>
                            <p className="text-sm">{milestone.description}</p>
                            <p className="text-xs mt-2 text-gray-500">
                              {isAchieved 
                                ? `Achieved on ${format(milestone.achieveDate, 'MMM d, yyyy')}`
                                : `Expected on ${format(milestone.achieveDate, 'MMM d, yyyy')}`}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-xs text-muted-foreground">
                <p>Note: These timelines are based on averages from clinical studies and may vary by individual. Factors like product type, usage duration and intensity, and overall health status can influence your personal timeline.</p>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Link to="/tools">
          <Button variant="outline" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </Link>
        <Link to="/tools/holistic-health">
          <Button variant="default" className="bg-fresh-500 hover:bg-fresh-600">
            Explore Holistic Health Guide
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Calculators;
