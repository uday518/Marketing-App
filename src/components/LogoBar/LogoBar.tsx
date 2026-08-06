const logos = [
  'SmileCare',
  'TrueSmile',
  'PearlDent',
  'ClearBite',
  'OralHealth Pro',
  'DentalAxis',
  'BrightClinic',
];

export default function LogoBar() {
  return (
    <section className="border-b border-neutral-200 bg-white px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-6 text-center text-sm text-neutral-400">
          Trusted by 500+ dental clinics across South Asia
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((logo) => (
            <span
              key={logo}
              className="text-sm font-medium text-neutral-400"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
