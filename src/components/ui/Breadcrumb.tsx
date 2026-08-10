import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav className={`mb-10 text-[13px] ${className}`} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          {index > 0 && <span className="mx-2 text-[#636D8C]">&gt;</span>}
          {item.href ? (
            <Link href={item.href} className="text-[#636D8C] hover:text-text-heading">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-[#1A2038]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}