import StatusBadge from '../ui/StatusBadge';
import { formatDate, deadlineLabel, isOverdue } from '../../utils/dates';

export default function DeadlineCard({ application }) {
  const overdue = isOverdue(application.deadline);

  return (
    <div className={`bg-white rounded-xl border p-4 flex items-center justify-between gap-4 ${
      overdue ? 'border-red-200' : 'border-gray-200'
    }`}>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-semibold text-gray-900 truncate">{application.company}</h3>
          <StatusBadge status={application.status} />
        </div>
        <p className="text-xs text-gray-500 truncate">{application.role}</p>
      </div>

      <div className="text-right flex-shrink-0">
        <div className={`text-sm font-semibold ${overdue ? 'text-red-600' : 'text-gray-900'}`}>
          {deadlineLabel(application.deadline)}
        </div>
        <div className="text-xs text-gray-400">{formatDate(application.deadline)}</div>
      </div>
    </div>
  );
}
