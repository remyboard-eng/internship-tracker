import { useState, useCallback, useMemo, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  loadApplications,
  apiAddApplication,
  apiUpdateApplication,
  apiDeleteApplication,
} from '../utils/storage';

export function useApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data on mount
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    loadApplications()
      .then((data) => {
        if (!cancelled) {
          setApplications(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const addApplication = useCallback(async (data, adminPassword) => {
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
    const saved = await apiAddApplication(newApp, adminPassword);
    setApplications((prev) => [saved, ...prev]);
    return saved;
  }, []);

  const updateApplication = useCallback(async (id, data, adminPassword) => {
    const updates = { ...data, updatedAt: new Date().toISOString() };
    const saved = await apiUpdateApplication(id, updates, adminPassword);
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? saved : app))
    );
  }, []);

  const deleteApplication = useCallback(async (id, adminPassword) => {
    await apiDeleteApplication(id, adminPassword);
    setApplications((prev) => prev.filter((app) => app.id !== id));
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await loadApplications();
      setApplications(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return useMemo(() => ({
    applications,
    loading,
    error,
    addApplication,
    updateApplication,
    deleteApplication,
    refresh,
  }), [applications, loading, error, addApplication, updateApplication, deleteApplication, refresh]);
}
