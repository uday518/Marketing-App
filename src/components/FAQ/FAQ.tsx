'use client';

import Link from 'next/link';
import FAQAccordion, { FAQItem } from '@/components/ui/FAQAccordion';

const defaultFaqs: FAQItem[] = [
  {
    question: 'How does mySaaS pricing work?',
    answer: 'We offer three tiers based on your clinic size. Start with our free trial, then choose Starter, Growth, or Enterprise based on your needs.',
  },
  {
    question: 'Is patient data secure and HIPAA-ready?',
    answer: 'Yes. We use tenant isolation, role-based access control, encrypted data at rest and in transit, and Argon2 password hashing.',
  },
  {
    question: 'Can I manage multiple clinic locations?',
    answer: 'Yes. Our Growth and Enterprise plans support multi-clinic management from a single dashboard.',
  },
  {
    question: 'How long does onboarding take?',
    answer: 'Most clinics are up and running in under 10 minutes. Our team provides free onboarding support for all plans.',
  },
  {
    question: 'What happens after my free trial ends?',
    answer: 'You can choose a paid plan or your account will be paused. Your data is kept safe for 30 days.',
  },
];

export default function FAQ() {
  return (
    <section className="bg-secondary-100 px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-text-heading lg:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <FAQAccordion items={defaultFaqs} />

        <div className="mt-8 text-center">
          <Link href="/faq" className="text-sm font-medium text-brand-primary hover:text-brand-primary-hover">
            View All FAQs →
          </Link>
        </div>
      </div>
    </section>
  );
}
