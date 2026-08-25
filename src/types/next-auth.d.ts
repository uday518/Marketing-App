import "next-auth";
import "next-auth/jwt";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      clinicId: string | null;
      platformRole?: "super_admin" | "support";
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
    clinicId: string | null;
    platformRole?: "super_admin" | "support";
    passwordChangedAt?: number | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    clinicId?: string | null;
    platformRole?: "super_admin" | "support";
    passwordChangedAt?: number | null;
  }
}