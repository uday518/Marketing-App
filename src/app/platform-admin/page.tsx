import StatCard from "@/components/admin/dashboard/StatCard";
import PageHeader from "@/components/admin/shared/PageHeader";
import DataTable, { Column } from "@/components/admin/shared/DataTable";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import PlatformDashboard from "@/components/admin/platform/PlatformDashboard";

// --- Mock Data ---
const MOCK_STATS = [
  { 
    label: 'Total Clinics', 
    value: '247', 
    trend: { value: '12%', isPositive: true }, 
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4 8 4v14"/><path d="M8 9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12H8V9z"/></svg> 
  },
  { 
    label: 'Active Clinics', 
    value: '198', 
    trend: { value: '8%', isPositive: true }, 
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> 
  },
  { 
    label: 'Trial Clinics', 
    value: '49', 
    trend: { value: '5%', isPositive: false }, 
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 
  },
  { 
    label: 'Demo Requests', 
    value: '34', 
    trend: { value: '18%', isPositive: true }, 
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l5 5-5 5"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/></svg> 
  },
  { 
    label: 'New Leads', 
    value: '67', 
    trend: { value: '24%', isPositive: true }, 
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg> 
  },
  { 
    label: 'Monthly Revenue', 
    value: '$89,420', 
    trend: { value: '15%', isPositive: true }, 
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> 
  },
  { 
    label: 'Pending Payments', 
    value: '12', 
    trend: { value: '3', isPositive: false }, 
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> 
  },
  { 
    label: 'Churn Rate', 
    value: '2.4%', 
    trend: { value: '0.5%', isPositive: true }, 
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> 
  },
];

interface DemoRequest {
  id: string;
  clinicName: string;
  contactName: string;
  email: string;
  phone: string;
  requestedDate: string;
  status: string;
}

interface Lead {
  id: string;
  company: string;
  contactName: string;
  email: string;
  source: string;
  status: string;
  createdAt: string;
}

const MOCK_DEMO_REQUESTS: DemoRequest[] = [
  { id: '1', clinicName: 'Sunshine Dental Clinic', contactName: 'Dr. Sarah Johnson', email: 'sarah@sunshinedental.com', phone: '+1 555-0123', requestedDate: '2024-01-15', status: 'Pending' },
  { id: '2', clinicName: 'Metro Dental Care', contactName: 'Dr. Michael Chen', email: 'mchen@metrodental.com', phone: '+1 555-0456', requestedDate: '2024-01-14', status: 'Contacted' },
  { id: '3', clinicName: 'Family Smiles LLC', contactName: 'Dr. Emily Davis', email: 'emily@familysmiles.com', phone: '+1 555-0789', requestedDate: '2024-01-14', status: 'Scheduled' },
  { id: '4', clinicName: 'Dental Excellence Group', contactName: 'Dr. Robert Wilson', email: 'rwilson@dentalexcellence.com', phone: '+1 555-0321', requestedDate: '2024-01-13', status: 'Pending' },
  { id: '5', clinicName: 'Bright Smile Dental', contactName: 'Dr. Lisa Anderson', email: 'lisa@brightsmile.com', phone: '+1 555-0654', requestedDate: '2024-01-13', status: 'Completed' },
];

const MOCK_LEADS: Lead[] = [
  { id: '1', company: 'Advanced Dental Solutions', contactName: 'James Thompson', email: 'james@advanceddental.com', source: 'Website', status: 'Qualified', createdAt: '2024-01-15' },
  { id: '2', company: 'Premier Dental Partners', contactName: 'Maria Garcia', email: 'maria@premierdental.com', source: 'Referral', status: 'New', createdAt: '2024-01-14' },
  { id: '3', company: 'Dental Care Network', contactName: 'David Brown', email: 'david@dentalcarenetwork.com', source: 'LinkedIn', status: 'Contacted', createdAt: '2024-01-14' },
  { id: '4', company: 'Smile Studio Inc', contactName: 'Jennifer Lee', email: 'jennifer@smilestudio.com', source: 'Trade Show', status: 'Qualified', createdAt: '2024-01-13' },
  { id: '5', company: 'Total Dental Health', contactName: 'Christopher Martinez', email: 'chris@totaldental.com', source: 'Website', status: 'New', createdAt: '2024-01-12' },
];

const demoColumns: Column<DemoRequest>[] = [
  { key: 'clinicName', label: 'Clinic Name' },
  { key: 'contactName', label: 'Contact' },
  { key: 'email', label: 'Email' },
  { key: 'requestedDate', label: 'Requested' },
  { 
    key: 'status', 
    label: 'Status',
    render: (item) => <StatusBadge status={item.status} />
  },
];

const leadColumns: Column<Lead>[] = [
  { key: 'company', label: 'Company' },
  { key: 'contactName', label: 'Contact' },
  { key: 'source', label: 'Source' },
  { key: 'createdAt', label: 'Created' },
  { 
    key: 'status', 
    label: 'Status',
    render: (item) => <StatusBadge status={item.status} />
  },
];
// -----------------

export default function PlatformAdminDashboardPage() {
  const dateString = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-heading">Platform Dashboard 👋</h2>
          <p className="text-sm text-text-muted mt-1">{dateString} · Welcome to Platform Admin</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary-hover shadow-sm transition-colors">
            View Reports
          </button>
        </div>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Revenue Chart Placeholder */}
      <div className="rounded-xl border border-border-default bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-text-heading mb-4">Revenue Overview</h3>
        <div className="h-64 flex items-center justify-center bg-bg-page/50 rounded-lg border border-border-dashed">
          <div className="text-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-text-muted mb-2">
              <line x1="12" y1="20" x2="12" y2="10"></line>
              <line x1="18" y1="20" x2="18" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="16"></line>
            </svg>
            <p className="text-sm text-text-muted">Revenue chart will be displayed here</p>
          </div>
        </div>
      </div>

      {/* Recent Demo Requests & Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <PageHeader 
            title="Recent Demo Requests" 
            description="Latest demo requests from potential clinics"
            action={{ label: 'View All', href: '/platform-admin/demos' }}
          />
          <PlatformDashboard data={MOCK_DEMO_REQUESTS} />
        </div>

        <div>
          <PageHeader 
            title="Recent Leads" 
            description="Latest sales leads and prospects"
            action={{ label: 'View All', href: '/platform-admin/leads' }}
          />
          <PlatformDashboard data={MOCK_LEADS} />
        </div>
      </div>
    </div>
  );
}
