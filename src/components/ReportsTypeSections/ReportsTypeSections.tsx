const sections = [
  {
    title: 'Operations Reports',
    description:
      'Appointment volumes, attendance rates, no-shows, and queue performance by date and dentist.',
    bullets: [
      'Appointment volumes',
      'No-show rates',
      'Queue performance',
    ],
    screenshot: 'Operations Reports screenshot',
    reversed: false,
  },
  {
    title: 'Clinical Reports',
    description:
      'Procedures performed, treatment completion rates, and patient diagnosis trends.',
    bullets: [
      'Procedures performed',
      'Completion rates',
      'Diagnosis trends',
    ],
    screenshot: 'Clinical Reports screenshot',
    reversed: true,
  },
  {
    title: 'Staff & Clinic Reports',
    description:
      'Staff activity, multi-clinic comparisons, and performance by location.',
    bullets: [
      'Staff activity',
      'Multi-clinic comparisons',
      'Performance by location',
    ],
    screenshot: 'Staff & Clinic Reports screenshot',
    reversed: false,
  },
];

export default function ReportsTypeSections() {
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
            {/* Screenshot Placeholder */}
            <div className="flex w-full flex-1 items-center justify-center">
              <div className="flex h-64 w-full max-w-lg items-center justify-center rounded-2xl bg-secondary-100 lg:h-80">
                <span className="text-sm text-neutral-400">{section.screenshot}</span>
              </div>
            </div>

            {/* Text Content */}
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
