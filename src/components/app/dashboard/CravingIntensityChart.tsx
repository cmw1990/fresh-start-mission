
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', intensity: 7 },
  { day: 'Tue', intensity: 6 },
  { day: 'Wed', intensity: 4 },
  { day: 'Thu', intensity: 5 },
  { day: 'Fri', intensity: 3 },
  { day: 'Sat', intensity: 2 },
  { day: 'Sun', intensity: 3 },
];

export const CravingIntensityChart = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis domain={[0, 10]} />
        <Tooltip />
        <Bar dataKey="intensity" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CravingIntensityChart;
