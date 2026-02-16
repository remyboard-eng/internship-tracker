export const STATUS = {
  SAVED: 'saved',
  APPLIED: 'applied',
  PHONE_SCREEN: 'phone_screen',
  INTERVIEW: 'interview',
  OFFER: 'offer',
  REJECTED: 'rejected',
};

export const STATUS_LABELS = {
  saved: 'Saved',
  applied: 'Applied',
  phone_screen: 'Phone Screen',
  interview: 'Interview',
  offer: 'Offer',
  rejected: 'Rejected',
};

export const STATUS_COLORS = {
  saved: { bg: 'bg-gray-100', text: 'text-gray-700', hex: '#6B7280' },
  applied: { bg: 'bg-blue-100', text: 'text-blue-700', hex: '#3B82F6' },
  phone_screen: { bg: 'bg-purple-100', text: 'text-purple-700', hex: '#8B5CF6' },
  interview: { bg: 'bg-yellow-100', text: 'text-yellow-700', hex: '#F59E0B' },
  offer: { bg: 'bg-green-100', text: 'text-green-700', hex: '#10B981' },
  rejected: { bg: 'bg-red-100', text: 'text-red-700', hex: '#EF4444' },
};

export const STATUS_OPTIONS = Object.entries(STATUS_LABELS).map(([value, label]) => ({
  value,
  label,
}));
