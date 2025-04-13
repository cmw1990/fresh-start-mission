
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Heart, BedDouble, Activity, WatchIcon, Plus, Check, Droplets } from 'lucide-react';
import { toast } from 'sonner';
import { Progress } from "@/components/ui/progress";
import { useHaptics } from '@/hooks/useHaptics';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

// Example health data - in a real application, this would come from HealthKit/Google Fit
const EXAMPLE_SLEEP_DATA = [
  { date: '04/06', hours: 6.5 },
  { date: '04/07', hours: 7.2 },
  { date: '04/08', hours: 8.0 },
  { date: '04/09', hours: 6.8 },
  { date: '04/10', hours: 7.5 },
  { date: '04/11', hours: 7.7 },
  { date: '04/12', hours: 8.2 },
];

const EXAMPLE_HEART_DATA = [
  { date: '04/06', resting: 72 },
  { date: '04/07', resting: 70 },
  { date: '04/08', resting: 68 },
  { date: '04/09', resting: 71 },
  { date: '04/10', resting: 69 },
  { date: '04/11', resting: 67 },
  { date: '04/12', resting: 66 },
];

const EXAMPLE_HYDRATION_DATA = [
  { date: '04/06', amount: 1.2 },
  { date: '04/07', amount: 1.5 },
  { date: '04/08', amount: 2.1 },
  { date: '04/09', amount: 1.8 },
  { date: '04/10', amount: 2.3 },
  { date: '04/11', amount: 1.9 },
  { date: '04/12', amount: 2.2 },
];

interface HealthIntegrationItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  available: boolean;
  connected: boolean;
  onConnect: () => void;
}

const HealthIntegrationItem: React.FC<HealthIntegrationItemProps> = ({
  title,
  description,
  icon,
  available,
  connected,
  onConnect
}) => {
  return (
    <div className="flex justify-between items-center py-3">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 p-1.5 rounded-md bg-muted">
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-sm">{title}</h4>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      {!available ? (
        <Button variant="outline" size="sm" disabled>Coming Soon</Button>
      ) : connected ? (
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-500" />
          <span className="text-sm text-green-500">Connected</span>
        </div>
      ) : (
        <Button variant="default" size="sm" onClick={onConnect}>Connect</Button>
      )}
    </div>
  );
};

