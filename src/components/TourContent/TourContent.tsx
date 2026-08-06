'use client';

interface TourContentProps {
  selectedModule: string;
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
}

const moduleDescriptions: Record<string, string> = {
  'patient-management':
    'This screen shows the patient registry, where every clinic staff member can search, view, and update complete patient records.',
  appointments:
    'Manage appointments across all clinics with a unified calendar view and real-time scheduling.',
  queue:
    'Track patient queue status across your clinics with real-time updates and priority management.',
  'clinical-docs':
    'Access and manage clinical documents, notes, and records for every patient visit.',
  'treatment-plans':
    'Create, track, and manage treatment plans with cost estimates and progress tracking.',
  staff:
    'Manage staff schedules, roles, permissions, and assignments across all clinic locations.',
  report:
    'Generate and view comprehensive reports on clinic performance, finances, and patient metrics.',
  multiclinic:
    'Oversee multiple clinic locations from a single dashboard with cross-clinic analytics.',
  security:
    'Configure security settings, role-based access control, and data protection policies.',
};

export default function TourContent({
  selectedModule,
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
}: TourContentProps) {
  const description =
    moduleDescriptions[selectedModule] ||
    moduleDescriptions['patient-management'];

  return (
    <section className="bg-secondary-100 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-4">
          <div className="flex h-[560px] w-full max-w-[1100px] items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-100">
            <span className="text-sm text-neutral-400">
              Patient Management — module walkthrough screen
            </span>
          </div>
          <p className="max-w-[700px] text-center text-sm text-neutral-500">
            {description}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={onPrevious}
              disabled={currentStep <= 1}
              className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ← Previous
            </button>
            <span className="text-sm text-neutral-500">
              Step {currentStep} of {totalSteps}
            </span>
            <button
              onClick={onNext}
              disabled={currentStep >= totalSteps}
              className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
