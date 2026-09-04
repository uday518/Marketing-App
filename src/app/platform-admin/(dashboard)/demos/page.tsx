"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/admin/shared/PageHeader";
import DataTable, { Column } from "@/components/admin/shared/DataTable";
import StatusBadge from "@/components/admin/shared/StatusBadge";

interface DemoRequest {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  clinicSize: string;

  preferredDate: string;
  preferredTime: string;

  status:
    | "Requested"
    | "Confirmed"
    | "Completed"
    | "Cancelled"
    | "No Show";

  notes?: string;

  createdAt: string;
  updatedAt: string;
}

type DemoStatus = DemoRequest["status"];

export default function DemoRequestsPage() {
  const [demos, setDemos] = useState<DemoRequest[]>([]);
  const [filter, setFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Selected demo for details modal
  const [selectedDemo, setSelectedDemo] =
    useState<DemoRequest | null>(null);

  // --------------------------------------------------
  // Fetch demo requests
  // --------------------------------------------------

  const fetchDemos = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/platform-admin/demos",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch demo requests"
        );
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(
          data.message ||
            "Failed to fetch demo requests"
        );
      }

      setDemos(data.data || []);
    } catch (error) {
      console.error(
        "Failed to fetch demo requests:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load demo requests. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemos();
  }, []);

  // --------------------------------------------------
  // Update demo status
  // --------------------------------------------------

  const updateDemoStatus = async (
    id: string,
    status: DemoStatus
  ) => {
    try {
      setUpdatingId(id);
      setError("");

      const response = await fetch(
        `/api/platform-admin/demos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to update demo status"
        );
      }

      // Update table data
      setDemos((currentDemos) =>
        currentDemos.map((demo) =>
          demo._id === id
            ? {
                ...demo,
                status: data.data.status,
                updatedAt:
                  data.data.updatedAt ??
                  demo.updatedAt,
              }
            : demo
        )
      );

      // Update modal data if this demo is currently open
      setSelectedDemo((currentDemo) =>
        currentDemo &&
        currentDemo._id === id
          ? {
              ...currentDemo,
              status: data.data.status,
              updatedAt:
                data.data.updatedAt ??
                currentDemo.updatedAt,
            }
          : currentDemo
      );
    } catch (error) {
      console.error(
        "Failed to update demo status:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update demo status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // --------------------------------------------------
  // Status counts
  // --------------------------------------------------

  const statusCounts = {
    all: demos.length,

    Requested: demos.filter(
      (demo) => demo.status === "Requested"
    ).length,

    Confirmed: demos.filter(
      (demo) => demo.status === "Confirmed"
    ).length,

    Completed: demos.filter(
      (demo) => demo.status === "Completed"
    ).length,

    Cancelled: demos.filter(
      (demo) => demo.status === "Cancelled"
    ).length,

    "No Show": demos.filter(
      (demo) => demo.status === "No Show"
    ).length,
  };

  // --------------------------------------------------
  // Filters
  // --------------------------------------------------

  const filters = [
    "all",
    "Requested",
    "Confirmed",
    "Completed",
    "Cancelled",
    "No Show",
  ];

  const filteredData =
    filter === "all"
      ? demos
      : demos.filter(
          (demo) => demo.status === filter
        );

  // --------------------------------------------------
  // Table columns
  // --------------------------------------------------

  const columns: Column<DemoRequest>[] = [
    {
      key: "company",
      label: "Clinic",
    },

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

    {
      key: "actions",
      label: "Actions",
      render: (item) => {
        if (updatingId === item._id) {
          return (
            <span className="text-xs text-text-muted">
              Updating...
            </span>
          );
        }

        // Requested → Confirm
        if (item.status === "Requested") {
          return (
            <button
              onClick={(event) => {
                event.stopPropagation();

                updateDemoStatus(
                  item._id,
                  "Confirmed"
                );
              }}
              className="rounded-md bg-brand-primary px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
            >
              Confirm
            </button>
          );
        }

        // Confirmed → Complete / Cancel / No Show
        if (item.status === "Confirmed") {
          return (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={(event) => {
                  event.stopPropagation();

                  updateDemoStatus(
                    item._id,
                    "Completed"
                  );
                }}
                className="rounded-md bg-success-500 px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
              >
                Complete
              </button>

              <button
                onClick={(event) => {
                  event.stopPropagation();

                  updateDemoStatus(
                    item._id,
                    "Cancelled"
                  );
                }}
                className="rounded-md bg-error-500 px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
              >
                Cancel
              </button>

              <button
                onClick={(event) => {
                  event.stopPropagation();

                  updateDemoStatus(
                    item._id,
                    "No Show"
                  );
                }}
                className="rounded-md border border-border-default bg-white px-3 py-1.5 text-xs font-medium text-text-body hover:bg-neutral-50"
              >
                No Show
              </button>
            </div>
          );
        }

        // Completed / Cancelled / No Show
        return (
          <span className="text-xs text-text-muted">
            —
          </span>
        );
      },
    },
  ];

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <PageHeader
          title="Demo Requests"
          description="Manage demo requests from potential clinics"
        />

        {/* Status Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map((status) => (
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

              {status !== "all" &&
                ` (${
                  statusCounts[
                    status as keyof typeof statusCounts
                  ]
                })`}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="py-10 text-center text-text-body">
            Loading demo requests...
          </div>
        )}

        {/* Table */}
        {!loading && (
          <DataTable
            columns={columns}
            data={filteredData}
            emptyMessage="No demo requests found"
            onRowClick={(demo) => {
              setSelectedDemo(demo);
            }}
          />
        )}
      </div>

      {/* ==================================================
          Demo Details Modal
          ================================================== */}

      {selectedDemo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedDemo(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl bg-white shadow-xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border-default px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-text-heading">
                  Demo Request Details
                </h2>

                <p className="mt-1 text-sm text-text-muted">
                  Full information about this demo
                  request
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedDemo(null)
                }
                className="flex h-8 w-8 items-center justify-center rounded-full text-xl text-text-muted hover:bg-neutral-100 hover:text-text-heading"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
              <div className="space-y-6">
                {/* Status */}
                <div className="rounded-lg border border-border-default bg-neutral-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                    Demo Status
                  </p>

                  <div className="mt-2">
                    <StatusBadge
                      status={selectedDemo.status}
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="mb-3 text-sm font-bold text-text-heading">
                    Contact Information
                  </h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <DetailItem
                      label="Full Name"
                      value={selectedDemo.name}
                    />

                    <DetailItem
                      label="Email"
                      value={selectedDemo.email}
                    />

                    <DetailItem
                      label="Phone"
                      value={selectedDemo.phone}
                    />
                  </div>
                </div>

                {/* Clinic Information */}
                <div>
                  <h3 className="mb-3 text-sm font-bold text-text-heading">
                    Clinic Information
                  </h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <DetailItem
                      label="Clinic Name"
                      value={selectedDemo.company}
                    />

                    <DetailItem
                      label="Clinic Size"
                      value={
                        selectedDemo.clinicSize
                      }
                    />
                  </div>
                </div>

                {/* Demo Schedule */}
                <div>
                  <h3 className="mb-3 text-sm font-bold text-text-heading">
                    Demo Schedule
                  </h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <DetailItem
                      label="Preferred Date"
                      value={
                        selectedDemo.preferredDate
                          ? new Date(
                              selectedDemo.preferredDate
                            ).toLocaleDateString()
                          : "-"
                      }
                    />

                    <DetailItem
                      label="Preferred Time"
                      value={
                        selectedDemo.preferredTime ||
                        "-"
                      }
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h3 className="mb-3 text-sm font-bold text-text-heading">
                    Notes
                  </h3>

                  <div className="rounded-lg border border-border-default bg-neutral-50 p-4">
                    <p className="whitespace-pre-wrap text-sm text-text-body">
                      {selectedDemo.notes ||
                        "No notes provided."}
                    </p>
                  </div>
                </div>

                {/* Request Information */}
                <div>
                  <h3 className="mb-3 text-sm font-bold text-text-heading">
                    Request Information
                  </h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <DetailItem
                      label="Requested On"
                      value={
                        selectedDemo.createdAt
                          ? new Date(
                              selectedDemo.createdAt
                            ).toLocaleString()
                          : "-"
                      }
                    />

                    <DetailItem
                      label="Last Updated"
                      value={
                        selectedDemo.updatedAt
                          ? new Date(
                              selectedDemo.updatedAt
                            ).toLocaleString()
                          : "-"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap justify-end gap-2 border-t border-border-default px-6 py-4">
              {/* Requested */}
              {selectedDemo.status ===
                "Requested" && (
                <button
                  disabled={
                    updatingId === selectedDemo._id
                  }
                  onClick={() =>
                    updateDemoStatus(
                      selectedDemo._id,
                      "Confirmed"
                    )
                  }
                  className="rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {updatingId === selectedDemo._id
                    ? "Updating..."
                    : "Confirm Demo"}
                </button>
              )}

              {/* Confirmed */}
              {selectedDemo.status ===
                "Confirmed" && (
                <>
                  <button
                    disabled={
                      updatingId ===
                      selectedDemo._id
                    }
                    onClick={() =>
                      updateDemoStatus(
                        selectedDemo._id,
                        "Completed"
                      )
                    }
                    className="rounded-md bg-success-500 px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {updatingId ===
                    selectedDemo._id
                      ? "Updating..."
                      : "Complete"}
                  </button>

                  <button
                    disabled={
                      updatingId ===
                      selectedDemo._id
                    }
                    onClick={() =>
                      updateDemoStatus(
                        selectedDemo._id,
                        "Cancelled"
                      )
                    }
                    className="rounded-md bg-error-500 px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    disabled={
                      updatingId ===
                      selectedDemo._id
                    }
                    onClick={() =>
                      updateDemoStatus(
                        selectedDemo._id,
                        "No Show"
                      )
                    }
                    className="rounded-md border border-border-default bg-white px-4 py-2 text-sm font-medium text-text-body hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    No Show
                  </button>
                </>
              )}

              {/* Close */}
              <button
                onClick={() =>
                  setSelectedDemo(null)
                }
                className="rounded-md border border-border-default bg-white px-4 py-2 text-sm font-medium text-text-body hover:bg-neutral-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Reusable detail field
 */
function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border-default bg-white p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-medium text-text-heading">
        {value || "-"}
      </p>
    </div>
  );
}