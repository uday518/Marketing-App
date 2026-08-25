"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/platform-admin" },
  { 
    name: "Sales", 
    href: "#",
    children: [
      { name: "Demo Requests", href: "/platform-admin/demos" },
      { name: "Leads", href: "/platform-admin/leads" },
      { name: "Contacts", href: "/platform-admin/contacts" },
    ]
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
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["Sales"]));

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => {
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

  const isSectionActive = (item: typeof NAV_ITEMS[0]) => {
    if (!item.children) return false;
    return item.children.some(child => pathname === child.href);
  };

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
          <span className="ml-2 text-xs bg-brand-accent px-2 py-0.5 rounded-full">Platform</span>
        </div>
        
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
                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
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
        
        <div className="p-4 border-t border-border-default bg-white md:bg-transparent">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-brand-accent flex items-center justify-center text-white font-semibold text-sm shadow-sm opacity-90">
              PA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-heading truncate">Platform Admin</p>
              <p className="text-[11px] text-text-muted truncate">admin@mysaas.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
