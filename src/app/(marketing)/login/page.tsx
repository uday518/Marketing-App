"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession, signIn } from 'next-auth/react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password.');
      setIsSubmitting(false);
      return;
    }

    const session = await getSession();

    if (session?.user.role === 'patient') {
      router.push('/portal');
    } else {
      router.push('/dashboard');
    }
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-secondary-100 px-6 py-20">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-text-heading">Sign In</h1>
        </div>

        <div className="rounded-xl border border-border-default bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text-heading">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full rounded-lg border border-border-default px-4 py-2.5 text-sm text-text-heading placeholder:text-text-disabled focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              />
              <div className="mt-1.5 flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-brand-primary transition-colors hover:text-brand-primary-hover"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Signing In…' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 border-t border-border-default pt-6 text-center text-sm">
            <p className="text-text-muted">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-medium text-brand-primary transition-colors hover:text-brand-primary-hover">
                Sign Up
              </Link>
            </p>
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