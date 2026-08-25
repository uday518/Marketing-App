"use client";

import React from 'react';
import PageHeader from '@/components/admin/shared/PageHeader';
import StatCard from '@/components/admin/dashboard/StatCard';
import Tabs from '@/components/admin/shared/Tabs';
import DataTable, { Column } from '@/components/admin/shared/DataTable';
import StatusBadge from '@/components/admin/shared/StatusBadge';

const MOCK_INVOICES = [
  { id: 'INV-1020', patient: 'Sita Rai', date: 'Oct 15, 2023', amount: '$120.00', status: 'Paid' },
  { id: 'INV-1021', patient: 'Ram Karki', date: 'Oct 15, 2023', amount: '$85.00', status: 'Pending' },
  { id: 'INV-1022', patient: 'Binita Shrestha', date: 'Oct 10, 2023', amount: '$450.00', status: 'Overdue' },
];

export default function BillingPage() {
  const invoiceColumns: Column<typeof MOCK_INVOICES[0]>[] = [
    { key: 'id', label: 'Invoice' },
    { key: 'patient', label: 'Patient' },
    { key: 'date', label: 'Date Issued' },
    { key: 'amount', label: 'Amount', render: (i) => <span className="font-medium text-text-heading">{i.amount}</span> },
    { key: 'status', label: 'Status', render: (i) => <StatusBadge status={i.status} /> }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Billing & Finance" 
        description="Manage invoices, payments, and clinic revenue."
        action={{ label: 'Create Invoice' }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard label="Total Revenue (MTD)" value="$12,450" trend={{ value: '14%', isPositive: true }} />
        <StatCard label="Pending Payments" value="$840" />
        <StatCard label="Outstanding Overdue" value="$450" trend={{ value: 'Needs follow-up', isPositive: false }} />
      </div>

      <div className="rounded-xl border border-border-default bg-white p-6 shadow-sm mt-6 overflow-hidden">
        <Tabs tabs={[
          {
            id: 'invoices',
            label: 'All Invoices',
            content: <DataTable columns={invoiceColumns} data={MOCK_INVOICES} />
          },
          {
            id: 'payments',
            label: 'Payment History',
            content: (
              <div className="text-center py-10">
                <p className="text-text-muted">A log of all received payments will appear here.</p>
              </div>
            )
          },
          {
            id: 'outstanding',
            label: 'Outstanding Balances',
            content: <DataTable columns={invoiceColumns} data={MOCK_INVOICES.filter(i => i.status !== 'Paid')} />
          }
        ]} />
      </div>
    </div>
  );
}
