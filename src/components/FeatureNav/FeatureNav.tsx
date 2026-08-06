'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const features = [
  { label: 'Patient Management', href: '/product/features/patient-management' },
  { label: 'Appointment Management', href: '/product/features/appointment-management' },
  { label: 'Queue Management', href: '/product/features/queue-management' },
  { label: 'Clinical Document', href: '/product/features/clinical-documentation' },
  { label: 'Treatment Planning', href: '/product/features/treatment-planning' },
  { label: 'Staff Management', href: '/product/features/staff-management' },
  { label: 'Reports Analytics', href: '/product/features/reports-analytics' },
  { label: 'Multi-Clinic Management', href: '/product/features/multi-clinic-management' },
  { label: 'Security', href: '/product/features/security' },
];

export default function FeatureNav() {
  const pathname = usePathname();
  const currentIndex = features.findIndex((f) => f.href === pathname);
  const prev = currentIndex > 0 ? features[currentIndex - 1] : null;
  const next = currentIndex < features.length - 1 ? features[currentIndex + 1] : null;

  return (
    <nav className="border-t border-border-default bg-gray-50 px-6 py-10 lg:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {prev ? (
          <Link
            href={prev.href}
            className="text-sm text-brand-primary hover:underline"
          >
            ← {prev.label}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={next.href}
            className="text-sm text-brand-primary hover:underline"
          >
            {next.label} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </nav>
  );
}
