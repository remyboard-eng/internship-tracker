import { useAppContext } from '../context/ApplicationContext';
import { useDeadlines } from '../hooks/useDeadlines';
import { getStatusCounts, getResponseRate, getMonthlyApplicationCounts } from '../utils/analytics';
import SummaryCards from '../components/dashboard/SummaryCards';
import StatusChart from '../components/dashboard/StatusChart';
import TimelineChart from '../components/dashboard/TimelineChart';
import DeadlineBanner from '../components/dashboard/DeadlineBanner';
import EmptyState from '../components/ui/EmptyState';
import { useNavigate } from 'react-router';

export default function DashboardPage() {
  const { applications } = useAppContext();
  const deadlines = useDeadlines();
  const navigate = useNavigate();

  if (applications.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
        <EmptyState
          title="No applications yet"
          description="Start tracking your internship applications to see your dashboard come to life."
          actionLabel="Add Application"
          onAction={() => navigate('/applications')}
        />
      </div>
    );
  }

  const statusCounts = getStatusCounts(applications);
  const responseRate = getResponseRate(applications);
  const monthlyData = getMonthlyApplicationCounts(applications);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <DeadlineBanner deadlines={deadlines} />

      <SummaryCards
        total={applications.length}
        active={applications.filter((a) => !['rejected', 'offer'].includes(a.status)).length}
        responseRate={responseRate}
        offers={statusCounts.offer || 0}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Status Breakdown</h2>
          <StatusChart applications={applications} />
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Applications Over Time</h2>
          <TimelineChart data={monthlyData} />
        </div>
      </div>
    </div>
  );
}
