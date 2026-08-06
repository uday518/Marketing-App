const values = [
  {
    icon: '⚡',
    title: '10x Faster Scheduling',
    description:
      'Smart appointment engine reduces scheduling time from 5 minutes to 30 seconds.',
  },
  {
    icon: '🔒',
    title: 'Enterprise-Grade Security',
    description:
      'End-to-end encryption, role-based access, and full audit trails protect every record.',
  },
  {
    icon: '☁️',
    title: 'Cloud-Native & Always On',
    description: '99.9% uptime SLA. Access from any device, anywhere, anytime.',
  },
  {
    icon: '📊',
    title: 'Real-Time Analytics',
    description:
      'Live dashboards give instant visibility into revenue, patients, and clinic health.',
  },
];

export default function ValueProp() {
  return (
    <section className="bg-neutral-100 py-16">
      <div className="mx-auto max-w-[1340px] px-6 lg:px-10">
        <h2 className="text-3xl font-bold text-text-heading lg:text-4xl">
          Everything you need to run a modern dental practice
        </h2>
        <p className="mt-4 text-lg text-text-muted">
          Purpose-built for dental professionals. No spreadsheets, no paper, no chaos.
        </p>

        <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-[52px]">
          {values.map((value) => (
            <div
              key={value.title}
              className="min-h-[172px] rounded-[10px] border border-border-default bg-white p-5"
            >
              <p className="text-[28px] leading-none">{value.icon}</p>
              <p className="mt-4 text-base font-semibold text-text-heading">{value.title}</p>
              <p className="mt-3 text-[13px] text-text-muted">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
