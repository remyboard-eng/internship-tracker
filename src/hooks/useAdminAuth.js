import { useState, useCallback } from 'react';

const SESSION_KEY = 'intern-tracker-admin-pw';

export function useAdminAuth() {
  const [adminPassword, setAdminPassword] = useState(
    () => sessionStorage.getItem(SESSION_KEY) || null
  );

  const isAdmin = !!adminPassword;

  const login = useCallback((password) => {
    sessionStorage.setItem(SESSION_KEY, password);
    setAdminPassword(password);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setAdminPassword(null);
  }, []);

  return { isAdmin, adminPassword, login, logout };
}
