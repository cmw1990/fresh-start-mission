
import React from 'react';
import PageBreadcrumb from '@/components/common/PageBreadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Community = () => {
  return (
    <div className="p-6">
      <PageBreadcrumb />
      
      <h1 className="text-3xl font-bold mb-6">Community</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Community Feed</CardTitle>
            <CardDescription>Connect with others on their journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">Community features coming soon!</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Share your progress and milestones</li>
                <li>Connect with others on similar journeys</li>
                <li>Join support groups and discussions</li>
                <li>Get encouragement from the community</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Success Stories</CardTitle>
            <CardDescription>Inspiration from the community</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Success stories will appear here soon.</p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              Submit Your Story
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Community;
