import { Link } from 'react-router';
import { deadlineLabel, isOverdue } from '../../utils/dates';

export default function DeadlineBanner({ deadlines }) {
  const urgent = [...deadlines.overdue, ...deadlines.thisWeek].slice(0, 3);

  if (urgent.length === 0) return null;

  const hasOverdue = deadlines.overdue.length > 0;

  return (
    <div className={`rounded-xl border p-4 mb-6 ${
      hasOverdue ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
    }`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${hasOverdue ? 'text-red-500' : 'text-yellow-500'}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`text-sm font-semibold ${hasOverdue ? 'text-red-800' : 'text-yellow-800'}`}>
            Upcoming Deadlines
          </h3>
          <div className="mt-1 space-y-1">
            {urgent.map((app) => (
              <div key={app.id} className="flex items-center gap-2 text-sm">
                <span className={`font-medium ${isOverdue(app.deadline) ? 'text-red-700' : 'text-gray-700'}`}>
                  {app.company}
                </span>
                <span className="text-gray-400">{'\u2022'}</span>
                <span className={isOverdue(app.deadline) ? 'text-red-600' : 'text-yellow-700'}>
                  {deadlineLabel(app.deadline)}
                </span>
              </div>
            ))}
          </div>
          <Link
            to="/deadlines"
            className={`inline-block mt-2 text-xs font-medium ${
              hasOverdue ? 'text-red-600 hover:text-red-800' : 'text-yellow-600 hover:text-yellow-800'
            }`}
          >
            View all deadlines →
          </Link>
        </div>
      </div>
    </div>
  );
}
