
import React from 'react';
import PageBreadcrumb from '@/components/common/PageBreadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HealthIntegrations = () => {
  return (
    <div className="p-6">
      <PageBreadcrumb />
      
      <h1 className="text-3xl font-bold mb-6">Health Integrations</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Apple Health</CardTitle>
            <CardDescription>iOS health data integration</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Connect to Apple Health to sync your steps, sleep data, and other health metrics.
            </p>
            <Button variant="outline">Connect</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Google Fit</CardTitle>
            <CardDescription>Android health data integration</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Connect to Google Fit to sync your steps, sleep data, and other health metrics.
            </p>
            <Button variant="outline">Connect</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Wearable Devices</CardTitle>
            <CardDescription>Connect your fitness trackers</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Link your wearable devices to track health metrics in real-time.
            </p>
            <Button variant="outline">Connect Device</Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Health Data Privacy</CardTitle>
            <CardDescription>How we handle your health information</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-2">
              We take your privacy seriously. Your health data is:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Encrypted and stored securely</li>
              <li>Never shared with third parties without your consent</li>
              <li>Only used to provide personalized insights and recommendations</li>
              <li>Deletable at any time from your account settings</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthIntegrations;
