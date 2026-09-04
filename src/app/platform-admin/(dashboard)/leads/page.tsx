"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/admin/shared/PageHeader";
import DataTable, {
  Column,
} from "@/components/admin/shared/DataTable";
import StatusBadge from "@/components/admin/shared/StatusBadge";

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  clinicSize: string;
  source: string;
  status:
    | "New"
    | "Contacted"
    | "Qualified"
    | "Demo Scheduled"
    | "Demo Completed"
    | "Proposal"
    | "Converted"
    | "Lost";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

const columns: Column<Lead>[] = [
  {
    key: "company",
    label: "Company",
  },
  {
    key: "name",
    label: "Contact",
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
    key: "source",
    label: "Source",
  },
  {
    key: "createdAt",
    label: "Created",
    render: (item) =>
      new Date(item.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
  },
  {
    key: "status",
    label: "Status",
    render: (item) => (
      <StatusBadge status={item.status} />
    ),
  },
];

const STATUSES = [
  "all",
  "New",
  "Contacted",
  "Qualified",
  "Demo Scheduled",
  "Demo Completed",
  "Proposal",
  "Converted",
  "Lost",
] as const;

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] =
    useState<(typeof STATUSES)[number]>("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ----------------------------------------
     FETCH LEADS
  ---------------------------------------- */

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/platform-admin/leads"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch leads");
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(
            data.message || "Failed to fetch leads"
          );
        }

        setLeads(data.data || []);
      } catch (error) {
        console.error("Failed to fetch leads:", error);

        setError("Failed to load leads.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  /* ----------------------------------------
     FILTER
  ---------------------------------------- */

  const filteredData =
    filter === "all"
      ? leads
      : leads.filter(
          (lead) => lead.status === filter
        );

  /* ----------------------------------------
     STATUS COUNTS
  ---------------------------------------- */

  const statusCounts = {
    all: leads.length,

    New: leads.filter(
      (lead) => lead.status === "New"
    ).length,

    Contacted: leads.filter(
      (lead) => lead.status === "Contacted"
    ).length,

    Qualified: leads.filter(
      (lead) => lead.status === "Qualified"
    ).length,

    "Demo Scheduled": leads.filter(
      (lead) => lead.status === "Demo Scheduled"
    ).length,

    "Demo Completed": leads.filter(
      (lead) => lead.status === "Demo Completed"
    ).length,

    Proposal: leads.filter(
      (lead) => lead.status === "Proposal"
    ).length,

    Converted: leads.filter(
      (lead) => lead.status === "Converted"
    ).length,

    Lost: leads.filter(
      (lead) => lead.status === "Lost"
    ).length,
  };

  return (
    <div className="space-y-6">

      {/* ----------------------------------------
          HEADER
      ---------------------------------------- */}

      <PageHeader
        title="Leads"
        description="Manage sales leads and prospects"
        action={{
          label: "Add Lead",
          href: "#",
        }}
      />

      {/* ----------------------------------------
          STATUS FILTERS
      ---------------------------------------- */}

      <div className="flex flex-wrap gap-2">
        {STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              filter === status
                ? "bg-brand-primary text-white shadow-sm"
                : "border border-border-default bg-white text-text-body hover:bg-neutral-50"
            }`}
          >
            {status === "all"
              ? "All"
              : status}

            {" ("}
            {
              statusCounts[
                status as keyof typeof statusCounts
              ]
            }
            {")"}
          </button>
        ))}
      </div>

      {/* ----------------------------------------
          LOADING
      ---------------------------------------- */}

      {loading && (
        <div className="rounded-xl border border-border-default bg-white p-6">
          <div className="py-10 text-center text-sm text-text-muted">
            Loading leads...
          </div>
        </div>
      )}

      {/* ----------------------------------------
          ERROR
      ---------------------------------------- */}

      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* ----------------------------------------
          TABLE
      ---------------------------------------- */}

      {!loading && !error && (
        <DataTable
          columns={columns}
          data={filteredData}
          emptyMessage="No leads found"
        />
      )}
    </div>
  );
}