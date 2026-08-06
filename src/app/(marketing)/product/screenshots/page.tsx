import Link from 'next/link';

const screenshots = [
  { label: 'Dashboard Overview', description: 'A bird\'s-eye view of your clinic performance' },
  { label: 'Patient Records', description: 'Centralized patient management' },
  { label: 'Appointment Calendar', description: 'Drag-and-drop scheduling' },
  { label: 'Queue Board', description: 'Real-time patient queue tracking' },
  { label: 'Clinical Notes', description: 'Stage-based encounter documentation' },
  { label: 'Reports & Analytics', description: 'Live dashboards and exportable reports' },
];

export default function ScreenshotsPage() {
  return (
    <main className="min-h-screen bg-secondary-100">
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-bold text-text-heading lg:text-5xl">
            See mySaaS in Action
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
            Explore the features that make dental practice management effortless.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {screenshots.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-start gap-3 rounded-xl border border-border-default bg-white p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex h-48 w-full items-center justify-center rounded-lg bg-secondary-100">
                <span className="text-sm text-neutral-400">{item.label}</span>
              </div>
              <h3 className="text-base font-semibold text-text-heading">{item.label}</h3>
              <p className="text-[13px] text-text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-text-heading">
            Ready to See More?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-text-muted">
            Book a personalized demo and see how mySaaS fits your clinic.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/demo"
              className="rounded-lg bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
            >
              Book a Demo
            </Link>
            <Link
              href="/signup"
              className="rounded-lg border border-brand-primary bg-white px-6 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-tint"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
