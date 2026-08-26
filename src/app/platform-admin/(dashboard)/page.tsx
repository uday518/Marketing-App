"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import StatCard from "@/components/admin/dashboard/StatCard";
import PageHeader from "@/components/admin/shared/PageHeader";
import PlatformDashboard from "@/components/admin/platform/PlatformDashboard";

interface DemoRequest {
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
  demoStatus:
    | "Requested"
    | "Confirmed"
    | "Completed"
    | "Cancelled"
    | "No Show";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  type: string;
  createdAt: string;
}

/* ----------------------------------------
   STATIC STATS
---------------------------------------- */

const MOCK_STATS = [
  {
    label: "Total Clinics",
    value: "247",
    trend: { value: "12%", isPositive: true },
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 21h18" />
        <path d="M5 21V7l8-4 8 4v14" />
        <path d="M8 9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12H8V9z" />
      </svg>
    ),
  },

  {
    label: "Active Clinics",
    value: "198",
    trend: { value: "8%", isPositive: true },
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },

  {
    label: "Trial Clinics",
    value: "49",
    trend: { value: "5%", isPositive: false },
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },

  // Demo Requests will be replaced dynamically below
  {
    label: "Demo Requests",
    value: "0",
    trend: { value: "—", isPositive: true },
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 10l5 5-5 5" />
        <path d="M4 4v7a4 4 0 0 0 4 4h12" />
      </svg>
    ),
  },

  {
    label: "New Leads",
    value: "67",
    trend: { value: "24%", isPositive: true },
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="20" y1="8" x2="20" y2="14" />
        <line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    ),
  },

  {
    label: "Monthly Revenue",
    value: "$89,420",
    trend: { value: "15%", isPositive: true },
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },

  {
    label: "Pending Payments",
    value: "12",
    trend: { value: "3", isPositive: false },
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },

  {
    label: "Churn Rate",
    value: "2.4%",
    trend: { value: "0.5%", isPositive: true },
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
];

/* ----------------------------------------
   DASHBOARD
---------------------------------------- */

