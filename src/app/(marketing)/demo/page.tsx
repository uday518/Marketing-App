import Link from 'next/link';

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-secondary-100 px-6 py-16">
      <div className="mx-auto max-w-xl text-center">
        <nav className="mb-8 text-sm text-neutral-500">
          <Link href="/" className="hover:text-neutral-700">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-700">Book a Demo</span>
        </nav>

        <h1 className="mb-4 text-3xl font-bold text-text-heading lg:text-4xl">
          Book a Demo
        </h1>
        <p className="mb-8 text-text-muted">
          See how our platform can transform your dental practice. Pick a time that works for you.
        </p>

        <form className="mx-auto flex max-w-md flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-text-heading outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
          />
          <input
            type="email"
            placeholder="Work Email"
            className="rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-text-heading outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
          />
          <input
            type="text"
            placeholder="Clinic Name"
            className="rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-text-heading outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-text-heading outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
          />
          <select className="rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-text-heading outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100">
            <option value="">Clinic Size</option>
            <option value="1-5">1-5 Dentists</option>
            <option value="6-15">6-15 Dentists</option>
            <option value="16+">16+ Dentists</option>
          </select>
          <button
            type="submit"
            className="rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Request Demo
          </button>
        </form>

        <p className="mt-6 text-sm text-text-muted">
          Prefer to explore first?{' '}
          <Link href="/product" className="font-semibold text-primary-600 hover:underline">
            View Features
          </Link>
        </p>
      </div>
    </main>
  );
}
