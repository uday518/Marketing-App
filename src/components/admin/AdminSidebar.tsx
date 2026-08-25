"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/admin" },
  { name: "Patients", href: "/admin/patients" },
  { name: "Schedule", href: "/admin/schedule" },
  { name: "Clinical", href: "/admin/clinical" },
  { name: "Staff", href: "/admin/staff" },
  { name: "Billing", href: "/admin/billing" },
  { name: "Reports", href: "/admin/reports" },
  { name: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <button 
        className="md:hidden fixed top-3 left-4 z-50 p-2 rounded-md bg-white border border-border-default text-text-muted shadow-sm"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle Navigation"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-neutral-900/50 md:hidden" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-bg-sidebar border-r border-border-default transition-transform duration-200 ease-in-out md:translate-x-0 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} md:static md:flex md:flex-col shadow-lg md:shadow-none`}>
        <div className="flex h-16 items-center px-6 border-b border-border-default bg-brand-logo text-white">
          <span className="text-xl font-bold tracking-tight">mysaas</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="flex flex-col gap-1.5 px-3">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
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
        
        <div className="p-4 border-t border-border-default bg-white md:bg-transparent">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-brand-primary flex items-center justify-center text-white font-semibold text-sm shadow-sm opacity-90">
              JS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-heading truncate">Dr. Sharma</p>
              <p className="text-[11px] text-text-muted truncate">admin@clinic.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
