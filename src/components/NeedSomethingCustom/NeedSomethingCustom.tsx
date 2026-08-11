import ButtonLink from '@/components/ui/ButtonLink';

export default function NeedSomethingCustom() {
  return (
    <section className="bg-secondary-100 px-6 py-20">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-text-heading lg:text-4xl">
          Need Something Custom?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-text-muted">
          We work with dental groups to build custom integrations, workflows, and features.
          Tell us what you need.
        </p>
        <div className="flex items-center justify-center gap-4">
          <ButtonLink href="/demo" variant="primary" size="md">
            Contact Sales
          </ButtonLink>
          <ButtonLink href="/product/pricing" variant="secondary" size="md">
            View Pricing
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
