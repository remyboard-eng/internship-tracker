import { useAppContext } from '../context/ApplicationContext';
import { useDeadlines } from '../hooks/useDeadlines';
import DeadlineCard from '../components/deadlines/DeadlineCard';
import EmptyState from '../components/ui/EmptyState';
import { useNavigate } from 'react-router';

export default function DeadlinesPage() {
  const { loading } = useAppContext();
  const { overdue, thisWeek, later } = useDeadlines();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Deadlines</h1>
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      </div>
    );
  }

  const hasAny = overdue.length > 0 || thisWeek.length > 0 || later.length > 0;

  if (!hasAny) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Deadlines</h1>
        <EmptyState
          title="No upcoming deadlines"
          description="Add deadlines to your applications to track them here."
          actionLabel="Go to Applications"
          onAction={() => navigate('/applications')}
        />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Deadlines</h1>

      {overdue.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-medium text-red-600 uppercase tracking-wider mb-3">
            Overdue ({overdue.length})
          </h2>
          <div className="space-y-3">
            {overdue.map((app) => (
              <DeadlineCard key={app.id} application={app} />
            ))}
          </div>
        </section>
      )}

      {thisWeek.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-medium text-yellow-600 uppercase tracking-wider mb-3">
            This Week ({thisWeek.length})
          </h2>
          <div className="space-y-3">
            {thisWeek.map((app) => (
              <DeadlineCard key={app.id} application={app} />
            ))}
          </div>
        </section>
      )}

      {later.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
            Later ({later.length})
          </h2>
          <div className="space-y-3">
            {later.map((app) => (
              <DeadlineCard key={app.id} application={app} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
