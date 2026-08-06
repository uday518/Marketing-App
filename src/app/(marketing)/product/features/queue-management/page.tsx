import FeatureHero from '@/components/ui/FeatureHero';
import AlternatingSection from '@/components/ui/AlternatingSection';
import CapabilityGrid from '@/components/ui/CapabilityGrid';
import WorkflowSteps from '@/components/ui/WorkflowSteps';
import WorksBestWithGrid from '@/components/ui/WorksBestWithGrid';
import SectionCTA from '@/components/ui/SectionCTA';

const sections = [
  {
    title: 'Live Queue Board',
    description: 'Real-time patient queue per clinic and per dentist, with wait-time estimates.',
    bullets: ['Per-clinic queues', 'Per-dentist queues', 'Wait-time estimates'],
    screenshot: 'Live Queue Board screenshot',
    reversed: false,
  },
  {
    title: 'Queue Actions',
    description: 'Check in walk-ins, call the next patient, mark as in Chair, complete or re-queue.',
    bullets: ['Walk-in check-in', 'Call next patient', 'Complete or re-queue'],
    screenshot: 'Queue Actions screenshot',
    reversed: true,
  },
  {
    title: 'Queue Status Tracking',
    description: "Every patient's status is visible to all staff simultaneously, in real time.",
    bullets: ['Real-time sync', 'Shared visibility', 'Status history'],
    screenshot: 'Queue Status Tracking screenshot',
    reversed: false,
  },
];

const capabilities = [
  { icon: '🚶', title: 'Walk-In Queue Entry', description: 'Add walk-ins to the queue without a prior booking.' },
  { icon: '🔄', title: 'Queue Reordering', description: 'Reorder the queue manually when needed.' },
  { icon: '🦷', title: 'Per-Dentist Queues', description: 'Separate queues per dentist, per clinic.' },
  { icon: '⏱️', title: 'Average Wait Time Tracking', description: 'Auto-suggest follow-up visits after completed care.' },
  { icon: '🚩', title: 'Priority Flagging', description: "See every dentist's schedule side by side." },
  { icon: '🚨', title: 'Emergency Contact Tracking', description: 'Emergency contacts on file for every patient.' },
];

const steps = [
  { number: 1, title: 'Patient Arrives', description: 'Arrives for a 10am appointment.' },
  { number: 2, title: 'Checked In', description: 'Receptionist marks them Checked In.' },
  { number: 3, title: 'Marked Ready', description: 'Dentist sees the patient move to Ready on the queue board.' },
  { number: 4, title: 'Called', description: 'Dentist calls the patient from the dashboard.' },
];

const relatedFeatures = [
  { icon: '📅', title: 'Appointment Management', description: 'Bookings feed the queue automatically.', href: '/product/features/appointment-management' },
  { icon: '📊', title: 'Reports & Analytics', description: 'Queue performance rolls into clinic reports.', href: '/product/features/reports-analytics' },
  { icon: '👥', title: 'Staff Management', description: 'Calendars respect each dentist role and access.', href: '/product/features/staff-management' },
];

export default function QueueManagementPage() {
  return (
    <main className="min-h-screen bg-white">
      <FeatureHero
        breadcrumb={[
          { label: 'Product', href: '/product' },
          { label: 'Features', href: '/product/features' },
          { label: 'Queue Management' },
        ]}
        activeTab="/product/features/queue-management"
        title="Turn Waiting Rooms Into Waiting Lists"
        description="Real-time queue visibility for your front desk and clinical staff — so nobody waits longer than they should."
        screenshotLabel="Queue Management screenshot"
      />
      <AlternatingSection sections={sections} />
      <CapabilityGrid heading="What Queue Management Lets You Do" items={capabilities} />
      <WorkflowSteps steps={steps} />
      <WorksBestWithGrid items={relatedFeatures} />
      <SectionCTA title="See Queue Management in Your Clinic" />
    </main>
  );
}
