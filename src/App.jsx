import { createBrowserRouter, RouterProvider } from 'react-router';
import { ApplicationProvider } from './context/ApplicationContext';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import ApplicationsPage from './pages/ApplicationsPage';
import DeadlinesPage from './pages/DeadlinesPage';

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

export default function App() {
  return (
    <ApplicationProvider>
      <RouterProvider router={router} />
    </ApplicationProvider>
  );
}
