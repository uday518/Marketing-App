"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/platform-admin" },
  {
    name: "Sales",
    href: "#",
    children: [
      { name: "Demo Requests", href: "/platform-admin/demos" },
      { name: "Leads", href: "/platform-admin/leads" },
      { name: "Contacts", href: "/platform-admin/contacts" },
    ],
  },
  { name: "Clinics", href: "/platform-admin/clinics" },
  { name: "Subscriptions", href: "/platform-admin/subscriptions" },
  { name: "Payments", href: "/platform-admin/payments" },
  { name: "Plans", href: "/platform-admin/plans" },
  { name: "Settings", href: "/platform-admin/settings" },
];

export default function PlatformAdminSidebar() {
  const pathname = usePathname();

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["Sales"])
  );

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const toggleSection = (sectionName: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(sectionName)) {
        newSet.delete(sectionName);
      } else {
        newSet.add(sectionName);
      }

      return newSet;
    });
  };

  const isActive = (href: string) => {
    if (href === "#") return false;

    return pathname === href;
  };

  const isSectionActive = (item: (typeof NAV_ITEMS)[0]) => {
    if (!item.children) return false;

    return item.children.some((child) => pathname === child.href);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);

    await signOut({
      callbackUrl: "/",
    });
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-3 left-4 z-50 p-2 rounded-md bg-white border border-border-default text-text-muted shadow-sm"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle Navigation"
      >
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
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-neutral-900/50 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-bg-sidebar border-r border-border-default transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:flex md:flex-col shadow-lg md:shadow-none`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center px-6 border-b border-border-default bg-brand-logo text-white">
          <span className="text-xl font-bold tracking-tight">
            mysaas
          </span>

          <span className="ml-2 text-xs bg-brand-accent px-2 py-0.5 rounded-full">
            Platform
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="flex flex-col gap-1 px-3">
            {NAV_ITEMS.map((item) => {
              if (item.children) {
                const isExpanded = expandedSections.has(item.name);
                const sectionActive = isSectionActive(item);

                return (
                  <li key={item.name}>
                    <button
                      onClick={() => toggleSection(item.name)}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        sectionActive
                          ? "bg-brand-primary text-white shadow-sm"
                          : "text-text-body hover:bg-neutral-200 hover:text-text-heading"
                      }`}
                    >
                      <span>{item.name}</span>

                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    {isExpanded && (
                      <ul className="mt-1 ml-4 flex flex-col gap-1">
                        {item.children.map((child) => (
                          <li key={child.name}>
                            <Link
                              href={child.href}
                              onClick={() => setIsMobileOpen(false)}
                              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                isActive(child.href)
                                  ? "bg-brand-primary text-white shadow-sm"
                                  : "text-text-body hover:bg-neutral-200 hover:text-text-heading"
                              }`}
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-brand-primary text-white shadow-sm"
                        : "text-text-body hover:bg-neutral-200 hover:text-text-heading"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Admin Profile + Logout */}
        <div className="p-4 border-t border-border-default bg-white md:bg-transparent">
          {/* Profile */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-brand-accent flex items-center justify-center text-white font-semibold text-sm shadow-sm opacity-90">
              PA
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-heading truncate">
                Platform Admin
              </p>

              <p className="text-[11px] text-text-muted truncate">
                admin@mysaas.com
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-border-default px-3 py-2 text-sm font-medium text-text-body transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>

            Log Out
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => {
            if (!isLoggingOut) {
              setShowLogoutModal(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Icon */}

            {/* Title */}
            <h1 className="text-lg font-bold text-text-heading text-center">
              Log Out
            </h1>


            <h2 className="mt-2 text-lg leading-6 text-muted text-center">
              Are you sure you want to logout?
            </h2>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">
              {/* Cancel */}
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 rounded-lg border border-border-default px-4 py-2.5 text-sm font-medium text-text-body transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              {/* Logout */}
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={handleLogout}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}