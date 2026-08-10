import Link from 'next/link';
import CategoryPill from './CategoryPill';

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  category: string;
  categoryHref: string;
  readTime: string;
  href: string;
}

export default function BlogPostCard({
  title,
  excerpt,
  category,
  categoryHref,
  readTime,
  href,
}: BlogPostCardProps) {
  return (
    <Link href={href}>
      <article className="group overflow-hidden rounded-xl border border-border-default bg-bg-card transition-colors hover:border-border-focus">
        <div className="flex h-[180px] w-full items-center justify-center bg-bg-sidebar px-4">
          <span className="text-center text-[13px] font-medium leading-[140%] text-text-muted">
            {title} — cover image
          </span>
        </div>
        <div className="flex flex-col gap-2 p-[18px] items-start">
          <CategoryPill label={category} />
          <h3 className="max-w-[340px] text-[15px] font-bold leading-[135%] text-text-heading group-hover:text-brand-primary">
            {title}
          </h3>
          <p className="text-[13px] font-normal leading-[145%] text-text-muted line-clamp-2">
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
