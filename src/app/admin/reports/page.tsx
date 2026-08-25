"use client";

import React from 'react';
import PageHeader from '@/components/admin/shared/PageHeader';
import StatCard from '@/components/admin/dashboard/StatCard';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Reports & Analytics" 
        description="Comprehensive insights into practice performance."
      />

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-border-default shadow-sm mb-6">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <span className="text-sm font-medium text-text-heading shrink-0">Date Range:</span>
          <select className="flex-1 rounded-md border border-border-default px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-brand-primary">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
            <option>Custom Range...</option>
          </select>
        </div>
        <button className="w-full sm:w-auto text-sm rounded-md border border-border-default bg-white px-4 py-2 font-medium text-text-heading hover:bg-neutral-50 shadow-sm transition-colors">
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Patients" value="1,248" trend={{ value: '45 new', isPositive: true }} />
        <StatCard label="Appointments completed" value="384" trend={{ value: '12%', isPositive: true }} />
        <StatCard label="Total Revenue" value="$45,200" trend={{ value: '8%', isPositive: true }} />
        <StatCard label="Cancellation Rate" value="4.2%" trend={{ value: '0.5%', isPositive: false }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="rounded-xl border border-border-default bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-text-heading mb-4">Revenue Trend</h3>
          <div className="flex h-64 items-center justify-center border-2 border-dashed border-border-default rounded-lg bg-bg-page/50">
            <p className="text-sm text-text-muted">Revenue Chart Placeholder</p>
          </div>
        </div>
        
        <div className="rounded-xl border border-border-default bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-text-heading mb-4">Appointments By Treatment</h3>
          <div className="flex h-64 items-center justify-center border-2 border-dashed border-border-default rounded-lg bg-bg-page/50">
            <p className="text-sm text-text-muted">Treatment Distribution Pie Chart Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}
