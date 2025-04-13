
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { FormMessage } from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface CravingsTabProps {
  cravingIntensity: number;
  setCravingIntensity: (value: number) => void;
  cravingTrigger: string;
  setCravingTrigger: (value: string) => void;
  errors: Record<string, string>;
}

const CravingsTab: React.FC<CravingsTabProps> = ({
  cravingIntensity,
  setCravingIntensity,
  cravingTrigger,
  setCravingTrigger,
  errors
}) => {
  return (
    <TabsContent value="cravings" className="py-4">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="craving-intensity">Craving Intensity (0-10)</Label>
              <span className="text-xl font-semibold">{cravingIntensity}</span>
            </div>
            <Slider 
              id="craving-intensity" 
              min={0} 
              max={10} 
              step={1} 
              value={[cravingIntensity]} 
              onValueChange={(vals) => setCravingIntensity(vals[0])}
              className="py-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>None</span>
              <span>Mild</span>
              <span>Moderate</span>
              <span>Strong</span>
              <span>Extreme</span>
            </div>
            {errors.cravingIntensity && <FormMessage>{errors.cravingIntensity}</FormMessage>}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="craving-trigger">What triggered your craving?</Label>
          <Select
            value={cravingTrigger}
            onValueChange={setCravingTrigger}
          >
            <SelectTrigger id="craving-trigger" className="w-full">
              <SelectValue placeholder="Select a trigger" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stress">Stress</SelectItem>
              <SelectItem value="boredom">Boredom</SelectItem>
              <SelectItem value="social">Social situation</SelectItem>
              <SelectItem value="after-meal">After a meal</SelectItem>
              <SelectItem value="alcohol">Drinking alcohol</SelectItem>
              <SelectItem value="coffee">Coffee/caffeine</SelectItem>
              <SelectItem value="habitual">Habitual/routine</SelectItem>
              <SelectItem value="mood">Negative mood</SelectItem>
              <SelectItem value="withdrawal">Withdrawal symptoms</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.cravingTrigger && <FormMessage>{errors.cravingTrigger}</FormMessage>}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Craving Coping Tips:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Try drinking water or brushing your teeth</li>
            <li>Do a quick 2-minute breathing exercise</li>
            <li>Distract yourself with a short walk</li>
            <li>Call or text a supportive friend</li>
            <li>Remember why you're quitting/reducing</li>
            <li>Use our craving tools in the Tools section</li>
          </ul>
        </div>
      </div>
    </TabsContent>
  );
};

export default CravingsTab;
