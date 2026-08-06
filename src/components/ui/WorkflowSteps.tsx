import SectionHeading from './SectionHeading';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface WorkflowStepsProps {
  steps: Step[];
}

export default function WorkflowSteps({ steps }: WorkflowStepsProps) {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <SectionHeading>How It Works in Practice</SectionHeading>
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
