import StatCard from "@/components/admin/dashboard/StatCard";
import ScheduleList, { ScheduleItem } from "@/components/admin/dashboard/ScheduleList";
import RecentActivityList, { ActivityItem } from "@/components/admin/dashboard/RecentActivityList";

// --- Mock Data ---
const MOCK_STATS = [
  { 
    label: 'Patients Today', 
    value: '14', 
    trend: { value: '12%', isPositive: true }, 
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> 
  },
  { 
    label: 'Pending', 
    value: '3', 
    trend: { value: '2 less than usual', isPositive: true }, 
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> 
  },
  { 
    label: 'Revenue', 
    value: '$2,840', 
    trend: { value: '8%', isPositive: true }, 
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg> 
  },
];

const MOCK_SCHEDULE: ScheduleItem[] = [
  { id: '1', time: '09:00', patientName: 'Sita Rai', type: 'Checkup', status: 'In Room' },
  { id: '2', time: '09:30', patientName: 'Ram Karki', type: 'Cleaning', status: 'Waiting' },
  { id: '3', time: '10:00', patientName: 'Binita Shrestha', type: 'Crown', status: 'Waiting' },
  { id: '4', time: '10:30', patientName: 'Kumar Bhandari', type: 'X-Ray', status: 'Waiting' },
];

const MOCK_UPCOMING: ScheduleItem[] = [
  { id: '5', time: '14:00', patientName: 'Anita Thapa', type: 'Root Canal', status: 'Confirmed' },
  { id: '6', time: '15:30', patientName: 'Nabin Joshi', type: 'Consultation', status: 'Confirmed' },
];

const MOCK_ACTIVITIES: ActivityItem[] = [
  { id: '1', title: 'New Patient Registered', description: 'Gita Magar completed onboarding.', time: '10m ago', type: 'patient' },
  { id: '2', title: 'Payment Received', description: '$300 for Cleaning from Roshan.', time: '1h ago', type: 'billing' },
  { id: '3', title: 'System Warning', description: 'Low stock on gloves.', time: '2h ago', type: 'system' },
];
// -----------------

export default function AdminDashboardPage() {
  // Format current date statically for initial render (Next.js server-side vs client consistency)
  // To avoid hydration mismatches, you might use a use client / useEffect, but for this UI static text is ok right now.
  const dateString = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-heading">Good morning, Dr. Sharma 👋</h2>
          <p className="text-sm text-text-muted mt-1">{dateString} · 14 appointments today</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary-hover shadow-sm transition-colors">
            New Appointment
          </button>
        </div>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_STATS.map((stat) => (
          <StatCard 
            key={stat.label}
            label={stat.label}
            value={stat.value}
            trend={stat.trend}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Today's Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <ScheduleList title="Today's Schedule" items={MOCK_SCHEDULE} />
          
          <ScheduleList title="Upcoming Appointments (Afternoon)" items={MOCK_UPCOMING} />
        </div>

        {/* Right Column - Recent Activity */}
        <div className="space-y-6">
          <RecentActivityList activities={MOCK_ACTIVITIES} />
        </div>
      </div>
    </div>
  );
}
