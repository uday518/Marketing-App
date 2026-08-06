const capabilities = [
  {
    icon: '🔍',
    title: 'Date Range Filtering',
    description: 'Filter any report by custom date range.',
  },
  {
    icon: '🦷',
    title: 'Per-Dentist Breakdown',
    description: 'Compare performance across dentists.',
  },
  {
    icon: '🏥',
    title: 'Per-Clinic Breakdown',
    description: 'Compare performance across clinic locations.',
  },
  {
    icon: '📤',
    title: 'CSV Export',
    description: 'Export any report for offline analysis.',
  },
  {
    icon: '📊',
    title: 'KPI Dashboard',
    description: 'At-a-glance view of the metrics that matter most.',
  },
  {
    icon: '📅',
    title: 'Scheduled Reports',
    description: 'Auto-delivered reports on a recurring basis (future).',
  },
];

export default function ReportsCapabilities() {
  return (
    <section className="bg-secondary-100 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-neutral-900 lg:text-4xl">
            What Reports &amp; Analytics Lets You Do
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="flex flex-col items-start gap-3 rounded-xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <span className="text-2xl">{cap.icon}</span>
              <h3 className="text-lg font-semibold text-neutral-900">{cap.title}</h3>
              <p className="text-sm text-neutral-500">{cap.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
