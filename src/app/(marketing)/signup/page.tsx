'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import FAQAccordion, { type FAQItem } from '@/components/ui/FAQAccordion';

const steps = [
  {
    number: 1,
    title: 'Create Your Account',
    description: 'Sign up in under a minute with your name, email, and phone',
  },
  {
    number: 2,
    title: 'Get Verified',
    description: 'Your clinic links your record to your account automatically',
  },
  {
    number: 3,
    title: 'Follow Your Care',
    description: 'Track appointments, visit reports, and treatment plans',
  },
];

const faqItems: FAQItem[] = [
  {
    question: 'Who can create a patient account?',
    answer:
      'Patients create their own account here. Staff and doctor accounts are created only by your clinic\u2019s admin.',
  },
  {
    question: 'Why is there no Clinic Name field?',
    answer:
      'Patients don\u2019t need one. Your clinic matches your account to your existing patient record using your email, then links your appointments and reports automatically.',
  },
  {
    question: 'What can I see once I sign in?',
    answer:
      'Your upcoming appointments, visit reports, treatment plans, medical history, and your live queue position.',
  },
  {
    question: 'What if my clinic already has my record?',
    answer:
      'Signing up with the same email you gave your clinic links your account to that record instantly. If we can\u2019t find it, a new patient record is created for you.',
  },
];

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="mt-0.5 shrink-0">
      <path d="M10.5 3.5L5 9L2.5 6.5" stroke="#0D7A97" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/patient-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, phone, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? 'Something went wrong. Please try again.');
      }

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        router.push('/login');
        return;
      }

      router.push('/portal');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-secondary-100">
      <section className="mx-auto max-w-7xl px-6 pt-10 pb-16 lg:px-10">
        <nav className="mb-8 text-sm">
          <Link href="/" className="font-medium text-brand-primary hover:underline">
            Patient Sign Up
          </Link>
        </nav>

        <div className="flex flex-col items-start gap-16 lg:flex-row">
          <div className="flex w-full max-w-[520px] flex-col gap-5">
            <h1 className="text-[38px] font-extrabold leading-[118%] text-text-heading">
              Create Your Patient Account
            </h1>
            <p className="text-base leading-[150%] text-text-body">
              Track your appointments, visit reports, and treatment plans — all in one place.
            </p>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2">
                <CheckIcon />
                <span className="text-sm leading-[140%] text-text-body">
                  Your schedule and live queue position
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon />
                <span className="text-sm leading-[140%] text-text-body">
                  Your visit reports and treatment plans
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon />
                <span className="text-sm leading-[140%] text-text-body">
                  Free — your clinic matches your record by email
                </span>
              </li>
            </ul>
          </div>

          <div className="w-full max-w-[420px] rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-lg font-bold text-text-heading">Create Your Account</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="fullName" className="text-sm font-medium text-text-heading">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="Maria Lopez"
                  className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-text-heading placeholder:text-text-disabled outline-none focus:border-brand-primary focus:ring-2 focus:ring-primary-100"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-text-heading">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="maria@example.com"
                  className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-text-heading placeholder:text-text-disabled outline-none focus:border-brand-primary focus:ring-2 focus:ring-primary-100"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-sm font-medium text-text-heading">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="555-0123"
                  className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-text-heading placeholder:text-text-disabled outline-none focus:border-brand-primary focus:ring-2 focus:ring-primary-100"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-sm font-medium text-text-heading">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="Create a password"
                  className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-text-heading placeholder:text-text-disabled outline-none focus:border-brand-primary focus:ring-2 focus:ring-primary-100"
                />
              </div>
              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Creating Account…' : 'Create Patient Account'}
              </button>
            </form>
            <p className="mt-4 text-center text-xs text-text-muted">
              Already registered?{' '}
              <Link href="/login" className="font-medium text-brand-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="mb-10 text-center text-2xl font-bold text-text-heading sm:text-3xl">
            What Happens Next
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white">
                  {step.number}
                </div>
                <h3 className="mb-2 text-base font-semibold text-text-heading">{step.title}</h3>
                <p className="text-sm leading-relaxed text-text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <h2 className="mb-10 text-center text-2xl font-bold text-text-heading sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <FAQAccordion items={faqItems} />
        </div>
      </section>
    </main>
  );
}