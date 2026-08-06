const sections = [
  {
    title: 'Clinic Hierarchy',
    description:
      'Create and configure multiple clinic locations under one account, each with their own settings, staff, and data.',
    bullets: [
      'Multiple clinic locations',
      'Per-clinic configuration',
      'Independent staff & data',
    ],
    screenshot: 'Clinic Hierarchy screenshot',
    reversed: false,
  },
  {
    title: 'Tenant Isolation',
    description:
      'Each clinic\'s patient data, appointments, and records are strictly isolated — no accidental data mixing.',
    bullets: [
      'Strict data isolation',
      'No cross-clinic mixing',
      'Database-level separation',
    ],
    screenshot: 'Tenant Isolation screenshot',
    reversed: true,
  },
  {
    title: 'Centralized Management',
    description:
      'Assign staff across clinics, compare performance, and run chain-wide reports from one dashboard.',
    bullets: [
      'Cross-clinic staff assignment',
      'Chain-wide reporting',
      'Central dashboard',
    ],
    screenshot: 'Centralized Management screenshot',
    reversed: false,
  },
];

export default function MultiClinicSections() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {sections.map((section) => (
          <div
            key={section.title}
            className={`flex flex-col items-center gap-12 py-16 lg:flex-row ${
              section.reversed ? 'lg:flex-row-reverse' : ''
            }`}
          >
            <div className="flex w-full flex-1 items-center justify-center">
              <div className="flex h-64 w-full max-w-lg items-center justify-center rounded-2xl bg-secondary-100 lg:h-80">
                <span className="text-sm text-neutral-400">{section.screenshot}</span>
              </div>
            </div>

            <div className="flex flex-1 flex-col items-start gap-6">
              <h3 className="text-2xl font-bold text-neutral-900">{section.title}</h3>
              <p className="text-base leading-relaxed text-neutral-500">{section.description}</p>
              <ul className="space-y-2">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2 text-sm text-neutral-700">
                    <span className="text-teal-500">✓</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
