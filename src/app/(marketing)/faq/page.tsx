'use client';

import { useState } from 'react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ButtonLink from '@/components/ui/ButtonLink';
import SearchBar from '@/components/ui/SearchBar';
import CategoryPill from '@/components/ui/CategoryPill';
import FAQAccordion, { FAQItem } from '@/components/ui/FAQAccordion';

const categories = ['Product', 'Pricing', 'Security', 'Onboarding', 'Support', 'Billing'] as const;

const faqData: Record<string, FAQItem[]> = {
  Product: [
    { question: 'What clinical workflows does mysaas support out of the box?', answer: 'Mysaas supports appointment scheduling, patient intake, clinical charting, treatment planning, and prescription management out of the box.' },
    { question: 'Can I customize modules for how my clinic actually works?', answer: 'Yes. You can customize forms, workflows, and templates to match your clinic\'s specific processes and preferences.' },
    { question: 'Does mysaas support multiple dentists in one clinic?', answer: 'Absolutely. Mysaas supports multi-provider scheduling, individual charting, and role-based access for each dentist.' },
  ],
  Pricing: [
    { question: 'Can I change plans as my practice grows?', answer: 'Yes. You can upgrade or downgrade your plan at any time. Changes take effect immediately with prorated billing.' },
    { question: 'Is there a setup fee?', answer: 'No. There are no setup fees or hidden charges. You only pay your monthly subscription.' },
    { question: 'Do you offer discounts for annual billing?', answer: 'Yes. Annual billing saves you 20% compared to monthly billing.' },
  ],
  Security: [
    { question: 'How is patient data protected?', answer: 'We use AES-256 encryption at rest, TLS 1.3 in transit, and comply with HIPAA and SOC 2 Type II standards.' },
    { question: 'Is my clinic\'s data isolated from other clinics on the platform?', answer: 'Yes. Each clinic has its own isolated tenant with separate database schemas and strict access controls.' },
    { question: 'Where is data hosted and backed up?', answer: 'Data is hosted on AWS with automatic daily backups, geo-redundant storage, and 99.99% uptime SLA.' },
  ],
  Onboarding: [
    { question: 'How long does it take to get set up?', answer: 'Most clinics are fully onboarded within 1-2 days. Our team handles data migration and configuration.' },
    { question: 'Can I import data from my current system?', answer: 'Yes. We support importing from all major dental practice management systems including Dentrix, Eaglesoft, and Open Dental.' },
    { question: 'Is training included?', answer: 'Yes. All plans include free onboarding training for your entire team via live video sessions.' },
  ],
  Support: [
    { question: 'What support channels are available?', answer: 'We offer live chat, email, phone support, and a comprehensive help center with video tutorials.' },
    { question: 'What are your support hours?', answer: 'Our support team is available Monday-Friday 8AM-8PM EST, with emergency support available 24/7.' },
    { question: 'Is phone support included?', answer: 'Yes. Phone support is included on all paid plans.' },
  ],
  Billing: [
    { question: 'How am I billed — per clinic or per user?', answer: 'Plans are billed per clinic location with unlimited users included.' },
    { question: 'Can I cancel at any time?', answer: 'Yes. You can cancel your subscription at any time with no cancellation fees.' },
    { question: 'How do refunds work?', answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied, contact us for a full refund.' },
  ],
};

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Product');

  const filteredFaqs = faqData[activeCategory]?.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  ) ?? [];

  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      {/* Hero Section */}
      <section className="px-6 py-12 sm:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-[34px] font-extrabold leading-[140%] text-[#1A2038]">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-[15px] leading-[140%] text-[#2C3350]">
            Answers to the questions we hear most often — organized by topic.
          </p>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search FAQs..."
            ariaLabel="Search FAQs"
            className="mx-auto mt-8 max-w-md"
          />
        </div>
      </section>

      {/* Categories + FAQ Content */}
      <section className="px-6 pb-20 sm:px-20">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Resources', href: '/resources' },
              { label: 'FAQ' },
            ]}
          />

          {/* Category Pills */}
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
              >
                <CategoryPill
                  label={category}
                  active={activeCategory === category}
                />
              </button>
            ))}
          </div>

          {/* FAQ Sections */}
          {searchQuery ? (
            <div>
              <h2 className="mb-6 text-center text-lg font-semibold text-[#1A2038]">
                Search Results
              </h2>
              {filteredFaqs.length > 0 ? (
                <FAQAccordion items={filteredFaqs} />
              ) : (
                <p className="text-center text-[#2C3350]">
                  No results found for &quot;{searchQuery}&quot;. Try a different search term.
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-12">
              {categories.map((category) => (
                <div key={category}>
                  <h2 className="mb-6 text-center text-lg font-semibold text-[#1A2038]">
                    {category}
                  </h2>
                  <FAQAccordion items={faqData[category]} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#05303D] px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-white">Still Have Questions?</h2>
          <p className="mt-4 text-[15px] text-[#8099a6]">
            Our team is here to help you find the right solution for your clinic.
          </p>
          <ButtonLink
            href="/demo"
            variant="primary"
            size="lg"
            className="mt-8"
          >
            Contact Sales
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
