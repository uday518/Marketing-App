'use client';

const modules = [
  { id: 'patient-management', label: 'Patient Management' },
  { id: 'appointments', label: 'Appointments' },
  { id: 'queue', label: 'Queue' },
  { id: 'clinical-docs', label: 'Clinical Docs' },
  { id: 'treatment-plans', label: 'Treatment Plans' },
  { id: 'staff', label: 'Staff' },
  { id: 'report', label: 'Report' },
  { id: 'multiclinic', label: 'Multiclinic' },
  { id: 'security', label: 'Security' },
];

interface TourModuleSelectorProps {
  selectedModule: string;
  onModuleChange: (moduleId: string) => void;
}

export default function TourModuleSelector({
  selectedModule,
  onModuleChange,
}: TourModuleSelectorProps) {
  return (
    <section className="bg-white px-6 pb-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-neutral-900">
          Choose a Module
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => onModuleChange(mod.id)}
              className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors ${
                selectedModule === mod.id
                  ? 'border-teal-500 bg-teal-50 text-teal-700'
                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              {mod.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
