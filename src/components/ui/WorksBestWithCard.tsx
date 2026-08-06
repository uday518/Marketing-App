import { type ReactNode } from 'react';
import Link from 'next/link';

interface WorksBestWithCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
}

export default function WorksBestWithCard({ icon, title, description, href }: WorksBestWithCardProps) {
  const content = (
    <div className="flex flex-col items-start gap-3 rounded-[14px] border border-border-default bg-white p-6 transition-shadow hover:shadow-md">
      <span className="text-neutral-700">{icon}</span>
      <h3 className="text-base font-semibold text-text-heading">{title}</h3>
      <p className="text-[13px] text-text-muted">{description}</p>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
