const capabilities = [
  {
    icon: '🚶',
    title: 'Walk-In Queue Entry',
    description: 'Add walk-ins to the queue without a prior booking.',
  },
  {
    icon: '🔄',
    title: 'Queue Reordering',
    description: 'Reorder the queue manually when needed.',
  },
  {
    icon: '🦷',
    title: 'Per-Dentist Queues',
    description: 'Separate queues per dentist, per clinic.',
  },
  {
    icon: '⏱️',
    title: 'Average Wait Time Tracking',
    description: 'Auto-suggest follow-up visits after completed care.',
  },
  {
    icon: '🚩',
    title: 'Priority Flagging',
    description: 'See every dentist\'s schedule side by side.',
  },
  {
    icon: '🚨',
    title: 'Emergency Contact Tracking',
    description: 'Emergency contacts on file for every patient.',
  },
];

export default function QueueMgmtCapabilities() {
  return (
    <section className="bg-secondary-100 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-neutral-900 lg:text-4xl">
            What Queue Management Lets You Do
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
