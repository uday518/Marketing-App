import Link from 'next/link';

const tabs = [
  { label: 'Patient Management', href: '/product/features/patient-management', active: true },
  { label: 'Appointments', href: '/product/features/appointment-management' },
  { label: 'Queue', href: '/product/features/queue-management' },
  { label: 'Clinical Docs', href: '/product/features/clinical-documentation' },
  { label: 'Treatment Plans', href: '/product/features/treatment-planning' },
  { label: 'Staff', href: '/product/features/staff-management' },
  { label: 'Reports', href: '/product/features/reports-analytics' },
  { label: 'Multi-Clinic', href: '/product/features/multi-clinic-management' },
  { label: 'Security', href: '/product/features/security' },
];

export default function PatientMgmtHero() {
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
          <span className="text-neutral-700">Patient Management</span>
        </nav>

        {/* Feature Tabs */}
        <div className="mb-12 flex flex-wrap gap-6 border-b border-neutral-200">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              href={tab.href}
              className={`pb-3 text-sm font-medium transition-colors ${
                tab.active
                  ? 'border-b-2 border-brand-primary text-brand-primary'
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
            <h1 className="text-4xl font-bold leading-tight text-neutral-900 lg:text-5xl">
              Every Patient Record, Exactly Where You Need It
            </h1>

            <p className="text-lg text-neutral-500">
              A centralized registry that gives every clinic staff member a complete, accurate view
              of each patient.
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="/demo"
                className="rounded-lg border border-brand-primary bg-transparent px-6 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10 hover:text-brand-primary-hover"
              >
                Book Demo
              </Link>
              <Link
                href="/signup"
                className="rounded-lg border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
              >
                Start Free Trial
              </Link>
            </div>
          </div>

          {/* Right - Screenshot Placeholder */}
          <div className="flex w-full max-w-lg">
            <div className="flex h-72 w-full items-center justify-center rounded-2xl bg-white shadow-xl">
              <span className="text-sm text-neutral-400">Patient Management screenshot</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
