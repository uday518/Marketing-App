'use client';

import Link from 'next/link';
import { useState } from 'react';

const products = [
  { label: 'Overview', href: '/product' },
  { label: 'Features', href: '/product/features' },
];

const solutions = [
  { label: 'Single Clinic', href: '/solutions/single' },
  { label: 'Multi-Clinic', href: '/solutions/multi' },
  { label: 'Practice Managers', href: '/solutions/practice-managers' },
  { label: 'Clinic Owners', href: '/solutions/clinic-owners' },
];

const resources = [
  { label: 'Blog', href: '/blog' },
  { label: 'Documentation', href: '/docs' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Help Center', href: '/help' },
];

function Dropdown({ label, items }: { label: string; items: { label: string; href: string }[] }) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-1 transition-colors hover:text-brand-primary"
      >
        {label}
        <span className="text-[10px] text-text-disabled">&#9660;</span>
      </button>

      <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100">
        <div className="w-64 rounded-lg border border-border-default bg-white p-2 shadow-lg">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block rounded-md px-3 py-2 transition-colors hover:bg-brand-tint"
            >
              <span className="text-sm font-medium text-text-heading">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-default bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="text-xl font-bold text-brand-primary">mysaas</Link>

        <nav className="hidden items-center gap-11 text-sm text-text-heading md:flex">
          <Dropdown label="Product" items={products} />
          <Dropdown label="Solutions" items={solutions} />
          <Link href="/product/pricing" className="transition-colors hover:text-brand-primary">
            Pricing
          </Link>
          <Dropdown label="Resources" items={resources} />
          <Link href="/company" className="transition-colors hover:text-brand-primary">
            Company
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-xl border border-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-tint md:inline-flex"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="hidden rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover md:inline-flex"
          >
            Start Free Trial
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-text-heading transition-colors hover:bg-neutral-100 md:hidden"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? (
              <span aria-hidden="true">✕</span>
            ) : (
              <span aria-hidden="true">☰</span>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border-default bg-white md:hidden">
          <div className="mx-auto max-w-7xl space-y-4 px-6 py-5">
            <div className="space-y-2">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl bg-neutral-50 px-4 py-3 text-left text-sm font-medium text-text-heading transition-colors hover:bg-neutral-100"
                onClick={() => setMobileProductsOpen((open) => !open)}
              >
                <span>Product</span>
                <span className="text-xs">{mobileProductsOpen ? '−' : '+'}</span>
              </button>
              {mobileProductsOpen && (
                <div className="space-y-1 rounded-xl bg-white p-2">
                  {products.map((product) => (
                    <Link
                      key={product.label}
                      href={product.href}
                      className="block rounded-lg px-4 py-2 text-sm text-text-heading transition-colors hover:bg-neutral-100"
                    >
                      {product.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl bg-neutral-50 px-4 py-3 text-left text-sm font-medium text-text-heading transition-colors hover:bg-neutral-100"
                onClick={() => setMobileSolutionsOpen((open) => !open)}
              >
                <span>Solutions</span>
                <span className="text-xs">{mobileSolutionsOpen ? '−' : '+'}</span>
              </button>
              {mobileSolutionsOpen && (
                <div className="space-y-1 rounded-xl bg-white p-2">
                  {solutions.map((solution) => (
                    <Link
                      key={solution.label}
                      href={solution.href}
                      className="block rounded-lg px-4 py-2 text-sm text-text-heading transition-colors hover:bg-neutral-100"
                    >
                      {solution.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl bg-neutral-50 px-4 py-3 text-left text-sm font-medium text-text-heading transition-colors hover:bg-neutral-100"
                onClick={() => setMobileResourcesOpen((open) => !open)}
              >
                <span>Resources</span>
                <span className="text-xs">{mobileResourcesOpen ? '−' : '+'}</span>
              </button>
              {mobileResourcesOpen && (
                <div className="space-y-1 rounded-xl bg-white p-2">
                  {resources.map((resource) => (
                    <Link
                      key={resource.label}
                      href={resource.href}
                      className="block rounded-lg px-4 py-2 text-sm text-text-heading transition-colors hover:bg-neutral-100"
                    >
                      {resource.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-1 border-t border-neutral-200 pt-4">
              <Link
                href="/product/pricing"
                className="block rounded-xl px-4 py-3 text-sm text-text-heading transition-colors hover:bg-neutral-100"
              >
                Pricing
              </Link>
              <Link
                href="/company"
                className="block rounded-xl px-4 py-3 text-sm text-text-heading transition-colors hover:bg-neutral-100"
              >
                Company
              </Link>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <Link
                href="/login"
                className="rounded-xl border border-brand-primary px-4 py-3 text-sm font-semibold text-brand-primary text-center transition-colors hover:bg-brand-tint"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-xl bg-brand-primary px-4 py-3 text-sm font-semibold text-white text-center transition-colors hover:bg-brand-primary-hover"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
