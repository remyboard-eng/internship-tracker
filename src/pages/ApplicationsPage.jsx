import { useState, useMemo } from 'react';
import { useAppContext } from '../context/ApplicationContext';
import ApplicationTable from '../components/applications/ApplicationTable';
import ApplicationFilters from '../components/applications/ApplicationFilters';
import ApplicationModal from '../components/applications/ApplicationModal';
import Button from '../components/ui/Button';

export default function ApplicationsPage() {
  const { applications, addApplication, updateApplication, deleteApplication } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'updatedAt', direction: 'desc' });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);

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

  function handleSave(data) {
    if (editingApp) {
      updateApplication(editingApp.id, data);
    } else {
      addApplication(data);
    }
    setModalOpen(false);
    setEditingApp(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
        <Button onClick={handleAdd}>+ Add Application</Button>
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
        onDelete={deleteApplication}
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
