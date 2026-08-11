import ButtonLink from '@/components/ui/ButtonLink';

export default function SolutionsCTA() {
  return (
    <section className="bg-[#05303D] px-6 py-24 md:px-20">
      <div className="mx-auto max-w-[1448px] text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[40px]">
          Not Sure Which Solution Is Right for You?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-[#99b2bf]">
          Book a free consultation with our team. We&apos;ll help you find the perfect fit for your practice.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/demo" variant="primary" size="lg">
            Book Free Consultation
          </ButtonLink>
          <ButtonLink href="/signup" variant="outlineOnDark" size="lg">
            Start Free Trial
          </ButtonLink>
        </div>
        <p className="mt-6 text-xs text-[#8099a6] sm:text-sm">No credit card required · 30-day free trial</p>
      </div>
    </section>
  );
}
