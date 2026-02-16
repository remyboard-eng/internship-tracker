import ApplicationRow from './ApplicationRow';
import EmptyState from '../ui/EmptyState';

const columns = [
  { key: 'company', label: 'Company / Role' },
  { key: 'status', label: 'Status' },
  { key: 'applicationDate', label: 'Applied' },
  { key: 'deadline', label: 'Deadline' },
  { key: null, label: 'Actions' },
];

export default function ApplicationTable({ applications, sortConfig, onSort, onEdit, onDelete }) {
  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200">
        <EmptyState
          title="No applications found"
          description="Try adjusting your search or filters, or add a new application."
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              {columns.map(({ key, label }) => (
                <th
                  key={label}
                  className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    key ? 'cursor-pointer hover:text-gray-700 select-none' : ''
                  }`}
                  onClick={key ? () => onSort(key) : undefined}
                >
                  <span className="flex items-center gap-1">
                    {label}
                    {key && sortConfig.key === key && (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        {sortConfig.direction === 'asc' ? (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        )}
                      </svg>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {applications.map((app) => (
              <ApplicationRow
                key={app.id}
                application={app}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
