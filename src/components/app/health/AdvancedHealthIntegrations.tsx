
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useHaptics, HapticImpact } from '@/hooks/useHaptics';
import { Activity, Heart, Battery, Zap, Check } from 'lucide-react';

interface HealthIntegrationProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  connected: boolean;
  onConnect: () => void;
}

const HealthIntegration: React.FC<HealthIntegrationProps> = ({
  title,
  description,
  icon,
  connected,
  onConnect
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-2 rounded-full">
            {icon}
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        {connected && <Check className="text-green-500" />}
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4">{description}</CardDescription>
        <Button 
          variant={connected ? "outline" : "default"} 
          onClick={onConnect}
          className="w-full"
        >
          {connected ? 'Manage Connection' : 'Connect'}
        </Button>
      </CardContent>
    </Card>
  );
};

const AdvancedHealthIntegrations = () => {
  const [connections, setConnections] = useState({
    appleHealth: false,
    googleFit: false,
    fitbit: false,
    garmin: false
  });
  
  const { impact, notification } = useHaptics(); // Make sure we're using the named exports correctly

  const handleConnect = (service: keyof typeof connections) => {
    setConnections(prev => ({
      ...prev,
      [service]: !prev[service]
    }));
    
    // Use the correct haptic function from useHaptics
    if (!connections[service]) {
      notification('SUCCESS'); // Use notification instead of triggerHaptic
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Health Integrations</h2>
      <p className="text-muted-foreground">
        Connect your health tracking devices and apps to enhance your wellness journey.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <HealthIntegration
          title="Apple Health"
          description="Connect your Apple Health data to sync steps, sleep, and active energy."
          icon={<Activity className="text-blue-500" />}
          connected={connections.appleHealth}
          onConnect={() => handleConnect('appleHealth')}
        />
        
        <HealthIntegration
          title="Google Fit"
          description="Connect Google Fit to track your activity and wellness metrics."
          icon={<Heart className="text-green-500" />}
          connected={connections.googleFit}
          onConnect={() => handleConnect('googleFit')}
        />
        
        <HealthIntegration
          title="Fitbit"
          description="Sync your Fitbit device data including steps, sleep, and heart rate."
          icon={<Zap className="text-purple-500" />}
          connected={connections.fitbit}
          onConnect={() => handleConnect('fitbit')}
        />
        
        <HealthIntegration
          title="Garmin Connect"
          description="Connect your Garmin device to track your fitness and health metrics."
          icon={<Battery className="text-orange-500" />}
          connected={connections.garmin}
          onConnect={() => handleConnect('garmin')}
        />
      </div>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Health Data Permissions</CardTitle>
            <CardDescription>
              Manage what health data you want to share with the app
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">Steps</Button>
              <Button variant="outline" size="sm">Heart Rate</Button>
              <Button variant="outline" size="sm">Sleep</Button>
              <Button variant="outline" size="sm">Activity</Button>
              <Button variant="outline" size="sm">Workouts</Button>
              <Button variant="outline" size="sm">Mindfulness</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedHealthIntegrations;
