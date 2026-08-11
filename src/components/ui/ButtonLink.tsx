import Link from 'next/link';
import type { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outlineOnDark';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonLinkProps {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-primary text-white hover:bg-brand-primary-hover active:bg-brand-primary-active',
  secondary:
    'border border-brand-primary bg-transparent text-brand-primary hover:bg-brand-tint active:bg-brand-tint/80',
  ghost: 'text-brand-primary hover:text-brand-primary-hover',
  outlineOnDark:
    'border border-white/30 bg-transparent text-white hover:bg-white/10 active:bg-white/20',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs rounded-lg',
  md: 'px-6 py-3 text-sm rounded-lg',
  lg: 'px-7 py-3.5 text-base rounded-lg',
};

export default function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center font-semibold transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </Link>
  );
}