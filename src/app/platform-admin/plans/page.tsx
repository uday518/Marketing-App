"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/shared/PageHeader";
import DataTable, { Column } from "@/components/admin/shared/DataTable";
import StatusBadge from "@/components/admin/shared/StatusBadge";

interface Plan {
  id: string;
  name: string;
  price: string;
  billingCycle: string;
  features: string[];
  clinicsCount: number;
  status: string;
}

const MOCK_PLANS: Plan[] = [
  { 
    id: '1', 
    name: 'Starter', 
    price: '$99', 
    billingCycle: 'Monthly', 
    features: ['Up to 2 providers', '100 patients', 'Basic scheduling', 'Email support'], 
    clinicsCount: 45, 
    status: 'Active' 
  },
  { 
    id: '2', 
    name: 'Professional', 
    price: '$199', 
    billingCycle: 'Monthly', 
    features: ['Up to 10 providers', 'Unlimited patients', 'Advanced scheduling', 'Priority support', 'Reports & analytics'], 
    clinicsCount: 156, 
    status: 'Active' 
  },
  { 
    id: '3', 
    name: 'Enterprise', 
    price: '$2,399', 
    billingCycle: 'Annual', 
    features: ['Unlimited providers', 'Unlimited patients', 'Multi-location support', '24/7 phone support', 'Custom integrations', 'Dedicated account manager'], 
    clinicsCount: 46, 
    status: 'Active' 
  },
  { 
    id: '4', 
    name: 'Trial', 
    price: '$0', 
    billingCycle: '14 days', 
    features: ['Full access to Professional features', 'Up to 5 providers', 'Limited to 50 patients'], 
    clinicsCount: 0, 
    status: 'Active' 
  },
];

const columns: Column<Plan>[] = [
  { key: 'name', label: 'Plan Name' },
  { key: 'price', label: 'Price' },
  { key: 'billingCycle', label: 'Billing Cycle' },
  { key: 'clinicsCount', label: 'Active Clinics' },
  { 
    key: 'status', 
    label: 'Status',
    render: (item) => <StatusBadge status={item.status} />
  },
];

export default function PlansPage() {
  const [filter, setFilter] = useState('all');

  const filteredData = filter === 'all' 
    ? MOCK_PLANS 
    : MOCK_PLANS.filter(item => item.status === filter);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Plans & Pricing" 
        description="Manage subscription plans and pricing"
        action={{ label: 'Add Plan', href: '#' }}
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
          </button>
        ))}
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredData.map((plan) => (
          <div key={plan.id} className="rounded-xl border border-border-default bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-text-heading">{plan.name}</h3>
              <p className="text-3xl font-bold text-brand-primary mt-2">{plan.price}<span className="text-sm font-normal text-text-muted">/{plan.billingCycle}</span></p>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-text-muted">{plan.clinicsCount} active clinics</p>
            </div>

            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-text-body">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success-500 shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between">
              <StatusBadge status={plan.status} />
              <button className="text-sm text-brand-primary hover:text-brand-primary-hover font-medium">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Data Table */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-text-heading mb-4">All Plans</h3>
        <DataTable 
          columns={columns} 
          data={filteredData}
          emptyMessage="No plans found"
        />
      </div>
    </div>
  );
}
