import { useState, useCallback } from 'react';

const USER_KEY = 'intern-tracker-admin-user';
const PASS_KEY = 'intern-tracker-admin-pw';

export function useAdminAuth() {
  const [adminUsername, setAdminUsername] = useState(
    () => sessionStorage.getItem(USER_KEY) || null
  );
  const [adminPassword, setAdminPassword] = useState(
    () => sessionStorage.getItem(PASS_KEY) || null
  );

  const isAdmin = !!(adminUsername && adminPassword);

  const login = useCallback(async (username, password) => {
    // Validate against the server
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Login failed');
    }

    sessionStorage.setItem(USER_KEY, username);
    sessionStorage.setItem(PASS_KEY, password);
    setAdminUsername(username);
    setAdminPassword(password);
    return true;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(PASS_KEY);
    setAdminUsername(null);
    setAdminPassword(null);
  }, []);

  return { isAdmin, adminUsername, adminPassword, login, logout };
}
