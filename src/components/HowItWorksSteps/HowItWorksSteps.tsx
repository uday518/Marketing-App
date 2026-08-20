const steps = [
  {
    number: 1,
    title: 'Patient Registered',
    description:
      'A receptionist creates or looks up a patient record. Demographics, contact info, and medical history are all in one place before the visit even starts.',
    mockup: 'Patient Registered — screenshot',
  },
  {
    number: 2,
    title: 'Appointment Booked',
    description:
      'The visit is scheduled against the right dentist\u2019s calendar, with conflict detection built in so double-bookings simply can\u2019t happen.',
    mockup: 'Appointment Booked — screenshot',
  },
  {
    number: 3,
    title: 'Patient Joins the Queue',
    description:
      'On arrival, the patient is checked in and appears on the live queue board visible to front desk and clinical staff in real time.',
    mockup: 'Patient Joins the Queue — screenshot',
  },
  {
    number: 4,
    title: 'Clinical Encounter',
    description:
      'The dentist opens a stage-based encounter, records findings on the tooth chart, adds a diagnosis, and documents the procedure performed.',
    mockup: 'Clinical Encounter — screenshot',
  },
  {
    number: 5,
    title: 'Treatment Plan Created',
    description:
      'Findings flow directly into a treatment plan — procedures, cost estimates, and priority order — that the patient can review before they leave.',
    mockup: 'Treatment Plan Created — screenshot',
  },
  {
    number: 6,
    title: 'Reports & Analytics',
    description:
      'Every step along the way rolls up into real-time reporting, so managers and owners always know what\u2019s happening across the practice.',
    mockup: 'Reports & Analytics — screenshot',
  },
];

const stepRow = [
  'Patient Registered',
  'Appointment Booked',
  'Patient Joins the Queue',
  'Clinical Encounter',
  'Treatment Plan Created',
  'Reports',
];

export default function HowItWorksSteps() {
  return (
    <section className="bg-bg-page px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex items-center justify-center gap-2 overflow-x-auto pb-2 lg:mb-20">
          {stepRow.map((name, index) => (
            <span
              key={name}
              className={`whitespace-nowrap rounded-2xl border px-4 py-2 text-sm font-medium transition-colors ${
                index === 0
                  ? 'border-transparent bg-brand-primary text-white'
                  : 'border-border-default bg-bg-sidebar text-text-body'
              }`}
            >
              {name}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-16 lg:gap-24">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                step.number % 2 === 0 ? '' : 'lg:[&>*:first-child]:order-2'
              }`}
            >
              <div>
                <div className="mb-4 flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white">
                    {step.number}
                  </span>
                  <h2 className="text-[22px] font-bold leading-[140%] text-text-heading">
                    {step.title}
                  </h2>
                </div>
                <p className="max-w-[440px] text-sm leading-[140%] text-text-body lg:text-base">
                  {step.description}
                </p>
              </div>

              <div
                aria-label={step.mockup}
                className="flex aspect-[16/10] items-center justify-center rounded-2xl border border-border-default bg-brand-tint/60"
              >
                <span className="text-sm font-medium text-text-muted">{step.mockup}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}