import ButtonLink from '@/components/ui/ButtonLink';

export default function HowItWorksCTA() {
  return (
    <section className="bg-[#1A2038] px-6 py-24 md:px-20">
      <div className="mx-auto max-w-[1448px] text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[40px]">
          Ready to See It Running in Your Clinic?
        </h2>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/signup" variant="primary" size="lg">
            Start Free Trial
          </ButtonLink>
          <ButtonLink href="/demo" variant="outlineOnDark" size="lg">
            Book Demo
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}