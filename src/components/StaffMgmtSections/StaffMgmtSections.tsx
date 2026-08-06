const sections = [
  {
    title: 'Staff Directory',
    description:
      'Full staff profiles — name, role, specialization, contact, and active/inactive status.',
    bullets: [
      'Full staff profiles',
      'Specialization tracking',
      'Active/inactive status',
    ],
    screenshot: 'Staff Directory screenshot',
    reversed: false,
  },
  {
    title: 'Role-Based Access Control',
    description:
      'Predefined roles — Admin, Dentist, Receptionist, Manager — each with granular module permissions.',
    bullets: [
      'Predefined roles',
      'Granular permissions',
      'Per-module access',
    ],
    screenshot: 'Role-Based Access Control screenshot',
    reversed: true,
  },
  {
    title: 'Multi-Clinic Staff Assignment',
    description:
      'Assign staff members to one or multiple clinic locations.',
    bullets: [
      'Multi-location assignment',
      'Per-clinic rosters',
      'Centralized staff view',
    ],
    screenshot: 'Multi-Clinic Staff Assignment screenshot',
    reversed: false,
  },
];

export default function StaffMgmtSections() {
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
