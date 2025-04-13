
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface TimeTrackingChartProps {
  data: {
    day: string;
    hours: number;
  }[];
}

const TimeTrackingChart = ({ data }: TimeTrackingChartProps) => {
  // Define chart configuration for custom styles
  const chartConfig = {
    hours: {
      color: '#7c3aed', // purple color for the bars
      label: 'Hours',
    },
  };

  // Make sure there's enough data to display
  const displayData = data.length < 7 
    ? [...data, ...Array(7 - data.length).fill({ day: '', hours: 0 })]
    : data;

  return (
    <ChartContainer config={chartConfig} className="mt-6 h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={displayData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value}h`}
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent
                    className="bg-white dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 rounded-md shadow-md"
                    active={active}
                    payload={payload}
                    label={payload[0].payload.day}
                    labelFormatter={(label) => `${label}`}
                    formatter={(value, name) => [`${value} hours`, 'Time logged']}
                  />
                );
              }
              return null;
            }}
          />
          <Bar 
            dataKey="hours" 
            name="hours"
            radius={[4, 4, 0, 0]} 
            fill="var(--color-hours)" 
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default TimeTrackingChart;
