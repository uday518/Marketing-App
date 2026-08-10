'use client';

import { useState } from 'react';

interface NewsletterCTAProps {
  title?: string;
  subtitle?: string;
  successMessage?: string;
  placeholder?: string;
  buttonLabel?: string;
  className?: string;
}

export default function NewsletterCTA({
  title = 'Get New Posts in Your Inbox',
  subtitle = 'One email a month. No spam, ever.',
  successMessage = "You're subscribed. Welcome aboard!",
  placeholder = 'you@clinic.com',
  buttonLabel = 'Subscribe',
  className = '',
}: NewsletterCTAProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div
      className={`flex flex-col gap-4 rounded-xl border border-border-default bg-bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 ${className}`}
    >
      <div>
        <h3 className="text-lg font-bold text-text-heading">{title}</h3>
        <p className="mt-1 text-sm text-text-muted">{subtitle}</p>
      </div>
      {subscribed ? (
        <p className="text-sm font-medium text-success-500">{successMessage}</p>
      ) : (
        <form
          className="flex w-full max-w-sm flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            if (email.trim()) setSubscribed(true);
          }}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            aria-label="Email address"
            className="w-full rounded-lg border border-border-default bg-bg-page px-4 py-2.5 text-sm text-text-heading placeholder:text-text-disabled focus:border-border-focus focus:outline-none"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-brand-primary px-6 py-2.5 text-sm font-medium text-text-on-brand transition-colors hover:bg-brand-primary-hover"
          >
            {buttonLabel}
          </button>
        </form>
      )}
    </div>
  );
}