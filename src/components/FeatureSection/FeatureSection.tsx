import Link from 'next/link';

interface FeatureSectionProps {
  icon: string;
  title: string;
  description: string;
  bullets: string[];
  reversed?: boolean;
}

export default function FeatureSection({
  icon,
  title,
  description,
  bullets,
  reversed = false,
}: FeatureSectionProps) {
  return (
    <div
      className={`flex flex-col items-center gap-12 py-16 lg:flex-row ${
        reversed ? 'lg:flex-row-reverse' : ''
      }`}
    >
      <div className="flex flex-1 flex-col items-start gap-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <h3 className="text-2xl font-bold text-neutral-900">{title}</h3>
        </div>
        <p className="text-base leading-relaxed text-neutral-500">{description}</p>
        <ul className="space-y-2">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-center gap-2 text-sm text-neutral-700">
              <span className="text-teal-500">✓</span>
              {bullet}
            </li>
          ))}
        </ul>
        <Link
          href="/product/features"
          className="rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
        >
          Learn More →
        </Link>
      </div>

      <div className="flex w-full flex-1 items-center justify-center">
        <div className="flex h-64 w-full max-w-lg items-center justify-center rounded-2xl bg-neutral-100 lg:h-80">
          <span className="text-sm text-neutral-400">
            {title} Screen Preview
          </span>
        </div>
      </div>
    </div>
  );
}
