const sections = [
  {
    title: 'Patient Registry',
    description:
      'Create and edit detailed patient profiles — contact info, demographics, and a unique MR number for every record.',
    bullets: [
      'Detailed patient profiles',
      'Demographics & contact info',
      'Unique MR numbers',
    ],
    screenshot: 'Patient Registry screenshot',
    reversed: false,
  },
  {
    title: 'Medical History',
    description:
      'Allergies, medications, chronic conditions, family and surgical history — all linked per patient and visible at a glance.',
    bullets: [
      'Allergies & medications',
      'Chronic condition tracking',
      'Family & surgical history',
    ],
    screenshot: 'Medical History screenshot',
    reversed: true,
  },
  {
    title: 'Document Vault',
    description:
      'Upload and store consent forms, X-rays, referral letters, and insurance documents against the patient record.',
    bullets: [
      'Consent form storage',
      'X-ray & image uploads',
      'Insurance document storage',
    ],
    screenshot: 'Document Vault screenshot',
    reversed: false,
  },
];

export default function PatientMgmtSections() {
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
