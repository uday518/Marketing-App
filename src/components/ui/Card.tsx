import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'bordered' | 'elevated' | 'glass';
  className?: string;
  hoverable?: boolean;
}

export default function Card({
  children,
  variant = 'bordered',
  className = '',
  hoverable = true,
}: CardProps) {
  const variantStyles = {
    default: 'bg-white',
    bordered: 'border border-neutral-200/80 bg-white shadow-sm',
    elevated: 'bg-white shadow-md border border-neutral-100',
    glass: 'bg-white/80 backdrop-blur-md border border-white/20 shadow-sm',
  };

  const hoverStyles = hoverable
    ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary-200'
    : '';

  return (
    <div
      className={`rounded-2xl p-6 sm:p-8 ${variantStyles[variant]} ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
}
