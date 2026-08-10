import Link from 'next/link';
import CategoryPill from './CategoryPill';

interface FeaturedPostCardProps {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  href: string;
}

export default function FeaturedPostCard({
  title,
  excerpt,
  category,
  readTime,
  href,
}: FeaturedPostCardProps) {
  return (
    <Link href={href}>
      <article className="group overflow-hidden rounded-xl border border-border-default bg-bg-card transition-colors hover:border-border-focus md:flex">
        <div className="flex h-[340px] w-full items-center justify-center bg-bg-sidebar md:h-auto md:w-2/5">
          <span className="px-8 text-center text-[13px] font-medium leading-[140%] text-text-muted">
            Featured post cover image
          </span>
        </div>
        <div className="flex flex-col gap-2.5 pl-8 pr-20 py-8 items-start md:w-3/5">
          <CategoryPill label={category} />
          <h2 className="text-[24px] font-bold leading-[130%] text-text-heading group-hover:text-brand-primary">
            {title}
          </h2>
          <p className="text-[14px] font-normal leading-[150%] text-text-muted">
            {excerpt}
          </p>
          <div className="text-[12px] font-medium leading-[140%] text-[#8E95B0]">
            <span>{readTime}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
