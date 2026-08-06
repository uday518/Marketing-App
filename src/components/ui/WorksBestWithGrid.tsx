import { type ReactNode } from 'react';
import WorksBestWithCard from './WorksBestWithCard';
import SectionHeading from './SectionHeading';

interface RelatedFeature {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
}

interface WorksBestWithGridProps {
  heading?: string;
  items: RelatedFeature[];
  bg?: 'white' | 'secondary';
}

export default function WorksBestWithGrid({ heading = 'Works Best With', items, bg = 'secondary' }: WorksBestWithGridProps) {
  return (
    <section className={`${bg === 'secondary' ? 'bg-secondary-100' : 'bg-white'} px-6 py-20`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <SectionHeading>{heading}</SectionHeading>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((feature) => (
            <WorksBestWithCard key={feature.title} icon={feature.icon} title={feature.title} description={feature.description} href={feature.href} />
          ))}
        </div>
      </div>
    </section>
  );
}
