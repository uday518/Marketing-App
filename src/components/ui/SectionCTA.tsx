import Link from 'next/link';
import ButtonLink from '@/components/ui/ButtonLink';

interface SectionCTAProps {
  title: string;
}

export default function SectionCTA({ title }: SectionCTAProps) {
  return (
    <section className="bg-[#05303D] px-6 py-24 md:px-20">
      <div className="mx-auto max-w-[1448px] text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[40px]">
          {title}
        </h2>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/signup" variant="primary" size="lg">
            Start Free Trial
          </ButtonLink>
          <Link
            href="/demo"
            className="rounded-lg border border-brand-primary bg-transparent px-7 py-3.5 text-base font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10 hover:text-brand-primary-hover"
          >
            Book Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
