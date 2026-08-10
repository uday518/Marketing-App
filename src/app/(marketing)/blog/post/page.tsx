"use client";

import Breadcrumb from '@/components/ui/Breadcrumb';
import ArrowLink from '@/components/ui/ArrowLink';
import SectionCTA from '@/components/ui/SectionCTA';

const crumb = [
  { label: 'Home', href: '/' },
  { label: 'Resources', href: '/resources' },
  { label: 'Blog', href: '/blog' },
  { label: 'Post' },
];

export default function BlogPostPage() {
  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      <div className="mx-auto max-w-4xl px-6 pt-10 pb-20 lg:px-10">
        <Breadcrumb items={crumb} />

        <article className="rounded-xl border border-neutral-200 bg-white p-8 md:p-12">
          <span className="text-xs font-medium text-brand-primary">
            PRACTICE MANAGEMENT
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-snug text-text-heading lg:text-4xl">
            5 Ways Multi-Clinic Chains Are Cutting No-Show Rates
          </h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-text-muted">
            <span>6 min read</span>
          </div>

          <div className="relative mt-8 h-64 w-full overflow-hidden rounded-lg bg-neutral-100 md:h-96">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/blog/featured-post.jpg"
              alt="5 Ways Multi-Clinic Chains Are Cutting No-Show Rates"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          <div className="prose prose-neutral mt-8 max-w-none">
            <p className="text-text-muted leading-relaxed">
              Missed appointments cost dental practices thousands every month.
              For multi-clinic chains, the problem scales dramatically — and so
              do the solutions. Leading dental groups are turning to technology
              and process improvements to tackle no-shows head-on.
            </p>

            <h2 className="mt-8 text-xl font-bold text-text-heading">
              1. Automated Reminders Across Multiple Channels
            </h2>
            <p className="text-text-muted leading-relaxed">
              The most successful chains use a combination of SMS, email, and
              push notifications to remind patients of upcoming appointments.
              By sending reminders at strategic intervals — 48 hours, 24 hours,
              and 2 hours before — they&apos;ve seen no-show rates drop by up
              to 45%.
            </p>

            <h2 className="mt-8 text-xl font-bold text-text-heading">
              2. Smart Waitlist Management
            </h2>
            <p className="text-text-muted leading-relaxed">
              When cancellations happen, smart waitlist systems automatically
              notify patients on the waiting list, filling empty slots within
              minutes. This not only reduces revenue loss but also improves
              patient satisfaction by getting them in sooner.
            </p>

            <h2 className="mt-8 text-xl font-bold text-text-heading">
              3. Pre-Visit Digital Check-In
            </h2>
            <p className="text-text-muted leading-relaxed">
              Allowing patients to complete paperwork and verify insurance
              before arriving reduces perceived wait times and increases the
              likelihood of showing up. Digital check-in sends a psychological
              signal that the appointment is confirmed and important.
            </p>

            <h2 className="mt-8 text-xl font-bold text-text-heading">
              4. Predictive Analytics
            </h2>
            <p className="text-text-muted leading-relaxed">
              Advanced systems analyze patient history to predict which
              appointments are most likely to result in no-shows. Staff can
              then proactively reach out with personal calls or offer
              incentives to keep those appointments.
            </p>

            <h2 className="mt-8 text-xl font-bold text-text-heading">
              5. Flexible Rescheduling Options
            </h2>
            <p className="text-text-muted leading-relaxed">
              Making it easy for patients to reschedule — through self-service
              portals or quick text responses — reduces no-shows dramatically.
              Patients who reschedule are far more likely to show up than those
              who simply cancel.
            </p>
          </div>
        </article>

        <div className="mt-12">
<ArrowLink href="/blog">Back to Blog</ArrowLink>
        </div>
      </div>

      <SectionCTA title="Ready to Try It Yourself?" />
    </main>
  );
}
