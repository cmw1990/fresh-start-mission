
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NicotineLog } from '@/lib/supabase';
import { format, subDays } from 'date-fns';

interface CravingChartProps {
  logs: NicotineLog[];
}

const CravingChart = ({ logs }: CravingChartProps) => {
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
      
      // Calculate average craving intensity and count
      const craving = logsForDay.reduce((sum, log) => sum + log.craving_intensity, 0);
      const intensity = logsForDay.length ? craving / logsForDay.length : 0;
      const cravings = logsForDay.filter(log => log.craving_intensity > 0).length;
      
      data.push({
        day: dayLabel,
        date: dateString,
        cravings,
        intensity,
      });
    }
    
    return data;
  };

  const data = processedData();

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Craving Trends</CardTitle>
        <CardDescription>Number and intensity of cravings over the past week</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorCravings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38B2AC" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#38B2AC" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => {
                return [value, name === 'cravings' ? 'Number of Cravings' : 'Average Intensity (1-10)'];
              }}
              labelFormatter={(label) => `Day: ${label}`}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="cravings" 
              stroke="#9b87f5" 
              fillOpacity={1} 
              fill="url(#colorCravings)" 
              name="Number of Cravings"
            />
            <Area 
              type="monotone" 
              dataKey="intensity" 
              stroke="#38B2AC" 
              fillOpacity={1} 
              fill="url(#colorIntensity)" 
              name="Average Intensity (1-10)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CravingChart;
