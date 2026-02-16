export function getStatusCounts(applications) {
  return applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});
}

export function getResponseRate(applications) {
  const applied = applications.filter((a) => a.status !== 'saved');
  if (applied.length === 0) return 0;
  const responded = applied.filter((a) => a.status !== 'applied');
  return Math.round((responded.length / applied.length) * 100);
}

export function getMonthlyApplicationCounts(applications) {
  const months = {};
  applications.forEach((app) => {
    if (!app.applicationDate) return;
    const d = new Date(app.applicationDate + 'T00:00:00');
    const key = d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    months[key] = (months[key] || 0) + 1;
  });

  return Object.entries(months)
    .map(([month, count]) => ({ month, count, sortKey: new Date(month + ' 1') }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ month, count }) => ({ month, count }));
}
