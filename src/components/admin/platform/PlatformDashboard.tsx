"use client";

import DataTable, {
  type Column,
} from "@/components/admin/shared/DataTable";

type DemoRequest = {
  id: string;
  clinicName: string;
  email: string;
  phone: string;
  status: string;
  requestedDate: string;
};

type Lead = {
  id: string;
  company: string;
  contactName: string;
  email: string;
  source: string;
  status: string;
  createdAt: string;
};

interface PlatformDashboardTableProps {
  data: DemoRequest[] | Lead[];
}

export default function PlatformDashboardTable({
  data,
}: PlatformDashboardTableProps) {
  const isLeadTable = data.length > 0 && "company" in data[0];

  if (isLeadTable) {
    const columns: Column<Lead>[] = [
      { key: "company", label: "Company" },
      { key: "contactName", label: "Contact" },
      { key: "email", label: "Email" },
      { key: "source", label: "Source" },
      { key: "createdAt", label: "Created" },
      { key: "status", label: "Status" },
    ];

    return (
      <DataTable
        columns={columns}
        data={data as Lead[]}
        emptyMessage="No leads"
      />
    );
  }

  const columns: Column<DemoRequest>[] = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "clinicName",
      label: "Clinic",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "phone",
      label: "Phone",
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "requestedDate",
      label: "Date",
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data as DemoRequest[]}
      emptyMessage="No demo requests"
    />
  );
}
