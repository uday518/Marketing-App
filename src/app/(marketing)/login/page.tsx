import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-secondary-100 px-6 py-20">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-text-heading">Sign In</h1>
          <p className="mt-2 text-sm text-text-muted">
            Access your dental practice dashboard
          </p>
        </div>

        <div className="rounded-xl border border-border-default bg-white p-8 shadow-sm">
          <form className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text-heading">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@clinic.com"
                className="w-full rounded-lg border border-border-default px-4 py-2.5 text-sm text-text-heading placeholder:text-text-disabled focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-text-heading">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-border-default px-4 py-2.5 text-sm text-text-heading placeholder:text-text-disabled focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-text-muted">
            <Link href="/demo" className="font-medium text-brand-primary hover:text-brand-primary-hover">
              Need access? Book a demo
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-text-muted">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="text-brand-primary hover:underline">Terms of Service</Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-brand-primary hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </main>
  );
}
