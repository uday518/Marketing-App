'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const roleOptions = [
  { value: 'dentist', label: 'Doctor / Dentist' },
  { value: 'receptionist', label: 'Receptionist' },
  { value: 'manager', label: 'Manager' },
];

export default function CreateStaffForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('dentist');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const response = await fetch('/api/staff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setError(data.error ?? 'Could not create the staff account.');
      setIsSubmitting(false);
      return;
    }

    setSuccess(`Created ${name}'s account. They can sign in with the credentials you set.`);
    setName('');
    setEmail('');
    setPassword('');
    setRole('dentist');
    setIsSubmitting(false);
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-10 rounded-2xl border border-border-default bg-white p-6 shadow-sm"
    >
      <h2 className="mb-4 text-base font-bold text-text-heading">Create a Staff Account</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-text-heading">
            Full Name *
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Dr. Jane Smith"
            className="rounded-lg border border-border-default bg-white px-3 py-2 text-sm text-text-heading placeholder:text-text-disabled outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/50"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-text-heading">
            Email *
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="jane@clinic.com"
            className="rounded-lg border border-border-default bg-white px-3 py-2 text-sm text-text-heading placeholder:text-text-disabled outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/50"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-text-heading">
            Password *
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            placeholder="At least 8 characters"
            className="rounded-lg border border-border-default bg-white px-3 py-2 text-sm text-text-heading placeholder:text-text-disabled outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/50"
          />
          <p className="text-xs text-text-muted">Uppercase, lowercase, number, symbol</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="role" className="text-sm font-medium text-text-heading">
            Role *
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="rounded-lg border border-border-default bg-white px-3 py-2 text-sm text-text-heading outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/50"
          >
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}
      {success && (
        <p className="mt-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{success}</p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 rounded-lg bg-brand-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Creating…' : 'Create Staff Account'}
      </button>
    </form>
  );
}