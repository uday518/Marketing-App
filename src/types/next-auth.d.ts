import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      clinicId: string | null;
    } & import('next-auth').DefaultSession['user'];
  }

  interface User {
    role?: string;
    clinicId?: string | null;
    passwordChangedAt?: number | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    role?: string;
    clinicId?: string | null;
    passwordChangedAt?: number | null;
  }
}
