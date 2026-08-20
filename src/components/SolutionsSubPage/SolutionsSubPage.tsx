import Link from 'next/link';
import SeeHowItWorksButton from '@/components/ui/SeeHowItWorksButton';

interface SolutionBenefit {
  text: string;
}

interface SolutionFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
}

interface SolutionsSubPageProps {
  title: string;
  heroDescription: string;
  heroScreenshot: string;
  problemStatement: string;
  problemDescription: string;
  solutionTitle: string;
  solutionDescription: string;
  solutionScreenshot: string;
  benefits: SolutionBenefit[];
  features: SolutionFeature[];
}

export default function SolutionsSubPage({
  title,
  heroDescription,
  heroScreenshot,
  problemStatement,
  problemDescription,
  solutionTitle,
  solutionDescription,
  solutionScreenshot,
  benefits,
  features,
}: SolutionsSubPageProps) {
  return (
    <>
      <section className="bg-secondary-100 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-8 text-sm text-neutral-500">
            <Link href="/" className="hover:text-neutral-700">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/solutions" className="hover:text-neutral-700">Solutions</Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-700">{title}</span>
          </nav>

          <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex max-w-xl flex-col items-start gap-6">
              <h1 className="text-4xl font-bold leading-tight text-neutral-800 lg:text-5xl">
                {heroDescription}
              </h1>
              <div className="flex items-center gap-4">
                <SeeHowItWorksButton />
                <Link
                  href="/demo"
                  className="rounded-lg border border-brand-primary bg-transparent px-6 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10 hover:text-brand-primary-hover"
                >
                  Book Demo
                </Link>
              </div>
            </div>

            <div className="flex w-full max-w-lg">
              <div className="flex h-72 w-full items-center justify-center rounded-2xl bg-neutral-100">
                <span className="text-sm text-neutral-400">{heroScreenshot}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary-500">
            The Problem
          </p>
          <h2 className="mb-4 text-3xl font-bold text-neutral-800 lg:text-4xl">
            {problemStatement}
          </h2>
          <p className="mx-auto max-w-2xl text-neutral-500">
            {problemDescription}
          </p>
        </div>
      </section>

      <section className="bg-white px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <div className="flex w-full justify-center lg:w-1/2">
              <div className="flex h-80 w-full max-w-md items-center justify-center rounded-2xl bg-neutral-100">
                <span className="text-sm text-neutral-400">{solutionScreenshot}</span>
              </div>
            </div>
            <div className="flex w-full flex-col items-start gap-4 lg:w-1/2">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary-500">
                The Solution
              </p>
              <h2 className="text-3xl font-bold text-neutral-800 lg:text-4xl">
                {solutionTitle}
              </h2>
              <p className="text-neutral-500">
                {solutionDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-8 text-3xl font-bold text-neutral-800 lg:text-4xl">
            Benefits
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {benefits.map((benefit) => (
              <span
                key={benefit.text}
                className="rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm text-neutral-700"
              >
                {benefit.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-12 text-3xl font-bold text-neutral-800 lg:text-4xl">
            Supporting Features
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const cardContent = (
                <div
                  className="flex flex-col items-start gap-3 rounded-xl border border-neutral-200 bg-white p-6 text-left transition-shadow hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-tint text-brand-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-base font-semibold text-neutral-800">{feature.title}</h3>
                  <p className="text-sm text-neutral-500">{feature.description}</p>
                </div>
              );

              if (feature.href) {
                return (
                  <Link key={feature.title} href={feature.href}>
                    {cardContent}
                  </Link>
                );
              }

              return (
                <div key={feature.title}>
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