export default function PlatformAdminDashboardPage() {
  const [demos, setDemos] = useState<DemoRequest[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);

  const [loadingDemos, setLoadingDemos] = useState(true);
  const [loadingLeads, setLoadingLeads] = useState(true);

  const [demoError, setDemoError] = useState("");
  const [leadError, setLeadError] = useState("");

  /* ----------------------------------------
     FETCH REAL DEMOS
  ---------------------------------------- */

  useEffect(() => {
    const fetchDemos = async () => {
      try {
        setLoadingDemos(true);
        setDemoError("");

        const response = await fetch("/api/demos");

        if (!response.ok) {
          throw new Error("Failed to fetch demo requests");
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(
            data.message || "Failed to fetch demo requests"
          );
        }

        setDemos(data.demos || []);
      } catch (error) {
        console.error(
          "Failed to fetch demo requests:",
          error
        );

        setDemoError("Failed to load demo requests.");
      } finally {
        setLoadingDemos(false);
      }
    };

    fetchDemos();
  }, []);

  /* ----------------------------------------
     FETCH REAL LEADS
  ---------------------------------------- */

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoadingLeads(true);
        setLeadError("");

        const response = await fetch("/api/contact");

        if (!response.ok) {
          throw new Error("Failed to fetch contacts");
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(
            data.message || "Failed to fetch contacts"
          );
        }

        const contactLeads = (data.contacts || []).filter(
          (contact: Lead) => contact.type === "Lead"
        );

        setLeads(contactLeads);
      } catch (error) {
        console.error(
          "Failed to fetch leads:",
          error
        );

        setLeadError("Failed to load leads.");
      } finally {
        setLoadingLeads(false);
      }
    };

    fetchLeads();
  }, []);

  /* ----------------------------------------
     REAL DEMO REQUEST COUNT
  ---------------------------------------- */

 const demoRequestsCount = demos.filter(
  (demo) => demo.demoStatus === "Requested"
).length;

  /* ----------------------------------------
     DATE
  ---------------------------------------- */

  const dateString = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
    }
  );

  /* ----------------------------------------
     RECENT DEMOS
  ---------------------------------------- */

  const recentDemos = demos.slice(0, 5).map((demo) => ({
    _id: demo._id,
    name: demo.name,
    email: demo.email,
    phone: demo.phone,
    company: demo.company,
    status: demo.demoStatus,
    date: demo.preferredDate,
  }));

  /* ----------------------------------------
     RECENT LEADS
  ---------------------------------------- */

  const recentLeads = leads.slice(0, 5).map((lead) => ({
    _id: lead._id,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    company: lead.company,
    status: lead.status,
    date: lead.createdAt,
  }));

  return (
    <div className="space-y-6">

      {/* ----------------------------------------
          WELCOME
      ---------------------------------------- */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-bold text-text-heading">
            Platform Dashboard 👋
          </h2>

          <p className="mt-1 text-sm text-text-muted">
            {dateString} · Welcome to Platform Admin
          </p>
        </div>

        <div className="flex gap-2">
          <button className="rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-primary-hover">
            View Reports
          </button>
        </div>
      </div>

      {/* ----------------------------------------
          STATISTICS
      ---------------------------------------- */}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

        {MOCK_STATS.map((stat) => {

          /*
           * Replace the mock Demo Requests value
           * with the real database count.
           */

          const currentStat =
            stat.label === "Demo Requests"
              ? {
                  ...stat,
                  value: String(demoRequestsCount),
                }
              : stat;

          const card = (
            <StatCard
              key={stat.label}
              label={currentStat.label}
              value={currentStat.value}
              trend={currentStat.trend}
              icon={currentStat.icon}
            />
          );

          /*
           * Demo Requests card is clickable.
           */

          if (stat.label === "Demo Requests") {
            return (
              <Link
                key={stat.label}
                href="/platform-admin/demos"
                className="block transition-transform hover:-translate-y-0.5"
              >
                {card}
              </Link>
            );
          }

          return card;
        })}

      </div>

      {/* ----------------------------------------
          REVENUE
      ---------------------------------------- */}

      <div className="rounded-xl border border-border-default bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-text-heading">
          Revenue Overview
        </h3>

        <div className="flex h-64 items-center justify-center rounded-lg border border-border-dashed bg-bg-page/50">
          <div className="text-center">

            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto mb-2 text-text-muted"
            >
              <line x1="12" y1="20" x2="12" y2="10" />
              <line x1="18" y1="20" x2="18" y2="4" />
              <line x1="6" y1="20" x2="6" y2="16" />
            </svg>

            <p className="text-sm text-text-muted">
              Revenue chart will be displayed here
            </p>

          </div>
        </div>
      </div>

      {/* ----------------------------------------
          RECENT DEMOS + LEADS
      ---------------------------------------- */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* ----------------------------------------
            RECENT DEMOS
        ---------------------------------------- */}

        <div>
          <PageHeader
            title="Recent Demo Requests"
            description="Latest demo requests from potential clinics"
            action={{
              label: "View All",
              href: "/platform-admin/demos",
            }}
          />

          {loadingDemos && (
            <div className="rounded-xl border border-border-default bg-white p-6">
              <div className="py-10 text-center text-sm text-text-muted">
                Loading demo requests...
              </div>
            </div>
          )}

          {!loadingDemos && demoError && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
              {demoError}
            </div>
          )}

          {!loadingDemos && !demoError && (
            <PlatformDashboard
              data={recentDemos}
              type="demo"
              emptyMessage="No demo requests found"
            />
          )}
        </div>

        {/* ----------------------------------------
            RECENT LEADS
        ---------------------------------------- */}

        <div>
          <PageHeader
            title="Recent Leads"
            description="Latest sales leads and prospects"
            action={{
              label: "View All",
              href: "/platform-admin/contacts",
            }}
          />

          {loadingLeads && (
            <div className="rounded-xl border border-border-default bg-white p-6">
              <div className="py-10 text-center text-sm text-text-muted">
                Loading leads...
              </div>
            </div>
          )}

          {!loadingLeads && leadError && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
              {leadError}
            </div>
          )}

          {!loadingLeads && !leadError && (
            <PlatformDashboard
              data={recentLeads}
              type="lead"
              emptyMessage="No leads found"
            />
          )}
        </div>

      </div>
    </div>
  );
}