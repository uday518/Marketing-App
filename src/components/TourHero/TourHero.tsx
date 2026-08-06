import Link from 'next/link';

export default function TourHero() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-tight text-neutral-800 lg:text-[38px]">
          Take a Self-Guided Tour of the
          <br />
          Platform
        </h1>
        <p className="mx-auto mb-8 max-w-[520px] text-base text-neutral-600">
          Walk through the core modules at your own pace — no sign-up
          required.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/signup"
            className="rounded-lg bg-teal-800 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-900"
          >
            Start Free Trial
          </Link>
          <Link
            href="/demo"
            className="rounded-lg border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            Book Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
