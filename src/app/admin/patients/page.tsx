"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/admin/shared/PageHeader';
import DataTable, { Column } from '@/components/admin/shared/DataTable';
import StatusBadge from '@/components/admin/shared/StatusBadge';

type Patient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  status: string;
};

const MOCK_PATIENTS: Patient[] = [
  { id: 'PT-001', name: 'Sita Rai', email: 'sita.rai@example.com', phone: '+977 9800000001', lastVisit: '2023-10-15', status: 'Active' },
  { id: 'PT-002', name: 'Ram Karki', email: 'ram.karki@example.com', phone: '+977 9800000002', lastVisit: '2023-11-02', status: 'Active' },
  { id: 'PT-003', name: 'Binita Shrestha', email: 'binita.s@example.com', phone: '+977 9800000003', lastVisit: '2023-08-20', status: 'Inactive' },
  { id: 'PT-004', name: 'Kumar Bhandari', email: 'kumar.b@example.com', phone: '+977 9800000004', lastVisit: '2023-11-20', status: 'Active' },
];

export default function PatientsPage() {
  const router = useRouter();

  const columns: Column<Patient>[] = [
    { key: 'id', label: 'ID' },
    { 
      key: 'name', 
      label: 'Patient', 
      render: (p) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand-primary font-semibold text-xs">
            {p.name.charAt(0)}
          </div>
          <span className="font-medium text-text-heading">{p.name}</span>
        </div>
      )
    },
    { key: 'phone', label: 'Phone' },
    { key: 'lastVisit', label: 'Last Visit' },
    { 
      key: 'status', 
      label: 'Status',
      render: (p) => <StatusBadge status={p.status} variant={p.status === 'Active' ? 'success' : 'neutral'} />
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Patients" 
        description="Manage patient records, history, and details."
        action={{ label: 'Add Patient', href: '/admin/patients/new' }}
      />
      
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-border-default shadow-sm">
        <div className="relative w-full sm:max-w-xs">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Search patients..." 
            className="w-full rounded-md border border-border-default pl-10 pr-4 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <select className="w-full sm:w-auto rounded-md border border-border-default px-4 py-2 text-sm bg-white focus:outline-none focus:border-brand-primary text-text-body">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={MOCK_PATIENTS} 
        onRowClick={(p) => router.push(`/admin/patients/${p.id}`)} 
      />
    </div>
  );
}
