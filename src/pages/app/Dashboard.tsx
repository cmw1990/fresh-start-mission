import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from "@tanstack/react-query";
import { getUserPreferences } from "@/services/userPreferencesService";
import { DashboardWidget } from "@/services/userPreferencesService";
import { updateDashboardWidgets } from "@/services/userPreferencesService";
import { KeyStatsCard } from "@/components/app/dashboard/KeyStatsCard";
import { WellnessCard } from "@/components/app/dashboard/WellnessCard";
import { MilestoneCard } from "@/components/app/dashboard/MilestoneCard";
import { QuoteCard } from "@/components/app/dashboard/QuoteCard";
import { SupportToolsCard } from "@/components/app/dashboard/SupportToolsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Replace the existing useQuery for preferences with this fixed version
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
