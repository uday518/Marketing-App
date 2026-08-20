import Link from 'next/link';

export default function FeaturesHubHero() {
  return (
    <section className="bg-secondary-100 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-neutral-500">
          <Link href="/" className="hover:text-neutral-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/product" className="hover:text-neutral-700">Product</Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-700">Features</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-neutral-900 lg:text-5xl">
              Every Tool Your Clinic Team Needs
            </h1>

            <p className="mb-8 text-lg text-neutral-500">
              Nine integrated modules designed around the way dental clinics actually operate —
              built for clinical staff, front desk teams, managers, and owners.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/demo"
                className="rounded-lg border border-brand-primary bg-transparent px-6 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10 hover:text-brand-primary-hover"
              >
                Book Demo
              </Link>
              <Link
                href="/signup"
                className="rounded-lg border border-border-default bg-white px-6 py-3 text-sm font-semibold text-text-heading transition-colors hover:bg-secondary-100"
              >
                Start Free Trial
              </Link>
            </div>
          </div>

          <div className="flex w-full justify-center lg:justify-end">
            <div className="w-full max-w-xl rounded-3xl border border-border-default bg-white p-6 shadow-xl">
              <div className="h-80 rounded-3xl bg-secondary-100"></div>
              <p className="mt-4 text-sm text-neutral-400">Product overview screenshot</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
