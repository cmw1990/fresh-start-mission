
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Bell, Calendar, Trophy, MessageSquare, Clock } from 'lucide-react';
import { saveUserPreferences, getUserPreferences } from '@/services/userPreferencesService';

type NotificationSetting = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  icon: React.ReactNode;
};

const NotificationPreferences = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      id: 'daily_reminders',
      title: 'Daily Reminders',
      description: 'Receive daily reminders to log your progress',
      enabled: true,
      icon: <Clock className="h-5 w-5 text-blue-500" />
    },
    {
      id: 'milestone_alerts',
      title: 'Milestone Alerts',
      description: 'Get notified when you reach important milestones',
      enabled: true,
      icon: <Trophy className="h-5 w-5 text-amber-500" />
    },
    {
      id: 'craving_support',
      title: 'Craving Support',
      description: 'Receive timely support during your typical craving times',
      enabled: true,
      icon: <MessageSquare className="h-5 w-5 text-purple-500" />
    },
    {
      id: 'check_ins',
      title: 'Weekly Check-ins',
      description: 'Get weekly summaries and encouragement',
      enabled: true,
      icon: <Calendar className="h-5 w-5 text-green-500" />
    }
  ]);

  // Fetch user notification preferences
  useEffect(() => {
    const fetchPreferences = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const preferences = await getUserPreferences();
        
        // If we have notification preferences saved, update our state
        if (preferences?.notifications) {
          setNotificationSettings(prev => 
            prev.map(setting => ({
              ...setting,
              enabled: preferences.notifications[setting.id] ?? setting.enabled
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching notification preferences:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPreferences();
  }, [user]);

  // Handle toggle change
  const handleToggleChange = (id: string) => {
    setNotificationSettings(prev => 
      prev.map(setting => 
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  // Save notification preferences
  const handleSave = async () => {
    if (!user) {
      toast.error('You must be logged in to save preferences');
      return;
    }
    
    setIsSaving(true);
    try {
      // Convert our settings to an object format for storage
      const notificationsObject = notificationSettings.reduce((acc, setting) => {
        acc[setting.id] = setting.enabled;
        return acc;
      }, {} as Record<string, boolean>);
      
      await saveUserPreferences({
        notifications: notificationsObject
      });
      
      toast.success('Notification preferences saved');
    } catch (error) {
      console.error('Error saving notification preferences:', error);
      toast.error('Failed to save preferences');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">Notification Preferences</CardTitle>
            <CardDescription>Customize when and how you receive notifications</CardDescription>
          </div>
          <Bell className="h-5 w-5 text-fresh-500" />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-6 text-center text-muted-foreground">Loading preferences...</div>
        ) : (
          <div className="space-y-6">
            {notificationSettings.map((setting) => (
              <div key={setting.id} className="flex items-start space-x-4">
                <div className="mt-0.5">{setting.icon}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`notification-${setting.id}`} className="font-medium">
                      {setting.title}
                    </Label>
                    <Switch 
                      id={`notification-${setting.id}`}
                      checked={setting.enabled}
                      onCheckedChange={() => handleToggleChange(setting.id)}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{setting.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSave} 
          disabled={isLoading || isSaving}
          className="w-full"
        >
          {isSaving ? 'Saving...' : 'Save Preferences'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationPreferences;
