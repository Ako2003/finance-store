'use client';

import { MonthlyData } from '@/lib/types';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export function MonthlyChart({ data }: { data: MonthlyData }) {
  const chartData = data.operations.map((op, index) => {
    const previousOps = data.operations.slice(0, index);
    const balance =
      data.startingBalance +
      previousOps.reduce((acc, curr) => {
        return acc + (curr.type === 'income' ? curr.amount : -curr.amount);
      }, 0);

    return {
      date: new Date(op.date).toLocaleDateString(),
      balance: balance + (op.type === 'income' ? op.amount : -op.amount),
    };
  });

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={[
            { date: 'Start', balance: data.startingBalance },
            ...chartData,
          ]}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            padding={{ left: 0, right: 0 }}
          />
          <YAxis 
            padding={{ top: 20, bottom: 20 }}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}