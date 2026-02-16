import { useState, useMemo } from 'react';
import { useAppContext } from '../context/ApplicationContext';
import ApplicationTable from '../components/applications/ApplicationTable';
import ApplicationFilters from '../components/applications/ApplicationFilters';
import ApplicationModal from '../components/applications/ApplicationModal';
import Button from '../components/ui/Button';

export default function ApplicationsPage() {
  const {
    applications, loading,
    addApplication, updateApplication, deleteApplication,
    adminUsername, adminPassword, logout,
  } = useAppContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'updatedAt', direction: 'desc' });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [saving, setSaving] = useState(false);

  const filteredApps = useMemo(() => {
    let result = applications;

    if (statusFilter !== 'all') {
      result = result.filter((app) => app.status === statusFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (app) =>
          app.company.toLowerCase().includes(q) ||
          app.role.toLowerCase().includes(q)
      );
    }

    result = [...result].sort((a, b) => {
      const aVal = a[sortConfig.key] || '';
      const bVal = b[sortConfig.key] || '';
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortConfig.direction === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [applications, searchQuery, statusFilter, sortConfig]);

  function handleSort(key) {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }

  function handleEdit(app) {
    setEditingApp(app);
    setModalOpen(true);
  }

  function handleAdd() {
    setEditingApp(null);
    setModalOpen(true);
  }

  async function handleDelete(id) {
    try {
      setSaving(true);
      await deleteApplication(id, adminUsername, adminPassword);
    } catch (err) {
      if (err.message.includes('Invalid username or password')) {
        logout();
        alert('Session expired. Please log in again.');
      } else {
        alert('Error: ' + err.message);
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleSave(data) {
    try {
      setSaving(true);
      if (editingApp) {
        await updateApplication(editingApp.id, data, adminUsername, adminPassword);
      } else {
        await addApplication(data, adminUsername, adminPassword);
      }
      setModalOpen(false);
      setEditingApp(null);
    } catch (err) {
      if (err.message.includes('Invalid username or password')) {
        logout();
        alert('Session expired. Please log in again.');
      } else {
        alert('Error: ' + err.message);
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Applications</h1>
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={logout}>
            Logout
          </Button>
          <Button onClick={handleAdd} disabled={saving}>
            + Add Application
          </Button>
        </div>
      </div>

      <ApplicationFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <ApplicationTable
        applications={filteredApps}
        sortConfig={sortConfig}
        onSort={handleSort}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ApplicationModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingApp(null); }}
        onSave={handleSave}
        application={editingApp}
      />
    </div>
  );
}
