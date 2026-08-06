const capabilities = [
  {
    icon: '📝',
    title: 'Clinical Notes Editor',
    description: 'Structured, fast note-taking during encounters',
  },
  {
    icon: '🦷',
    title: 'Tooth Chart Integration',
    description: 'Findings mapped directly onto the tooth chart',
  },
  {
    icon: '📋',
    title: 'Diagnosis Code Library',
    description: 'Standardized, searchable diagnosis codes',
  },
  {
    icon: '🕐',
    title: 'Encounter History Timeline',
    description: 'Full chronological view of every past encounter',
  },
  {
    icon: '✅',
    title: 'Draft and Finalize Workflow',
    description: 'Save drafts, finalize when the encounter is complete',
  },
  {
    icon: '👥',
    title: 'Multi-Staff Collaboration',
    description: 'Multiple staff can contribute to one encounter',
  },
];

export default function ClinDocsCapabilities() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-text-heading lg:text-[30px]">
            What Clinical Documentation Lets You Do
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="flex flex-col items-start gap-3 rounded-xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <span className="text-2xl">{cap.icon}</span>
              <h3 className="text-base font-bold text-text-heading">{cap.title}</h3>
              <p className="text-sm text-text-muted">{cap.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
