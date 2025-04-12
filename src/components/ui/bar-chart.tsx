
import React from 'react';
import { BarChart as RechartsBarChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts';

interface BarChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  height?: number | string;
}

export function BarChart({ 
  data, 
  index, 
  categories, 
  colors = ['#10b981'], 
  valueFormatter = (value) => `${value}`,
  height = 300
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
        <XAxis 
          dataKey={index}
          tick={{ fontSize: 12 }}
          tickLine={{ stroke: '#E5E7EB' }}
          axisLine={{ stroke: '#E5E7EB' }}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          tickLine={{ stroke: '#E5E7EB' }}
          axisLine={{ stroke: '#E5E7EB' }}
          tickFormatter={valueFormatter}
        />
        <Tooltip 
          formatter={(value: number) => [valueFormatter(value), '']}
          labelFormatter={(label) => `${label}`}
          contentStyle={{ 
            backgroundColor: 'white', 
            border: '1px solid #E5E7EB',
            borderRadius: '0.375rem',
            padding: '0.5rem',
          }}
        />
        {categories.map((category, index) => (
          <Bar 
            key={category}
            dataKey={category}
            fill={colors[index % colors.length]}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
