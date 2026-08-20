const roles = [
  {
    title: 'Front Desk',
    description:
      'Booking, check-in, and the live queue \u2014 the tools that keep the waiting room moving',
  },
  {
    title: 'Clinical Staff',
    description:
      'Encounter workspace, tooth charting, and treatment plans \u2014 built for chairside speed',
  },
  {
    title: 'Owners & Managers',
    description:
      'Reports, staff oversight, and multi-clinic visibility \u2014 the full picture, always current',
  },
];

export default function HowItWorksRoles() {
  return (
    <section className="bg-bg-page px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-text-heading lg:text-4xl">
            The Same Workflow, Tailored to Every Role
          </h2>
          <p className="mx-auto max-w-[640px] text-base text-text-body lg:text-lg">
            Everyone sees exactly what they need &mdash; nothing more, nothing less.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {roles.map((role) => (
            <div
              key={role.title}
              className="rounded-2xl border border-border-default bg-white p-8"
            >
              <h3 className="mb-3 text-lg font-semibold text-text-heading">{role.title}</h3>
              <p className="text-sm leading-relaxed text-text-muted">{role.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}