"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/admin/shared/PageHeader";
import DataTable, { Column } from "@/components/admin/shared/DataTable";
import StatusBadge from "@/components/admin/shared/StatusBadge";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  clinicSize: string;

  type: "Clinic Owner" | "Lead";
  status: "Active" | "Inactive";

  preferredDate: string;
  preferredTime: string;

  notes?: string;

  createdAt: string;
  updatedAt: string;
}

const columns: Column<Contact>[] = [
  {
    key: "name",
    label: "Name",
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
    key: "company",
    label: "Clinic",
  },

  {
    key: "clinicSize",
    label: "Clinic Size",
  },

  {
    key: "type",
    label: "Type",
  },

  {
    key: "preferredDate",
    label: "Demo Date",
    render: (item) =>
      item.preferredDate
        ? new Date(
            item.preferredDate
          ).toLocaleDateString()
        : "-",
  },

  {
    key: "preferredTime",
    label: "Demo Time",
    render: (item) =>
      item.preferredTime || "-",
  },

  {
    key: "status",
    label: "Status",
    render: (item) => (
      <StatusBadge status={item.status} />
    ),
  },
];

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/contact");

        if (!response.ok) {
          throw new Error(
            "Failed to fetch contacts"
          );
        }

        const data = await response.json();

        if (data.success) {
          setContacts(data.contacts);
        } else {
          throw new Error(
            data.message ||
              "Failed to fetch contacts"
          );
        }
      } catch (error) {
        console.error(
          "Failed to fetch contacts:",
          error
        );

        setError(
          "Failed to load contacts. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const filteredData =
    filter === "all"
      ? contacts
      : contacts.filter(
          (contact) =>
            contact.status === filter
        );

  const statusCounts = {
    all: contacts.length,

    Active: contacts.filter(
      (contact) =>
        contact.status === "Active"
    ).length,

    Inactive: contacts.filter(
      (contact) =>
        contact.status === "Inactive"
    ).length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Contacts"
        description="Manage demo requests and contact inquiries"
      />

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        {["all", "Active", "Inactive"].map(
          (status) => (
            <button
              key={status}
              onClick={() =>
                setFilter(status)
              }
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                filter === status
                  ? "bg-brand-primary text-white shadow-sm"
                  : "border border-border-default bg-white text-text-body hover:bg-neutral-50"
              }`}
            >
              {status.charAt(0).toUpperCase() +
                status.slice(1)}

              {status !== "all" &&
                ` (${
                  statusCounts[
                    status as keyof typeof statusCounts
                  ]
                })`}
            </button>
          )
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="py-10 text-center text-text-body">
          Loading contacts...
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Contacts Table */}
      {!loading && !error && (
        <DataTable
          columns={columns}
          data={filteredData}
          emptyMessage="No contacts found"
        />
      )}
    </div>
  );
}