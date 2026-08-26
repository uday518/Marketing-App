"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/shared/PageHeader";
import DataTable, { Column } from "@/components/admin/shared/DataTable";
import StatusBadge from "@/components/admin/shared/StatusBadge";

interface Clinic {
  id: string;
  name: string;
  owner: string;
  email: string;
  phone: string;
  location: string;
  plan: string;
  status: string;
  patients: number;
  createdAt: string;
  lastActive: string;
}

const MOCK_CLINICS: Clinic[] = [
  { id: '1', name: 'Sunshine Dental Clinic', owner: 'Dr. Sarah Johnson', email: 'sarah@sunshinedental.com', phone: '+1 555-0123', location: 'New York, NY', plan: 'Professional', status: 'Active', patients: 245, createdAt: '2023-06-15', lastActive: '2024-01-15' },
  { id: '2', name: 'Metro Dental Care', owner: 'Dr. Michael Chen', email: 'mchen@metrodental.com', phone: '+1 555-0456', location: 'Los Angeles, CA', plan: 'Enterprise', status: 'Active', patients: 512, createdAt: '2023-05-20', lastActive: '2024-01-15' },
  { id: '3', name: 'Family Smiles LLC', owner: 'Dr. Emily Davis', email: 'emily@familysmiles.com', phone: '+1 555-0789', location: 'Chicago, IL', plan: 'Professional', status: 'Active', patients: 178, createdAt: '2023-07-10', lastActive: '2024-01-14' },
  { id: '4', name: 'Dental Excellence Group', owner: 'Dr. Robert Wilson', email: 'rwilson@dentalexcellence.com', phone: '+1 555-0321', location: 'Houston, TX', plan: 'Trial', status: 'Trial', patients: 45, createdAt: '2024-01-05', lastActive: '2024-01-13' },
  { id: '5', name: 'Bright Smile Dental', owner: 'Dr. Lisa Anderson', email: 'lisa@brightsmile.com', phone: '+1 555-0654', location: 'Phoenix, AZ', plan: 'Professional', status: 'Active', patients: 312, createdAt: '2023-08-22', lastActive: '2024-01-15' },
  { id: '6', name: 'Harbor Dental Associates', owner: 'Dr. James Taylor', email: 'jtaylor@harbordental.com', phone: '+1 555-0987', location: 'Miami, FL', plan: 'Enterprise', status: 'Active', patients: 678, createdAt: '2023-04-18', lastActive: '2024-01-14' },
  { id: '7', name: 'Valley Dental Center', owner: 'Dr. Patricia Moore', email: 'pmoore@valleydental.com', phone: '+1 555-0234', location: 'Denver, CO', plan: 'Trial', status: 'Trial', patients: 28, createdAt: '2024-01-08', lastActive: '2024-01-12' },
  { id: '8', name: 'City Smiles Clinic', owner: 'Dr. Kevin White', email: 'kwhite@citysmiles.com', phone: '+1 555-0567', location: 'Seattle, WA', plan: 'Professional', status: 'Active', patients: 156, createdAt: '2023-09-30', lastActive: '2024-01-15' },
];

const columns: Column<Clinic>[] = [
  { key: 'name', label: 'Clinic Name' },
  { key: 'owner', label: 'Owner' },
  { key: 'location', label: 'Location' },
  { key: 'plan', label: 'Plan' },
  { key: 'patients', label: 'Patients' },
  { key: 'createdAt', label: 'Joined' },
  { 
    key: 'status', 
    label: 'Status',
    render: (item) => <StatusBadge status={item.status} />
  },
];

export default function ClinicsPage() {
  const [filter, setFilter] = useState('all');

  const filteredData = filter === 'all' 
    ? MOCK_CLINICS 
    : MOCK_CLINICS.filter(item => item.status === filter);

  const statusCounts = {
    all: MOCK_CLINICS.length,
    Active: MOCK_CLINICS.filter(i => i.status === 'Active').length,
    Trial: MOCK_CLINICS.filter(i => i.status === 'Trial').length,
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Clinics" 
        description="Manage all registered dental clinics"
        action={{ label: 'Add Clinic', href: '#' }}
      />

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'Active', 'Trial'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === status
                ? 'bg-brand-primary text-white shadow-sm'
                : 'bg-white border border-border-default text-text-body hover:bg-neutral-50'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {status !== 'all' && ` (${statusCounts[status as keyof typeof statusCounts]})`}
          </button>
        ))}
      </div>

      {/* Data Table */}
      <DataTable 
        columns={columns} 
        data={filteredData}
        emptyMessage="No clinics found"
      />
    </div>
  );
}