const AdvancedHealthIntegrations: React.FC = () => {
  const [connectedSources, setConnectedSources] = useState<string[]>(['steps', 'sleep']);
  const { triggerHaptic } = useHaptics();
  
  const handleConnect = (source: string) => {
    triggerHaptic('success');
    setConnectedSources(prev => [...prev, source]);
    toast.success(`Connected to ${source} data`, {
      description: "Your health data will now sync automatically."
    });
  };
  
  const isConnected = (source: string) => connectedSources.includes(source);
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Health Integrations</h1>
        <p className="text-muted-foreground">
          Connect your health data for a more complete picture of your wellness journey
        </p>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Connected Health Sources</CardTitle>
            <CardDescription>
              Manage which health data sources are connected to Mission Fresh
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <HealthIntegrationItem
              title="Step Counting"
              description="Track daily steps and earn rewards points"
              icon={<Activity className="h-4 w-4" />}
              available={true}
              connected={isConnected('steps')}
              onConnect={() => handleConnect('steps')}
            />
            
            <Separator />
            
            <HealthIntegrationItem
              title="Sleep Analysis"
              description="Track sleep patterns and their impact on cravings"
              icon={<BedDouble className="h-4 w-4" />}
              available={true}
              connected={isConnected('sleep')}
              onConnect={() => handleConnect('sleep')}
            />
            
            <Separator />
            
            <HealthIntegrationItem
              title="Heart Rate"
              description="Monitor resting heart rate improvements"
              icon={<Heart className="h-4 w-4" />}
              available={true}
              connected={isConnected('heart')}
              onConnect={() => handleConnect('heart')}
            />
            
            <Separator />
            
            <HealthIntegrationItem
              title="Hydration"
              description="Track water intake to support recovery"
              icon={<Droplets className="h-4 w-4" />}
              available={true}
              connected={isConnected('hydration')}
              onConnect={() => handleConnect('hydration')}
            />
            
            <Separator />
            
            <HealthIntegrationItem
              title="Blood Oxygen"
              description="See improvements in oxygen saturation levels"
              icon={<Activity className="h-4 w-4" />}
              available={false}
              connected={false}
              onConnect={() => {}}
            />
          </CardContent>
          <CardFooter className="justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-2">
              <Switch id="auto-sync" defaultChecked />
              <Label htmlFor="auto-sync">Auto-sync all available data</Label>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Custom Data Source
            </Button>
          </CardFooter>
        </Card>
        
        {/* Connected Health Data Visualization */}
        <Tabs defaultValue="sleep" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
            <TabsTrigger value="heart">Heart Rate</TabsTrigger>
            <TabsTrigger value="hydration">Hydration</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sleep">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BedDouble className="h-5 w-5" />
                  Sleep Analysis
                </CardTitle>
                <CardDescription>
                  Track how your sleep patterns affect nicotine cravings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={EXAMPLE_SLEEP_DATA}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 10]} />
                      <RechartsTooltip />
                      <Line 
                        type="monotone" 
                        dataKey="hours" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Your 7-day average</span>
                      <span className="text-sm font-medium">7.4 hrs</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-medium block">8.2 hrs</span>
                      <span className="text-xs text-muted-foreground">Last night</span>
                    </div>
                    <div>
                      <span className="font-medium block">11:22 PM</span>
                      <span className="text-xs text-muted-foreground">Average bedtime</span>
                    </div>
                    <div>
                      <span className="font-medium block">7:05 AM</span>
                      <span className="text-xs text-muted-foreground">Average wake time</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 text-blue-800 rounded-md mt-4">
                    <h4 className="text-sm font-medium">Sleep Insight</h4>
                    <p className="text-xs mt-1">
                      On days when you get 8+ hours of sleep, your reported craving intensity is 32% lower. Try to maintain consistent sleep patterns.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="heart">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Heart Rate Monitoring
                </CardTitle>
                <CardDescription>
                  Track improvements in your cardiovascular health
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={EXAMPLE_HEART_DATA}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[60, 80]} />
                      <RechartsTooltip />
                      <Line 
                        type="monotone" 
                        dataKey="resting" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="p-3 bg-green-50 text-green-800 rounded-md mt-6">
                  <h4 className="text-sm font-medium">Heart Rate Improvement</h4>
                  <p className="text-xs mt-1">
                    Your resting heart rate has decreased by 6 BPM since you started your journey. This is a positive sign of improving cardiovascular health!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="hydration">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Droplets className="h-5 w-5" />
                  Hydration Tracking
                </CardTitle>
                <CardDescription>
                  Track water intake to support recovery and reduce cravings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={EXAMPLE_HYDRATION_DATA}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <RechartsTooltip />
                      <Line 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#0ea5e9" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Today's goal (2.5L)</span>
                    <span className="text-sm font-medium">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                
                <div className="p-3 bg-blue-50 text-blue-800 rounded-md mt-4">
                  <h4 className="text-sm font-medium">Hydration Insight</h4>
                  <p className="text-xs mt-1">
                    On days when you drink over 2L of water, you report 27% fewer cravings. Staying hydrated can help manage withdrawal symptoms.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-1" />
                  Log Water Intake
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Wearable Device Connection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <WatchIcon className="h-5 w-5" />
              Connected Devices
            </CardTitle>
            <CardDescription>
              Add wearable devices for more detailed health tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center py-2 px-4 bg-muted/50 rounded-md">
                <div className="flex items-center gap-3">
                  <WatchIcon className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">Apple Watch</h4>
                    <p className="text-xs text-muted-foreground">Via Apple Health</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Connect</Button>
              </div>
              
              <div className="flex justify-between items-center py-2 px-4 bg-muted/50 rounded-md">
                <div className="flex items-center gap-3">
                  <WatchIcon className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">Fitbit</h4>
                    <p className="text-xs text-muted-foreground">Directly connect your device</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Connect</Button>
              </div>
              
              <div className="flex justify-between items-center py-2 px-4 bg-muted/50 rounded-md">
                <div className="flex items-center gap-3">
                  <WatchIcon className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">Google Fit</h4>
                    <p className="text-xs text-muted-foreground">For Android Wear devices</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Connect</Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full p-3 bg-yellow-50 text-yellow-800 rounded-md flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p className="text-xs">
                Your data privacy is important to us. Mission Fresh only accesses the health data you explicitly allow and never shares it with third parties.
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedHealthIntegrations;
