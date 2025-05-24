import { useRef, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { Trade } from '@/types/trade';

interface ProgressChartProps {
  trades: Trade[];
}

export function ProgressChart({ trades }: ProgressChartProps) {
  const chartData = trades.map((trade, index) => ({
    name: `Day ${index + 1}`,
    equity: trade.equity,
    achieved: trade.achieved
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card className="p-3 bg-background/95 border shadow-md">
          <p className="font-semibold">{label}</p>
          <p className="text-sm">Equity: ${payload[0].value.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">Target: ${trades[parseInt(label.split(' ')[1]) - 1].profitTarget.toFixed(2)}</p>
        </Card>
      );
    }
    return null;
  };

  return (
    <div className="h-[580px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="equity" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 8, fill: "hsl(var(--primary))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}