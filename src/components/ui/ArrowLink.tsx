import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRightIcon } from './icons';

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  muted?: boolean;
  className?: string;
}

export default function ArrowLink({ href, children, muted = false, className = '' }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center text-sm font-semibold transition-colors ${
        muted ? 'text-text-muted hover:text-text-heading' : 'text-brand-primary hover:text-brand-primary-hover'
      } ${className}`}
    >
      <span>{children}</span>
      <ArrowRightIcon className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}