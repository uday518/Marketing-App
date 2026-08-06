import FeatureHero from '@/components/ui/FeatureHero';
import AlternatingSection from '@/components/ui/AlternatingSection';
import CapabilityGrid from '@/components/ui/CapabilityGrid';
import WorkflowSteps from '@/components/ui/WorkflowSteps';
import WorksBestWithGrid from '@/components/ui/WorksBestWithGrid';
import SectionCTA from '@/components/ui/SectionCTA';

const sections = [
  {
    title: 'Operations Reports',
    description: 'Appointment volumes, attendance rates, no-shows, and queue performance by date and dentist.',
    bullets: ['Appointment volumes', 'No-show rates', 'Queue performance'],
    screenshot: 'Operations Reports screenshot',
    reversed: false,
  },
  {
    title: 'Clinical Reports',
    description: 'Procedures performed, treatment completion rates, and patient diagnosis trends.',
    bullets: ['Procedures performed', 'Completion rates', 'Diagnosis trends'],
    screenshot: 'Clinical Reports screenshot',
    reversed: true,
  },
  {
    title: 'Staff & Clinic Reports',
    description: 'Staff activity, multi-clinic comparisons, and performance by location.',
    bullets: ['Staff activity', 'Multi-clinic comparisons', 'Performance by location'],
    screenshot: 'Staff & Clinic Reports screenshot',
    reversed: false,
  },
];

const capabilities = [
  { icon: '📅', title: 'Date Range Filtering', description: 'Filter any report by custom date range.' },
  { icon: '📊', title: 'Per-Dentist Breakdown', description: 'Compare performance across dentists.' },
  { icon: '🏥', title: 'Per-Clinic Breakdown', description: 'Compare performance across clinic locations.' },
  { icon: '📤', title: 'CSV Export', description: 'Export any report for offline analysis.' },
  { icon: '📈', title: 'KPI Dashboard', description: 'At-a-glance view of the metrics that matter most.' },
  { icon: '📆', title: 'Scheduled Reports', description: 'Auto-delivered reports on a recurring basis (future).' },
];

const steps = [
  { number: 1, title: 'Open Report', description: 'Practice Manager opens the monthly report for a 3-clinic chain.' },
  { number: 2, title: 'Compare Clinics', description: 'Compares appointment volumes across locations.' },
  { number: 3, title: 'Spot Trend', description: 'Identifies a high no-show rate at one clinic.' },
  { number: 4, title: 'Export Data', description: 'Exports the data for the operations review meeting.' },
];

const relatedFeatures = [
  { icon: '🏥', title: 'Multi-Clinic Management', description: 'Reports roll up across every clinic location', href: '/product/features/multi-clinic-management' },
  { icon: '👥', title: 'Staff Management', description: "Calendars respect each dentist's role and access", href: '/product/features/staff-management' },
  { icon: '👤', title: 'Patient Management', description: 'Every plan attaches to the patient record', href: '/product/features/patient-management' },
];

export default function ReportsAnalyticsPage() {
  return (
    <main className="min-h-screen bg-white">
      <FeatureHero
        breadcrumb={[
          { label: 'Product', href: '/product' },
          { label: 'Features', href: '/product/features' },
          { label: 'Reports & Analytics' },
        ]}
        activeTab="/product/features/reports-analytics"
        title="See What's Happening Across Your Entire Practice"
        description="Real-time dashboards and exportable reports that help clinic owners and managers make confident decisions."
        screenshotLabel="Reports & Analytics screenshot"
      />
      <AlternatingSection sections={sections} />
      <CapabilityGrid heading="What Reports & Analytics Lets You Do" items={capabilities} />
      <WorkflowSteps steps={steps} />
      <WorksBestWithGrid items={relatedFeatures} />
      <SectionCTA title="See Reports & Analytics in Your Clinic" />
    </main>
  );
}
