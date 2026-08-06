import Link from 'next/link';

const tabs = [
  { label: 'Patient Management', href: '/product/features/patient-management' },
  { label: 'Appointments', href: '/product/features/appointment-management' },
  { label: 'Queue', href: '/product/features/queue-management' },
  { label: 'Clinical Docs', href: '/product/features/clinical-documentation', active: true },
  { label: 'Treatment Plans', href: '/product/features/treatment-planning' },
  { label: 'Staff', href: '/product/features/staff-management' },
  { label: 'Reports', href: '/product/features/reports-analytics' },
  { label: 'Multi-Clinic', href: '/product/features/multi-clinic-management' },
  { label: 'Security', href: '/product/features/security' },
];

export default function ClinDocsHero() {
  return (
    <section className="bg-secondary-100 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-neutral-500">
          <Link href="/" className="hover:text-neutral-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/product" className="hover:text-neutral-700">Product</Link>
          <span className="mx-2">/</span>
          <Link href="/product/features" className="hover:text-neutral-700">Features</Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-700">Clinical Documentation</span>
        </nav>

        {/* Feature Tabs */}
        <div className="mb-12 flex flex-wrap gap-6 border-b border-neutral-200">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              href={tab.href}
              className={`pb-3 text-sm font-medium transition-colors ${
                tab.active
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-start lg:justify-between">
          {/* Left Content */}
          <div className="flex max-w-xl flex-col items-start gap-6">
            <h1 className="text-4xl font-extrabold leading-tight text-text-heading lg:text-[36px]">
              Document Every Encounter Without Slowing Down
            </h1>

            <p className="text-base text-text-muted">
              A structured clinical workspace that keeps the dentist focused on the patient, not the paperwork.
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="/demo"
                className="rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
              >
                Book Demo
              </Link>
              <Link
                href="/signup"
                className="rounded-xl border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-text-heading transition-colors hover:bg-neutral-50"
              >
                Start Free Trial
              </Link>
            </div>
          </div>

          {/* Right - Screenshot Placeholder */}
          <div className="flex w-full max-w-lg">
            <div className="flex h-72 w-full items-center justify-center rounded-2xl bg-white shadow-xl">
              <span className="text-sm text-neutral-400">Clinical Documentation screenshot</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
