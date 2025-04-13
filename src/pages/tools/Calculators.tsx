
import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, differenceInDays, addDays } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SavingsCalculator = () => {
  const [costPerPack, setCostPerPack] = useState('10');
  const [packsPerDay, setPacksPerDay] = useState('1');
  const [quitDate, setQuitDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [savings, setSavings] = useState({ daily: 0, weekly: 0, monthly: 0, yearly: 0, total: 0 });
  const [daysQuit, setDaysQuit] = useState(0);

  useEffect(() => {
    const cost = parseFloat(costPerPack) || 0;
    const packs = parseFloat(packsPerDay) || 0;
    const dailyAmount = cost * packs;
    
    // Calculate days quit
    const quitDateObj = new Date(quitDate);
    const today = new Date();
    const daysSince = Math.max(0, differenceInDays(today, quitDateObj));
    setDaysQuit(daysSince);
    
    setSavings({
      daily: dailyAmount,
      weekly: dailyAmount * 7,
      monthly: dailyAmount * 30,
      yearly: dailyAmount * 365,
      total: dailyAmount * daysSince
    });
  }, [costPerPack, packsPerDay, quitDate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Money Saved Calculator</CardTitle>
        <CardDescription>See how much you'll save by staying nicotine-free</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cost-per-pack">Cost Per Pack/Vape/Tin ($)</Label>
              <Input
                id="cost-per-pack"
                type="number"
                step="0.01"
                min="0"
                value={costPerPack}
                onChange={(e) => setCostPerPack(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="packs-per-day">Packs/Vapes/Tins Per Day</Label>
              <Input
                id="packs-per-day"
                type="number"
                step="0.1"
                min="0"
                value={packsPerDay}
                onChange={(e) => setPacksPerDay(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quit-date">Quit Date</Label>
            <div className="relative">
              <Input
                id="quit-date"
                type="date"
                value={quitDate}
                onChange={(e) => setQuitDate(e.target.value)}
                max={format(new Date(), 'yyyy-MM-dd')}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          
          {daysQuit > 0 && (
            <div className="bg-fresh-50 p-4 rounded-lg text-center">
              <p className="font-medium">You've been nicotine-free for {daysQuit} days!</p>
            </div>
          )}
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-1">Daily Savings</p>
              <p className="text-lg font-bold text-green-600">${savings.daily.toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-1">Weekly Savings</p>
              <p className="text-lg font-bold text-green-600">${savings.weekly.toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-1">Monthly Savings</p>
              <p className="text-lg font-bold text-green-600">${savings.monthly.toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-1">Yearly Savings</p>
              <p className="text-lg font-bold text-green-600">${savings.yearly.toFixed(2)}</p>
            </div>
          </div>
          
          {daysQuit > 0 && (
            <div className="bg-green-50 border border-green-100 p-4 rounded-lg text-center mt-2">
              <p className="text-lg font-bold text-green-600">
                Total saved so far: ${savings.total.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                That's enough for {Math.floor(savings.total / 50)} nice meals or {Math.floor(savings.total / 15)} movie tickets!
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface HealthMilestone {
  day: number;
  title: string;
  description: string;
}

const HealthCalculator = () => {
  const [quitDate, setQuitDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [daysQuit, setDaysQuit] = useState(0);
  
  const milestones: HealthMilestone[] = [
    { day: 0, title: "You quit!", description: "You've taken the first step toward a healthier life." },
    { day: 1, title: "20 minutes", description: "Your heart rate and blood pressure drop." },
    { day: 1, title: "12 hours", description: "Carbon monoxide level in your blood drops to normal." },
    { day: 2, title: "24-48 hours", description: "Your sense of smell and taste begin to improve." },
    { day: 3, title: "72 hours", description: "Nicotine is eliminated from your body. Breathing becomes easier." },
    { day: 7, title: "1 week", description: "Circulation improves. Lung function starts to increase." },
    { day: 14, title: "2 weeks", description: "Walking becomes easier. Lung function continues to improve." },
    { day: 30, title: "1 month", description: "Many nicotine withdrawal symptoms have subsided." },
    { day: 90, title: "3 months", description: "Circulation and lung function improve significantly." },
    { day: 180, title: "6 months", description: "Coughing and shortness of breath decrease. Lungs begin to clean themselves." },
    { day: 270, title: "9 months", description: "Cilia regrow in lungs, increasing ability to handle mucus, clean the lungs, and reduce infection." },
    { day: 365, title: "1 year", description: "Risk of coronary heart disease is half that of someone who still uses nicotine." },
    { day: 1825, title: "5 years", description: "Risk of stroke is reduced to that of a nonsmoker." },
    { day: 3650, title: "10 years", description: "Risk of lung cancer falls to about half that of a smoker. Risk of cancers of the mouth, throat, and esophagus decreases." },
    { day: 5475, title: "15 years", description: "Risk of coronary heart disease is similar to that of a nonsmoker." }
  ];
  
  useEffect(() => {
    const quitDateObj = new Date(quitDate);
    const today = new Date();
    const daysSince = Math.max(0, differenceInDays(today, quitDateObj));
    setDaysQuit(daysSince);
  }, [quitDate]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Improvement Timeline</CardTitle>
        <CardDescription>Track the positive health changes after quitting nicotine</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="health-quit-date">When did you quit?</Label>
            <div className="relative">
              <Input
                id="health-quit-date"
                type="date"
                value={quitDate}
                onChange={(e) => setQuitDate(e.target.value)}
                max={format(new Date(), 'yyyy-MM-dd')}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          
          {daysQuit > 0 && (
            <div className="bg-fresh-50 p-4 rounded-lg text-center">
              <p className="font-medium">You've been nicotine-free for {daysQuit} days!</p>
            </div>
          )}
          
          <div className="relative border-l-2 border-fresh-200 pl-8 space-y-6 mt-8">
            {milestones.map((milestone, index) => {
              const milestoneDate = addDays(new Date(quitDate), milestone.day);
              const isPast = new Date() >= milestoneDate;
              const isCurrent = milestone.day <= daysQuit && (index === milestones.length - 1 || milestones[index + 1].day > daysQuit);
              
              return (
                <div key={index} className="relative">
                  <div 
                    className={`absolute -left-10 w-5 h-5 rounded-full mt-1 ${
                      isPast 
                        ? 'bg-fresh-500 border-2 border-white shadow' 
                        : 'bg-gray-200'
                    } ${
                      isCurrent ? 'ring-4 ring-fresh-100' : ''
                    }`}
                  />
                  <div className={`${isPast ? 'opacity-100' : 'opacity-50'}`}>
                    <p className="text-sm text-muted-foreground">
                      {milestone.day === 0 
                        ? format(new Date(quitDate), 'MMM d, yyyy')
                        : `${format(milestoneDate, 'MMM d, yyyy')} (Day ${milestone.day})`
                      }
                    </p>
                    <h4 className="font-semibold mt-1">{milestone.title}</h4>
                    <p className="mt-1">{milestone.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center text-sm text-muted-foreground mt-8">
            <p>This timeline is based on general research and may vary by individual.</p>
            <p>For personalized health advice, please consult a healthcare professional.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Calculators = () => {
  return (
    <div className="container py-12 px-4 mx-auto max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Interactive Calculators</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          See the financial and health benefits of your fresh journey
        </p>
      </div>
      
      <Tabs defaultValue="savings" className="w-full">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
          <TabsTrigger value="savings">Savings Calculator</TabsTrigger>
          <TabsTrigger value="health">Health Timeline</TabsTrigger>
        </TabsList>
        
        <TabsContent value="savings" className="mt-6">
          <SavingsCalculator />
        </TabsContent>
        
        <TabsContent value="health" className="mt-6">
          <HealthCalculator />
        </TabsContent>
      </Tabs>
      
      <div className="mt-16 p-6 bg-gradient-to-r from-fresh-50 to-blue-50 border border-fresh-100 rounded-lg text-center">
        <h2 className="text-xl font-semibold mb-3">Want More Personalized Tracking?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          The Mission Fresh app offers detailed progress tracking and personalized insights on your journey.
        </p>
        <Button asChild className="bg-fresh-500 hover:bg-fresh-600">
          <a href="/sign-up">Create Free Account</a>
        </Button>
      </div>
    </div>
  );
};

export default Calculators;
