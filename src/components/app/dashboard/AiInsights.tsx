
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, AlertCircle, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type InsightType = 'pattern' | 'suggestion' | 'achievement' | 'warning';

interface Insight {
  id: string;
  type: InsightType;
  title: string;
  description: string;
  relevanceScore: number;
  generatedAt: string;
}

// This would ideally come from your backend, but for now we'll simulate insights
const fetchInsights = async (userId: string): Promise<Insight[]> => {
  try {
    // In a real implementation, this would call a Supabase Edge Function
    // that analyzes the user's data and generates insights
    
    // For demo purposes, get user's logs to generate basic insights
    const { data: logs, error: logsError } = await supabase
      .from('nicotine_logs')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(30);
    
    if (logsError) throw logsError;
    
    // Very basic pattern detection - in production this would use more sophisticated algorithms
    // or potentially call an external AI service via Edge Functions
    const insights: Insight[] = [];
    
    if (logs && logs.length > 0) {
      // Check for nicotine-free days
      const nicotineFreeCount = logs.filter(log => !log.used_nicotine).length;
      if (nicotineFreeCount > 0) {
        insights.push({
          id: 'nicotine-free-days',
          type: 'achievement',
          title: `${nicotineFreeCount} Nicotine-Free Days Recently`,
          description: `You've had ${nicotineFreeCount} nicotine-free days in your recent logs. That's a significant achievement!`,
          relevanceScore: 95,
          generatedAt: new Date().toISOString()
        });
      }
      
      // Look for patterns with sleep and cravings
      const sleepImpact = logs.some(log => 
        log.sleep_hours < 6 && log.craving_intensity > 7
      );
      
      if (sleepImpact) {
        insights.push({
          id: 'sleep-craving-correlation',
          type: 'pattern',
          title: 'Sleep May Be Affecting Your Cravings',
          description: 'We noticed a pattern: on days when you sleep less than 6 hours, you tend to experience stronger cravings. Consider prioritizing sleep as part of your strategy.',
          relevanceScore: 90,
          generatedAt: new Date().toISOString()
        });
      }
      
      // Check mood patterns
      const lowMoodDays = logs.filter(log => log.mood < 3).length;
      if (lowMoodDays > 3) {
        insights.push({
          id: 'mood-management',
          type: 'suggestion',
          title: 'Consider Mood Support Tools',
          description: `You've reported lower mood on several days recently. Try exploring our Mood Tools section for exercises that might help improve your emotional wellbeing.`,
          relevanceScore: 85,
          generatedAt: new Date().toISOString()
        });
      }
      
      // Add more insights based on other patterns...
    }
    
    // If no data-driven insights, provide some general ones
    if (insights.length === 0) {
      insights.push({
        id: 'general-tip',
        type: 'suggestion',
        title: 'Track Consistently for Personalized Insights',
        description: 'The more consistently you log your data, the more personalized insights our system can generate for you. Try logging daily for at least a week.',
        relevanceScore: 70,
        generatedAt: new Date().toISOString()
      });
    }
    
    return insights.sort((a, b) => b.relevanceScore - a.relevanceScore);
    
  } catch (error) {
    console.error('Error fetching insights:', error);
    throw error;
  }
};

const InsightCard: React.FC<{ insight: Insight }> = ({ insight }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const getTypeColor = (type: InsightType) => {
    switch (type) {
      case 'pattern': return 'bg-blue-100 text-blue-800';
      case 'suggestion': return 'bg-purple-100 text-purple-800';
      case 'achievement': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getTypeLabel = (type: InsightType) => {
    switch (type) {
      case 'pattern': return 'Pattern';
      case 'suggestion': return 'Suggestion';
      case 'achievement': return 'Achievement';
      case 'warning': return 'Attention';
      default: return 'Insight';
    }
  };
  
  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={setIsOpen} 
      className="border rounded-md mb-3 overflow-hidden transition-all duration-200 hover:border-muted-foreground/30"
    >
      <div className="p-4 cursor-pointer flex items-center justify-between" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-3">
          <Badge className={getTypeColor(insight.type)}>{getTypeLabel(insight.type)}</Badge>
          <h4 className="text-sm font-medium">{insight.title}</h4>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="p-1 h-auto">
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="px-4 pb-4 pt-0 text-sm text-muted-foreground">
          <p>{insight.description}</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const AiInsights: React.FC = () => {
  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data.user;
    }
  });
  
  const { 
    data: insights, 
    isLoading, 
    isError,
    refetch,
    isRefetching
  } = useQuery({
    queryKey: ['userInsights', user?.id],
    queryFn: () => user ? fetchInsights(user.id) : Promise.resolve([]),
    enabled: !!user,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
  
  const handleRefresh = () => {
    refetch();
    toast.success("Refreshing insights...");
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
            AI-Powered Insights
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 px-2"
            onClick={handleRefresh}
            disabled={isLoading || isRefetching}
          >
            <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <CardDescription>
          Personalized observations based on your data
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-full" />
                </div>
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="py-6 text-center text-muted-foreground">
            <AlertCircle className="mx-auto h-8 w-8 mb-2" />
            <p>Unable to generate insights right now</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh} 
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        ) : insights && insights.length > 0 ? (
          <div>
            {insights.map(insight => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-muted-foreground">
            <p>No insights available yet. Continue logging data to receive personalized insights.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AiInsights;
