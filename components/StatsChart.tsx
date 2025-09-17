
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { type Property } from '../types';

interface StatsChartProps {
  data: Property[];
}

const COLORS = ['#6b7280', '#71717a', '#a1a1aa', '#d4d4d8', '#e4e4e7', '#f4f4f5'];

const StatsChart: React.FC<StatsChartProps> = ({ data }) => {
  const chartData = data.map(p => ({ name: p.name, price: p.price }));

  return (
    <div className="w-full h-64">
      <h3 className="text-lg font-bold text-stone-700 mb-2">Price Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6b7280' }} interval={0} angle={-30} textAnchor="end" height={50} />
          <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
          <Tooltip
            cursor={{ fill: 'rgba(243, 244, 246, 0.5)' }}
            contentStyle={{
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              fontSize: '0.875rem'
            }}
          />
          <Bar dataKey="price">
            {chartData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsChart;
