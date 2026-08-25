"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/shared/PageHeader";
import DataTable, { Column } from "@/components/admin/shared/DataTable";
import StatusBadge from "@/components/admin/shared/StatusBadge";

interface Subscription {
  id: string;
  clinicName: string;
  plan: string;
  billingCycle: string;
  amount: string;
  status: string;
  startDate: string;
  nextBilling: string;
  autoRenew: boolean;
}

const MOCK_SUBSCRIPTIONS: Subscription[] = [
  { id: '1', clinicName: 'Sunshine Dental Clinic', plan: 'Professional', billingCycle: 'Monthly', amount: '$199', status: 'Active', startDate: '2023-06-15', nextBilling: '2024-02-15', autoRenew: true },
  { id: '2', clinicName: 'Metro Dental Care', plan: 'Enterprise', billingCycle: 'Annual', amount: '$2,399', status: 'Active', startDate: '2023-05-20', nextBilling: '2024-05-20', autoRenew: true },
  { id: '3', clinicName: 'Family Smiles LLC', plan: 'Professional', billingCycle: 'Monthly', amount: '$199', status: 'Active', startDate: '2023-07-10', nextBilling: '2024-02-10', autoRenew: true },
  { id: '4', clinicName: 'Dental Excellence Group', plan: 'Trial', billingCycle: 'Trial', amount: '$0', status: 'Trial', startDate: '2024-01-05', nextBilling: '2024-02-05', autoRenew: false },
  { id: '5', clinicName: 'Bright Smile Dental', plan: 'Professional', billingCycle: 'Monthly', amount: '$199', status: 'Active', startDate: '2023-08-22', nextBilling: '2024-02-22', autoRenew: true },
  { id: '6', clinicName: 'Harbor Dental Associates', plan: 'Enterprise', billingCycle: 'Annual', amount: '$2,399', status: 'Active', startDate: '2023-04-18', nextBilling: '2024-04-18', autoRenew: true },
  { id: '7', clinicName: 'Valley Dental Center', plan: 'Trial', billingCycle: 'Trial', amount: '$0', status: 'Trial', startDate: '2024-01-08', nextBilling: '2024-02-08', autoRenew: false },
  { id: '8', clinicName: 'City Smiles Clinic', plan: 'Professional', billingCycle: 'Monthly', amount: '$199', status: 'Past Due', startDate: '2023-09-30', nextBilling: '2024-01-30', autoRenew: true },
];

const columns: Column<Subscription>[] = [
  { key: 'clinicName', label: 'Clinic' },
  { key: 'plan', label: 'Plan' },
  { key: 'billingCycle', label: 'Cycle' },
  { key: 'amount', label: 'Amount' },
  { key: 'nextBilling', label: 'Next Billing' },
  { 
    key: 'autoRenew', 
    label: 'Auto-Renew',
    render: (item) => (
      <span className={item.autoRenew ? 'text-success-500' : 'text-text-muted'}>
        {item.autoRenew ? 'Yes' : 'No'}
      </span>
    )
  },
  { 
    key: 'status', 
    label: 'Status',
    render: (item) => <StatusBadge status={item.status} />
  },
];

export default function SubscriptionsPage() {
  const [filter, setFilter] = useState('all');

  const filteredData = filter === 'all' 
    ? MOCK_SUBSCRIPTIONS 
    : MOCK_SUBSCRIPTIONS.filter(item => item.status === filter);

  const statusCounts = {
    all: MOCK_SUBSCRIPTIONS.length,
    Active: MOCK_SUBSCRIPTIONS.filter(i => i.status === 'Active').length,
    Trial: MOCK_SUBSCRIPTIONS.filter(i => i.status === 'Trial').length,
    'Past Due': MOCK_SUBSCRIPTIONS.filter(i => i.status === 'Past Due').length,
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Subscriptions" 
        description="Manage all clinic subscriptions"
      />

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'Active', 'Trial', 'Past Due'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === status
                ? 'bg-brand-primary text-white shadow-sm'
                : 'bg-white border border-border-default text-text-body hover:bg-neutral-50'
            }`}
          >
            {status}
            {status !== 'all' && ` (${statusCounts[status as keyof typeof statusCounts]})`}
          </button>
        ))}
      </div>

      {/* Data Table */}
      <DataTable 
        columns={columns} 
        data={filteredData}
        emptyMessage="No subscriptions found"
      />
    </div>
  );
}
