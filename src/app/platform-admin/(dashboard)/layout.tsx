import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import PlatformAdminSidebar from "@/components/platform-admin/PlatformAdminSidebar";
import PlatformAdminHeader from "@/components/platform-admin/PlatformAdminHeader";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Platform Admin | mysaas",
  description: "Platform administration for Dental SaaS.",
};

export default async function PlatformAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // --------------------------------------------------
  // 1. User must be logged in
  // --------------------------------------------------
  if (!session?.user) {
    redirect("/platform-admin/login");
  }

  // --------------------------------------------------
  // 2. User must be a platform admin
  // --------------------------------------------------
  if (session.user.role !== "platform_admin") {
    redirect("/platform-admin/login");
  }

  // --------------------------------------------------
  // 3. Platform admin must have a valid platform role
  // --------------------------------------------------
  if (
    session.user.platformRole !== "super_admin" &&
    session.user.platformRole !== "support"
  ) {
    redirect("/platform-admin/login");
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg-page font-sans text-text-body">
      {/* Sidebar */}
      <PlatformAdminSidebar />

      {/* Main Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <PlatformAdminHeader />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto h-full max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}