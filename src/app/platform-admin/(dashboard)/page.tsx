"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Building2,
  CircleCheck,
  Clock3,
  ArrowRight,
  UserPlus,
  DollarSign,
  CreditCard,
  ChartNoAxesCombined,
} from "lucide-react";
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
  preferredDate: string;
  preferredTime: string;
  status: "Requested" | "Confirmed" | "Completed" | "Cancelled" | "No Show";
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

/* ----------------------------------------
   STATIC STATS
---------------------------------------- */

const MOCK_STATS = [
  {
    label: "Total Clinics",
    value: "247",
    trend: { value: "12%", isPositive: true },
    icon: <Building2 size={20} />,
  },

  {
    label: "Active Clinics",
    value: "198",
    trend: { value: "8%", isPositive: true },
    icon: <CircleCheck size={20} />,
  },

  {
    label: "Trial Clinics",
    value: "49",
    trend: { value: "5%", isPositive: false },
    icon: <Clock3 size={20} />,
  },

  {
    label: "Demo Requests",
    value: "0",
    trend: { value: "—", isPositive: true },
    icon: <ArrowRight size={20} />,
  },

  {
    label: "New Leads",
    value: "67",
    icon: <UserPlus size={20} />,
  },

  {
    label: "Monthly Revenue",
    value: "$89,420",
    trend: { value: "15%", isPositive: true },
    icon: <DollarSign size={20} />,
  },

  {
    label: "Pending Payments",
    value: "12",
    trend: { value: "3", isPositive: false },
    icon: <CreditCard size={20} />,
  },

  {
    label: "Churn Rate",
    value: "2.4%",
    trend: { value: "0.5%", isPositive: true },
    icon: <ChartNoAxesCombined size={20} />,
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

        const response = await fetch("/api/platform-admin/demos");

        if (!response.ok) {
          throw new Error("Failed to fetch demo requests");
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch demo requests");
        }

        setDemos(data.data || []);
      } catch (error) {
        console.error("Failed to fetch demo requests:", error);

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

        const response = await fetch("/api/platform-admin/leads");

        if (!response.ok) {
          throw new Error("Failed to fetch leads");
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch leads");
        }

        setLeads(data.data || []);
      } catch (error) {
        console.error("Failed to fetch leads:", error);

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
    (demo) => demo.status === "Requested",
  ).length;
  const newLeadsCount = leads.filter((lead) => lead.status === "New").length;

  /* ----------------------------------------
     DATE
  ---------------------------------------- */

  const dateString = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  /* ----------------------------------------
     RECENT DEMOS
  ---------------------------------------- */

  const recentDemos = demos.slice(0, 5).map((demo) => ({
    _id: demo._id,
    name: demo.name,
    email: demo.email,
    phone: demo.phone,
    company: demo.company,
    status: demo.status,
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
              : stat.label === "New Leads"
                ? {
                    ...stat,
                    value: String(newLeadsCount),
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

          if (stat.label === "New Leads") {
            return (
              <Link
                key={stat.label}
                href="/platform-admin/leads"
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
              href: "/platform-admin/leads",
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
