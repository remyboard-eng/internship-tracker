import Sidebar from './Sidebar';

export default function MobileNav({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-64 h-full">
        <Sidebar onClose={onClose} />
      </div>
    </div>
  );
}
