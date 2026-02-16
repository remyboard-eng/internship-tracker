import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TimelineChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[280px] text-sm text-gray-400">
        No timeline data yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: '#6B7280' }}
          tickLine={false}
          axisLine={{ stroke: '#e5e7eb' }}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 12, fill: '#6B7280' }}
          tickLine={false}
          axisLine={{ stroke: '#e5e7eb' }}
        />
        <Tooltip
          contentStyle={{
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            fontSize: '13px',
          }}
        />
        <Bar
          dataKey="count"
          name="Applications"
          fill="#3B82F6"
          radius={[4, 4, 0, 0]}
          maxBarSize={50}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
