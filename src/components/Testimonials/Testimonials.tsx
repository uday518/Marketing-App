const testimonials = [
  {
    rating: 5,
    text: 'Check-in used to take five minutes per patient. Now it takes thirty seconds.',
    name: 'Dr. Anjali Shrestha',
    role: 'Owner, SmileCare Clinic',
    avatarBg: 'bg-gradient-to-br from-primary-500 to-primary-700 text-white',
  },
  {
    rating: 5,
    text: 'No-shows dropped noticeably once automated reminders went out for every booking.',
    name: 'Ram Karki',
    role: 'Practice Manager, TrueSmile',
    avatarBg: 'bg-gradient-to-br from-accent-500 to-accent-700 text-white',
  },
  {
    rating: 5,
    text: 'Running three locations from one dashboard has been the biggest relief for our team.',
    name: 'Dr. Binita Rai',
    role: 'Founder, PearlDent Group',
    avatarBg: 'bg-gradient-to-br from-emerald-500 to-teal-700 text-white',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gradient-to-b from-white via-secondary-100/40 to-white px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-brand-tint px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-primary">
            Testimonials
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text-heading sm:text-4xl lg:text-5xl">
            Loved by Clinic Teams Everywhere
          </h2>
          <p className="mt-4 text-base text-text-muted lg:text-lg">
            See how leading dental practices transform daily operations and patient care.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl"
            >
              <div>
                <div className="mb-5 flex gap-1 text-amber-400">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-base leading-relaxed text-text-body font-normal">
                  &ldquo;{testimonial.text}&rdquo;
                </blockquote>
              </div>

              <div className="mt-8 flex items-center gap-4 pt-6 border-t border-neutral-100">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold shadow-sm ${testimonial.avatarBg}`}
                >
                  {testimonial.name
                    .split(' ')
                    .filter((n) => !n.startsWith('Dr.'))
                    .map((n) => n[0])
                    .join('') || testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-text-heading group-hover:text-primary-600 transition-colors">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-text-muted mt-0.5">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
