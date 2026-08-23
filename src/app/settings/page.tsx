import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { Clinic, User, Patient } from '@/lib/models';
import SignOutButton from '@/components/SignOutButton/SignOutButton';

export const metadata = {
  title: 'Settings — mysaas',
};

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-text-muted">{label}</p>
      <p className="mt-1 text-sm text-text-heading">{value || '—'}</p>
    </div>
  );
}

export default async function SettingsPage() {
  // ──────────────────────────────────────────────
  // STEP 1: Check if user is logged in
  // getServerSession reads the JWT cookie and
  // returns the session object we defined in auth.ts
  // ──────────────────────────────────────────────
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  // ──────────────────────────────────────────────
  // STEP 2: Fetch data using session.user.id
  // and session.user.clinicId — these come from
  // the JWT token, not from a database query
  // ──────────────────────────────────────────────
  await connectToDatabase();

  const [clinic, staffCount, patientCount] = await Promise.all([
    session.user.clinicId
      ? Clinic.findById(session.user.clinicId).lean()
      : Promise.resolve(null),
    session.user.clinicId
      ? User.countDocuments({ clinicId: session.user.clinicId })
      : Promise.resolve(0),
    session.user.clinicId
      ? Patient.countDocuments({ clinicId: session.user.clinicId })
      : Promise.resolve(0),
  ]);

  // ──────────────────────────────────────────────
  // STEP 3: Render — all data is server-side,
  // no client-side fetch needed
  // ──────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-page px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-text-muted">Your account and clinic details</p>
            <h1 className="mt-1 text-2xl font-bold text-text-heading">Settings</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-lg border border-border-default px-4 py-2 text-sm font-medium text-text-heading transition-colors hover:bg-neutral-100"
            >
              Dashboard
            </Link>
            <SignOutButton />
          </div>
        </header>

        <div className="space-y-6">
          {/* ── Session Info Card ── */}
          <section className="rounded-2xl border border-border-default bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-bold text-text-heading">Your Session</h2>
            <p className="mb-4 text-sm text-text-muted">
              This data comes from the JWT token — no database query needed.
            </p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <Detail label="User ID" value={session.user.id} />
              <Detail label="Email" value={session.user.email ?? ''} />
              <Detail label="Name" value={session.user.name ?? ''} />
              <Detail label="Role" value={session.user.role} />
              <Detail label="Clinic ID" value={session.user.clinicId ?? 'None (patient)'} />
            </div>
          </section>

          {/* ── Clinic Info Card ── */}
          <section className="rounded-2xl border border-border-default bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-bold text-text-heading">Clinic Details</h2>
            <p className="mb-4 text-sm text-text-muted">
              Fetched from MongoDB using the clinicId from your session.
            </p>
            {clinic ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <Detail label="Clinic Name" value={clinic.name} />
                <Detail label="Total Staff" value={String(staffCount)} />
                <Detail label="Total Patients" value={String(patientCount)} />
                <Detail
                  label="Created"
                  value={new Date(clinic.createdAt).toLocaleDateString()}
                />
                <Detail label="Clinic ID" value={clinic._id.toString()} />
              </div>
            ) : (
              <p className="text-sm text-text-muted">
                No clinic linked to your account.
              </p>
            )}
          </section>

          {/* ── How It Works Card ── */}
          <section className="rounded-2xl border border-border-default bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-bold text-text-heading">How This Page Works</h2>
            <div className="space-y-4 text-sm text-text-body">
              <div>
                <p className="font-semibold text-text-heading">1. Session check (server component)</p>
                <code className="mt-1 block rounded-lg bg-neutral-100 p-3 text-xs text-text-muted">
                  {"const session = await getServerSession(authOptions);"}
                  {'\n'}
                  {"if (!session) redirect('/login');"}
                </code>
                <p className="mt-1 text-text-muted">
                  Reads the JWT cookie → returns <code>{'{ user: { id, role, clinicId } }'}</code>.
                  No database query needed.
                </p>
              </div>
              <div>
                <p className="font-semibold text-text-heading">2. Data fetch (still server-side)</p>
                <code className="mt-1 block rounded-lg bg-neutral-100 p-3 text-xs text-text-muted">
                  Clinic.findById(session.user.clinicId)
                </code>
                <p className="mt-1 text-text-muted">
                  Uses the <code>clinicId</code> from the JWT token to query MongoDB directly.
                </p>
              </div>
              <div>
                <p className="font-semibold text-text-heading">3. Role-based access</p>
                <code className="mt-1 block rounded-lg bg-neutral-100 p-3 text-xs text-text-muted">
                  {"if (session.user.role === 'patient') redirect('/portal');"}
                </code>
                <p className="mt-1 text-text-muted">
                  Patients are blocked from staff pages. Staff are blocked from <code>/portal</code>.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}