import Link from 'next/link';
import FAQAccordion, { type FAQItem } from '@/components/ui/FAQAccordion';

const trialBenefits = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'Full Access',
    description: 'Every module unlocked \u2014 nothing gated behind a paywall',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    title: 'No Credit Card',
    description: 'Start exploring immediately, with zero commitment',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
    title: 'Cancel Anytime',
    description: 'No contracts, no cancellation fees',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12c0 0 4-8 10-8s10 8 10 8-4 8-10 8-10-8-10-8z" />
        <path d="M12 6v12" />
        <path d="M8 8l4 4-4 4" />
      </svg>
    ),
    title: 'Guided Onboarding',
    description: 'A short walkthrough to help you get set up fast',
  },
];

const includedFeatures = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Staff Management',
    description: 'Calendars respect each dentist\u2019s role and access',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'Patient Management',
    description: 'Encounters attach to the full patient record',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: 'Appointment Management',
    description: 'Bookings feed the queue automatically',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: 'Reports & Analytics',
    description: 'Clinical trends roll up into practice reports',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
    title: 'Queue Management',
    description: 'Booked patients flow straight into the live queue',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    title: 'Clinical Documentation',
    description: 'Encounters link straight back to the patient record',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: 'Multi-Clinic Management',
    description: 'Reports roll up across every clinic location',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Treatment Planning',
    description: 'Role permissions are enforced at every layer',
  },
];

const nextSteps = [
  {
    number: 1,
    title: 'Create Your Account',
    description: 'Sign up in under a minute \u2014 no credit card needed',
  },
  {
    number: 2,
    title: 'Set Up Your Clinic',
    description: 'Add your first location, staff, and basic settings',
  },
  {
    number: 3,
    title: 'Explore',
    description: 'Try it with sample data, or start adding real patients right away',
  },
];

const faqItems: FAQItem[] = [
  {
    question: 'What happens when my trial ends?',
    answer: 'When your 30-day trial ends, your account will be paused. You can upgrade to a paid plan at any time to continue using the platform. Your data is preserved for 90 days after the trial ends.',
  },
  {
    question: 'Can I import my existing patient data?',
    answer: 'Yes! We support importing patient data from most common formats including CSV, Excel, and direct integrations with other practice management systems. Our onboarding team can help with the migration.',
  },
  {
    question: 'Is support included during the trial?',
    answer: 'Absolutely. During your trial you get full access to our support team via chat, email, and phone. We also provide a guided onboarding walkthrough to help you get started quickly.',
  },
  {
    question: 'Do I need a credit card to sign up?',
    answer: 'No. You can start your free trial without entering any payment information. If you decide to upgrade after the trial, you\u2019ll need to add a payment method.',
  },
];

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="mt-0.5 shrink-0">
      <path d="M10.5 3.5L5 9L2.5 6.5" stroke="#0D7A97" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-secondary-100">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pt-10 pb-16 lg:px-10">
        <nav className="mb-8 text-sm">
          <Link href="/" className="font-medium text-brand-primary hover:underline">
            Free Trial
          </Link>
        </nav>

        <div className="flex flex-col items-start gap-16 lg:flex-row">
          {/* Left Column - Hero Text */}
          <div className="flex w-full max-w-[520px] flex-col gap-5">
            <h1 className="text-[38px] font-extrabold leading-[118%] text-text-heading">
              Start Your Free Trial
            </h1>
            <p className="text-base leading-[150%] text-text-body">
              30 days, full access, no credit card required. Set up your clinic
              and explore every module at your own pace.
            </p>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2">
                <CheckIcon />
                <span className="text-sm leading-[140%] text-text-body">
                  Full access to every module
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon />
                <span className="text-sm leading-[140%] text-text-body">
                  No credit card required
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon />
                <span className="text-sm leading-[140%] text-text-body">
                  Cancel anytime, no questions asked
                </span>
              </li>
            </ul>
          </div>

          {/* Right Column - Account Creation Form */}
          <div className="w-full max-w-[420px] rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-lg font-bold text-text-heading">
              Create Your Account
            </h2>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="fullName" className="text-sm font-medium text-text-heading">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Dr. Jane Smith"
                  className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-text-heading placeholder:text-text-disabled outline-none focus:border-brand-primary focus:ring-2 focus:ring-primary-100"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="workEmail" className="text-sm font-medium text-text-heading">
                  Work Email
                </label>
                <input
                  id="workEmail"
                  type="email"
                  placeholder="jane@yourclinic.com"
                  className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-text-heading placeholder:text-text-disabled outline-none focus:border-brand-primary focus:ring-2 focus:ring-primary-100"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="clinicName" className="text-sm font-medium text-text-heading">
                  Clinic Name
                </label>
                <input
                  id="clinicName"
                  type="text"
                  placeholder="Brightside Dental"
                  className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-text-heading placeholder:text-text-disabled outline-none focus:border-brand-primary focus:ring-2 focus:ring-primary-100"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-sm font-medium text-text-heading">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-text-heading placeholder:text-text-disabled outline-none focus:border-brand-primary focus:ring-2 focus:ring-primary-100"
                />
              </div>
              <button
                type="submit"
                className="mt-1 rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
              >
                Create Account
              </button>
            </form>
            <p className="mt-4 text-center text-xs text-text-muted">
              No credit card required &middot; 30-day free trial
            </p>
          </div>
        </div>
      </section>

      {/* Trial Benefits Section */}
      <section className="border-t border-neutral-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="mb-10 text-center text-2xl font-bold text-text-heading sm:text-3xl">
            Trial Benefits
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trialBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex flex-col gap-3 rounded-xl border border-neutral-200 p-6"
              >
                <div className="text-text-heading">{benefit.icon}</div>
                <h3 className="text-[15px] font-medium text-text-heading">
                  {benefit.title}
                </h3>
                <p className="text-[15px] leading-[140%] text-text-muted">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Everything's Included Section */}
      <section className="border-t border-neutral-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="mb-10 text-center text-2xl font-bold text-text-heading sm:text-3xl">
            Everything&apos;s Included During Your Trial
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {includedFeatures.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col gap-3 rounded-xl border border-neutral-200 p-6"
              >
                <div className="text-text-heading">{feature.icon}</div>
                <h3 className="text-[15px] font-medium text-text-heading">
                  {feature.title}
                </h3>
                <p className="text-[15px] leading-[140%] text-text-muted">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Happens Next Section */}
      <section className="border-t border-neutral-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="mb-10 text-center text-2xl font-bold text-text-heading sm:text-3xl">
            What Happens Next
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {nextSteps.map((step) => (
              <div key={step.number} className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-success-500 text-sm font-bold text-white">
                  {step.number}
                </div>
                <h3 className="mb-2 text-base font-semibold text-text-heading">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-neutral-200 bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <h2 className="mb-10 text-center text-2xl font-bold text-text-heading sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <FAQAccordion items={faqItems} />
        </div>
      </section>
    </main>
  );
}
