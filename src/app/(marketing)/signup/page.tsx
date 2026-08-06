import Link from 'next/link';

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-secondary-100 px-6 py-16">
      <div className="mx-auto max-w-xl text-center">
        <nav className="mb-8 text-sm text-neutral-500">
          <Link href="/" className="hover:text-neutral-700">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-700">Sign Up</span>
        </nav>

        <h1 className="mb-4 text-3xl font-bold text-text-heading lg:text-4xl">
          Start Your Free Trial
        </h1>
        <p className="mb-8 text-text-muted">
          30 days free. No credit card required. Cancel anytime.
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
            type="password"
            placeholder="Password"
            className="rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-text-heading outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
          />
          <button
            type="submit"
            className="rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-sm text-text-muted">
          Already have an account?{' '}
          <Link href="/" className="font-semibold text-primary-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
