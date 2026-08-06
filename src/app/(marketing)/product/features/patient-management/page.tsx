import FeatureHero from '@/components/ui/FeatureHero';
import AlternatingSection from '@/components/ui/AlternatingSection';
import CapabilityGrid from '@/components/ui/CapabilityGrid';
import WorkflowSteps from '@/components/ui/WorkflowSteps';
import WorksBestWithGrid from '@/components/ui/WorksBestWithGrid';
import SectionCTA from '@/components/ui/SectionCTA';

const sections = [
  {
    title: 'Patient Registry',
    description: 'Create and edit detailed patient profiles — contact info, demographics, and a unique MR number for every record.',
    bullets: ['Detailed patient profiles', 'Demographics & contact info', 'Unique MR numbers'],
    screenshot: 'Patient Registry screenshot',
    reversed: false,
  },
  {
    title: 'Medical History',
    description: 'Allergies, medications, chronic conditions, family and surgical history — all linked per patient and visible at a glance.',
    bullets: ['Allergies & medications', 'Chronic condition tracking', 'Family & surgical history'],
    screenshot: 'Medical History screenshot',
    reversed: true,
  },
  {
    title: 'Document Vault',
    description: 'Upload and store consent forms, X-rays, referral letters, and insurance documents against the patient record.',
    bullets: ['Consent form storage', 'X-ray & image uploads', 'Insurance document storage'],
    screenshot: 'Document Vault screenshot',
    reversed: false,
  },
];

const capabilities = [
  { icon: '🔍', title: 'Duplicate Detection', description: 'Flags likely duplicate patient records automatically.' },
  { icon: '👨‍👩‍👧', title: 'Family / Group Linking', description: 'Link family members under one household account.' },
  { icon: '🔎', title: 'Patient Search & Filters', description: 'Find any patient in seconds across every clinic.' },
  { icon: '📅', title: 'Follow-Up Scheduling', description: 'Auto-suggest follow-up visits after completed care.' },
  { icon: '📆', title: 'Multi-Dentist Calendars', description: "See every dentist's schedule side by side." },
  { icon: '🚨', title: 'Emergency Contact Tracking', description: 'Emergency contacts on file for every patient.' },
];

const steps = [
  { number: 1, title: 'Register Walk-In', description: 'Receptionist creates a new patient profile with contact info and demographics.' },
  { number: 2, title: 'Link to Family', description: 'Patient is linked to an existing family account already in the system.' },
  { number: 3, title: 'Attach Documents', description: "Scanned insurance document is uploaded to the patient's vault." },
  { number: 4, title: 'Ready to Book', description: 'Patient is now available for appointment booking across any clinic.' },
];

const relatedFeatures = [
  { icon: '📅', title: 'Appointment Management', description: "Book visits directly from a patient's profile", href: '/product/features/appointment-management' },
  { icon: '📝', title: 'Clinical Documentation', description: 'Encounters link straight back to the patient record', href: '/product/features/clinical-documentation' },
  { icon: '📊', title: 'Reports & Analytics', description: 'Patient trends roll up into clinic-wide reporting', href: '/product/features/reports-analytics' },
];

export default function PatientManagementPage() {
  return (
    <main className="min-h-screen bg-white">
      <FeatureHero
        breadcrumb={[
          { label: 'Product', href: '/product' },
          { label: 'Features', href: '/product/features' },
          { label: 'Patient Management' },
        ]}
        activeTab="/product/features/patient-management"
        title="Every Patient Record, Exactly Where You Need It"
        description="A centralized registry that gives every clinic staff member a complete, accurate view of each patient."
        screenshotLabel="Patient Management screenshot"
      />
      <AlternatingSection sections={sections} />
      <CapabilityGrid heading="What Patient Management Lets You Do" items={capabilities} />
      <WorkflowSteps steps={steps} />
      <WorksBestWithGrid items={relatedFeatures} />
      <SectionCTA title="See Patient Management in Your Clinic" />
    </main>
  );
}
