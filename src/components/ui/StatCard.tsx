import type { ReactNode } from 'react';

export default function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border-default bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-muted">{label}</p>
        <span className="text-brand-primary">{icon}</span>
      </div>
      <p className="mt-2 text-3xl font-bold text-text-heading">{value.toLocaleString()}</p>
    </div>
  );
}