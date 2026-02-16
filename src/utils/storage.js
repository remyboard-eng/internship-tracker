import { getSeedData } from './seedData';

const STORAGE_KEY = 'internship-tracker-apps';

export function loadApplications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // No saved data — load the default data so every visitor sees your applications
      const defaults = getSeedData();
      saveApplications(defaults);
      return defaults;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      const defaults = getSeedData();
      saveApplications(defaults);
      return defaults;
    }
    return parsed;
  } catch {
    return getSeedData();
  }
}

export function saveApplications(applications) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  } catch (e) {
    console.error('Failed to save applications:', e);
  }
}
