'use client';

import { ChartContainer, type ChartConfig } from '@/components/ui/chart';
import { GetAvailabilityResponseDto } from '@/generated/schemas';
import { format } from 'date-fns';
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

const chartConfig = {
  availability: {
    label: 'Availability',
    color: '#2563eb',
  },
} satisfies ChartConfig;

interface ChartProps {
  data: GetAvailabilityResponseDto[];
}

export function Chart({ data }: ChartProps) {
  const formatXAxis = ({ x, y, payload }: any) => {
    const date = new Date(payload.value);
    const formattedHour = format(date, 'hh:mm a'); // Format hour
    const formattedDate = format(date, 'MMM d, yyyy'); // Format date

    return (
      <g transform={`translate(${x},${y + 20})`}>
        <text x={0} y={0} textAnchor="middle" fill="#666">
          {formattedHour}
        </text>
        <text x={0} y={20} textAnchor="middle" fill="#666">
          {formattedDate}
        </text>
      </g>
    );
  };

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <LineChart data={data}>
        <XAxis dataKey="resultTime" tick={formatXAxis} />
        <YAxis />
        <Tooltip />
        <Legend layout="vertical" align="right" verticalAlign="middle" />
        <Line type="monotone" dataKey="availability" stroke="#8884d8" />
      </LineChart>
    </ChartContainer>
  );
}
