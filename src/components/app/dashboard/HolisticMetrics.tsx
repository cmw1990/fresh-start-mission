
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data - in a real app this would come from an API or context
const data = [
  { day: 'Mon', mood: 3, energy: 2, focus: 2 },
  { day: 'Tue', mood: 3, energy: 3, focus: 2 },
  { day: 'Wed', mood: 4, energy: 3, focus: 3 },
  { day: 'Thu', mood: 3, energy: 4, focus: 3 },
  { day: 'Fri', mood: 4, energy: 4, focus: 4 },
  { day: 'Sat', mood: 5, energy: 4, focus: 4 },
  { day: 'Sun', mood: 4, energy: 5, focus: 4 },
];

const HolisticMetrics = () => {
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
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="mood" 
              stroke="#9b87f5" 
              activeDot={{ r: 8 }}
              name="Mood (1-5)"
            />
            <Line 
              type="monotone" 
              dataKey="energy" 
              stroke="#38B2AC" 
              name="Energy (1-5)"
            />
            <Line 
              type="monotone" 
              dataKey="focus" 
              stroke="#805AD5" 
              name="Focus (1-5)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default HolisticMetrics;
