import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from './db';
import { Patient, User } from './models';

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

        await connectToDatabase();
        const email = credentials.email.toLowerCase();

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
          };
        }

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
