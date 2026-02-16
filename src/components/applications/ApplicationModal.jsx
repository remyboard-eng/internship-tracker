import Modal from '../ui/Modal';
import ApplicationForm from './ApplicationForm';

export default function ApplicationModal({ isOpen, onClose, onSave, application }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={application ? 'Edit Application' : 'New Application'}
    >
      <ApplicationForm
        application={application}
        onSave={onSave}
        onCancel={onClose}
      />
    </Modal>
  );
}
