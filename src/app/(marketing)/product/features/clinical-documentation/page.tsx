import FeatureHero from '@/components/ui/FeatureHero';
import AlternatingSection from '@/components/ui/AlternatingSection';
import CapabilityGrid from '@/components/ui/CapabilityGrid';
import WorkflowSteps from '@/components/ui/WorkflowSteps';
import WorksBestWithGrid from '@/components/ui/WorksBestWithGrid';
import SectionCTA from '@/components/ui/SectionCTA';

const sections = [
  {
    title: 'Encounter Workspace',
    description: 'Stage-based workflow — Subjective, Objective, Assessment, Plan — guiding clinical input at every stage.',
    bullets: ['Stage-based workflow', 'Guided clinical input', 'Structured note format'],
    screenshot: 'Encounter Workspace screenshot',
    reversed: false,
  },
  {
    title: 'Diagnoses & Findings',
    description: 'Standardized diagnosis codes and clinical findings linked directly to teeth, with severity and status tracking.',
    bullets: ['Standardized diagnosis codes', 'Tooth-linked findings', 'Severity & status tracking'],
    screenshot: 'Diagnoses & Findings screenshot',
    reversed: true,
  },
  {
    title: 'Procedure Recording',
    description: 'Log procedures performed, link them to the treatment plan, and record materials used.',
    bullets: ['Procedure logging', 'Treatment plan linking', 'Materials tracking'],
    screenshot: 'Procedure Recording screenshot',
    reversed: false,
  },
];

const capabilities = [
  { icon: '📝', title: 'Clinical Notes Editor', description: 'Structured, fast note-taking during encounters' },
  { icon: '🦷', title: 'Tooth Chart Integration', description: 'Findings mapped directly onto the tooth chart' },
  { icon: '📋', title: 'Diagnosis Code Library', description: 'Standardized, searchable diagnosis codes' },
  { icon: '🕐', title: 'Encounter History Timeline', description: 'Full chronological view of every past encounter' },
  { icon: '✅', title: 'Draft and Finalize Workflow', description: 'Save drafts, finalize when the encounter is complete' },
  { icon: '👥', title: 'Multi-Staff Collaboration', description: 'Multiple staff can contribute to one encounter' },
];

const steps = [
  { number: 1, title: 'Open Encounter', description: 'Dentist opens the encounter for a patient' },
  { number: 2, title: 'Record Findings', description: 'Documents findings directly on the tooth chart' },
  { number: 3, title: 'Add Diagnosis', description: 'Adds diagnosis and records procedure performed' },
  { number: 4, title: 'Finalize', description: 'Finalizes the encounter — it auto-saves to patient history' },
];

const relatedFeatures = [
  { icon: '📋', title: 'Treatment Planning', description: 'Findings flow directly into treatment plans', href: '/product/features/treatment-planning' },
  { icon: '📊', title: 'Reports & Analytics', description: 'Clinical data feeds into reports', href: '/product/features/reports-analytics' },
  { icon: '👥', title: 'Staff Management', description: 'Role-based access to clinical records', href: '/product/features/staff-management' },
];

export default function ClinicalDocumentationPage() {
  return (
    <main className="min-h-screen bg-white">
      <FeatureHero
        breadcrumb={[
          { label: 'Product', href: '/product' },
          { label: 'Features', href: '/product/features' },
          { label: 'Clinical Documentation' },
        ]}
        activeTab="/product/features/clinical-documentation"
        title="Document Every Encounter Without Slowing Down"
        description="A structured clinical workspace that keeps the dentist focused on the patient, not the paperwork."
        screenshotLabel="Clinical Documentation screenshot"
      />
      <AlternatingSection sections={sections} />
      <CapabilityGrid heading="What Clinical Documentation Lets You Do" items={capabilities} />
      <WorkflowSteps steps={steps} />
      <WorksBestWithGrid items={relatedFeatures} />
      <SectionCTA title="See Clinical Documentation in Your Clinic" />
    </main>
  );
}
