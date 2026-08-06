import Link from 'next/link';

export default function NeedSomethingCustom() {
  return (
    <section className="bg-secondary-100 px-6 py-20">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-text-heading lg:text-4xl">
          Need Something Custom?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-text-muted">
          We work with dental groups to build custom integrations, workflows, and features.
          Tell us what you need.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/demo"
            className="rounded-lg bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
          >
            Contact Sales
          </Link>
          <Link
            href="/product/pricing"
            className="rounded-lg border border-brand-primary bg-white px-6 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-tint"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
