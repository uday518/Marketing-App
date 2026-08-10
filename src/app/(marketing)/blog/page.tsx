"use client";

import { useMemo, useState } from 'react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import SectionHeader from '@/components/ui/SectionHeader';
import SearchBar from '@/components/ui/SearchBar';
import NewsletterCTA from '@/components/ui/NewsletterCTA';
import FeaturedPostCard from '@/components/ui/FeaturedPostCard';
import BlogPostCard from '@/components/ui/BlogPostCard';
import SectionCTA from '@/components/ui/SectionCTA';

const crumb = [
  { label: 'Home', href: '/' },
  { label: 'Resources', href: '/resources' },
  { label: 'Blog' },
];

const categories = ['All', 'Patient Management', 'Technology', 'Patient Experience', 'Product Updates', 'Industry Trends'];

const featuredPost = {
  title: '5 Ways Multi-Clinic Chains Are Cutting No-Show Rates',
  excerpt:
    'A look at the scheduling and queue practices leading dental groups use to keep chairs full and patients on time.',
  category: 'PRACTICE MANAGEMENT',
  categoryHref: '/blog',
  readTime: '6 min read',
  href: '/blog/post',
};

const catHref: Record<string, string> = {
  'Patient Management': '/product/features/patient-management',
  'Technology': '/docs',
  'Patient Experience': '/solutions/clinic-owners',
  'Product Updates': '/resources/release-notes',
};

const posts = [
  { title: 'Why Tenant Isolation Matters for Dental Chains', excerpt: 'How multi-tenant architecture keeps every clinic\'s data separate and secure.', category: 'Technology', readTime: '4 min read' },
  { title: 'Cutting Check-in Time Without Cutting Corners', excerpt: 'What actually shortens waiting room time — and what just feels like it does.', category: 'Patient Experience', readTime: '5 min read' },
  { title: 'What\'s New: Treatment Plan Versioning', excerpt: 'A look at our latest release and how it helps clinical teams stay aligned.', category: 'Product Updates', readTime: '3 min read' },
  { title: 'The Shift Toward Cloud-Native Dental Software', excerpt: 'Why more practices are moving away from on-premise systems in 2026.', category: 'Industry Trends', readTime: '7 min read' },
  { title: 'Staffing a Growing Multi-Location Practice', excerpt: 'Lessons from clinics that scaled from one location to five.', category: 'Practice Management', readTime: '6 min read' },
  { title: 'Argon2 vs. Older Hashing Methods, Explained Simply', excerpt: 'A plain-language look at why password hashing choices matter.', category: 'Technology', readTime: '4 min read' },
];

export default function BlogPage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const matchesQuery = post.title.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  return (
    <main className="min-h-screen bg-bg-page">
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-20 lg:px-10">
        <Breadcrumb items={crumb} />

        <div className="mx-auto max-w-3xl text-center">
          <SectionHeader
            align="center"
            as="h1"
            kicker="The mysaas Blog"
            title="Insights for Modern Dental Practices"
            subtitle="Practical advice on running a smarter clinic — from scheduling to security."
          />
          <SearchBar value={query} onChange={setQuery} placeholder="Search articles..." ariaLabel="Search articles" />
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`inline-flex items-center rounded-full px-4 py-2 text-[11px] font-bold leading-none transition-colors ${
                selectedCategory === cat
                  ? 'bg-brand-primary text-text-on-brand'
                  : 'bg-bg-sidebar text-[#08495C] hover:bg-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredPosts.length > 0 ? (
          <>
            <div className="mx-auto mb-12 max-w-5xl">
              <FeaturedPostCard {...featuredPost} />
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogPostCard
                  key={post.title}
                  {...post}
                  categoryHref={catHref[post.category] ?? '/blog'}
                  href="/blog/post"
                />
              ))}
            </div>
          </>
        ) : (
          <div className="mx-auto max-w-5xl rounded-xl border border-border-default bg-bg-card p-10 text-center">
            <p className="text-base font-semibold text-text-heading">No articles found</p>
            <p className="mt-2 text-sm text-text-muted">Try a different search term or category.</p>
          </div>
        )}

        <div className="mx-auto mt-12 max-w-5xl">
          <NewsletterCTA />
        </div>
      </div>

      <SectionCTA title="Ready to Try It Yourself?" />
    </main>
  );
}