import { type ReactNode } from 'react';
import SectionHeading from './SectionHeading';

interface Capability {
  icon: string | ReactNode;
  title: string;
  description: string;
}

interface CapabilityGridProps {
  heading: string;
  items: Capability[];
}

export default function CapabilityGrid({ heading, items }: CapabilityGridProps) {
  return (
    <section className="bg-secondary-100 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <SectionHeading>{heading}</SectionHeading>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-start gap-3 rounded-[14px] border border-border-default bg-white p-6 transition-shadow hover:shadow-md"
            >
              <span className="text-2xl text-neutral-700">{item.icon}</span>
              <h3 className="text-base font-semibold text-text-heading">{item.title}</h3>
              <p className="text-[13px] text-text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
