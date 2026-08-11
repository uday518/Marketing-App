'use client';

import { useState } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { SearchIcon, ArrowRightIcon, RocketIcon, UsersIcon, StarIcon, ExclamationIcon, ShieldIcon, PhoneIcon } from '@/components/ui/icons';
import type { ComponentType } from 'react';
import type { IconProps } from '@/components/ui/icons';

const categories = [
  {
    title: 'Getting Started',
    description: 'Account setup, first clinic, and onboarding basics',
    icon: RocketIcon,
    href: '/docs',
  },
  {
    title: 'Account & Billing',
    description: 'Plans, invoices, and payment questions',
    icon: UsersIcon,
    href: '/faq',
  },
  {
    title: 'Features & Usage',
    description: 'How-to guides for every module',
    icon: StarIcon,
    href: '/docs',
  },
  {
    title: 'Troubleshooting',
    description: 'Common issues and how to resolve them',
    icon: ExclamationIcon,
    href: '/faq',
  },
  {
    title: 'Security & Privacy',
    description: 'Data protection and account security',
    icon: ShieldIcon,
    href: '/faq',
  },
  {
    title: 'Contact Support',
    description: 'Reach our team directly',
    icon: PhoneIcon,
    href: '/contact',
  },
];

const popularArticles = [
  { question: 'How do I reset my password?', href: '/faq' },
  { question: 'How do I add a new clinic location?', href: '/faq' },
  { question: 'How do I invite a new staff member?', href: '/faq' },
  { question: "Why can't I see another clinic's patients?", href: '/faq' },
  { question: 'How do I export a report to CSV?', href: '/faq' },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter(
    (cat) =>
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArticles = popularArticles.filter(
    (article) =>
      article.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      {/* Hero Section */}
      <section className="px-6 py-12 sm:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-[34px] font-extrabold leading-[140%] text-[#1A2038]">
            How Can We Help?
          </h1>
          <div className="relative mx-auto mt-8 max-w-md">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8E95B0]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for articles, guides, or topics..."
              aria-label="Search help articles"
              className="w-full rounded-[14px] border border-[#D9DCE5] bg-white py-3.5 pl-12 pr-4 text-sm text-[#1A2038] placeholder:text-[#8E95B0] focus:border-[#0D7A97] focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="px-6 pb-16 sm:px-20">
        <div className="mx-auto max-w-[1080px]">
          <h2 className="mb-10 text-center text-[22px] font-bold text-[#1A2038]">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCategories.map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="group flex flex-col items-start rounded-[14px] border border-[#D9DCE5] bg-white p-6 transition-shadow hover:shadow-md"
              >
                <category.icon className="mb-2.5 h-6 w-6 text-[#1A2038]" />
                <h3 className="text-base font-semibold text-[#1A2038]">
                  {category.title}
                </h3>
                <p className="mt-1 text-[13px] leading-[145%] text-[#636D8C]">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="px-6 pb-16 sm:px-20">
        <div className="mx-auto max-w-[780px]">
          <h2 className="mb-8 text-center text-[22px] font-bold text-[#1A2038]">
            Popular Articles
          </h2>
          <div className="flex flex-col gap-3">
            {filteredArticles.map((article) => (
              <Link
                key={article.question}
                href={article.href}
                className="flex items-center justify-between rounded-[10px] border border-[#D9DCE5] bg-white px-[18px] py-4 transition-shadow hover:shadow-md"
              >
                <span className="text-sm font-medium text-[#1A2038]">
                  {article.question}
                </span>
                <ArrowRightIcon className="h-5 w-5 shrink-0 text-[#0D7A97]" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Banner */}
      <section className="px-6 pb-20 sm:px-20">
        <div className="mx-auto max-w-[1080px]">
          <div className="flex flex-col items-center justify-between gap-6 rounded-[14px] bg-[#EEF0F4] px-12 py-9 sm:flex-row">
            <div>
              <h3 className="text-lg font-bold text-[#1A2038]">
                Can&apos;t Find What You&apos;re Looking For?
              </h3>
              <p className="mt-1 text-sm text-[#636D8C]">
                Our support team typically responds within one business day.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 rounded-lg bg-[#0D7A97] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0A617A]"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
