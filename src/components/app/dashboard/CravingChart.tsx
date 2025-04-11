
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data - in a real app this would come from an API or context
const data = [
  { day: 'Day 1', cravings: 14, intensity: 8 },
  { day: 'Day 2', cravings: 12, intensity: 7 },
  { day: 'Day 3', cravings: 10, intensity: 6 },
  { day: 'Day 4', cravings: 11, intensity: 7 },
  { day: 'Day 5', cravings: 9, intensity: 5 },
  { day: 'Day 6', cravings: 8, intensity: 4 },
  { day: 'Day 7', cravings: 7, intensity: 4 },
];

const CravingChart = () => {
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
            <Tooltip />
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
