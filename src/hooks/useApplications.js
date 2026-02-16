import { useState, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { loadApplications, saveApplications } from '../utils/storage';

export function useApplications() {
  const [applications, setApplications] = useState(() => loadApplications());

  const persist = useCallback((updater) => {
    setApplications((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveApplications(next);
      return next;
    });
  }, []);

  const addApplication = useCallback((data) => {
    const now = new Date().toISOString();
    const newApp = {
      id: uuidv4(),
      company: '',
      role: '',
      status: 'saved',
      applicationDate: '',
      deadline: '',
      jobPostingUrl: '',
      notes: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      ...data,
      createdAt: now,
      updatedAt: now,
    };
    persist((prev) => [...prev, newApp]);
    return newApp;
  }, [persist]);

  const updateApplication = useCallback((id, data) => {
    persist((prev) =>
      prev.map((app) =>
        app.id === id
          ? { ...app, ...data, updatedAt: new Date().toISOString() }
          : app
      )
    );
  }, [persist]);

  const deleteApplication = useCallback((id) => {
    persist((prev) => prev.filter((app) => app.id !== id));
  }, [persist]);

  return useMemo(() => ({
    applications,
    addApplication,
    updateApplication,
    deleteApplication,
  }), [applications, addApplication, updateApplication, deleteApplication]);
}
