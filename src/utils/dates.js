export function formatDate(isoString) {
  if (!isoString) return '—';
  const d = new Date(isoString + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function daysFromNow(isoDateString) {
  if (!isoDateString) return null;
  const target = new Date(isoDateString + 'T00:00:00');
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

export function isOverdue(isoDateString) {
  const days = daysFromNow(isoDateString);
  return days !== null && days < 0;
}

export function deadlineLabel(isoDateString) {
  const days = daysFromNow(isoDateString);
  if (days === null) return '';
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  return `${days}d left`;
}
