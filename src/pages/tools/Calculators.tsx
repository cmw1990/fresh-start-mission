
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, DollarSign, Clock, Activity } from "lucide-react";

// Define a type for milestones
type Milestone = {
  time: string;
  description: string;
  achieved?: boolean;
};

const Calculators = () => {
  // Savings calculator state
  const [productType, setProductType] = useState("cigarettes");
  const [costPerUnit, setCostPerUnit] = useState<number>(10);
  const [unitsPerDay, setUnitsPerDay] = useState<number>(1);
  const [savings, setSavings] = useState<{daily: number, weekly: number, monthly: number, yearly: number} | null>(null);
  
  // Timeline calculator state
  const [quitDate, setQuitDate] = useState<Date | undefined>(undefined);
  const [milestones, setMilestones] = useState<Array<Milestone>>([]);
  
  const calculateSavings = () => {
    const daily = costPerUnit * unitsPerDay;
    const weekly = daily * 7;
    const monthly = daily * 30;
    const yearly = daily * 365;
    
    setSavings({
      daily: Math.round(daily * 100) / 100,
      weekly: Math.round(weekly * 100) / 100,
      monthly: Math.round(monthly * 100) / 100,
      yearly: Math.round(yearly * 100) / 100
    });
  };
  
  const calculateTimeline = () => {
    if (!quitDate) return;
    
    const now = new Date();
    const diffTime = now.getTime() - quitDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const newMilestones: Milestone[] = [
      { time: '20 minutes', description: 'Heart rate and blood pressure drop' },
      { time: '12 hours', description: 'Carbon monoxide level in blood drops to normal' },
      { time: '2-3 days', description: 'Sense of smell and taste improve' },
      { time: '1-3 weeks', description: 'Circulation improves, lung function increases' },
      { time: '1-9 months', description: 'Coughing and shortness of breath decrease' },
      { time: '1 year', description: 'Risk of coronary heart disease is half that of a smoker' },
      { time: '5-15 years', description: 'Stroke risk reduced to that of a nonsmoker' },
      { time: '10 years', description: 'Lung cancer death rate similar to that of nonsmokers' },
      { time: '15 years', description: 'Risk of coronary heart disease same as non-smoker' }
    ];
    
    // Mark which milestones have been achieved
    const markedMilestones = newMilestones.map(milestone => {
      let achieved = false;
      let timeInDays = 0;
      
      if (milestone.time.includes('minutes')) {
        timeInDays = parseInt(milestone.time) / (24 * 60);
      } else if (milestone.time.includes('hours')) {
        timeInDays = parseInt(milestone.time) / 24;
      } else if (milestone.time.includes('days')) {
        if (milestone.time.includes('-')) {
          timeInDays = parseInt(milestone.time.split('-')[1]);
        } else {
          timeInDays = parseInt(milestone.time);
        }
      } else if (milestone.time.includes('weeks')) {
        if (milestone.time.includes('-')) {
          timeInDays = parseInt(milestone.time.split('-')[1]) * 7;
        } else {
          timeInDays = parseInt(milestone.time) * 7;
        }
      } else if (milestone.time.includes('months')) {
        if (milestone.time.includes('-')) {
          timeInDays = parseInt(milestone.time.split('-')[1]) * 30;
        } else {
          timeInDays = parseInt(milestone.time) * 30;
        }
      } else if (milestone.time.includes('year')) {
        if (milestone.time.includes('-')) {
          timeInDays = parseInt(milestone.time.split('-')[1]) * 365;
        } else {
          timeInDays = parseInt(milestone.time) * 365;
        }
      }
      
      achieved = diffDays >= timeInDays;
      
      return {
        ...milestone,
        achieved
      };
    });
    
    setMilestones(markedMilestones);
  };

  return (
    <div className="container max-w-5xl py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Interactive Calculators</h1>
      <p className="text-muted-foreground mb-10">Use these tools to visualize the financial and health benefits of your fresh journey.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Savings Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-fresh-300" />
              Savings Calculator
            </CardTitle>
            <CardDescription>
              Calculate how much money you'll save by staying afresh or fresher
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="product-type">Product Type</Label>
                <RadioGroup 
                  id="product-type" 
                  value={productType} 
                  onValueChange={setProductType}
                  className="flex flex-wrap gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cigarettes" id="cigarettes" />
                    <Label htmlFor="cigarettes">Cigarettes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="vape" id="vape" />
                    <Label htmlFor="vape">Vape Products</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pouches" id="pouches" />
                    <Label htmlFor="pouches">Nicotine Pouches</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cost-per-unit">
                    Cost per {productType === "cigarettes" ? "pack" : 
                             productType === "vape" ? "disposable/cartridge" : 
                             "container"}
                  </Label>
                  <div className="flex items-center mt-2">
                    <span className="bg-muted px-3 py-2 rounded-l-md border border-r-0">$</span>
                    <Input 
                      id="cost-per-unit"
                      type="number" 
                      min="0" 
                      step="0.01"
                      value={costPerUnit}
                      onChange={(e) => setCostPerUnit(parseFloat(e.target.value) || 0)}
                      className="rounded-l-none"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="units-per-day">
                    {productType === "cigarettes" ? "Packs" : 
                       productType === "vape" ? "Disposables/Cartridges" : 
                       "Containers"} per day
                  </Label>
                  <Input 
                    id="units-per-day"
                    type="number" 
                    min="0" 
                    step="0.1"
                    value={unitsPerDay}
                    onChange={(e) => setUnitsPerDay(parseFloat(e.target.value) || 0)}
                    className="mt-2"
                  />
                </div>
              </div>
              
              <Button 
                onClick={calculateSavings}
                className="w-full bg-fresh-300 hover:bg-fresh-400 text-white"
              >
                Calculate Savings
              </Button>
            </div>
            
            {savings && (
              <div className="border rounded-lg p-4 bg-fresh-50 space-y-3 mt-4">
                <h3 className="font-medium text-lg">Your Estimated Savings</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className="text-muted-foreground">Daily:</div>
                  <div className="font-medium">${savings.daily}</div>
                  <div className="text-muted-foreground">Weekly:</div>
                  <div className="font-medium">${savings.weekly}</div>
                  <div className="text-muted-foreground">Monthly:</div>
                  <div className="font-medium">${savings.monthly}</div>
                  <div className="text-muted-foreground">Yearly:</div>
                  <div className="font-medium text-fresh-500">${savings.yearly}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Health Timeline Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-teal-500" />
              Health Timeline
            </CardTitle>
            <CardDescription>
              See how your health improves after you stop using nicotine
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="quit-date">When did you quit?</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full mt-2 justify-start text-left font-normal",
                        !quitDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {quitDate ? format(quitDate, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={quitDate}
                      onSelect={setQuitDate}
                      initialFocus
                      disabled={(date) => date > new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <Button 
                onClick={calculateTimeline}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white"
                disabled={!quitDate}
              >
                Show My Timeline
              </Button>
            </div>
            
            {milestones.length > 0 && (
              <div className="border rounded-lg p-4 bg-teal-50 space-y-4 mt-4">
                <h3 className="font-medium text-lg">Your Health Recovery Timeline</h3>
                <div className="space-y-3">
                  {milestones.map((milestone, index) => (
                    <div 
                      key={index} 
                      className={cn(
                        "flex gap-3 p-3 rounded-md",
                        milestone.achieved ? "bg-teal-100" : "bg-white"
                      )}
                    >
                      <div className={cn(
                        "rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0",
                        milestone.achieved ? "bg-teal-500 text-white" : "border border-gray-300"
                      )}>
                        {milestone.achieved && <Clock className="h-3 w-3" />}
                      </div>
                      <div>
                        <p className="font-medium">{milestone.time}</p>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground pt-2">Based on general health recovery timeline. Individual results may vary.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calculators;
