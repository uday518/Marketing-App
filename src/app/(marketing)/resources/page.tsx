import Link from 'next/link';
import SectionCTA from '@/components/ui/SectionCTA';

const resources = [
  {
    title: 'Blog',
    description: 'Practical advice on running a smarter dental practice',
    href: '/blog',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <line x1="8" y1="8" x2="16" y2="8" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <line x1="8" y1="16" x2="12" y2="16" />
      </svg>
    ),
  },
  {
    title: 'Documentation',
    description: 'Guides and references for setting up and using mysaas',
    href: '/docs',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: 'FAQ',
    description: 'Answers to the questions we hear most often',
    href: '/faq',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    title: 'Help Center',
    description: 'Search articles or contact support directly',
    href: '/help',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
  },
  {
    title: 'Release Notes',
    description: "See what's new, improved, and fixed in every release",
    href: '/docs',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-secondary-100">
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-20 lg:px-10">
        <nav className="mb-10 text-sm text-text-muted">
          <Link href="/" className="hover:text-text-heading">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text-heading">Resources</span>
        </nav>

        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-3xl font-bold text-text-heading lg:text-4xl">
            Resources to Help You Get the Most from mysaas
          </h1>
          <p className="mb-12 text-base text-text-muted">
            Guides, documentation, and answers — whether you&apos;re evaluating the
            platform or already running your clinic on it.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <Link
              key={resource.title}
              href={resource.href}
              className="group flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-6 transition-colors hover:border-primary-200 hover:shadow-md"
            >
              <div className="text-text-heading transition-colors group-hover:text-brand-primary">
                {resource.icon}
              </div>
              <h2 className="text-[15px] font-medium text-text-heading">
                {resource.title}
              </h2>
              <p className="text-sm leading-relaxed text-text-muted">
                {resource.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <SectionCTA title="Ready to Try It Yourself?" />
    </main>
  );
}
