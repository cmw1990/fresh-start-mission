
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CravingsTabProps {
  cravingIntensity: number;
  setCravingIntensity: (value: number) => void;
  cravingTrigger: string;
  setCravingTrigger: (value: string) => void;
}

const CravingsTab = ({
  cravingIntensity,
  setCravingIntensity,
  cravingTrigger,
  setCravingTrigger
}: CravingsTabProps) => {
  return (
    <TabsContent value="cravings" className="space-y-4 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Craving Log</CardTitle>
          <CardDescription>
            Record details about your cravings today
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Label>
              Craving Intensity (1-10): {cravingIntensity === 1 ? "Very Mild" : cravingIntensity <= 3 ? "Mild" : cravingIntensity <= 6 ? "Moderate" : cravingIntensity <= 8 ? "Strong" : "Very Strong"}
            </Label>
            <Slider 
              value={[cravingIntensity]} 
              min={1} 
              max={10} 
              step={1} 
              onValueChange={(value) => setCravingIntensity(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="craving-trigger">Main Trigger</Label>
            <Select value={cravingTrigger} onValueChange={setCravingTrigger}>
              <SelectTrigger>
                <SelectValue placeholder="Select trigger" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stress">Stress</SelectItem>
                <SelectItem value="boredom">Boredom</SelectItem>
                <SelectItem value="social">Social Situation</SelectItem>
                <SelectItem value="food">After Eating</SelectItem>
                <SelectItem value="alcohol">Alcohol</SelectItem>
                <SelectItem value="coffee">Coffee/Caffeine</SelectItem>
                <SelectItem value="emotional">Emotional State</SelectItem>
                <SelectItem value="routine">Daily Routine</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default CravingsTab;
