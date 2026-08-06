const relatedFeatures = [
  {
    icon: '📅',
    title: 'Appointment Management',
    description: 'Bookings feed the queue automatically.',
  },
  {
    icon: '📊',
    title: 'Reports & Analytics',
    description: 'Queue performance rolls into clinic reports.',
  },
  {
    icon: '👥',
    title: 'Staff Management',
    description: 'Calendars respect each dentist role and access.',
  },
];

export default function QueueMgmtWorksBestWith() {
  return (
    <section className="bg-secondary-100 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-neutral-900 lg:text-4xl">
            Works Best With
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {relatedFeatures.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-start gap-3 rounded-xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <span className="text-2xl">{feature.icon}</span>
              <h3 className="text-lg font-semibold text-neutral-900">{feature.title}</h3>
              <p className="text-sm text-neutral-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
