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

  // Not logged in
  if (!session) {
    redirect("/platform-admin/login");
  }

  // Must be a platform administrator
  if (session.user.role !== "platform_admin") {
    redirect("/");
  }

  // Must have a valid platform role
  if (
    session.user.platformRole !== "super_admin" &&
    session.user.platformRole !== "support"
  ) {
    redirect("/");
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg-page font-sans text-text-body">
      <PlatformAdminSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <PlatformAdminHeader />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto h-full max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}