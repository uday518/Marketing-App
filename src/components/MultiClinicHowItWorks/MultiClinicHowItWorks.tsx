const steps = [
  {
    number: 1,
    title: 'Onboard Chain',
    description: 'A 5-clinic dental chain onboards.',
  },
  {
    number: 2,
    title: 'Create Profiles',
    description: 'Owner creates 5 clinic profiles.',
  },
  {
    number: 3,
    title: 'Assign Managers',
    description: 'Assigns managers per clinic and sets different hours.',
  },
  {
    number: 4,
    title: 'Review Weekly',
    description: 'Views a chain-wide report every Monday morning.',
  },
];

export default function MultiClinicHowItWorks() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-neutral-900 lg:text-4xl">
            How It Works in Practice
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">{step.title}</h3>
              <p className="text-sm text-neutral-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
