import { useState } from 'react';
import Modal from './Modal';
import Button from './Button';

export default function AdminLoginModal({ isOpen, onClose, onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!password.trim()) {
      setError('Password is required');
      return;
    }
    onLogin(password.trim());
    setPassword('');
    setError('');
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Admin Login">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-sm text-gray-600">
          Enter the admin password to add, edit, or delete applications.
        </p>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            placeholder="Admin password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Login
          </Button>
        </div>
      </form>
    </Modal>
  );
}
