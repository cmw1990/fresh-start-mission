
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertCircle, Smile, Frown, Meh } from "lucide-react";

interface WellnessTabProps {
  mood: number;
  setMood: (value: number) => void;
  energy: number;
  setEnergy: (value: number) => void;
  focus: number;
  setFocus: (value: number) => void;
  sleepHours: string;
  setSleepHours: (value: string) => void;
  sleepQuality: number;
  setSleepQuality: (value: number) => void;
  errors?: Record<string, string>;
}

const WellnessTab: React.FC<WellnessTabProps> = ({
  mood,
  setMood,
  energy,
  setEnergy,
  focus,
  setFocus,
  sleepHours,
  setSleepHours,
  sleepQuality,
  setSleepQuality,
  errors = {}
}) => {
  const getLabelText = (value: number, type: string) => {
    if (type === "mood") {
      switch (value) {
        case 1: return "Very Unhappy";
        case 2: return "Unhappy";
        case 3: return "Neutral";
        case 4: return "Happy";
        case 5: return "Very Happy";
        default: return "Unknown";
      }
    } else if (type === "energy") {
      switch (value) {
        case 1: return "Exhausted";
        case 2: return "Tired";
        case 3: return "Average";
        case 4: return "Energetic";
        case 5: return "Very Energetic";
        default: return "Unknown";
      }
    } else if (type === "focus") {
      switch (value) {
        case 1: return "Very Unfocused";
        case 2: return "Unfocused";
        case 3: return "Average";
        case 4: return "Focused";
        case 5: return "Highly Focused";
        default: return "Unknown";
      }
    } else if (type === "sleepQuality") {
      switch (value) {
        case 1: return "Very Poor";
        case 2: return "Poor";
        case 3: return "Average";
        case 4: return "Good";
        case 5: return "Excellent";
        default: return "Unknown";
      }
    }
    return "Unknown";
  };

  const getIcon = (value: number) => {
    if (value <= 2) return <Frown className="h-5 w-5 text-red-500" />;
    if (value === 3) return <Meh className="h-5 w-5 text-yellow-500" />;
    return <Smile className="h-5 w-5 text-green-500" />;
  };

  return (
    <TabsContent value="wellness" className="space-y-4 py-4">
      <Card>
        <CardHeader>
          <CardTitle>Wellness Metrics</CardTitle>
          <CardDescription>
            Track your emotional and physical well-being
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Mood Today</Label>
                <div className="flex items-center space-x-1">
                  {getIcon(mood)}
                  <span className="text-sm font-medium">{getLabelText(mood, "mood")}</span>
                </div>
              </div>
              <Slider
                defaultValue={[mood]}
                min={1}
                max={5}
                step={1}
                onValueChange={(values) => setMood(values[0])}
              />
              {errors.mood && (
                <div className="flex items-center text-destructive mt-2 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>{errors.mood}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Energy Level</Label>
                <div className="flex items-center space-x-1">
                  {getIcon(energy)}
                  <span className="text-sm font-medium">{getLabelText(energy, "energy")}</span>
                </div>
              </div>
              <Slider
                defaultValue={[energy]}
                min={1}
                max={5}
                step={1}
                onValueChange={(values) => setEnergy(values[0])}
              />
              {errors.energy && (
                <div className="flex items-center text-destructive mt-2 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>{errors.energy}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Focus Level</Label>
                <div className="flex items-center space-x-1">
                  {getIcon(focus)}
                  <span className="text-sm font-medium">{getLabelText(focus, "focus")}</span>
                </div>
              </div>
              <Slider
                defaultValue={[focus]}
                min={1}
                max={5}
                step={1}
                onValueChange={(values) => setFocus(values[0])}
              />
              {errors.focus && (
                <div className="flex items-center text-destructive mt-2 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>{errors.focus}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sleep-hours">Hours of Sleep Last Night</Label>
              <Input
                id="sleep-hours"
                type="number"
                min="0"
                max="24"
                step="0.5"
                placeholder="Hours slept"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
              />
              {errors.sleepHours && (
                <div className="flex items-center text-destructive mt-2 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>{errors.sleepHours}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Sleep Quality</Label>
                <div className="flex items-center space-x-1">
                  {getIcon(sleepQuality)}
                  <span className="text-sm font-medium">{getLabelText(sleepQuality, "sleepQuality")}</span>
                </div>
              </div>
              <Slider
                defaultValue={[sleepQuality]}
                min={1}
                max={5}
                step={1}
                onValueChange={(values) => setSleepQuality(values[0])}
              />
              {errors.sleepQuality && (
                <div className="flex items-center text-destructive mt-2 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>{errors.sleepQuality}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default WellnessTab;
