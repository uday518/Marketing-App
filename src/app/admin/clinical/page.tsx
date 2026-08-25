"use client";

import React from 'react';
import PageHeader from '@/components/admin/shared/PageHeader';
import Tabs from '@/components/admin/shared/Tabs';
import DataTable, { Column } from '@/components/admin/shared/DataTable';
import StatusBadge from '@/components/admin/shared/StatusBadge';

const MOCK_PLANS = [
  { id: 'TP-101', patient: 'Sita Rai', title: 'Full Mouth Restoration', date: '2023-10-10', status: 'In Progress' },
  { id: 'TP-102', patient: 'Ram Karki', title: 'Orthodontic Braces', date: '2023-11-01', status: 'Proposed' },
];

export default function ClinicalPage() {
  const planColumns: Column<typeof MOCK_PLANS[0]>[] = [
    { key: 'id', label: 'Plan ID' },
    { key: 'patient', label: 'Patient' },
    { key: 'title', label: 'Treatment Title' },
    { key: 'date', label: 'Date Created' },
    { 
      key: 'status', 
      label: 'Status',
      render: (p) => <StatusBadge status={p.status} />
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Clinical" 
        description="Patient healthcare information, notes, and treatment plans."
        action={{ label: 'New Record' }}
      />

      <div className="rounded-xl border border-border-default bg-white p-6 shadow-sm">
        <Tabs tabs={[
          {
            id: 'plans',
            label: 'Treatment Plans',
            content: (
              <div className="space-y-4">
                <DataTable columns={planColumns} data={MOCK_PLANS} />
              </div>
            )
          },
          {
            id: 'notes',
            label: 'Clinical Notes',
            content: (
              <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-border-default rounded-lg bg-bg-page/50 text-center">
                <svg className="text-text-muted mb-3" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                <h4 className="text-sm font-semibold text-text-heading">No Clinical Notes</h4>
                <p className="text-sm text-text-muted max-w-sm mt-1 mb-4">Patient clinical notes history will appear here.</p>
                <button className="text-sm text-brand-primary font-medium hover:underline">Add Note</button>
              </div>
            )
          },
          {
            id: 'prescriptions',
            label: 'Prescriptions',
            content: (
              <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-border-default rounded-lg bg-bg-page/50 text-center">
                <svg className="text-text-muted mb-3" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="7" r="5"></circle><circle cx="17" cy="17" r="5"></circle><path d="M12 17h10"></path><path d="m3.46 10.54 7.08-7.08"></path></svg>
                <h4 className="text-sm font-semibold text-text-heading">No Prescriptions</h4>
                <p className="text-sm text-text-muted max-w-sm mt-1">Written prescriptions will be listed here.</p>
              </div>
            )
          },
          {
            id: 'documents',
            label: 'Documents & Imaging',
            content: (
              <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-border-default rounded-lg bg-bg-page/50 text-center">
                <svg className="text-text-muted mb-3" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                <h4 className="text-sm font-semibold text-text-heading">Imaging Repository</h4>
                <p className="text-sm text-text-muted max-w-sm mt-1 mb-4">Upload X-Rays and scanned documents.</p>
                <button className="text-sm rounded-md border border-border-default bg-white px-3 py-1.5 font-medium text-text-heading shadow-sm">Upload File</button>
              </div>
            )
          }
        ]} />
      </div>
    </div>
  );
}
