import Link from 'next/link';

const relatedFeatures = [
  {
    icon: '👥',
    title: 'Staff Management',
    description: 'Calendars respect each dentist\'s role and access',
    href: '/product/features/staff-management',
  },
  {
    icon: '📊',
    title: 'Reports & Analytics',
    description: 'Completion rates roll up into clinic reports',
    href: '/product/features/reports-analytics',
  },
  {
    icon: '🔒',
    title: 'Security',
    description: 'Role permissions are enforced at every layer',
    href: '/product/features/security',
  },
];

export default function MultiClinicWorksBestWith() {
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
            <Link
              key={feature.title}
              href={feature.href}
              className="flex flex-col items-start gap-3 rounded-xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <span className="text-2xl">{feature.icon}</span>
              <h3 className="text-lg font-semibold text-neutral-900">{feature.title}</h3>
              <p className="text-sm text-neutral-500">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
