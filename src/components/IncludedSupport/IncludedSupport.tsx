import Link from 'next/link';

const includedItems = [
  { icon: '🏥', title: 'Unlimited Patients', description: 'Add as many patient records as you need' },
  { icon: '📅', title: 'Appointment Scheduling', description: 'Smart calendar with conflict detection' },
  { icon: '📋', title: 'Clinical Notes', description: 'Stage-based encounter documentation' },
  { icon: '📊', title: 'Reporting & Analytics', description: 'Real-time dashboards and exports' },
  { icon: '👥', title: 'Multi-User Access', description: 'Role-based access for your entire team' },
  { icon: '🔒', title: 'Security & Compliance', description: 'HIPAA-ready, encrypted data' },
];

export default function IncludedSupport() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-text-heading lg:text-4xl">
            Everything Included in Your Plan
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-muted">
            No hidden fees. Every feature is included from day one.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {includedItems.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-xl border border-border-default bg-white p-6 transition-shadow hover:shadow-md"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <h3 className="text-base font-semibold text-text-heading">{item.title}</h3>
                <p className="mt-1 text-[13px] text-text-muted">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/pricing"
            className="rounded-lg bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
          >
            View Pricing Details →
          </Link>
        </div>
      </div>
    </section>
  );
}
