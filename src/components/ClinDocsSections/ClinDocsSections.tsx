const sections = [
  {
    title: 'Encounter Workspace',
    description:
      'Stage-based workflow \u2014 Subjective, Objective, Assessment, Plan \u2014 guiding clinical input at every stage.',
    bullets: [
      'Stage-based workflow',
      'Guided clinical input',
      'Structured note format',
    ],
    screenshot: 'Encounter Workspace screenshot',
    reversed: false,
  },
  {
    title: 'Diagnoses & Findings',
    description:
      'Standardized diagnosis codes and clinical findings linked directly to teeth, with severity and status tracking.',
    bullets: [
      'Standardized diagnosis codes',
      'Tooth-linked findings',
      'Severity & status tracking',
    ],
    screenshot: 'Diagnoses & Findings screenshot',
    reversed: true,
  },
  {
    title: 'Procedure Recording',
    description:
      'Log procedures performed, link them to the treatment plan, and record materials used.',
    bullets: [
      'Procedure logging',
      'Treatment plan linking',
      'Materials tracking',
    ],
    screenshot: 'Procedure Recording screenshot',
    reversed: false,
  },
];

export default function ClinDocsSections() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {sections.map((section) => (
          <div
            key={section.title}
            className={`flex flex-col items-center gap-14 py-16 lg:flex-row ${
              section.reversed ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Screenshot Placeholder */}
            <div className="flex w-full flex-1 items-center justify-center">
              <div className="flex h-64 w-full max-w-lg items-center justify-center rounded-2xl border border-neutral-200 bg-secondary-100 lg:h-80">
                <span className="text-sm text-neutral-400">{section.screenshot}</span>
              </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-1 flex-col items-start gap-4">
              <h3 className="text-xl font-bold text-text-heading">{section.title}</h3>
              <p className="text-sm leading-relaxed text-text-muted">{section.description}</p>
              <ul className="space-y-2">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2 text-sm text-neutral-700">
                    <span className="text-primary-600">\u2713</span>
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
