const relatedFeatures = [
  {
    icon: '📋',
    title: 'Treatment Planning',
    description: 'Findings flow directly into treatment plans',
  },
  {
    icon: '📊',
    title: 'Reports & Analytics',
    description: 'Clinical data feeds into reports',
  },
  {
    icon: '👥',
    title: 'Staff Management',
    description: 'Role-based access to clinical records',
  },
];

export default function ClinDocsWorksBestWith() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-text-heading lg:text-4xl">
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
              <h3 className="text-lg font-semibold text-text-heading">{feature.title}</h3>
              <p className="text-sm text-text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
