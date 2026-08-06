import Link from 'next/link';

const capabilities = [
  {
    icon: '📊',
    title: 'Reports & Analytics',
    description: 'Real-time dashboards, exportable to CSV.',
    href: '/product/features/reports-analytics',
  },
  {
    icon: '🏢',
    title: 'Multi-Clinic Management',
    description: 'Unlimited locations under one account.',
    href: '/product/features/multi-clinic-management',
  },
  {
    icon: '🔒',
    title: 'Security',
    description: 'Tenant isolation and encrypted data, end to end.',
    href: '/product/features/security',
  },
  {
    icon: '📝',
    title: 'Clinical Documentation',
    description: 'Stage-based encounter notes and tooth charting.',
    href: '/product/features/clinical-documentation',
  },
  {
    icon: '🦷',
    title: 'Treatment Planning',
    description: 'Multi-step plans tracked from first visit to completion.',
    href: '/product/features/treatment-planning',
  },
  {
    icon: '👥',
    title: 'Staff Management',
    description: 'Roles, permissions, and multi-clinic assignment.',
    href: '/product/features/staff-management',
  },
  {
    icon: '📋',
    title: 'Patient Management',
    description: 'Registry, medical history, and documents in one place.',
    href: '/product/features/patient-management',
  },
  {
    icon: '📅',
    title: 'Appointment Management',
    description: 'Book and manage every visit across every dentist.',
    href: '/product/features/appointment-management',
  },
  {
    icon: '⏳',
    title: 'Queue Management',
    description: 'Live wait tracking for front desk and clinical staff.',
    href: '/product/features/queue-management',
  },
];

export default function ExploreByCapability() {
  return (
    <section className="bg-secondary-100 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-neutral-900 lg:text-4xl">
            Explore by Capability
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="flex flex-col items-start gap-3 rounded-xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <span className="text-2xl">{cap.icon}</span>
              <h3 className="text-lg font-semibold text-neutral-900">{cap.title}</h3>
              <p className="text-sm text-neutral-500">{cap.description}</p>
              <Link
                href={cap.href}
                className="mt-2 text-sm font-medium text-teal-600 transition-colors hover:text-teal-700"
              >
                Explore →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
