import SolutionsSubPage from '@/components/SolutionsSubPage/SolutionsSubPage';
import SolutionsCTA from '@/components/SolutionsCTA/SolutionsCTA';

const features = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: 'Patient Management',
    href: '/product/features/patient-management',
    description: 'Centralized records for every patient.',
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    title: 'Appointment Management',
    href: '/product/features/appointment-management',
    description: 'Book and manage every visit.',
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Queue Management',
    href: '/product/features/queue-management',
    description: 'Live wait tracking, per clinic.',
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: 'Clinical Documentation',
    href: '/product/features/clinical-documentation',
    description: 'Stage-based encounter notes.',
  },
];

export default function SingleClinicPage() {
  return (
    <main className="min-h-screen bg-white">
      <SolutionsSubPage
        title="Single Clinic"
        heroDescription="Everything One Clinic Needs — Nothing It Doesn't"
        heroScreenshot="Single Clinic — illustrative screenshot"
        problemStatement="Running One Clinic Still Means Running a Business"
        problemDescription="Small teams end up juggling paper schedules, scattered patient files, and manual admin work — with no time to spare for tools built for enterprise chains."
        solutionTitle="One Simple System, Built for One Location"
        solutionDescription="mysaas gives single-clinic practices patient records, scheduling, queue management, and clinical documentation in one place — without the complexity of multi-location tooling."
        solutionScreenshot="Single Clinic — solution workflow screenshot"
        benefits={[
          { text: 'Faster patient check-in' },
          { text: 'Organized, searchable records' },
          { text: 'Fewer double-bookings' },
          { text: 'Less manual admin work' },
        ]}
        features={features}
      />
      <SolutionsCTA />
    </main>
  );
}
