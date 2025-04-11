
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NicotineLog } from '@/lib/supabase';
import { format, subDays } from 'date-fns';

interface HolisticMetricsProps {
  logs: NicotineLog[];
}

const HolisticMetrics = ({ logs }: HolisticMetricsProps) => {
  // Process logs to create chart data for the past 7 days
  const processedData = () => {
    const today = new Date();
    const data = [];
    
    // Create data for the past 7 days
    for (let i = 6; i >= 0; i--) {
      const date = subDays(today, i);
      const dateString = format(date, 'yyyy-MM-dd');
      const dayLabel = format(date, 'EEE'); // Mon, Tue, etc.
      
      // Find logs for this date
      const logsForDay = logs.filter(log => log.date.startsWith(dateString));
      
      // Calculate average metrics for the day
      const mood = logsForDay.reduce((sum, log) => sum + log.mood, 0) / Math.max(logsForDay.length, 1);
      const energy = logsForDay.reduce((sum, log) => sum + log.energy, 0) / Math.max(logsForDay.length, 1);
      const focus = logsForDay.reduce((sum, log) => sum + log.focus, 0) / Math.max(logsForDay.length, 1);
      
      data.push({
        day: dayLabel,
        date: dateString,
        mood,
        energy,
        focus,
      });
    }
    
    return data;
  };

  const data = processedData();

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Holistic Wellness Trends</CardTitle>
        <CardDescription>Your mood, energy, and focus levels over the past week</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
            <Tooltip 
              formatter={(value, name) => {
                // Convert name to string explicitly before using string methods
                const nameStr = String(name);
                return [value, nameStr.charAt(0).toUpperCase() + nameStr.slice(1) + ' (1-5)'];
              }}
              labelFormatter={(label) => `Day: ${label}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="mood" 
              stroke="#9b87f5" 
              activeDot={{ r: 8 }}
              name="Mood"
            />
            <Line 
              type="monotone" 
              dataKey="energy" 
              stroke="#38B2AC" 
              name="Energy"
            />
            <Line 
              type="monotone" 
              dataKey="focus" 
              stroke="#805AD5" 
              name="Focus"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default HolisticMetrics;
