const capabilities = [
  {
    icon: '🛡️',
    title: 'Role & Permission Editor',
    description: 'Fine-tune exactly what each role can access.',
  },
  {
    icon: '📅',
    title: 'Staff Scheduling',
    description: 'Shift and availability scheduling (future).',
  },
  {
    icon: '📝',
    title: 'Activity Log per Staff',
    description: 'See every action taken by each staff member.',
  },
  {
    icon: '🔑',
    title: 'Login Session Tracking',
    description: 'Monitor active sessions per staff account.',
  },
  {
    icon: '🚀',
    title: 'Staff Onboarding Flow',
    description: 'Guided setup for new staff accounts.',
  },
  {
    icon: '📋',
    title: 'Per-Clinic Staff Roster',
    description: 'See who\'s assigned to each clinic location.',
  },
];

export default function StaffMgmtCapabilities() {
  return (
    <section className="bg-secondary-100 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-neutral-900 lg:text-4xl">
            What Staff Management Lets You Do
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
