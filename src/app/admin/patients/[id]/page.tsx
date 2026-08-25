"use client";

import React from 'react';
import PageHeader from '@/components/admin/shared/PageHeader';
import Tabs from '@/components/admin/shared/Tabs';
import { useParams } from 'next/navigation';

export default function PatientDetailsPage() {
  const params = useParams();
  const patientId = params?.id || 'PT-001';

  return (
    <div className="space-y-6">
      <PageHeader 
        title={`Patient: Sita Rai`} 
        description={`ID: ${patientId} • Registered: 2023-01-15`}
        action={{ label: 'Edit Patient' }}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 border border-border-default rounded-xl bg-white p-6 shadow-sm h-min">
          <div className="flex flex-col items-center text-center pb-6 border-b border-border-default">
            <div className="h-20 w-20 rounded-full bg-brand-tint text-brand-primary flex items-center justify-center text-2xl font-bold mb-4">
              SR
            </div>
            <h3 className="text-lg font-bold text-text-heading">Sita Rai</h3>
            <span className="mt-1 inline-flex rounded-full bg-success-100 px-2 py-0.5 text-xs font-medium text-success-500">Active</span>
          </div>
          <div className="pt-6 space-y-4">
            <div>
              <p className="text-xs text-text-muted">Phone</p>
              <p className="text-sm font-medium text-text-heading mt-0.5">+977 9800000001</p>
            </div>
            <div>
              <p className="text-xs text-text-muted">Email</p>
              <p className="text-sm font-medium text-text-heading mt-0.5">sita.rai@example.com</p>
            </div>
            <div>
              <p className="text-xs text-text-muted">DOB</p>
              <p className="text-sm font-medium text-text-heading mt-0.5">1990-05-15</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 border border-border-default rounded-xl bg-white p-6 shadow-sm">
          <Tabs tabs={[
            {
              id: 'overview',
              label: 'Overview',
              content: (
                <div className="space-y-6">
                  <h4 className="text-base font-semibold text-text-heading">Recent Appointments</h4>
                  <div className="rounded-lg border border-border-default p-4 text-center">
                    <p className="text-sm text-text-muted">No recent appointments found for this patient.</p>
                  </div>
                </div>
              )
            },
            {
              id: 'clinical',
              label: 'Clinical History',
              content: (
                <div className="space-y-6">
                  <h4 className="text-base font-semibold text-text-heading">Treatment Plans</h4>
                  <div className="rounded-lg border border-border-default p-4 text-center">
                    <p className="text-sm text-text-muted">No active treatment plans.</p>
                  </div>
                </div>
              )
            },
            {
              id: 'billing',
              label: 'Billing',
              content: (
                <div className="space-y-6">
                  <h4 className="text-base font-semibold text-text-heading">Outstanding Balance</h4>
                  <p className="text-3xl font-bold text-text-heading">$0.00</p>
                </div>
              )
            }
          ]} />
        </div>
      </div>
    </div>
  );
}
