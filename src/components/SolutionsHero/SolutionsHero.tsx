import Link from 'next/link';

export default function SolutionsHero() {
  return (
    <section className="bg-secondary-100 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 text-sm text-neutral-500">
          <Link href="/" className="hover:text-neutral-700">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-700">Solutions</span>
        </nav>

        <div className="max-w-3xl">
          <h1 className="mb-4 text-4xl font-bold leading-tight text-neutral-800 lg:text-5xl">
            Dental Software Built for Your Practice Type
          </h1>
          <p className="text-lg text-neutral-500">
            Whether you run a single clinic or manage a network of locations, our platform adapts to your workflow.
          </p>
        </div>
      </div>
    </section>
  );
}
