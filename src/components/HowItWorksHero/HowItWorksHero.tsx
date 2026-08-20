import Link from 'next/link';
import ButtonLink from '@/components/ui/ButtonLink';

export default function HowItWorksHero() {
  return (
    <section className="bg-white px-6 pb-14 pt-16 lg:pb-20">
      <div className="mx-auto max-w-7xl text-center">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm">
          <Link href="/" className="text-brand-primary transition-colors hover:text-brand-primary-hover">
            Home
          </Link>
          <span className="mx-2 text-text-muted">›</span>
          <span className="text-text-muted">How It Works</span>
        </nav>

        <h1 className="mb-4 text-4xl font-extrabold leading-tight text-brand-primary lg:text-5xl">
          See How mysaas Works, Start to Finish
        </h1>

        <p className="mx-auto mb-8 max-w-[720px] text-base text-text-body lg:text-lg">
          One connected workflow from the moment a patient walks in, to the report
          that lands on your desk. No switching tools, no re-entering data.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/signup" variant="primary" size="lg">
            Start Free Trial
          </ButtonLink>
          <Link
            href="/demo"
            className="rounded-lg border border-brand-primary bg-transparent px-7 py-3.5 text-base font-semibold text-brand-primary transition-colors hover:bg-brand-tint hover:text-brand-primary-hover"
          >
            Book Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
