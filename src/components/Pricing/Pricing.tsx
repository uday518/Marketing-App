import Link from 'next/link';

const plans = [
  {
    name: 'Starter',
    price: '$49',
    period: '/mo',
    popular: false,
    features: [
      'Up to 2 staff accounts',
      'Core patient management',
      'Email support',
    ],
  },
  {
    name: 'Growth',
    price: '$99',
    period: '/mo',
    popular: true,
    features: [
      'Up to 10 staff accounts',
      'Queue & appointment tools',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    popular: false,
    features: [
      'Unlimited staff & clinics',
      'Advanced security & audit',
      'Dedicated success manager',
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-text-heading lg:text-4xl">
            Simple, Transparent Pricing
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-200 hover:border-brand-primary hover:shadow-md ${
                plan.popular
                  ? 'border-brand-primary bg-white shadow-lg'
                  : 'border-border-default bg-white shadow-sm'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-primary px-4 py-1 text-xs font-semibold text-white">
                  ★ Most Popular
                </span>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-text-heading">
                  {plan.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-text-heading">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-neutral-400">
                      {plan.period}
                    </span>
                  )}
                </div>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-text-body"
                  >
                    <span className="text-brand-primary">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className="block w-full rounded-md bg-brand-primary py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
              >
                Start Free Trial
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/product" className="text-sm font-medium text-brand-primary hover:text-brand-primary-hover">
            Compare All Features →
          </Link>
        </div>
      </div>
    </section>
  );
}
