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
      className={`rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 ${className}`}
    >
      See How It Works
    </Link>
  );
}
