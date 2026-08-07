const steps = [
  {
    number: 1,
    title: 'Add Staff',
    description: 'Clinic Owner adds a new receptionist.',
  },
  {
    number: 2,
    title: 'Assign Role',
    description: 'Assigns them the Receptionist role.',
  },
  {
    number: 3,
    title: 'Grant Access',
    description: 'Grants access to Appointments and Queue modules only.',
  },
  {
    number: 4,
    title: 'Restrict Access',
    description: 'Restricts access to financial reports and clinical records.',
  },
];

export default function StaffMgmtHowItWorks() {
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
