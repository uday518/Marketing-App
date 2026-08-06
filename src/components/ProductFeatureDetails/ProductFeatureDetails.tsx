const featureDetails = [
  {
    title: 'Every Patient, Perfectly Organized',
    description:
      'A unified patient registry with medical history, family relationships, duplicate detection, and a document vault for every file.',
    bullets: [
      'Unified patient registry',
      'Family relationship linking',
      'Document vault',
    ],
    screenshotLabel: 'Patient-Centric Design screenshot',
    reversed: false,
  },
  {
    title: 'From Walk-In to Checkout in One Workspace',
    description:
      'Appointment booking, queue management, and wait-time tracking on a single live queue board your whole front desk can see.',
    bullets: [
      'Appointment booking',
      'Live queue board',
      'Wait-time tracking',
    ],
    screenshotLabel: 'Real-Time Clinic Operations screenshot',
    reversed: true,
  },
  {
    title: 'Manage One Clinic or Twenty, From One Account',
    description:
      'A true multi-tenant architecture — per-clinic settings, role-based access, and centralized staff management across every location.',
    bullets: [
      'Multi-tenant architecture',
      'Per-clinic settings',
      'Centralized staff management',
    ],
    screenshotLabel: 'Multi-Clinic at Scale screenshot',
    reversed: false,
  },
];

export default function ProductFeatureDetails() {
  return (
    <section className="bg-neutral-100 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {featureDetails.map((feature) => (
          <div
            key={feature.title}
            className={`flex flex-col items-center gap-12 py-16 lg:flex-row ${
              feature.reversed ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Placeholder */}
            <div className="flex w-full flex-1 items-center justify-center">
              <div className="flex h-64 w-full max-w-lg items-center justify-center rounded-2xl bg-white shadow-sm lg:h-80">
                <span className="text-sm text-neutral-400">
                  {feature.screenshotLabel}
                </span>
              </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-1 flex-col items-start gap-6">
              <h3 className="text-2xl font-bold text-neutral-800">{feature.title}</h3>
              <p className="text-base leading-relaxed text-neutral-500">{feature.description}</p>
              <ul className="space-y-2">
                {feature.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2 text-sm text-neutral-700">
                    <span className="text-primary-500">✓</span>
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
