import React from 'react';
import Link from 'next/link';
import GlobalSearch from '@/components/GlobalSearch/GlobalSearch';
import SignOutButton from '@/components/SignOutButton/SignOutButton';

interface DashboardHeaderProps {
  clinicName: string;
  roleLabel: string;
  greeting: string;
  firstName: string;
}

export default function DashboardHeader({ clinicName, roleLabel, greeting, firstName }: DashboardHeaderProps) {
  return (
    <header className="mb-8 rounded-2xl bg-white/10 backdrop-blur-xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-sm text-text-muted">
            {clinicName}{roleLabel ? ` · ${roleLabel}` : ''}
          </p>
          <h1 className="mt-1 text-2xl font-bold text-text-heading">
            {greeting}, {firstName}
          </h1>
          <p className="mt-1 text-sm text-text-muted">Here&apos;s what&apos;s happening at your clinic today.</p>
        </div>
        <div className="flex items-center gap-3">
          <GlobalSearch />
          <Link href="/staff" className="rounded-lg border border-border-default px-4 py-2 text-sm font-medium text-text-heading transition-colors hover:bg-neutral-100">
            Staff
          </Link>
          <Link href="/patients" className="rounded-lg border border-border-default px-4 py-2 text-sm font-medium text-text-heading transition-colors hover:bg-neutral-100">
            Manage patients
          </Link>
          <Link href="/settings" className="rounded-lg border border-border-default px-4 py-2 text-sm font-medium text-text-heading transition-colors hover:bg-neutral-100">
            Settings
          </Link>
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
