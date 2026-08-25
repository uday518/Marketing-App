"use client";

import { usePathname } from "next/navigation";

export default function PlatformAdminHeader() {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    if (pathname === "/platform-admin") return "Dashboard";
    const segment = pathname.split("/").pop();
    if (segment) {
      return segment.charAt(0).toUpperCase() + segment.slice(1);
    }
    return "Platform Admin";
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border-default bg-white px-4 md:px-8">
      <div className="flex flex-1 items-center gap-4">
        <h1 className="text-xl font-semibold text-text-heading pl-12 md:pl-0">
          {getPageTitle()}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button 
          className="relative inline-flex flex-shrink-0 items-center justify-center rounded-full p-2 text-text-muted hover:bg-neutral-100 hover:text-text-heading focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-colors"
          aria-label="Notifications"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-brand-accent ring-2 ring-white"></span>
        </button>
      </div>
    </header>
  );
}
