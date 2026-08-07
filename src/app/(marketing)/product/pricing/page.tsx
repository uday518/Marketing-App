import Link from 'next/link';
import PricingFAQ from '@/components/PricingFAQ/PricingFAQ';

const plans = [
  {
    name: 'Starter',
    price: '$99',
    period: '/month',
    description: 'For single-clinic practices getting started',
    features: [
      'Up to 3 users',
      '1 clinic location',
      'Patient management',
      'Appointment scheduling',
      'Basic reporting',
      'Email support',
    ],
    cta: 'Start Free Trial',
    href: '/signup',
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '$249',
    period: '/month',
    description: 'For growing practices with multiple dentists',
    features: [
      'Up to 15 users',
      'Up to 3 clinic locations',
      'Everything in Starter',
      'Queue management',
      'Clinical documentation',
      'Treatment planning',
      'Advanced reporting',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    href: '/signup',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For dental groups and chains',
    features: [
      'Unlimited users',
      'Unlimited clinic locations',
      'Everything in Growth',
      'Multi-clinic management',
      'Chain-level analytics',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    href: '/demo',
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-secondary-100">
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-bold text-text-heading lg:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
            Start with a 30-day free trial. No credit card required. Cancel anytime.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-xl border p-8 ${
                plan.highlighted
                  ? 'border-brand-primary bg-white shadow-lg'
                  : 'border-border-default bg-white'
              }`}
            >
              {plan.highlighted && (
                <span className="mb-4 inline-block w-fit rounded-pill bg-brand-tint px-3 py-1 text-xs font-semibold text-brand-primary">
                  Most Popular
                </span>
              )}
              <h2 className="text-xl font-bold text-text-heading">{plan.name}</h2>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-text-heading">{plan.price}</span>
                {plan.period && (
                  <span className="text-sm text-text-muted">{plan.period}</span>
                )}
              </div>
              <p className="mt-2 text-sm text-text-muted">{plan.description}</p>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-text-body">
                    <span className="text-brand-primary">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`mt-8 block rounded-lg px-6 py-3 text-center text-sm font-semibold transition-colors ${
                  plan.highlighted
                    ? 'bg-brand-primary text-white hover:bg-brand-primary-hover'
                    : 'border border-brand-primary bg-white text-brand-primary hover:bg-brand-tint'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-text-heading">Frequently Asked Questions</h2>
          <div className="mt-8 text-left">
            <PricingFAQ />
          </div>
        </div>
      </section>
    </main>
  );
}
