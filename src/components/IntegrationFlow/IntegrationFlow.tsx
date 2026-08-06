import Link from 'next/link';

const steps = [
  'Patient Registered',
  'Appointment Booked',
  'Joins Queue',
  'Clinical Encounter',
  'Treatment Plan',
  'Reports',
];

export default function IntegrationFlow() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-brand-primary">
            Built from the Ground Up
          </p>
          <h2 className="mb-4 text-3xl font-bold text-neutral-900 lg:text-4xl">
            Built from the Ground Up for Dental Practice Operations
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-500">
            Every module is designed to work together so data entered once shows up everywhere it’s needed.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-4">
                <div className="rounded-lg border border-border-default bg-white px-5 py-3 text-sm font-medium text-text-heading shadow-sm">
                  {step}
                </div>
                {index < steps.length - 1 && (
                  <span className="text-neutral-400">→</span>
                )}
              </div>
            ))}
          </div>

          <div className="rounded-[24px] bg-secondary-100 p-10 text-center">
            <h3 className="mb-4 text-2xl font-bold text-neutral-900">A Complete System, Not a Collection of Tools</h3>
            <p className="mx-auto mb-8 max-w-2xl text-base text-neutral-500">
              Every module feeds the next, so data entered once shows up everywhere it’s needed.
            </p>
            <Link
              href="/demo"
              className="inline-flex rounded-lg bg-brand-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
            >
              Book Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
