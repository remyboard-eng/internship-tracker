import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { STATUS_LABELS, STATUS_COLORS } from '../../constants/status';

export default function StatusChart({ applications }) {
  const data = Object.entries(
    applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {})
  ).map(([status, count]) => ({
    name: STATUS_LABELS[status] || status,
    value: count,
    color: STATUS_COLORS[status]?.hex || '#6B7280',
  }));

  if (data.length === 0) return null;

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={95}
          paddingAngle={2}
          strokeWidth={0}
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            fontSize: '13px',
          }}
        />
        <Legend
          wrapperStyle={{ fontSize: '13px' }}
          iconType="circle"
          iconSize={8}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
