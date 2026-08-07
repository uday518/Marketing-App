const steps = [
  {
    number: 1,
    title: 'Open Encounter',
    description: 'Dentist opens the encounter for a patient',
  },
  {
    number: 2,
    title: 'Record Findings',
    description: 'Documents findings directly on the tooth chart',
  },
  {
    number: 3,
    title: 'Add Diagnosis',
    description: 'Adds diagnosis and records procedure performed',
  },
  {
    number: 4,
    title: 'Finalize',
    description: 'Finalizes the encounter \u2014 it auto-saves to patient history',
  },
];

export default function ClinDocsWorkflow() {
  return (
    <section className="bg-secondary-100 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-text-heading lg:text-4xl">
            How It Works in Practice
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-text-heading">{step.title}</h3>
              <p className="text-sm text-text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
