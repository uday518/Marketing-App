import type { ElementType, ReactNode } from 'react';

interface SectionHeaderProps {
  kicker?: string;
  title: ReactNode;
  subtitle?: string;
  align?: 'center' | 'left';
  as?: ElementType;
  className?: string;
}

export default function SectionHeader({
  kicker,
  title,
  subtitle,
  align = 'center',
  as: Tag = 'h2',
  className = '',
}: SectionHeaderProps) {
  const alignment = align === 'center' ? 'text-center' : 'text-left';
  return (
    <div className={`mb-8 ${alignment} ${className}`}>
      {kicker && (
        <span className="mb-3 inline-block rounded-full bg-brand-tint px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-primary">
          {kicker}
        </span>
      )}
      <Tag className="text-3xl font-bold text-text-heading lg:text-4xl">{title}</Tag>
      {subtitle && <p className="mt-3 text-sm leading-relaxed text-text-muted">{subtitle}</p>}
    </div>
  );
}