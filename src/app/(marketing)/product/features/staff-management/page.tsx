import FeatureHero from '@/components/ui/FeatureHero';
import AlternatingSection from '@/components/ui/AlternatingSection';
import CapabilityGrid from '@/components/ui/CapabilityGrid';
import WorkflowSteps from '@/components/ui/WorkflowSteps';
import WorksBestWithGrid from '@/components/ui/WorksBestWithGrid';
import SectionCTA from '@/components/ui/SectionCTA';

const sections = [
  {
    title: 'Staff Directory',
    description: 'Full staff profiles — name, role, specialization, contact, and active/inactive status.',
    bullets: ['Full staff profiles', 'Specialization tracking', 'Active/inactive status'],
    screenshot: 'Staff Directory screenshot',
    reversed: false,
  },
  {
    title: 'Role-Based Access Control',
    description: 'Predefined roles — Admin, Dentist, Receptionist, Manager — each with granular module permissions.',
    bullets: ['Predefined roles', 'Granular permissions', 'Per-module access'],
    screenshot: 'Role-Based Access Control screenshot',
    reversed: true,
  },
  {
    title: 'Multi-Clinic Staff Assignment',
    description: 'Assign staff members to one or multiple clinic locations.',
    bullets: ['Multi-location assignment', 'Per-clinic rosters', 'Centralized staff view'],
    screenshot: 'Multi-Clinic Staff Assignment screenshot',
    reversed: false,
  },
];

const capabilities = [
  { icon: '🛡️', title: 'Role & Permission Editor', description: 'Fine-tune exactly what each role can access.' },
  { icon: '📅', title: 'Staff Scheduling', description: 'Shift and availability scheduling (future).' },
  { icon: '📝', title: 'Activity Log per Staff', description: 'See every action taken by each staff member.' },
  { icon: '🔑', title: 'Login Session Tracking', description: 'Monitor active sessions per staff account.' },
  { icon: '🚀', title: 'Staff Onboarding Flow', description: 'Guided setup for new staff accounts.' },
  { icon: '📋', title: "Per-Clinic Staff Roster", description: "See who's assigned to each clinic location." },
];

const steps = [
  { number: 1, title: 'Add Staff', description: 'Clinic Owner adds a new receptionist.' },
  { number: 2, title: 'Assign Role', description: 'Assigns them the Receptionist role.' },
  { number: 3, title: 'Grant Access', description: 'Grants access to Appointments and Queue modules only.' },
  { number: 4, title: 'Restrict Access', description: 'Restricts access to financial reports and clinical records.' },
];

const relatedFeatures = [
  { icon: '🏥', title: 'Multi-Clinic Management', description: 'Reports roll up across every clinic location', href: '/product/features/multi-clinic-management' },
  { icon: '🔒', title: 'Security', description: 'Role permissions are enforced at every layer', href: '/product/features/security' },
  { icon: '📊', title: 'Reports & Analytics', description: 'Completion rates roll up into clinic reports', href: '/product/features/reports-analytics' },
];

export default function StaffManagementPage() {
  return (
    <main className="min-h-screen bg-white">
      <FeatureHero
        breadcrumb={[
          { label: 'Product', href: '/product' },
          { label: 'Features', href: '/product/features' },
          { label: 'Staff Management' },
        ]}
        activeTab="/product/features/staff-management"
        title="Every Team Member, Every Permission, Under Control"
        description="Define roles, assign access, and manage your clinic staff — whether you have one location or twenty."
        screenshotLabel="Staff Management screenshot"
      />
      <AlternatingSection sections={sections} />
      <CapabilityGrid heading="What Staff Management Lets You Do" items={capabilities} />
      <WorkflowSteps steps={steps} />
      <WorksBestWithGrid items={relatedFeatures} />
      <SectionCTA title="See Staff Management in Your Clinic" />
    </main>
  );
}
