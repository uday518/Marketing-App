const screenshots = [
  { label: 'Dashboard', description: 'Overview of your clinic performance' },
  { label: 'Patient Records', description: 'Centralized patient management' },
  { label: 'Calendar', description: 'Drag-and-drop appointment scheduling' },
  { label: 'Queue Board', description: 'Real-time patient queue tracking' },
  { label: 'Clinical Notes', description: 'Stage-based encounter documentation' },
  { label: 'Reports', description: 'Live dashboards and exportable reports' },
];

export default function ProductScreenshots() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-text-heading lg:text-4xl">
            See mySaaS in Action
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-muted">
            Explore the features that make dental practice management effortless.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {screenshots.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-start gap-3 rounded-[14px] border border-border-default bg-white p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex h-48 w-full items-center justify-center rounded-lg bg-secondary-100">
                <span className="text-sm text-neutral-400">{item.label}</span>
              </div>
              <h3 className="text-base font-semibold text-text-heading">{item.label}</h3>
              <p className="text-[13px] text-text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
