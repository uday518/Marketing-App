import Link from 'next/link';
import SectionCTA from '@/components/ui/SectionCTA';

const categories = [
  'All',
  'Patient Management',
  'Technology',
  'Patient Experience',
  'Product Updates',
  'Industry Trends',
];

const featuredPost = {
  title: 'How to Reduce No-Shows with Automated Patient Reminders',
  excerpt:
    'Missed appointments cost dental practices thousands every month. Learn how automated text and email reminders can cut your no-show rate by up to 50%.',
  category: 'Patient Management',
  date: 'Jan 15, 2026',
  author: 'Dr. Sarah Chen',
  readTime: '6 min read',
  image: '/images/blog/featured-post.jpg',
};

const posts = [
  {
    title: 'The Complete Guide to Dental Practice Management Software',
    excerpt:
      'Choosing the right software can transform your clinic. Here is what to look for in 2026.',
    category: 'Technology',
    date: 'Jan 12, 2026',
    author: 'James Wilson',
    readTime: '8 min read',
    image: '/images/blog/post-1.jpg',
  },
  {
    title: '5 Ways to Improve Patient Communication in Your Dental Clinic',
    excerpt:
      'Clear communication builds trust and improves treatment acceptance rates.',
    category: 'Patient Experience',
    date: 'Jan 10, 2026',
    author: 'Dr. Maria Lopez',
    readTime: '5 min read',
    image: '/images/blog/post-2.jpg',
  },
  {
    title: 'What Is New in Dental Technology for 2026',
    excerpt:
      'From AI diagnostics to 3D printing, these innovations are reshaping modern dentistry.',
    category: 'Industry Trends',
    date: 'Jan 8, 2026',
    author: 'James Wilson',
    readTime: '7 min read',
    image: '/images/blog/post-3.jpg',
  },
  {
    title: 'mysaas Product Update January 2026',
    excerpt:
      'New patient portal, improved scheduling, and faster charting are here.',
    category: 'Product Updates',
    date: 'Jan 6, 2026',
    author: 'mysaas Team',
    readTime: '3 min read',
    image: '/images/blog/post-4.jpg',
  },
  {
    title: 'How to Streamline Insurance Claims and Get Paid Faster',
    excerpt:
      'Automated insurance verification and electronic claims can speed up your revenue cycle.',
    category: 'Patient Management',
    date: 'Jan 4, 2026',
    author: 'Dr. Sarah Chen',
    readTime: '6 min read',
    image: '/images/blog/post-5.jpg',
  },
  {
    title: 'Designing a Patient-Friendly Waiting Room Experience',
    excerpt:
      'Small changes to your waiting area can dramatically improve patient satisfaction scores.',
    category: 'Patient Experience',
    date: 'Jan 2, 2026',
    author: 'Dr. Maria Lopez',
    readTime: '4 min read',
    image: '/images/blog/post-6.jpg',
  },
];

function CategoryPill({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? 'bg-brand-primary text-text-on-brand'
          : 'bg-white text-text-muted border border-neutral-200 hover:border-primary-200 hover:text-text-heading'
      }`}
    >
      {label}
    </button>
  );
}

function PostCard({
  title,
  excerpt,
  category,
  date,
  author,
  readTime,
  image,
}: {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
}) {
  return (
    <article className="group overflow-hidden rounded-xl border border-neutral-200 bg-white transition-colors hover:border-primary-200 hover:shadow-md">
      <div className="relative h-48 w-full bg-neutral-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
      <div className="flex flex-col gap-3 p-6">
        <span className="text-xs font-medium text-brand-primary">
          {category}
        </span>
        <h3 className="text-[15px] font-semibold leading-snug text-text-heading group-hover:text-brand-primary">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-text-muted line-clamp-2">
          {excerpt}
        </p>
        <div className="mt-1 flex items-center gap-3 text-xs text-text-muted">
          <span>{author}</span>
          <span>·</span>
          <span>{date}</span>
          <span>·</span>
          <span>{readTime}</span>
        </div>
      </div>
    </article>
  );
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-secondary-100">
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-20 lg:px-10">
        <nav className="mb-10 text-sm text-text-muted">
          <Link href="/" className="hover:text-text-heading">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/resources" className="hover:text-text-heading">
            Resources
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text-heading">Blog</span>
        </nav>

        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-3xl font-bold text-text-heading lg:text-4xl">
            Insights for Modern Dental Practices
          </h1>
          <p className="mb-8 text-base text-text-muted">
            Practical tips, product updates, and industry news to help you run a
            smarter, more efficient dental clinic.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat, i) => (
            <CategoryPill key={cat} label={cat} active={i === 0} />
          ))}
        </div>

        <article className="mx-auto mb-12 max-w-5xl overflow-hidden rounded-xl border border-neutral-200 bg-white transition-colors hover:border-primary-200 hover:shadow-md md:flex">
          <div className="relative h-64 w-full bg-neutral-100 md:h-auto md:w-1/2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col gap-3 p-6 md:w-1/2 md:p-8">
            <span className="text-xs font-medium text-brand-primary">
              {featuredPost.category}
            </span>
            <h2 className="text-xl font-bold leading-snug text-text-heading">
              {featuredPost.title}
            </h2>
            <p className="text-sm leading-relaxed text-text-muted">
              {featuredPost.excerpt}
            </p>
            <div className="mt-1 flex items-center gap-3 text-xs text-text-muted">
              <span>{featuredPost.author}</span>
              <span>·</span>
              <span>{featuredPost.date}</span>
              <span>·</span>
              <span>{featuredPost.readTime}</span>
            </div>
            <div className="mt-2">
              <Link
                href="/blog/post"
                className="inline-flex items-center text-sm font-medium text-brand-primary hover:text-brand-primary-hover"
              >
                Read more
                <svg
                  className="ml-1 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </article>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.title} {...post} />
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-2xl rounded-xl bg-white p-8 text-center shadow-sm">
          <h3 className="mb-2 text-lg font-bold text-text-heading">
            Subscribe to Our Newsletter
          </h3>
          <p className="mb-6 text-sm text-text-muted">
            Get the latest insights and product updates delivered to your inbox.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-neutral-200 px-4 py-3 text-sm text-text-heading placeholder:text-text-disabled focus:border-brand-primary focus:outline-none"
            />
            <button className="rounded-lg bg-brand-primary px-6 py-3 text-sm font-medium text-text-on-brand transition-colors hover:bg-brand-primary-hover">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <SectionCTA title="Ready to Try It Yourself?" />
    </main>
  );
}