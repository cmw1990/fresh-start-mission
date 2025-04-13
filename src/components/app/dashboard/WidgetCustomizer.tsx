
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Settings, Loader2 } from 'lucide-react';
import { useHaptics, HapticImpact } from '@/hooks/useHaptics';
import { updateUserPreferences, getUserPreferences } from '@/services/userPreferencesService';
import { toast } from 'sonner';

interface Widget {
  id: string;
  name: string;
}

interface WidgetCustomizerProps {
  activeWidgets?: string[];
  onWidgetsChange?: (widgets: string[]) => void;
}

export const WidgetCustomizer: React.FC<WidgetCustomizerProps> = ({ 
  activeWidgets: propActiveWidgets,
  onWidgetsChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { impact } = useHaptics();
  
  const availableWidgets: Widget[] = [
    { id: 'stats', name: 'Statistics Cards' },
    { id: 'cravings', name: 'Craving Intensity Chart' },
    { id: 'holistic', name: 'Holistic Metrics Chart' },
    { id: 'steps', name: 'Step Tracker' },
    { id: 'actions', name: 'Quick Actions' },
    { id: 'ai', name: 'AI Insights' },
    { id: 'quote', name: 'Motivational Quote' },
  ];

  // Load user preferences when component mounts
  useEffect(() => {
    async function loadPreferences() {
      try {
        setIsLoading(true);
        const preferences = await getUserPreferences();
        
        if (preferences.dashboard_widgets && preferences.dashboard_widgets.length > 0) {
          setSelectedWidgets(preferences.dashboard_widgets);
        } else if (propActiveWidgets) {
          setSelectedWidgets(propActiveWidgets);
        } else {
          // Default widgets
          setSelectedWidgets(['stats', 'cravings', 'holistic', 'steps', 'actions']);
        }
      } catch (error) {
        console.error('Error loading preferences:', error);
        // Fall back to props or defaults
        setSelectedWidgets(propActiveWidgets || ['stats', 'cravings', 'holistic', 'steps', 'actions']);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadPreferences();
  }, [propActiveWidgets]);

  const handleToggleWidget = (widgetId: string) => {
    setSelectedWidgets(prev => {
      if (prev.includes(widgetId)) {
        return prev.filter(id => id !== widgetId);
      } else {
        return [...prev, widgetId];
      }
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save to user preferences in database
      await updateUserPreferences({ dashboard_widgets: selectedWidgets });
      
      // Notify parent component if callback provided
      if (onWidgetsChange) {
        onWidgetsChange(selectedWidgets);
      }
      
      // Provide haptic feedback
      impact(HapticImpact.LIGHT);
      toast.success("Dashboard layout saved");
      setIsOpen(false);
    } catch (error) {
      console.error('Error saving widget preferences:', error);
      toast.error("Failed to save dashboard layout");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="fixed bottom-4 right-4 flex items-center gap-1 z-10"
        onClick={() => setIsOpen(true)}
      >
        <Settings size={16} />
        <span>Customize Dashboard</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customize Dashboard</DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Select which widgets to display on your dashboard.
            </p>
            
            {isLoading ? (
              <div className="flex justify-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="space-y-3">
                {availableWidgets.map((widget) => (
                  <div key={widget.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`widget-${widget.id}`} 
                      checked={selectedWidgets.includes(widget.id)}
                      onCheckedChange={() => handleToggleWidget(widget.id)} 
                    />
                    <label 
                      htmlFor={`widget-${widget.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {widget.name}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleSave} 
              disabled={isSaving || isLoading}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WidgetCustomizer;
