
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Settings } from 'lucide-react';

interface Widget {
  id: string;
  name: string;
}

interface WidgetCustomizerProps {
  activeWidgets?: string[];
  onWidgetsChange?: (widgets: string[]) => void;
}

export const WidgetCustomizer: React.FC<WidgetCustomizerProps> = ({ 
  activeWidgets = ['stats', 'cravings', 'holistic', 'steps', 'actions'],
  onWidgetsChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>(activeWidgets);
  
  const availableWidgets: Widget[] = [
    { id: 'stats', name: 'Statistics Cards' },
    { id: 'cravings', name: 'Craving Intensity Chart' },
    { id: 'holistic', name: 'Holistic Metrics Chart' },
    { id: 'steps', name: 'Step Tracker' },
    { id: 'actions', name: 'Quick Actions' },
    { id: 'ai', name: 'AI Insights' },
  ];

  const handleToggleWidget = (widgetId: string) => {
    setSelectedWidgets(prev => {
      if (prev.includes(widgetId)) {
        return prev.filter(id => id !== widgetId);
      } else {
        return [...prev, widgetId];
      }
    });
  };

  const handleSave = () => {
    if (onWidgetsChange) {
      onWidgetsChange(selectedWidgets);
    }
    setIsOpen(false);
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="fixed bottom-4 right-4 flex items-center gap-1"
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
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WidgetCustomizer;
