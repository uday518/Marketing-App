import Link from 'next/link';

export default function ProductHero() {
  return (
    <section className="bg-neutral-100 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-neutral-400">
          <Link href="/" className="hover:text-neutral-600">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-500">Product</span>
          <span className="mx-2">/</span>
          <span className="text-neutral-500">Overview</span>
        </nav>

        <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-start lg:justify-between">
          {/* Left Content */}
          <div className="flex max-w-xl flex-col items-start gap-6">
            <h1 className="text-4xl font-bold leading-tight text-neutral-800 lg:text-5xl">
              One Platform. Every Clinic Workflow.
            </h1>

            <p className="text-lg leading-relaxed text-neutral-500">
              A cloud-native platform built for multi-clinic, multi-role dental
              practices — from a single-chair clinic to a 20-location chain, with
              every role&apos;s workflow covered.
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="/product/features"
                className="rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
              >
                Explore Features
              </Link>
              <Link
                href="/demo"
              className="rounded-xl border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
            >
              Book Demo
              </Link>
            </div>
          </div>

          {/* Right - Platform Screenshot Placeholder */}
          <div className="flex w-full max-w-lg">
            <div className="flex h-72 w-full items-center justify-center rounded-2xl bg-white shadow-xl">
              <span className="text-sm text-neutral-400">Platform overview screenshot</span>
            </div>
          </div>
        </div>

        {/* Built from the Ground Up heading */}
        <div className="mt-20 text-center">
          <h2 className="mb-4 text-3xl font-bold text-neutral-800 lg:text-4xl">
            Built from the Ground Up for Dental Practice Operations
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-500">
            Every module is cloud-native and tenant-isolated by design, with role-based access built
            in from day one — so the platform works the same whether you run one clinic or fifty.
          </p>
        </div>
      </div>
    </section>
  );
}
