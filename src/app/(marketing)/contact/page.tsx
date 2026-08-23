import Link from 'next/link';
import ContactForm from '@/components/ContactForm/ContactForm';

export const metadata = {
  title: 'Contact Us — mysaas',
};

const contactMethods = [
  {
    title: 'Email Us',
    lines: ['support@mysaas.com', 'sales@mysaas.com'],
  },
  {
    title: 'Call Us',
    lines: ['+977 1-555-0123', '+977 9801234567', 'Sun–Fri, 9am–6pm NPT'],
  },
  {
    title: 'Head Office',
    lines: ['Naxal, Kathmandu 44600', 'Nepal'],
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-secondary-100 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-8 text-sm text-neutral-500">
            <Link href="/" className="hover:text-neutral-700">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-700">Contact</span>
          </nav>

          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold leading-tight text-neutral-900 lg:text-5xl">
              Get in Touch
            </h1>
            <p className="mt-4 text-lg text-neutral-500">
              Questions about the platform, pricing, or booking a demo? Our team typically
              replies within one business day.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="mb-6 text-2xl font-bold text-neutral-900">Contact Information</h2>
            <div className="flex flex-col gap-6">
              {contactMethods.map((method) => (
                <div key={method.title}>
                  <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-brand-primary">
                    {method.title}
                  </p>
                  {method.lines.map((line) => (
                    <p key={line} className="text-sm text-neutral-500">
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-border-default bg-secondary-100 p-6">
              <h3 className="mb-2 text-base font-semibold text-neutral-900">
                Prefer a live walkthrough?
              </h3>
              <p className="mb-4 text-sm text-neutral-500">
                Book a demo and we&apos;ll show you scheduling, charting, and multi-clinic
                workflows on a call.
              </p>
              <Link
                href="/demo"
                className="inline-flex rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
              >
                Book a Demo
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-neutral-900">Send Us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}