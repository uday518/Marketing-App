import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import SectionCTA from '@/components/ui/SectionCTA';
import { NewspaperIcon, FileTextIcon, HelpIcon, ChatIcon, BellIcon } from '@/components/ui/icons';

const crumb = [
  { label: 'Home', href: '/' },
  { label: 'Resources' },
];

const resources = [
  { title: 'Blog', description: 'Practical advice on running a smarter dental practice', href: '/blog', icon: NewspaperIcon },
  { title: 'Documentation', description: 'Guides and references for setting up and using mysaas', href: '/docs', icon: FileTextIcon },
  { title: 'FAQ', description: 'Answers to the questions we hear most often', href: '/faq', icon: HelpIcon },
  { title: 'Help Center', description: 'Search articles or contact support directly', href: '/help', icon: ChatIcon },
  { title: 'Release Notes', description: "See what's new, improved, and fixed in every release", href: '/resources/release-notes', icon: BellIcon },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-secondary-100">
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-20 lg:px-10">
        <Breadcrumb items={crumb} />

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
              <resource.icon className="h-6 w-6 text-text-heading transition-colors group-hover:text-brand-primary" />
              <h2 className="text-[15px] font-medium text-text-heading">{resource.title}</h2>
              <p className="text-sm leading-relaxed text-text-muted">{resource.description}</p>
            </Link>
          ))}
        </div>
      </div>

      <SectionCTA title="Ready to Try It Yourself?" />
    </main>
  );
}