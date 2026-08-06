import { type ReactNode } from 'react';

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
}

export default function SectionHeading({ children, className = '' }: SectionHeadingProps) {
  return (
    <h2 className={`text-3xl font-bold text-text-heading lg:text-4xl ${className}`}>
      {children}
    </h2>
  );
}
