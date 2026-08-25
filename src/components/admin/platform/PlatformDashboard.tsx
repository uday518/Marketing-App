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
  date: string;
};

interface PlatformDashboardTableProps {
  data: DemoRequest[];
}

export default function PlatformDashboardTable({
  data,
}: PlatformDashboardTableProps) {
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
      key: "date",
      label: "Date",
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      emptyMessage="No demo requests"
    />
  );
}