
import React from 'react';
import { useStepTracking } from '@/hooks/useStepTracking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Award, Gift } from 'lucide-react';
import { format } from 'date-fns';

const Rewards = () => {
  const { stepData, isLoading } = useStepTracking();
  
  // Mock data for rewards
  const availablePoints = 2500;
  const rewards = [
    { id: 1, name: '10% Off Premium Subscription', points: 2000, claimed: false },
    { id: 2, name: 'Digital Badge - Step Master', points: 1000, claimed: true },
    { id: 3, name: '20% Off Premium Subscription', points: 5000, claimed: false },
  ];
  
  // Mock history data
  const rewardsHistory = [
    { id: 1, name: '5% Off Premium Subscription', points: 1000, date: '2025-04-01' },
    { id: 2, name: 'Digital Badge - Fresh Start', points: 500, date: '2025-03-15' },
  ];

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">Rewards</h1>
      <p className="text-muted-foreground mb-6">Earn points and claim rewards for your progress</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Step Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="mr-2 h-5 w-5 text-amber-500" />
              Step Rewards
            </CardTitle>
            <CardDescription>Get points for your daily steps</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between mb-2">
              <div>
                <p className="text-sm font-medium">Today's Steps</p>
                <p className="text-3xl font-bold">{stepData.steps.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">
                  {stepData.lastUpdated && `Last updated: ${format(stepData.lastUpdated, 'h:mm a')}`}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Points Earned Today</p>
                <p className="text-3xl font-bold text-amber-500">{Math.floor(stepData.steps / 100)}</p>
                <p className="text-xs text-muted-foreground">1 point per 100 steps</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Progress to goal (10,000 steps)</span>
                <span>{Math.min(100, Math.round((stepData.steps / 10000) * 100))}%</span>
              </div>
              <Progress value={Math.min(100, (stepData.steps / 10000) * 100)} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        {/* Points Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="mr-2 h-5 w-5 text-indigo-500" />
              Points Balance
            </CardTitle>
            <CardDescription>Spend your points on rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100 mb-4">
              <p className="text-sm font-medium text-indigo-700">Available Points</p>
              <p className="text-3xl font-bold text-indigo-700">{availablePoints.toLocaleString()}</p>
            </div>
            
            <h3 className="font-medium mb-3">Available Rewards</h3>
            <div className="space-y-3">
              {rewards.map(reward => (
                <div key={reward.id} className="flex items-center justify-between border rounded-lg p-3">
                  <div>
                    <div className="flex items-center">
                      <Gift className="h-4 w-4 mr-2 text-indigo-400" />
                      <span className="font-medium">{reward.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{reward.points.toLocaleString()} points</p>
                  </div>
                  <Button 
                    variant={reward.claimed ? "outline" : "default"}
                    size="sm"
                    disabled={reward.claimed || availablePoints < reward.points}
                  >
                    {reward.claimed ? "Claimed" : "Claim"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Reward History */}
      <Card>
        <CardHeader>
          <CardTitle>Reward History</CardTitle>
          <CardDescription>Previously claimed rewards</CardDescription>
        </CardHeader>
        <CardContent>
          {rewardsHistory.length > 0 ? (
            <div className="space-y-4">
              {rewardsHistory.map(item => (
                <div key={item.id} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(item.date), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-red-500">-{item.points.toLocaleString()} points</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-4">No rewards claimed yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Rewards;
