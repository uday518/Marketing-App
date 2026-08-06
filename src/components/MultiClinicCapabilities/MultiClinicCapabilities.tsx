const capabilities = [
  {
    icon: '🏥',
    title: 'Unlimited Clinic Locations',
    description: 'Add as many locations as your chain needs.',
  },
  {
    icon: '⚙️',
    title: 'Per-Clinic Settings',
    description: 'Independent hours, staff, and configuration per clinic.',
  },
  {
    icon: '👥',
    title: 'Cross-Clinic Staff Assignment',
    description: 'Assign staff to more than one location.',
  },
  {
    icon: '📊',
    title: 'Chain-Level Analytics',
    description: 'Compare performance across your whole chain.',
  },
  {
    icon: '🔄',
    title: 'Clinic Status Control',
    description: 'Mark clinics Active or Inactive as needed.',
  },
  {
    icon: '📋',
    title: 'Central Admin Dashboard',
    description: 'Manage every clinic from a single screen.',
  },
];

export default function MultiClinicCapabilities() {
  return (
    <section className="bg-secondary-100 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-neutral-900 lg:text-4xl">
            What Multi-Clinic Management Lets You Do
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
