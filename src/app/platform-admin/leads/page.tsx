"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/shared/PageHeader";
import DataTable, { Column } from "@/components/admin/shared/DataTable";
import StatusBadge from "@/components/admin/shared/StatusBadge";

interface Lead {
  id: string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  estimatedValue: string;
  createdAt: string;
  lastContacted?: string;
}

const MOCK_LEADS: Lead[] = [
  { id: '1', company: 'Advanced Dental Solutions', contactName: 'James Thompson', email: 'james@advanceddental.com', phone: '+1 555-0111', source: 'Website', status: 'Qualified', estimatedValue: '$2,400', createdAt: '2024-01-15', lastContacted: '2024-01-15' },
  { id: '2', company: 'Premier Dental Partners', contactName: 'Maria Garcia', email: 'maria@premierdental.com', phone: '+1 555-0222', source: 'Referral', status: 'New', estimatedValue: '$4,800', createdAt: '2024-01-14', lastContacted: '' },
  { id: '3', company: 'Dental Care Network', contactName: 'David Brown', email: 'david@dentalcarenetwork.com', phone: '+1 555-0333', source: 'LinkedIn', status: 'Contacted', estimatedValue: '$1,200', createdAt: '2024-01-14', lastContacted: '2024-01-14' },
  { id: '4', company: 'Smile Studio Inc', contactName: 'Jennifer Lee', email: 'jennifer@smilestudio.com', phone: '+1 555-0444', source: 'Trade Show', status: 'Qualified', estimatedValue: '$7,200', createdAt: '2024-01-13', lastContacted: '2024-01-13' },
  { id: '5', company: 'Total Dental Health', contactName: 'Christopher Martinez', email: 'chris@totaldental.com', phone: '+1 555-0555', source: 'Website', status: 'New', estimatedValue: '$3,600', createdAt: '2024-01-12', lastContacted: '' },
  { id: '6', company: 'Gentle Dental Group', contactName: 'Amanda Wilson', email: 'amanda@gentledental.com', phone: '+1 555-0666', source: 'Cold Call', status: 'Contacted', estimatedValue: '$1,800', createdAt: '2024-01-11', lastContacted: '2024-01-11' },
  { id: '7', company: 'Modern Dental Associates', contactName: 'Daniel Kim', email: 'dkim@moderndental.com', phone: '+1 555-0777', source: 'Website', status: 'Qualified', estimatedValue: '$9,600', createdAt: '2024-01-10', lastContacted: '2024-01-10' },
  { id: '8', company: 'Bright Future Dental', contactName: 'Sarah Johnson', email: 'sarah@brightfuture.com', phone: '+1 555-0888', source: 'Referral', status: 'New', estimatedValue: '$2,400', createdAt: '2024-01-09', lastContacted: '' },
];

const columns: Column<Lead>[] = [
  { key: 'company', label: 'Company' },
  { key: 'contactName', label: 'Contact' },
  { key: 'email', label: 'Email' },
  { key: 'source', label: 'Source' },
  { key: 'estimatedValue', label: 'Est. Value' },
  { key: 'createdAt', label: 'Created' },
  { 
    key: 'status', 
    label: 'Status',
    render: (item) => <StatusBadge status={item.status} />
  },
];

export default function LeadsPage() {
  const [filter, setFilter] = useState('all');

  const filteredData = filter === 'all' 
    ? MOCK_LEADS 
    : MOCK_LEADS.filter(item => item.status === filter);

  const statusCounts = {
    all: MOCK_LEADS.length,
    New: MOCK_LEADS.filter(i => i.status === 'New').length,
    Contacted: MOCK_LEADS.filter(i => i.status === 'Contacted').length,
    Qualified: MOCK_LEADS.filter(i => i.status === 'Qualified').length,
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Leads" 
        description="Manage sales leads and prospects"
        action={{ label: 'Add Lead', href: '#' }}
      />

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'New', 'Contacted', 'Qualified'].map((status) => (
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
        emptyMessage="No leads found"
      />
    </div>
  );
}
