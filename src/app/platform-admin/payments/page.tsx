"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/shared/PageHeader";
import DataTable, { Column } from "@/components/admin/shared/DataTable";
import StatusBadge from "@/components/admin/shared/StatusBadge";

interface Payment {
  id: string;
  clinicName: string;
  invoiceId: string;
  amount: string;
  method: string;
  status: string;
  dueDate: string;
  paidDate?: string;
}

const MOCK_PAYMENTS: Payment[] = [
  { id: '1', clinicName: 'Sunshine Dental Clinic', invoiceId: 'INV-2024-001', amount: '$199', method: 'Credit Card', status: 'Paid', dueDate: '2024-01-15', paidDate: '2024-01-14' },
  { id: '2', clinicName: 'Metro Dental Care', invoiceId: 'INV-2024-002', amount: '$2,399', method: 'Bank Transfer', status: 'Paid', dueDate: '2024-01-20', paidDate: '2024-01-18' },
  { id: '3', clinicName: 'Family Smiles LLC', invoiceId: 'INV-2024-003', amount: '$199', method: 'Credit Card', status: 'Paid', dueDate: '2024-01-10', paidDate: '2024-01-09' },
  { id: '4', clinicName: 'City Smiles Clinic', invoiceId: 'INV-2024-004', amount: '$199', method: 'Credit Card', status: 'Pending', dueDate: '2024-01-30', paidDate: '' },
  { id: '5', clinicName: 'Bright Smile Dental', invoiceId: 'INV-2024-005', amount: '$199', method: 'Credit Card', status: 'Paid', dueDate: '2024-01-22', paidDate: '2024-01-21' },
  { id: '6', clinicName: 'Harbor Dental Associates', invoiceId: 'INV-2024-006', amount: '$2,399', method: 'Bank Transfer', status: 'Paid', dueDate: '2024-01-18', paidDate: '2024-01-17' },
  { id: '7', clinicName: 'Valley Dental Center', invoiceId: 'INV-2024-007', amount: '$0', method: 'Trial', status: 'Pending', dueDate: '2024-02-08', paidDate: '' },
  { id: '8', clinicName: 'Dental Excellence Group', invoiceId: 'INV-2024-008', amount: '$0', method: 'Trial', status: 'Pending', dueDate: '2024-02-05', paidDate: '' },
  { id: '9', clinicName: 'Gentle Dental Group', invoiceId: 'INV-2024-009', amount: '$199', method: 'Credit Card', status: 'Overdue', dueDate: '2024-01-05', paidDate: '' },
  { id: '10', clinicName: 'Modern Dental Associates', invoiceId: 'INV-2024-010', amount: '$2,399', method: 'Bank Transfer', status: 'Paid', dueDate: '2024-01-25', paidDate: '2024-01-24' },
];

const columns: Column<Payment>[] = [
  { key: 'invoiceId', label: 'Invoice' },
  { key: 'clinicName', label: 'Clinic' },
  { key: 'amount', label: 'Amount' },
  { key: 'method', label: 'Method' },
  { key: 'dueDate', label: 'Due Date' },
  { 
    key: 'status', 
    label: 'Status',
    render: (item) => <StatusBadge status={item.status} />
  },
];

export default function PaymentsPage() {
  const [filter, setFilter] = useState('all');

  const filteredData = filter === 'all' 
    ? MOCK_PAYMENTS 
    : MOCK_PAYMENTS.filter(item => item.status === filter);

  const statusCounts = {
    all: MOCK_PAYMENTS.length,
    Paid: MOCK_PAYMENTS.filter(i => i.status === 'Paid').length,
    Pending: MOCK_PAYMENTS.filter(i => i.status === 'Pending').length,
    Overdue: MOCK_PAYMENTS.filter(i => i.status === 'Overdue').length,
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Payments" 
        description="Track all payments and invoices"
      />

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'Paid', 'Pending', 'Overdue'].map((status) => (
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
        emptyMessage="No payments found"
      />
    </div>
  );
}
