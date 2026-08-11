import Link from 'next/link';

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Overview', href: '/product' },
      { label: 'Features', href: '/product/features' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Pricing', href: '/product/pricing' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Documentation', href: '/docs' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Help Center', href: '/help' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/company' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: 'Partners', href: '/partners' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1A2038] text-sm">
      <div className="mx-auto max-w-[1448px] px-20 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[260px_repeat(4,1fr)]">
          <div className="lg:col-span-1">
            <p className="text-xl font-bold text-[#1A94B3]">mysaas</p>
            <p className="mt-3 max-w-[260px] text-sm text-[#8E95B0]">
              Cloud-based dental practice management built for modern clinics.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-semibold text-white">{col.title}</p>
              <ul className="mt-4 flex flex-col gap-3 text-[13px] text-[#8E95B0]">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="my-10 border-[#2C3350]" />

        <div className="flex flex-col items-center justify-between gap-3 text-xs text-[#8E95B0] sm:flex-row">
          <p>© 2026 mysaas Technologies. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              All systems operational
            </span>
            <span>·</span>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Twitter</a>
            <span>·</span>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
