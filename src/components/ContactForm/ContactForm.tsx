'use client';

import { useState } from 'react';
import CountryCodeSelect, { type CountryCodeOption } from '@/components/CountryCodeSelect/CountryCodeSelect';

const subjects = [
  'General Inquiry',
  'Sales & Pricing',
  'Book a Demo',
  'Technical Support',
  'Billing',
  'Something Else',
];

const countryCodes: CountryCodeOption[] = [
  { code: '+977', name: 'Nepal' },
  { code: '+1', name: 'US / Canada' },
  { code: '+44', name: 'United Kingdom' },
  { code: '+91', name: 'India' },
  { code: '+61', name: 'Australia' },
  { code: '+971', name: 'UAE' },
  { code: '+966', name: 'Saudi Arabia' },
  { code: '+880', name: 'Bangladesh' },
  { code: '+92', name: 'Pakistan' },
  { code: '+86', name: 'China' },
  { code: '+81', name: 'Japan' },
  { code: '+82', name: 'South Korea' },
  { code: '+65', name: 'Singapore' },
  { code: '+49', name: 'Germany' },
  { code: '+33', name: 'France' },
  { code: '+39', name: 'Italy' },
  { code: '+34', name: 'Spain' },
  { code: '+7', name: 'Russia' },
  { code: '+55', name: 'Brazil' },
  { code: '+52', name: 'Mexico' },
];

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState(countryCodes[0].code);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [subject, setSubject] = useState(subjects[0]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    setError(null);

    const phone = phoneNumber.trim() ? `${countryCode} ${phoneNumber.trim()}` : '';

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, subject, message }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setStatus('error');
      setError(data.error ?? 'Something went wrong. Please try again.');
      return;
    }

    setStatus('success');
    setName('');
    setEmail('');
    setCountryCode(countryCodes[0].code);
    setPhoneNumber('');
    setSubject(subjects[0]);
    setMessage('');
  }

  const inputClasses =
    'w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-text-heading placeholder:text-text-disabled outline-none focus:border-brand-primary focus:ring-2 focus:ring-primary-100';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            placeholder="Maria Lopez"
            className={inputClasses}
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
            placeholder="you@example.com"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-sm font-medium text-text-heading">
          Phone <span className="font-normal text-text-muted">(optional)</span>
        </label>
        <div className="flex gap-2">
          <CountryCodeSelect
            options={countryCodes}
            value={countryCode}
            onChange={setCountryCode}
          />
          <input
            id="phone"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="9801234567"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-text-heading placeholder:text-text-disabled outline-none focus:border-brand-primary focus:ring-2 focus:ring-primary-100"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <select
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={inputClasses}
        >
          {subjects.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-text-heading">
          Message *
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          minLength={10}
          rows={6}
          placeholder="Tell us how we can help…"
          className={`${inputClasses} resize-y`}
        />
      </div>

      {status === 'success' && (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
          Thanks for reaching out! We&apos;ll get back to you within one business day.
        </p>
      )}
      {status === 'error' && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}