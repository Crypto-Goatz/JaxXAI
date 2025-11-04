import React from 'react';

// Recharts is loaded from a CDN and available on the window object.

interface PriceChartProps {
  data: { name: string; value: number }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-purple-medium/80 backdrop-blur-sm p-2 border border-electric-blue/30 rounded-md text-xs">
        <p className="label text-lavender-gray">{`${label} : $${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
  // Access Recharts from the window object inside the component render logic.
  // This helps prevent a race condition where the script hasn't loaded
  // when the module is first evaluated.
  const Recharts = (window as any).Recharts;

  // Render a fallback if the library isn't loaded yet.
  if (!Recharts) {
    return (
      <div className="flex items-center justify-center h-full text-xs text-lavender-gray/50">
        Loading Chart...
      </div>
    );
  }

  const { ResponsiveContainer, LineChart, Line, Tooltip } = Recharts;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart 
        data={data}
        margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
      >
        <Tooltip content={<CustomTooltip />} />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#9FFF33" 
          strokeWidth={2} 
          dot={false}
          activeDot={{ r: 4, fill: '#9FFF33', stroke: '#201F24', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceChart;
