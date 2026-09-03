import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import AddPatientForm from '@/components/AddPatientForm/AddPatientForm';
import SignOutButton from '@/components/SignOutButton/SignOutButton';
import { authOptions } from '@/lib/auth';

export const metadata = {
  title: 'Add Patient — mysaas',
};

export default async function NewPatientPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  if (session.user.role === 'patient') {
    redirect('/portal');
  }

  if (!session.user.clinicId) {
    redirect('/dashboard');
  }

  return (
    <main className="min-h-screen bg-page px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-text-muted">Create a new patient record</p>
            <h1 className="mt-1 text-2xl font-bold text-text-heading">Add Patient</h1>
            <p className="mt-1 text-sm text-text-muted">
              Use this form to register a patient for the active clinic.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/patients"
              className="rounded-lg border border-border-default px-4 py-2 text-sm font-medium text-text-heading transition-colors hover:bg-neutral-100"
            >
              View patients
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg border border-border-default px-4 py-2 text-sm font-medium text-text-heading transition-colors hover:bg-neutral-100"
            >
              Dashboard
            </Link>
            <SignOutButton />
          </div>
        </header>

        <AddPatientForm />
      </div>
    </main>
  );
}
