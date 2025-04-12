
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DashboardWidget, updateDashboardWidgets } from "@/services/userPreferencesService";
import { toast } from "sonner";
import { Settings } from "lucide-react";

interface WidgetOption {
  id: DashboardWidget;
  label: string;
}

const WIDGET_OPTIONS: WidgetOption[] = [
  { id: 'keyStats', label: 'Key Statistics' },
  { id: 'wellness', label: 'Wellness Metrics' },
  { id: 'milestone', label: 'Next Milestone' },
  { id: 'quote', label: 'Motivational Quote' },
  { id: 'supportTools', label: 'Support Tools' }
];

interface Props {
  activeWidgets: DashboardWidget[];
  onWidgetsChange: (widgets: DashboardWidget[]) => void;
}

export const WidgetCustomizer = ({ activeWidgets, onWidgetsChange }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedWidgets, setSelectedWidgets] = useState<DashboardWidget[]>(activeWidgets);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      if (selectedWidgets.length === 0) {
        toast.error("Please select at least one widget to display");
        return;
      }
      
      await updateDashboardWidgets(selectedWidgets);
      onWidgetsChange(selectedWidgets);
      toast.success("Dashboard preferences saved");
      setOpen(false);
    } catch (error) {
      console.error("Error saving widget preferences:", error);
      toast.error("Failed to save preferences. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleWidget = (widget: DashboardWidget) => {
    setSelectedWidgets(prev => {
      if (prev.includes(widget)) {
        return prev.filter(w => w !== widget);
      } else {
        return [...prev, widget];
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8" title="Customize Dashboard">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Customize Dashboard</DialogTitle>
          <DialogDescription>
            Select which widgets you want to see on your dashboard.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          {WIDGET_OPTIONS.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox 
                id={option.id}
                checked={selectedWidgets.includes(option.id)}
                onCheckedChange={() => toggleWidget(option.id)}
              />
              <label 
                htmlFor={option.id} 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WidgetCustomizer;
