"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/shared/PageHeader";
import DataTable, { Column } from "@/components/admin/shared/DataTable";
import StatusBadge from "@/components/admin/shared/StatusBadge";

interface DemoRequest {
  id: string;
  clinicName: string;
  contactName: string;
  email: string;
  phone: string;
  requestedDate: string;
  preferredDate: string;
  status: string;
  notes?: string;
}

const MOCK_DEMO_REQUESTS: DemoRequest[] = [
  { id: '1', clinicName: 'Sunshine Dental Clinic', contactName: 'Dr. Sarah Johnson', email: 'sarah@sunshinedental.com', phone: '+1 555-0123', requestedDate: '2024-01-15', preferredDate: '2024-01-20', status: 'Pending', notes: 'Interested in multi-clinic features' },
  { id: '2', clinicName: 'Metro Dental Care', contactName: 'Dr. Michael Chen', email: 'mchen@metrodental.com', phone: '+1 555-0456', requestedDate: '2024-01-14', preferredDate: '2024-01-18', status: 'Contacted', notes: 'Follow-up scheduled' },
  { id: '3', clinicName: 'Family Smiles LLC', contactName: 'Dr. Emily Davis', email: 'emily@familysmiles.com', phone: '+1 555-0789', requestedDate: '2024-01-14', preferredDate: '2024-01-22', status: 'Scheduled', notes: 'Demo confirmed for 2pm' },
  { id: '4', clinicName: 'Dental Excellence Group', contactName: 'Dr. Robert Wilson', email: 'rwilson@dentalexcellence.com', phone: '+1 555-0321', requestedDate: '2024-01-13', preferredDate: '2024-01-25', status: 'Pending', notes: '' },
  { id: '5', clinicName: 'Bright Smile Dental', contactName: 'Dr. Lisa Anderson', email: 'lisa@brightsmile.com', phone: '+1 555-0654', requestedDate: '2024-01-13', preferredDate: '2024-01-19', status: 'Completed', notes: 'Converted to trial' },
  { id: '6', clinicName: 'Harbor Dental Associates', contactName: 'Dr. James Taylor', email: 'jtaylor@harbordental.com', phone: '+1 555-0987', requestedDate: '2024-01-12', preferredDate: '2024-01-21', status: 'Pending', notes: 'Comparing with competitors' },
  { id: '7', clinicName: 'Valley Dental Center', contactName: 'Dr. Patricia Moore', email: 'pmoore@valleydental.com', phone: '+1 555-0234', requestedDate: '2024-01-11', preferredDate: '2024-01-23', status: 'Contacted', notes: 'Sent pricing information' },
  { id: '8', clinicName: 'City Smiles Clinic', contactName: 'Dr. Kevin White', email: 'kwhite@citysmiles.com', phone: '+1 555-0567', requestedDate: '2024-01-10', preferredDate: '2024-01-17', status: 'Scheduled', notes: '' },
];

const columns: Column<DemoRequest>[] = [
  { key: 'clinicName', label: 'Clinic Name' },
  { key: 'contactName', label: 'Contact' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'preferredDate', label: 'Preferred Date' },
  { 
    key: 'status', 
    label: 'Status',
    render: (item) => <StatusBadge status={item.status} />
  },
];

export default function DemoRequestsPage() {
  const [filter, setFilter] = useState('all');

  const filteredData = filter === 'all' 
    ? MOCK_DEMO_REQUESTS 
    : MOCK_DEMO_REQUESTS.filter(item => item.status === filter);

  const statusCounts = {
    all: MOCK_DEMO_REQUESTS.length,
    Pending: MOCK_DEMO_REQUESTS.filter(i => i.status === 'Pending').length,
    Contacted: MOCK_DEMO_REQUESTS.filter(i => i.status === 'Contacted').length,
    Scheduled: MOCK_DEMO_REQUESTS.filter(i => i.status === 'Scheduled').length,
    Completed: MOCK_DEMO_REQUESTS.filter(i => i.status === 'Completed').length,
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Demo Requests" 
        description="Manage demo requests from potential clinics"
      />

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'Pending', 'Contacted', 'Scheduled', 'Completed'].map((status) => (
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
        emptyMessage="No demo requests found"
      />
    </div>
  );
}
