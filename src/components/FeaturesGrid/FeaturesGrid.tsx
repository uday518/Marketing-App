const features = [
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
      'Bank-level encryption, role-based access, and full audit trails protect every record.',
  },
  {
    icon: '☁️',
    title: 'Cloud-Native & Always On',
    description:
      '99.9% uptime SLA. Access from any device, anywhere, anytime.',
  },
  {
    icon: '📊',
    title: 'Real-Time Analytics',
    description:
      'Live dashboards give instant visibility into revenue, patients, and clinic health.',
  },
];

export default function FeaturesGrid() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-neutral-900 lg:text-4xl">
            Everything you need to run a modern dental practice
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-500">
            Purpose-built for dental professionals. No spreadsheets, no paper,
            no chaos.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-2xl">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
