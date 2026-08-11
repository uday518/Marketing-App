import ButtonLink from '@/components/ui/ButtonLink';

export default function TourCTA() {
  return (
    <section className="bg-[#05303D] px-6 py-24 md:px-20">
      <div className="mx-auto max-w-[1448px] text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[40px]">
          You&apos;ve Seen the Platform. Ready to Try It?
        </h2>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/signup" variant="primary" size="lg">
            Start Free Trial
          </ButtonLink>
          <ButtonLink href="/demo" variant="primary" size="lg">
            Book Demo
          </ButtonLink>
        </div>

        <p className="mt-6 text-xs text-[#8099a6] sm:text-sm">
          No credit card required · 30-day free trial
        </p>
      </div>
    </section>
  );
}
