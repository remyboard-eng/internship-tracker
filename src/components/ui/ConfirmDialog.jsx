import Modal from './Modal';
import Button from './Button';

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title || 'Confirm'}>
      <p className="text-sm text-gray-600 mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <Button variant="secondary" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" size="sm" onClick={() => { onConfirm(); onClose(); }}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}
