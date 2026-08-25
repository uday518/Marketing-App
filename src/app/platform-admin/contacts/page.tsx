"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/shared/PageHeader";
import DataTable, { Column } from "@/components/admin/shared/DataTable";
import StatusBadge from "@/components/admin/shared/StatusBadge";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  type: string;
  status: string;
  lastContact: string;
  notes?: string;
}

const MOCK_CONTACTS: Contact[] = [
  { id: '1', name: 'Dr. Sarah Johnson', email: 'sarah@sunshinedental.com', phone: '+1 555-0123', company: 'Sunshine Dental Clinic', type: 'Clinic Owner', status: 'Active', lastContact: '2024-01-15', notes: 'Interested in Enterprise plan' },
  { id: '2', name: 'Dr. Michael Chen', email: 'mchen@metrodental.com', phone: '+1 555-0456', company: 'Metro Dental Care', type: 'Clinic Owner', status: 'Active', lastContact: '2024-01-14', notes: 'Renewal discussion' },
  { id: '3', name: 'James Thompson', email: 'james@advanceddental.com', phone: '+1 555-0111', company: 'Advanced Dental Solutions', type: 'Lead', status: 'Active', lastContact: '2024-01-15', notes: 'Qualified lead' },
  { id: '4', name: 'Maria Garcia', email: 'maria@premierdental.com', phone: '+1 555-0222', company: 'Premier Dental Partners', type: 'Lead', status: 'Active', lastContact: '2024-01-14', notes: '' },
  { id: '5', name: 'Dr. Emily Davis', email: 'emily@familysmiles.com', phone: '+1 555-0789', company: 'Family Smiles LLC', type: 'Clinic Owner', status: 'Active', lastContact: '2024-01-13', notes: 'Trial conversion' },
  { id: '6', name: 'David Brown', email: 'david@dentalcarenetwork.com', phone: '+1 555-0333', company: 'Dental Care Network', type: 'Lead', status: 'Inactive', lastContact: '2024-01-10', notes: 'Lost to competitor' },
  { id: '7', name: 'Jennifer Lee', email: 'jennifer@smilestudio.com', phone: '+1 555-0444', company: 'Smile Studio Inc', type: 'Lead', status: 'Active', lastContact: '2024-01-13', notes: '' },
  { id: '8', name: 'Christopher Martinez', email: 'chris@totaldental.com', phone: '+1 555-0555', company: 'Total Dental Health', type: 'Lead', status: 'Active', lastContact: '2024-01-12', notes: 'Follow up scheduled' },
];

const columns: Column<Contact>[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'company', label: 'Company' },
  { key: 'type', label: 'Type' },
  { key: 'lastContact', label: 'Last Contact' },
  { 
    key: 'status', 
    label: 'Status',
    render: (item) => <StatusBadge status={item.status} />
  },
];

export default function ContactsPage() {
  const [filter, setFilter] = useState('all');

  const filteredData = filter === 'all' 
    ? MOCK_CONTACTS 
    : MOCK_CONTACTS.filter(item => item.status === filter);

  const statusCounts = {
    all: MOCK_CONTACTS.length,
    Active: MOCK_CONTACTS.filter(i => i.status === 'Active').length,
    Inactive: MOCK_CONTACTS.filter(i => i.status === 'Inactive').length,
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Contacts" 
        description="Manage all contacts and relationships"
        action={{ label: 'Add Contact', href: '#' }}
      />

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'Active', 'Inactive'].map((status) => (
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
        emptyMessage="No contacts found"
      />
    </div>
  );
}
