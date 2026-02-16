const cards = [
  { key: 'total', label: 'Total Applications', color: 'text-blue-600', bg: 'bg-blue-50', icon: TotalIcon },
  { key: 'active', label: 'Active', color: 'text-purple-600', bg: 'bg-purple-50', icon: ActiveIcon },
  { key: 'responseRate', label: 'Response Rate', color: 'text-yellow-600', bg: 'bg-yellow-50', icon: RateIcon, suffix: '%' },
  { key: 'offers', label: 'Offers', color: 'text-green-600', bg: 'bg-green-50', icon: OfferIcon },
];

function TotalIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  );
}

function ActiveIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
    </svg>
  );
}

function RateIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
    </svg>
  );
}

function OfferIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
  );
}

export default function SummaryCards({ total, active, responseRate, offers }) {
  const values = { total, active, responseRate, offers };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ key, label, color, bg, icon: Icon, suffix }) => (
        <div key={key} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</span>
            <div className={`w-8 h-8 rounded-lg ${bg} ${color} flex items-center justify-center`}>
              <Icon />
            </div>
          </div>
          <div className={`text-2xl font-bold ${color}`}>
            {values[key]}{suffix || ''}
          </div>
        </div>
      ))}
    </div>
  );
}
