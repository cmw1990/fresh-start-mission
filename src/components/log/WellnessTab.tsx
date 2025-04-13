
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormMessage } from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';

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
  errors: Record<string, string>;
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
  errors
}) => {
  return (
    <TabsContent value="wellness" className="py-4">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="mood-slider">Mood (1-5)</Label>
              <span className="text-xl font-semibold">{mood}</span>
            </div>
            <Slider 
              id="mood-slider"
              min={1} 
              max={5} 
              step={1} 
              value={[mood]} 
              onValueChange={(vals) => setMood(vals[0])}
              className="py-4" 
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Very low</span>
              <span>Low</span>
              <span>Neutral</span>
              <span>Good</span>
              <span>Very good</span>
            </div>
            {errors.mood && <FormMessage>{errors.mood}</FormMessage>}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="energy-slider">Energy Level (1-5)</Label>
              <span className="text-xl font-semibold">{energy}</span>
            </div>
            <Slider 
              id="energy-slider" 
              min={1} 
              max={5} 
              step={1} 
              value={[energy]} 
              onValueChange={(vals) => setEnergy(vals[0])}
              className="py-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Exhausted</span>
              <span>Low</span>
              <span>Average</span>
              <span>High</span>
              <span>Energetic</span>
            </div>
            {errors.energy && <FormMessage>{errors.energy}</FormMessage>}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="focus-slider">Focus Level (1-5)</Label>
              <span className="text-xl font-semibold">{focus}</span>
            </div>
            <Slider 
              id="focus-slider" 
              min={1} 
              max={5} 
              step={1} 
              value={[focus]} 
              onValueChange={(vals) => setFocus(vals[0])}
              className="py-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Scattered</span>
              <span>Distracted</span>
              <span>Average</span>
              <span>Focused</span>
              <span>Very focused</span>
            </div>
            {errors.focus && <FormMessage>{errors.focus}</FormMessage>}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="sleep-hours">Hours of Sleep</Label>
          <Input 
            id="sleep-hours" 
            type="number" 
            placeholder="Hours of sleep (e.g., 7.5)" 
            value={sleepHours}
            onChange={(e) => setSleepHours(e.target.value)}
            min="0"
            max="24"
            step="0.5"
          />
          {errors.sleepHours && <FormMessage>{errors.sleepHours}</FormMessage>}
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="sleep-quality-slider">Sleep Quality (1-5)</Label>
              <span className="text-xl font-semibold">{sleepQuality}</span>
            </div>
            <Slider 
              id="sleep-quality-slider" 
              min={1} 
              max={5} 
              step={1} 
              value={[sleepQuality]} 
              onValueChange={(vals) => setSleepQuality(vals[0])}
              className="py-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Very poor</span>
              <span>Poor</span>
              <span>Average</span>
              <span>Good</span>
              <span>Very good</span>
            </div>
            {errors.sleepQuality && <FormMessage>{errors.sleepQuality}</FormMessage>}
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default WellnessTab;
