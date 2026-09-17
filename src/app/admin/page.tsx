"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StatCard from "@/components/admin/dashboard/StatCard";
import ScheduleList, {
  ScheduleItem,
} from "@/components/admin/dashboard/ScheduleList";

interface DashboardStats {
  totalPatients: number;
  todayAppointments: number;
  waitingQueue: number;
  clinicalEncounters: number;
}

interface DashboardData {
  stats: DashboardStats;
  todaySchedule: ScheduleItem[];
  upcomingAppointments: ScheduleItem[];
}

export default function AdminDashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch("/api/admin/dashboard");

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const data = await response.json();
        setDashboard(data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const dateString = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-text-muted">Loading dashboard...</p>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="rounded-xl border border-error-100 bg-error-50 p-5">
        <p className="text-sm font-medium text-error-500">
          {error || "Failed to load dashboard."}
        </p>
      </div>
    );
  }

  const stats = [
    {
      label: "Total Patients",
      value: dashboard.stats.totalPatients.toString(),
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
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      label: "Today's Appointments",
      value: dashboard.stats.todayAppointments.toString(),
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
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      label: "Waiting Queue",
      value: dashboard.stats.waitingQueue.toString(),
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
    {
      label: "Clinical Encounters",
      value: dashboard.stats.clinicalEncounters.toString(),
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
          <path d="M3 3v18h18" />
          <path d="M7 16l4-5 3 3 5-7" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-heading">
            Good morning 👋
          </h2>

          <p className="mt-1 text-sm text-text-muted">
            {dateString} · {dashboard.stats.todayAppointments} appointments
            today
          </p>
        </div>

        <Link
          href="/appointments/new"
          className="rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary-hover shadow-sm transition-colors"
        >
          New Appointment
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Schedule */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ScheduleList
            title="Today's Schedule"
            items={dashboard.todaySchedule}
          />

          <ScheduleList
            title="Upcoming Appointments"
            items={dashboard.upcomingAppointments}
          />
        </div>

        {/* Dashboard summary */}
        <div className="rounded-xl border border-border-default bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-text-heading">
            Today at a Glance
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Total Patients</span>
              <span className="text-sm font-semibold text-text-heading">
                {dashboard.stats.totalPatients}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Appointments</span>
              <span className="text-sm font-semibold text-text-heading">
                {dashboard.stats.todayAppointments}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Waiting Queue</span>
              <span className="text-sm font-semibold text-text-heading">
                {dashboard.stats.waitingQueue}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">
                Clinical Encounters
              </span>
              <span className="text-sm font-semibold text-text-heading">
                {dashboard.stats.clinicalEncounters}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
