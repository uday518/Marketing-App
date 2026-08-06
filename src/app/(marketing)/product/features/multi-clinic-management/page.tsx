import FeatureHero from '@/components/ui/FeatureHero';
import AlternatingSection from '@/components/ui/AlternatingSection';
import CapabilityGrid from '@/components/ui/CapabilityGrid';
import WorkflowSteps from '@/components/ui/WorkflowSteps';
import WorksBestWithGrid from '@/components/ui/WorksBestWithGrid';
import SectionCTA from '@/components/ui/SectionCTA';

const sections = [
  {
    title: 'Clinic Hierarchy',
    description: 'Create and configure multiple clinic locations under one account, each with their own settings, staff, and data.',
    bullets: ['Multiple clinic locations', 'Per-clinic configuration', 'Independent staff & data'],
    screenshot: 'Clinic Hierarchy screenshot',
    reversed: false,
  },
  {
    title: 'Tenant Isolation',
    description: "Each clinic's patient data, appointments, and records are strictly isolated — no accidental data mixing.",
    bullets: ['Strict data isolation', 'No cross-clinic mixing', 'Database-level separation'],
    screenshot: 'Tenant Isolation screenshot',
    reversed: true,
  },
  {
    title: 'Centralized Management',
    description: 'Assign staff across clinics, compare performance, and run chain-wide reports from one dashboard.',
    bullets: ['Cross-clinic staff assignment', 'Chain-wide reporting', 'Central dashboard'],
    screenshot: 'Centralized Management screenshot',
    reversed: false,
  },
];

const capabilities = [
  { icon: '🏥', title: 'Unlimited Clinic Locations', description: 'Add as many locations as your chain needs.' },
  { icon: '⚙️', title: 'Per-Clinic Settings', description: 'Independent hours, staff, and configuration per clinic.' },
  { icon: '👥', title: 'Cross-Clinic Staff Assignment', description: 'Assign staff to more than one location.' },
  { icon: '📊', title: 'Chain-Level Analytics', description: 'Compare performance across your whole chain.' },
  { icon: '🔄', title: 'Clinic Status Control', description: 'Mark clinics Active or Inactive as needed.' },
  { icon: '📋', title: 'Central Admin Dashboard', description: 'Manage every clinic from a single screen.' },
];

const steps = [
  { number: 1, title: 'Onboard Chain', description: 'A 5-clinic dental chain onboards.' },
  { number: 2, title: 'Create Profiles', description: 'Owner creates 5 clinic profiles.' },
  { number: 3, title: 'Assign Managers', description: 'Assigns managers per clinic and sets different hours.' },
  { number: 4, title: 'Review Weekly', description: 'Views a chain-wide report every Monday morning.' },
];

const relatedFeatures = [
  { icon: '👥', title: 'Staff Management', description: "Calendars respect each dentist's role and access", href: '/product/features/staff-management' },
  { icon: '📊', title: 'Reports & Analytics', description: 'Completion rates roll up into clinic reports', href: '/product/features/reports-analytics' },
  { icon: '🔒', title: 'Security', description: 'Role permissions are enforced at every layer', href: '/product/features/security' },
];

export default function MultiClinicManagementPage() {
  return (
    <main className="min-h-screen bg-white">
      <FeatureHero
        breadcrumb={[
          { label: 'Product', href: '/product' },
          { label: 'Features', href: '/product/features' },
          { label: 'Multi-Clinic Management' },
        ]}
        activeTab="/product/features/multi-clinic-management"
        title="One Account. Every Clinic. Total Control."
        description="Purpose-built for dental groups and chains — manage all locations from a single, secure platform without data crossover."
        screenshotLabel="Multi-Clinic Management screenshot"
      />
      <AlternatingSection sections={sections} />
      <CapabilityGrid heading="What Multi-Clinic Management Lets You Do" items={capabilities} />
      <WorkflowSteps steps={steps} />
      <WorksBestWithGrid items={relatedFeatures} />
      <SectionCTA title="See Multi-Clinic Management in Your Clinic" />
    </main>
  );
}
