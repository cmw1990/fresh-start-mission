
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";

interface CravingsTabProps {
  cravingIntensity: number;
  setCravingIntensity: (value: number) => void;
  cravingTrigger: string;
  setCravingTrigger: (value: string) => void;
  errors?: Record<string, string>;
}

const CravingsTab: React.FC<CravingsTabProps> = ({
  cravingIntensity,
  setCravingIntensity,
  cravingTrigger,
  setCravingTrigger,
  errors = {}
}) => {
  const getIntensityLabel = (value: number) => {
    if (value <= 2) return "Barely Noticeable";
    if (value <= 4) return "Mild";
    if (value <= 6) return "Moderate";
    if (value <= 8) return "Strong";
    return "Extreme";
  };

  return (
    <TabsContent value="cravings" className="space-y-4 py-4">
      <Card>
        <CardHeader>
          <CardTitle>Craving Details</CardTitle>
          <CardDescription>
            Track your cravings and what triggers them
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Craving Intensity (0-10)</Label>
                <span className="text-sm font-medium">
                  {cravingIntensity}: {getIntensityLabel(cravingIntensity)}
                </span>
              </div>
              <Slider
                defaultValue={[cravingIntensity]}
                min={0}
                max={10}
                step={1}
                onValueChange={(values) => setCravingIntensity(values[0])}
              />
              {errors.cravingIntensity && (
                <div className="flex items-center text-destructive mt-2 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>{errors.cravingIntensity}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="craving-trigger">What triggered your craving?</Label>
              <Select 
                value={cravingTrigger} 
                onValueChange={setCravingTrigger}
              >
                <SelectTrigger id="craving-trigger" className="w-full">
                  <SelectValue placeholder="Select trigger" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stress">Stress</SelectItem>
                  <SelectItem value="boredom">Boredom</SelectItem>
                  <SelectItem value="social">Social Situation</SelectItem>
                  <SelectItem value="food">After Eating</SelectItem>
                  <SelectItem value="coffee">Coffee/Alcohol</SelectItem>
                  <SelectItem value="driving">Driving</SelectItem>
                  <SelectItem value="morning">Morning Routine</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                  <SelectItem value="argument">Argument</SelectItem>
                  <SelectItem value="television">Watching TV</SelectItem>
                  <SelectItem value="work">Work Situation</SelectItem>
                  <SelectItem value="emotional">Emotional Response</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.cravingTrigger && (
                <div className="flex items-center text-destructive mt-2 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>{errors.cravingTrigger}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default CravingsTab;
