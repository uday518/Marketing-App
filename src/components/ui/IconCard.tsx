import type { ComponentType } from 'react';
import Link from 'next/link';
import Card from './Card';
import type { IconProps } from './icons';

interface IconCardProps {
  title: string;
  description: string;
  href?: string;
  icon: ComponentType<IconProps>;
  layout?: 'stacked' | 'inline';
  className?: string;
}

export default function IconCard({
  title,
  description,
  href,
  icon: Icon,
  layout = 'stacked',
  className = '',
}: IconCardProps) {
  const content = (
    <Card className={`${layout === 'inline' ? 'flex h-full items-center gap-3.5' : 'h-full'} ${className}`}>
      <Icon
        className={layout === 'inline' ? 'h-5 w-5 shrink-0 text-brand-primary' : 'mb-4 block h-6 w-6 text-brand-primary'}
      />
      <div className={layout === 'inline' ? 'min-w-0' : ''}>
        <h3 className="text-sm font-semibold text-text-heading">{title}</h3>
        <p className={layout === 'inline' ? 'text-xs leading-relaxed text-text-muted' : 'mt-1 text-xs leading-relaxed text-text-muted'}>{description}</p>
      </div>
    </Card>
  );

  if (href) {
    return <Link href={href} className={`group block ${className}`}>{content}</Link>;
  }
  return <div className={className}>{content}</div>;
}