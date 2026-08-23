'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? 'Something went wrong. Please try again.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-secondary-100 px-6 py-20">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-text-heading">Forgot Password</h1>
          <p className="mt-2 text-sm text-text-muted">
            Enter your account email and we&apos;ll send you a reset link
          </p>
        </div>

        <div className="rounded-xl border border-border-default bg-white p-8 shadow-sm">
          {submitted ? (
            <div className="text-center">
              <p className="text-sm leading-relaxed text-text-body">
                If an account exists for{' '}
                <span className="font-medium text-text-heading">{email}</span>, a password reset
                link has been sent.
              </p>
              <Link
                href="/login"
                className="mt-6 inline-block rounded-lg bg-brand-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
              >
                Back to Sign In
              </Link>
            </div>
          ) : (
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
                {isSubmitting ? 'Sending…' : 'Send Reset Link'}
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-text-muted">
          Remembered it?{' '}
          <Link href="/login" className="font-medium text-brand-primary transition-colors hover:text-brand-primary-hover">
            Back to Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}