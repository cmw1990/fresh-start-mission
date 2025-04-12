
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

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
}

const WellnessTab = ({
  mood,
  setMood,
  energy,
  setEnergy,
  focus,
  setFocus,
  sleepHours,
  setSleepHours,
  sleepQuality,
  setSleepQuality
}: WellnessTabProps) => {
  return (
    <TabsContent value="wellness" className="space-y-4 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Holistic Wellness</CardTitle>
          <CardDescription>
            Track your mood, energy, focus, and sleep
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>
              Mood (1-5): {mood === 1 ? "Very Low" : mood === 2 ? "Low" : mood === 3 ? "Neutral" : mood === 4 ? "Good" : "Excellent"}
            </Label>
            <Slider 
              value={[mood]} 
              min={1} 
              max={5} 
              step={1} 
              onValueChange={(value) => setMood(value[0])}
            />
          </div>

          <div className="space-y-4">
            <Label>
              Energy (1-5): {energy === 1 ? "Very Low" : energy === 2 ? "Low" : energy === 3 ? "Moderate" : energy === 4 ? "High" : "Very High"}
            </Label>
            <Slider 
              value={[energy]} 
              min={1} 
              max={5} 
              step={1} 
              onValueChange={(value) => setEnergy(value[0])}
            />
          </div>

          <div className="space-y-4">
            <Label>
              Focus (1-5): {focus === 1 ? "Very Poor" : focus === 2 ? "Poor" : focus === 3 ? "Moderate" : focus === 4 ? "Good" : "Excellent"}
            </Label>
            <Slider 
              value={[focus]} 
              min={1} 
              max={5} 
              step={1} 
              onValueChange={(value) => setFocus(value[0])}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sleep-hours">Hours of Sleep</Label>
              <Input 
                id="sleep-hours" 
                type="number" 
                min="0" 
                max="24" 
                step="0.5" 
                value={sleepHours} 
                onChange={(e) => setSleepHours(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>
                Sleep Quality (1-5): {sleepQuality === 1 ? "Very Poor" : sleepQuality === 2 ? "Poor" : sleepQuality === 3 ? "Fair" : sleepQuality === 4 ? "Good" : "Excellent"}
              </Label>
              <Slider 
                value={[sleepQuality]} 
                min={1} 
                max={5} 
                step={1} 
                onValueChange={(value) => setSleepQuality(value[0])}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default WellnessTab;
