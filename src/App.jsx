import { createBrowserRouter, RouterProvider } from 'react-router';
import { ApplicationProvider, useAppContext } from './context/ApplicationContext';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import ApplicationsPage from './pages/ApplicationsPage';
import DeadlinesPage from './pages/DeadlinesPage';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'applications', element: <ApplicationsPage /> },
      { path: 'deadlines', element: <DeadlinesPage /> },
    ],
  },
]);

function AppContent() {
  const { isAdmin } = useAppContext();

  if (!isAdmin) {
    return <LoginPage />;
  }

  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <ApplicationProvider>
      <AppContent />
    </ApplicationProvider>
  );
}
