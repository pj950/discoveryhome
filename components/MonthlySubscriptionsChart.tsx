import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface MonthlySubscriptionsChartProps {
  data: { month: string; count: number }[];
  title?: string;
}

const MonthlySubscriptionsChart: React.FC<MonthlySubscriptionsChartProps> = ({ data, title = 'Monthly Subscriptions' }) => {
  return (
    <div className="w-full h-64">
      <h3 className="text-lg font-bold text-stone-700 mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="subsColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280' }} />
          <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
          <Tooltip cursor={{ stroke: '#94a3b8' }} contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem', fontSize: '0.875rem' }} />
          <Area type="monotone" dataKey="count" stroke="#16a34a" fillOpacity={1} fill="url(#subsColor)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySubscriptionsChart;

