import Link from 'next/link';

interface SeeHowItWorksButtonProps {
  href?: string;
  className?: string;
}

export default function SeeHowItWorksButton({
  href = '/product/tour',
  className = '',
}: SeeHowItWorksButtonProps) {
  return (
    <Link
      href={href}
      className={`rounded-lg bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover ${className}`}
    >
      See How It Works
    </Link>
  );
}
