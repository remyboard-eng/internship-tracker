import { useMemo } from 'react';
import { useAppContext } from '../context/ApplicationContext';

export function useDeadlines() {
  const { applications } = useAppContext();

  return useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const withDeadlines = applications
      .filter((app) => app.deadline && app.status !== 'rejected' && app.status !== 'offer')
      .map((app) => {
        const deadlineDate = new Date(app.deadline + 'T00:00:00');
        const diffMs = deadlineDate - now;
        const daysUntil = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        return { ...app, deadlineDate, daysUntil };
      })
      .sort((a, b) => a.deadlineDate - b.deadlineDate);

    const overdue = withDeadlines.filter((d) => d.daysUntil < 0);
    const thisWeek = withDeadlines.filter((d) => d.daysUntil >= 0 && d.daysUntil <= 7);
    const later = withDeadlines.filter((d) => d.daysUntil > 7);

    return { overdue, thisWeek, later, all: withDeadlines };
  }, [applications]);
}
