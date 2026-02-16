import { createContext, useContext } from 'react';
import { useApplications } from '../hooks/useApplications';

const ApplicationContext = createContext(null);

export function ApplicationProvider({ children }) {
  const value = useApplications();
  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(ApplicationContext);
  if (!ctx) throw new Error('useAppContext must be used within ApplicationProvider');
  return ctx;
}
