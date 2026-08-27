"use client";

import React from 'react';
import PageHeader from '@/components/admin/shared/PageHeader';
import DataTable, { Column } from '@/components/admin/shared/DataTable';
import StatusBadge from '@/components/admin/shared/StatusBadge';
import Tabs from '@/components/admin/shared/Tabs';

const MOCK_STAFF = [
  { id: 'ST-001', name: 'Dr. John Sharma', role: 'Dentist', email: 'john@mysaas.com', phone: '+977 9801111111', status: 'Active' },
  { id: 'ST-002', name: 'Dr. Anita Joshi', role: 'Dentist', email: 'anita@mysaas.com', phone: '+977 9801111112', status: 'Active' },
  { id: 'ST-003', name: 'Roshan Thapa', role: 'Assistant', email: 'roshan@mysaas.com', phone: '+977 9801111113', status: 'On Leave' },
];

export default function StaffPage() {
  const columns: Column<typeof MOCK_STAFF[0]>[] = [
    { 
      key: 'name', 
      label: 'Staff Member', 
      render: (s) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary text-white font-semibold text-xs shrink-0">
            {s.name.split(' ').map(n => n[0]).join('').substring(0,2)}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-text-heading truncate">{s.name}</p>
            <p className="text-xs text-text-muted truncate">{s.email}</p>
          </div>
        </div>
      )
    },
    { key: 'role', label: 'Role' },
    { key: 'phone', label: 'Phone' },
    { 
      key: 'status', 
      label: 'Status',
      render: (s) => <StatusBadge status={s.status} variant={s.status === 'Active' ? 'success' : 'neutral'} />
    }
  ];

  const dentists = MOCK_STAFF.filter(s => s.role === 'Dentist');
  const assistants = MOCK_STAFF.filter(s => s.role !== 'Dentist');

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Staff Directory" 
        description="Manage your clinic team, roles, and administrative access."
        action={{ label: 'Add Staff Member' }}
      />

      <div className="rounded-xl border border-border-default bg-white p-6 shadow-sm overflow-hidden">
        <Tabs tabs={[
          {
            id: 'all',
            label: 'All Staff',
            content: <DataTable columns={columns} data={MOCK_STAFF} />
          },
          {
            id: 'dentists',
            label: 'Dentists',
            content: <DataTable columns={columns} data={dentists} />
          },
          {
            id: 'assistants',
            label: 'Assistants & Admin',
            content: <DataTable columns={columns} data={assistants} />
          }
        ]} />
      </div>
    </div>
  );
}
