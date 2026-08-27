import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "./db";
import { Patient, User, PlatformAdmin } from "@/lib/models";
import { checkRateLimit } from "./rate-limit";

const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email.toLowerCase().trim();

        // --------------------------------------------------
        // Rate limiting
        // --------------------------------------------------

        const rateLimit = checkRateLimit(
          `login:${email}`,
          MAX_LOGIN_ATTEMPTS,
          LOGIN_WINDOW_MS,
        );

        if (!rateLimit.allowed) {
          const minutes = Math.ceil(
            rateLimit.retryAfterMs / 60000,
          );

          throw new Error(
            `Too many login attempts. Please try again in ${minutes} minute${minutes === 1 ? "" : "s"
            }.`,
          );
        }

        await connectToDatabase();

        // ==================================================
        // 1. PLATFORM ADMIN
        // ==================================================

        const platformAdmin = await PlatformAdmin.findOne({ email })
          .select("+passwordHash");

        if (platformAdmin) {
          if (!platformAdmin.isActive) {
            return null;
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            platformAdmin.passwordHash,
          );

          if (!isValid) {
            return null;
          }

          await PlatformAdmin.updateOne(
            { _id: platformAdmin._id },
            {
              $set: {
                lastLoginAt: new Date(),
              },
            },
          );

          return {
            id: platformAdmin._id.toString(),
            email: platformAdmin.email,
            name: platformAdmin.name,

            // Keep platform admin separate from clinic roles
            role: 'platform_admin',

            platformRole: platformAdmin.role,

            clinicId: null,

            passwordChangedAt: platformAdmin.passwordChangedAt
              ? platformAdmin.passwordChangedAt.getTime()
              : null,
          };
        }

        // ==================================================
        // 2. CLINIC STAFF
        // ==================================================

        const user = await User.findOne({
          email,
        });

        if (user) {
          const isValid = await bcrypt.compare(
            credentials.password,
            user.passwordHash,
          );

          if (!isValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            clinicId: user.clinicId ? user.clinicId.toString() : null,
            passwordChangedAt: user.passwordChangedAt
              ? user.passwordChangedAt.getTime()
              : null,
          };
        }

        // ==================================================
        // 3. PATIENT
        // ==================================================

        const patient = await Patient.findOne({
          email,
        }).select("+password");

        if (patient && patient.password) {
          const isValid = await bcrypt.compare(
            credentials.password,
            patient.password,
          );

          if (!isValid) {
            return null;
          }

          return {
            id: patient._id.toString(),
            email: patient.email,
            name: patient.fullName,

            role: "patient",

            clinicId: patient.clinicId
              ? patient.clinicId.toString()
              : null,

            passwordChangedAt:
              patient.passwordChangedAt
                ? patient.passwordChangedAt.getTime()
                : null,
          };
        }

        return null;
      },
    }),
  ],

  // ======================================================
  // CALLBACKS
  // ======================================================

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.clinicId = user.clinicId;
        token.platformRole = user.platformRole;
        token.passwordChangedAt = user.passwordChangedAt;
      }
      // ----------------------------------------------
      // Revoke JWT after password change
      // ----------------------------------------------

      if (
        token.passwordChangedAt &&
        typeof token.iat === "number" &&
        token.iat * 1000 <
        (token.passwordChangedAt as number)
      ) {
        return {};
      }

      return token;
    },

    // ==================================================
    // SESSION
    // ==================================================

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.clinicId = token.clinicId as string | null;
        session.user.platformRole = token.platformRole as
          | "super_admin"
          | "support"
          | undefined;
      }

      return session;
    },
  },
};
