
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from "@tanstack/react-query";
import { getUserPreferences, updateDashboardWidgets } from "@/services/userPreferencesService";
import { DashboardWidget } from "@/services/userPreferencesService";
import { QuoteCard } from "@/components/app/dashboard/QuoteCard";
import { Skeleton } from "@/components/ui/skeleton";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

// Create placeholder dashboard widget components
const KeyStatsCard = () => (
  <div className="p-6 bg-white rounded-lg shadow-sm">
    <h3 className="text-lg font-medium">Key Stats</h3>
    <p className="text-sm text-muted-foreground">Your progress at a glance</p>
    <div className="mt-4">
      <Skeleton className="h-16 w-full" />
    </div>
  </div>
);

const WellnessCard = () => (
  <div className="p-6 bg-white rounded-lg shadow-sm">
    <h3 className="text-lg font-medium">Wellness Metrics</h3>
    <p className="text-sm text-muted-foreground">How you're feeling</p>
    <div className="mt-4">
      <Skeleton className="h-16 w-full" />
    </div>
  </div>
);

const MilestoneCard = () => (
  <div className="p-6 bg-white rounded-lg shadow-sm">
    <h3 className="text-lg font-medium">Milestones</h3>
    <p className="text-sm text-muted-foreground">Your achievements</p>
    <div className="mt-4">
      <Skeleton className="h-16 w-full" />
    </div>
  </div>
);

const SupportToolsCard = () => (
  <div className="p-6 bg-white rounded-lg shadow-sm">
    <h3 className="text-lg font-medium">Support Tools</h3>
    <p className="text-sm text-muted-foreground">Help when you need it</p>
    <div className="mt-4 space-y-2">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </div>
  </div>
);

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
            <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
