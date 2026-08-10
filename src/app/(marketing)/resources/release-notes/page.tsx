'use client';

import { useState } from 'react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import SectionHeader from '@/components/ui/SectionHeader';
import ArrowLink from '@/components/ui/ArrowLink';
import SectionCTA from '@/components/ui/SectionCTA';
import { ChevronDownIcon } from '@/components/ui/icons';

const crumb = [
  { label: 'Home', href: '/' },
  { label: 'Resources', href: '/resources' },
  { label: 'Release Notes' },
];

const releases = [
  {
    version: '2.4.0',
    date: 'August 5, 2026',
    title: "What's New in mysaas",
    features: [
      'Enhanced patient dashboard with real-time appointment status',
      'New treatment plan builder with drag-and-drop interface',
      'Improved search functionality across all modules',
      'Multi-clinic calendar sync now supports Google Calendar and Outlook',
    ],
    fixes: [
      'Fixed an issue where appointment reminders were not being sent for same-day bookings',
      'Resolved a bug causing patient records to display incorrect insurance information',
      'Fixed pagination issue in the reports section for clinics with over 1,000 patients',
    ],
    faqs: [
      {
        question: 'How do I access the new treatment plan builder?',
        answer: 'Navigate to Treatment Planning in your sidebar and click "Create New Plan". The drag-and-drop interface will be available by default for all users with the Treatment Planner role.',
      },
      {
        question: 'Will my existing calendar sync settings be affected?',
        answer: 'No, your existing calendar sync configurations will continue to work. You can optionally add Google Calendar or Outlook sync from Settings > Integrations.',
      },
    ],
  },
  {
    version: '2.3.1',
    date: 'July 20, 2026',
    title: 'Performance Improvements',
    features: [
      'Optimized patient search with instant results',
      'New bulk import tool for patient records',
      'Added support for custom dental chart templates',
    ],
    fixes: [
      'Fixed a crash that occurred when exporting large CSV files',
      'Resolved timeout issues with insurance verification',
      'Fixed an issue where staff schedule changes were not reflected in real-time',
    ],
    faqs: [
      {
        question: 'How do I use the new bulk import tool?',
        answer: 'Go to Settings > Import & Export, select "Bulk Import", and download our CSV template. Fill in the template with your patient data and upload it. The system will validate and import your records.',
      },
    ],
  },
  {
    version: '2.3.0',
    date: 'July 1, 2026',
    title: 'New Features & Enhancements',
    features: [
      'Launched patient self-scheduling portal',
      'Added SMS appointment reminders',
      'New analytics dashboard for clinic performance',
      'Enhanced role-based access control',
    ],
    fixes: [
      'Fixed an issue with appointment overlap detection',
      'Resolved a bug in the billing module for multi-currency practices',
      'Fixed email notification delivery for staff members',
    ],
    faqs: [
      {
        question: 'How do I enable the patient self-scheduling portal?',
        answer: 'Go to Settings > Patient Portal and toggle "Enable Self-Scheduling". You can customize available time slots and treatment types that patients can book online.',
      },
      {
        question: 'Is SMS messaging included in my plan?',
        answer: 'SMS reminders are available on the Professional and Enterprise plans. You can configure SMS settings under Settings > Notifications.',
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        type="button"
        className="flex w-full items-center justify-between py-4 text-left"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="text-sm font-medium text-text-heading">{question}</span>
        <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center">
          <ChevronDownIcon
            className={`h-4 w-4 text-text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </span>
      </button>
      {open && (
        <div className="pb-4">
          <p className="text-sm leading-relaxed text-text-muted">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function ReleaseNotesPage() {
  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-20 lg:px-10">
        <Breadcrumb items={crumb} />

        <div className="mx-auto max-w-3xl text-center">
          <SectionHeader
            align="center"
            as="h1"
            title="Release Notes"
            subtitle="See what&apos;s new, improved, and fixed in every release of mysaas."
          />
        </div>

        <div className="mx-auto max-w-3xl space-y-12">
          {releases.map((release) => (
            <section key={release.version} className="rounded-xl border border-neutral-200 bg-white p-6">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-brand-primary">
                  v{release.version}
                </span>
                <span className="text-sm text-text-muted">{release.date}</span>
              </div>

              <h2 className="mb-4 text-xl font-bold text-text-heading">
                {release.title}
              </h2>

              <div className="mb-6">
                <h3 className="mb-2 text-sm font-semibold text-text-heading">
                  New Features
                </h3>
                <ul className="space-y-1.5">
                  {release.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-text-muted">
                      <span className="mt-1 text-brand-primary">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="mb-2 text-sm font-semibold text-text-heading">
                  Bug Fixes
                </h3>
                <ul className="space-y-1.5">
                  {release.fixes.map((fix) => (
                    <li key={fix} className="flex items-start gap-2 text-sm text-text-muted">
                      <span className="mt-1 text-green-600">✓</span>
                      {fix}
                    </li>
                  ))}
                </ul>
              </div>

              {release.faqs.length > 0 && (
                <div className="rounded-lg border border-neutral-200 bg-secondary-100 p-4">
                  <h3 className="mb-3 text-sm font-semibold text-text-heading">
                    Common Questions
                  </h3>
                  {release.faqs.map((faq) => (
                    <FAQItem
                      key={faq.question}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl text-center">
          <ArrowLink href="/docs">View Full Documentation</ArrowLink>
        </div>
      </div>

      <SectionCTA title="Ready to Try It Yourself?" />
    </main>
  );
}
