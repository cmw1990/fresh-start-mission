
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from "@tanstack/react-query";
import { getUserPreferences, updateDashboardWidgets, DashboardWidget } from "@/services/userPreferencesService";
import { QuoteCard } from "@/components/app/dashboard/QuoteCard";
import { Skeleton } from "@/components/ui/skeleton";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { getRecentLogStats } from "@/services/logService";
import { getUserGoal } from "@/services/goalService";

// Create stats card component
const KeyStatsCard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['log-stats'],
    queryFn: getRecentLogStats,
  });

  const { data: goal } = useQuery({
    queryKey: ['user-goal'],
    queryFn: getUserGoal,
  });

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
        <h3 className="text-lg font-medium">Key Stats</h3>
        <p className="text-sm text-muted-foreground">Your progress at a glance</p>
        <div className="mt-4">
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    );
  }

  const isAfreshGoal = goal?.goal_type === 'afresh';
  const mainMetric = isAfreshGoal ? (
    <div className="flex items-center mb-2">
      <div className="text-3xl font-bold text-fresh-500">{stats?.daysAfresh || 0}</div>
      <div className="ml-2 text-sm text-muted-foreground">Days Afresh</div>
    </div>
  ) : (
    <div className="flex items-center mb-2">
      <div className="text-3xl font-bold text-fresh-500">{goal?.reduction_percent || 0}%</div>
      <div className="ml-2 text-sm text-muted-foreground">Reduction Goal</div>
    </div>
  );
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
      <h3 className="text-lg font-medium">Key Stats</h3>
      <p className="text-sm text-muted-foreground">Your progress at a glance</p>
      <div className="mt-4 space-y-3">
        {mainMetric}
        
        <div className="flex items-center mb-2">
          <div className="text-2xl font-bold text-green-500">${stats?.moneySaved || 0}</div>
          <div className="ml-2 text-sm text-muted-foreground">Money Saved</div>
        </div>
        
        <div className="flex items-center mb-2">
          <div className="text-2xl font-bold text-blue-500">{stats?.lifeRegained}</div>
          <div className="ml-2 text-sm text-muted-foreground">Life Regained</div>
        </div>
        
        <div className="flex items-center">
          <div className="text-xl font-bold text-amber-500">{stats?.recentCravings || 0}</div>
          <div className="ml-2 text-sm text-muted-foreground">Cravings (Last 7 Days)</div>
        </div>
      </div>
    </div>
  );
};

const WellnessCard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['log-stats'],
    queryFn: getRecentLogStats,
  });

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
        <h3 className="text-lg font-medium">Wellness Metrics</h3>
        <p className="text-sm text-muted-foreground">How you're feeling</p>
        <div className="mt-4">
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    );
  }

  // Helper function to render wellness metric
  const renderMetric = (label: string, value: number, max: number = 5) => {
    const percentage = (value / max) * 100;
    return (
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-sm text-muted-foreground">{value}/{max}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div 
            className={`h-2.5 rounded-full ${label === 'Mood' ? 'bg-yellow-400' : label === 'Energy' ? 'bg-green-500' : 'bg-blue-500'}`} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
      <h3 className="text-lg font-medium">Wellness Metrics</h3>
      <p className="text-sm text-muted-foreground">How you're feeling</p>
      <div className="mt-4">
        {renderMetric('Mood', stats?.avgMood || 0)}
        {renderMetric('Energy', stats?.avgEnergy || 0)}
        {renderMetric('Focus', stats?.avgFocus || 0)}
      </div>
    </div>
  );
};

const MilestoneCard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['log-stats'],
    queryFn: getRecentLogStats,
  });

  // Calculate next milestone
  const calculateNextMilestone = (daysAfresh: number) => {
    const milestones = [1, 3, 7, 14, 30, 60, 90, 180, 365];
    const nextMilestone = milestones.find(m => m > daysAfresh) || (daysAfresh + 30);
    const daysToGo = nextMilestone - daysAfresh;
    return { days: nextMilestone, daysToGo };
  };

  // Format date for next milestone
  const getNextMilestoneDate = (daysToGo: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToGo);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
        <h3 className="text-lg font-medium">Milestones</h3>
        <p className="text-sm text-muted-foreground">Your achievements</p>
        <div className="mt-4">
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    );
  }

  const daysAfresh = stats?.daysAfresh || 0;
  const { days: nextMilestone, daysToGo } = calculateNextMilestone(daysAfresh);
  const nextDate = getNextMilestoneDate(daysToGo);

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
      <h3 className="text-lg font-medium">Milestones</h3>
      <p className="text-sm text-muted-foreground">Your achievements</p>
      <div className="mt-4">
        {daysAfresh > 0 ? (
          <>
            <div className="text-sm mb-2">
              {daysAfresh === 1 ? (
                <span className="font-medium">Congratulations on your first day afresh!</span>
              ) : (
                <span className="font-medium">You've been afresh for {daysAfresh} days!</span>
              )}
            </div>
            <div className="mt-4 border-t pt-3">
              <span className="text-sm">Next milestone: <span className="font-medium">{nextMilestone} days</span></span>
              <div className="flex items-center mt-1">
                <div className="flex-grow bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className="h-2.5 rounded-full bg-fresh-400" 
                    style={{ width: `${(daysAfresh / nextMilestone) * 100}%` }}
                  ></div>
                </div>
                <div className="ml-3 text-sm text-muted-foreground">{daysToGo} to go</div>
              </div>
              <div className="text-sm text-muted-foreground mt-1">Target date: {nextDate}</div>
            </div>
          </>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            <p>Start your fresh journey to see your milestones!</p>
          </div>
        )}
      </div>
    </div>
  );
};

const SupportToolsCard = () => {
  const navigate = useNavigate();
  
  const toolButtons = [
    { name: "Cravings", path: "/app/tools/cravings", color: "bg-red-100 text-red-800" },
    { name: "Energy", path: "/app/tools/energy", color: "bg-green-100 text-green-800" },
    { name: "Mood", path: "/app/tools/mood", color: "bg-yellow-100 text-yellow-800" },
    { name: "Focus", path: "/app/tools/focus", color: "bg-blue-100 text-blue-800" },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
      <h3 className="text-lg font-medium">Support Tools</h3>
      <p className="text-sm text-muted-foreground">Help when you need it</p>
      <div className="mt-4 space-y-2">
        {toolButtons.map((tool) => (
          <button
            key={tool.name}
            onClick={() => navigate(tool.path)}
            className={`w-full text-left px-4 py-2 rounded-md font-medium ${tool.color} hover:opacity-90 transition-opacity`}
          >
            {tool.name} Tools
          </button>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Use react-query for preferences
  const { data: preferences } = useQuery({
    queryKey: ['user-preferences'],
    queryFn: getUserPreferences,
  });

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      preferences?.dashboard_widgets || [],
      result.source.index,
      result.destination.index
    );

    updateDashboardWidgets(items as DashboardWidget[]);
  };

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const dashboardWidgets = preferences?.dashboard_widgets || ['keyStats', 'wellness', 'milestone', 'quote', 'supportTools'];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="dashboard">
          {(provided) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef} 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {dashboardWidgets.map((widget, index) => (
                <Draggable key={widget} draggableId={widget} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {widget === 'keyStats' && <KeyStatsCard />}
                      {widget === 'wellness' && <WellnessCard />}
                      {widget === 'milestone' && <MilestoneCard />}
                      {widget === 'quote' && <QuoteCard />}
                      {widget === 'supportTools' && <SupportToolsCard />}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Dashboard;
