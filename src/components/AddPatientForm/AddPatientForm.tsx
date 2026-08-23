'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddPatientForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [insurance, setInsurance] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, phone, insurance }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? 'Could not add patient. Please try again.');
      }

      setFullName('');
      setEmail('');
      setPhone('');
      setInsurance('');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-10 rounded-2xl border border-border-default bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-bold text-text-heading">Add a Patient</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="fullName" className="text-sm font-medium text-text-heading">
            Full Name *
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder="Maria Lopez"
            className="rounded-lg border border-border-default bg-white px-3 py-2 text-sm text-text-heading placeholder:text-text-disabled outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/50"
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
            placeholder="maria@example.com"
            className="rounded-lg border border-border-default bg-white px-3 py-2 text-sm text-text-heading placeholder:text-text-disabled outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/50"
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
            className="rounded-lg border border-border-default bg-white px-3 py-2 text-sm text-text-heading placeholder:text-text-disabled outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/50"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="insurance" className="text-sm font-medium text-text-heading">
            Insurance
          </label>
          <input
            id="insurance"
            type="text"
            value={insurance}
            onChange={(e) => setInsurance(e.target.value)}
            placeholder="Delta Dental"
            className="rounded-lg border border-border-default bg-white px-3 py-2 text-sm text-text-heading placeholder:text-text-disabled outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/50"
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-error-100 px-3 py-2 text-sm text-error-500">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 rounded-lg bg-brand-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Adding…' : 'Add Patient'}
      </button>
    </form>
  );
}