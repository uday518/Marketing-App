"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import SectionHeader from '@/components/ui/SectionHeader';
import IconCard from '@/components/ui/IconCard';
import SearchBar from '@/components/ui/SearchBar';
import FAQAccordion, { type FAQItem } from '@/components/ui/FAQAccordion';
import ButtonLink from '@/components/ui/ButtonLink';
import ArrowLink from '@/components/ui/ArrowLink';
import SectionCTA from '@/components/ui/SectionCTA';
import {
  RocketIcon,
  ClinicIcon,
  UsersIcon,
  UploadIcon,
  PatientIcon,
  CalendarIcon,
  DocsIcon,
  PencilIcon,
  ChartIcon,
  ShieldIcon,
} from '@/components/ui/icons';

const crumb = [
  { label: 'Home', href: '/' },
  { label: 'Resources', href: '/resources' },
  { label: 'Documentation' },
];

const gettingStarted = [
  { title: 'Quick Start Guide', description: 'Take a guided tour and get your account set up in minutes', href: '/product/tour', icon: RocketIcon },
  { title: 'Setting Up Your First Clinic', description: 'Configure locations, hours, and clinic-level settings', href: '/product/features/multi-clinic-management', icon: ClinicIcon },
  { title: 'Inviting Staff', description: 'Add team members and assign the right roles', href: '/product/features/staff-management', icon: UsersIcon },
  { title: 'Importing Patients', description: 'Bring existing patient records into mysaas', href: '/product/features/patient-management', icon: UploadIcon },
];

const productGuides = [
  { title: 'Patient Management', description: 'Guides & reference articles', href: '/product/features/patient-management', icon: PatientIcon },
  { title: 'Appointment Management', description: 'Guides & reference articles', href: '/product/features/appointment-management', icon: CalendarIcon },
  { title: 'Queue Management', description: 'Guides & reference articles', href: '/product/features/queue-management', icon: CalendarIcon },
  { title: 'Clinical Documentation', description: 'Guides & reference articles', href: '/product/features/clinical-documentation', icon: DocsIcon },
  { title: 'Treatment Planning', description: 'Guides & reference articles', href: '/product/features/treatment-planning', icon: PencilIcon },
  { title: 'Staff Management', description: 'Guides & reference articles', href: '/product/features/staff-management', icon: UsersIcon },
  { title: 'Reports & Analytics', description: 'Guides & reference articles', href: '/product/features/reports-analytics', icon: ChartIcon },
  { title: 'Multi-Clinic Management', description: 'Guides & reference articles', href: '/product/features/multi-clinic-management', icon: ClinicIcon },
  { title: 'Security', description: 'Guides & reference articles', href: '/product/features/security', icon: ShieldIcon },
];

const faqs: (FAQItem & { href: string })[] = [
  { question: "How do I reset a staff member's password?", answer: 'Go to Staff Management, find the staff member, click the three-dot menu, and select "Reset Password". An email with a reset link will be sent to their registered email address.', href: '/product/features/staff-management' },
  { question: 'Can I migrate data from another practice management system?', answer: 'Yes. Navigate to Settings > Import & Export, and use the CSV import tool. We support imports from most major dental practice management systems including Dentrix, Eaglesoft, and Open Dental.', href: '/product/features/patient-management' },
  { question: 'How do permissions work across multiple clinics?', answer: 'Permissions are managed at the organization level. Admins can assign roles per clinic or across the entire organization. Staff can be given different access levels for each clinic they work at.', href: '/product/features/multi-clinic-management' },
  { question: 'How do I secure patient data and stay HIPAA-ready?', answer: 'mysaas uses tenant isolation, role-based access control, and encrypted data at rest and in transit. See our Security overview for a full breakdown.', href: '/product/features/security' },
  { question: 'Can I schedule a live walkthrough of the product?', answer: "Yes. Book a demo with our team and we'll walk you through scheduling, charting, and multi-clinic workflows on a call.", href: '/demo' },
];

function filterBy(items: typeof gettingStarted, query: string) {
  return items.filter((item) =>
    (item.title + item.description).toLowerCase().includes(query.trim().toLowerCase()),
  );
}

export default function DocsPage() {
  const [query, setQuery] = useState('');

  const filteredStarted = useMemo(() => filterBy(gettingStarted, query), [query]);
  const filteredGuides = useMemo(() => filterBy(productGuides, query), [query]);
  const noResults = query.trim() && filteredStarted.length === 0 && filteredGuides.length === 0;

  return (
    <main className="min-h-screen bg-bg-page">
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-20 lg:px-10">
        <Breadcrumb items={crumb} />

        <div className="mx-auto max-w-3xl text-center">
          <SectionHeader
            align="center"
            as="h1"
            kicker="Documentation"
            title="Guides & references for mysaas"
            subtitle="Everything you need to set up, configure, and get the most out of your dental practice software."
          />

          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search documentation..."
            ariaLabel="Search documentation"
            className="mx-auto mb-6 max-w-xl"
          />

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/product/tour">See How It Works</ButtonLink>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center rounded-lg border border-brand-primary bg-transparent px-6 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10 hover:text-brand-primary-hover"
            >
              Book a Demo
            </Link>
            <ArrowLink href="/resources/release-notes" muted>What&apos;s new</ArrowLink>
          </div>
        </div>

        {noResults ? (
          <div className="mx-auto mt-16 max-w-5xl rounded-xl border border-border-default bg-bg-card p-10 text-center">
            <p className="text-base font-semibold text-text-heading">No documentation found</p>
            <p className="mt-2 text-sm text-text-muted">Try a different search term, or browse the sections below.</p>
          </div>
        ) : (
          <>
            <section className="mx-auto mt-16 max-w-5xl">
              <SectionHeader title="Getting Started" subtitle="Step-by-step guides to get your clinic live." />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {filteredStarted.map((item) => (
                  <IconCard key={item.title} {...item} />
                ))}
              </div>
            </section>

            <section className="mx-auto mt-16 max-w-5xl">
              <SectionHeader title="Product Guides" subtitle="Organized by module — jump straight to the area you need." />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredGuides.map((item) => (
                  <IconCard key={item.title} {...item} layout="inline" />
                ))}
              </div>
            </section>
          </>
        )}

        <section className="mx-auto mt-16 max-w-3xl">
          <SectionHeader title="Common Questions" subtitle="Select a question to reveal its answer." />

          <FAQAccordion
            items={faqs}
            renderAnswer={(item) => (
              <>
                <p>{item.answer}</p>
                <ArrowLink href={(item as (FAQItem & { href: string })).href} className="mt-3">
                  Learn more
                </ArrowLink>
              </>
            )}
          />

          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ArrowLink href="/faq">View Full FAQ</ArrowLink>
            <ArrowLink href="/help" muted>Visit Help Center</ArrowLink>
          </div>
        </section>
      </div>

      <SectionCTA title="Ready to Put It Into Practice?" />
    </main>
  );
}