import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from './db';
import { Patient, User } from './models';
import { checkRateLimit } from './rate-limit';

const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: '/login' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email.toLowerCase();

        // Rate limit: 5 attempts per 15 minutes per email
        const rateLimit = checkRateLimit(
          `login:${email}`,
          MAX_LOGIN_ATTEMPTS,
          LOGIN_WINDOW_MS,
        );

        if (!rateLimit.allowed) {
          const minutes = Math.ceil(rateLimit.retryAfterMs / 60000);
          throw new Error(
            `Too many login attempts. Please try again in ${minutes} minute${minutes === 1 ? '' : 's'}.`,
          );
        }

        await connectToDatabase();

        // Try staff first
        const user = await User.findOne({ email });

        if (user) {
          const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
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

        // Try patient
        const patient = await Patient.findOne({ email }).select('+password');

        if (patient && patient.password) {
          const isValid = await bcrypt.compare(credentials.password, patient.password);
          if (!isValid) {
            return null;
          }

          return {
            id: patient._id.toString(),
            email: patient.email,
            name: patient.fullName,
            role: 'patient',
            clinicId: patient.clinicId ? patient.clinicId.toString() : null,
            passwordChangedAt: patient.passwordChangedAt
              ? patient.passwordChangedAt.getTime()
              : null,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.clinicId = user.clinicId;
        token.passwordChangedAt = user.passwordChangedAt;
      }

      // Session revocation: if password was changed after this token was issued,
      // invalidate the session
      if (
        token.passwordChangedAt &&
        typeof token.iat === 'number' &&
        token.iat * 1000 < (token.passwordChangedAt as number)
      ) {
        // Token was issued before password change — force re-login
        return {};
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.clinicId = token.clinicId as string | null;
      }
      return session;
    },
  },
};