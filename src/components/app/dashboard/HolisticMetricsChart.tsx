
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', mood: 6, energy: 5, focus: 4 },
  { day: 'Tue', mood: 7, energy: 6, focus: 5 },
  { day: 'Wed', mood: 6, energy: 7, focus: 6 },
  { day: 'Thu', mood: 8, energy: 7, focus: 7 },
  { day: 'Fri', mood: 7, energy: 6, focus: 6 },
  { day: 'Sat', mood: 8, energy: 8, focus: 7 },
  { day: 'Sun', mood: 9, energy: 7, focus: 8 },
];

export const HolisticMetricsChart = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis domain={[0, 10]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="mood" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="energy" stroke="#82ca9d" />
        <Line type="monotone" dataKey="focus" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HolisticMetricsChart;
