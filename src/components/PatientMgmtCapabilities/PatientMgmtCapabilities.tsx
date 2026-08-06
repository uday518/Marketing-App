const capabilities = [
  {
    icon: '🔍',
    title: 'Duplicate Detection',
    description: 'Flags likely duplicate patient records automatically.',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Family / Group Linking',
    description: 'Link family members under one household account.',
  },
  {
    icon: '🔎',
    title: 'Patient Search & Filters',
    description: 'Find any patient in seconds across every clinic.',
  },
  {
    icon: '📅',
    title: 'Follow-Up Scheduling',
    description: 'Auto-suggest follow-up visits after completed care.',
  },
  {
    icon: '📆',
    title: 'Multi-Dentist Calendars',
    description: 'See every dentist\'s schedule side by side.',
  },
  {
    icon: '🚨',
    title: 'Emergency Contact Tracking',
    description: 'Emergency contacts on file for every patient.',
  },
];

export default function PatientMgmtCapabilities() {
  return (
    <section className="bg-secondary-100 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-neutral-900 lg:text-4xl">
            What Patient Management Lets You Do
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
