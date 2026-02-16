const STORAGE_KEY = 'internship-tracker-apps';

export function loadApplications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveApplications(applications) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  } catch (e) {
    console.error('Failed to save applications:', e);
  }
}
