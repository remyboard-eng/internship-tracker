import { useState } from 'react';
import StatusBadge from '../ui/StatusBadge';
import ConfirmDialog from '../ui/ConfirmDialog';
import { formatDate, deadlineLabel, isOverdue } from '../../utils/dates';

export default function ApplicationRow({ application, onEdit, onDelete }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-4 py-3">
          <div>
            <div className="text-sm font-medium text-gray-900">{application.company}</div>
            <div className="text-xs text-gray-500">{application.role}</div>
          </div>
        </td>
        <td className="px-4 py-3">
          <StatusBadge status={application.status} />
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">
          {formatDate(application.applicationDate)}
        </td>
        <td className="px-4 py-3">
          {application.deadline ? (
            <span className={`text-sm ${isOverdue(application.deadline) ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
              {deadlineLabel(application.deadline)}
            </span>
          ) : (
            <span className="text-sm text-gray-400">{'\u2014'}</span>
          )}
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(application)}
              className="p-1.5 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              title="Edit"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </button>
            {application.jobPostingUrl && (
              <a
                href={application.jobPostingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                title="Open job posting"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            )}
            <button
              onClick={() => setConfirmOpen(true)}
              className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Delete"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </div>
        </td>
      </tr>

      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => onDelete(application.id)}
        title="Delete Application"
        message={`Are you sure you want to delete your application to ${application.company}? This cannot be undone.`}
      />
    </>
  );
}
