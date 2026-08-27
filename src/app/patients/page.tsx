import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { Patient } from '@/lib/models';
import AddPatientForm from '@/components/AddPatientForm/AddPatientForm';
import SignOutButton from '@/components/SignOutButton/SignOutButton';
import StatCard from '@/components/ui/StatCard';
import { CalendarIcon, PhoneIcon, ShieldIcon, UsersIcon } from '@/components/ui/icons';

export const metadata = {
  title: 'Patients — mysaas',
};

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default async function PatientsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  if (session.user.role === 'patient') {
    redirect('/portal');
  }

  const { q = '' } = await searchParams;
  const query = q.trim();

  await connectToDatabase();

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const clinicFilter = session.user.clinicId ? { clinicId: session.user.clinicId } : {};

  const [total, newThisMonth, withInsurance, missingPhone, patients] = await Promise.all([
    Patient.countDocuments(clinicFilter),
    Patient.countDocuments({ ...clinicFilter, createdAt: { $gte: startOfMonth } }),
    Patient.countDocuments({ ...clinicFilter, insurance: { $ne: '' } }),
    Patient.countDocuments({ ...clinicFilter, phone: '' }),
    query
      ? Patient.find({
          ...clinicFilter,
          $or: [
            { fullName: { $regex: escapeRegex(query), $options: 'i' } },
            { email: { $regex: escapeRegex(query), $options: 'i' } },
            { phone: { $regex: escapeRegex(query), $options: 'i' } },
          ],
        })
          .sort({ createdAt: -1 })
          .lean()
      : Patient.find(clinicFilter).sort({ createdAt: -1 }).lean(),
  ]);

  return (
    <main className="min-h-screen bg-page px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-text-muted">Logged in as {session.user.email}</p>
            <h1 className="mt-1 text-2xl font-bold text-text-heading">Patients</h1>
            <p className="mt-1 text-sm text-text-muted">
              {query ? (
                <>
                  {patients.length} result{patients.length === 1 ? '' : 's'} for &ldquo;{query}&rdquo;
                </>
              ) : (
                <>Live data from MongoDB — {total} patient{total === 1 ? '' : 's'}</>
              )}
            </p>
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Patients" value={total} icon={<UsersIcon className="h-5 w-5" />} />
          <StatCard label="New This Month" value={newThisMonth} icon={<CalendarIcon className="h-5 w-5" />} />
          <StatCard label="With Insurance" value={withInsurance} icon={<ShieldIcon className="h-5 w-5" />} />
          <StatCard label="Missing Phone" value={missingPhone} icon={<PhoneIcon className="h-5 w-5" />} />
        </div>

        <div className="mt-8">
          <AddPatientForm />
        </div>

        <form method="GET" className="mb-4 flex items-center justify-between gap-4">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search by name, email, or phone…"
            className="w-full max-w-sm rounded-lg border border-border-default bg-white px-4 py-2.5 text-sm text-text-heading placeholder:text-text-disabled outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/50"
          />
          <button
            type="submit"
            className="rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
          >
            Search
          </button>
        </form>

        {patients.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border-strong bg-white p-10 text-center text-sm text-text-muted">
            {query ? 'No patients match your search.' : 'No patients yet. Add your first one above.'}
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border-default bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border-default bg-neutral-50 text-xs uppercase tracking-wide text-text-muted">
                <tr>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Phone</th>
                  <th className="px-5 py-3 font-medium">Insurance</th>
                  <th className="px-5 py-3 font-medium">Added</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {patients.map((patient) => (
                  <tr key={patient._id.toString()} className="hover:bg-neutral-50">
                    <td className="px-5 py-3">
                      <Link
                        href={`/patients/${patient._id.toString()}`}
                        className="font-medium text-brand-primary transition-colors hover:text-brand-primary-hover"
                      >
                        {patient.fullName}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-text-body">{patient.email || '—'}</td>
                    <td className="px-5 py-3 text-text-body">{patient.phone || '—'}</td>
                    <td className="px-5 py-3 text-text-body">{patient.insurance || '—'}</td>
                    <td className="px-5 py-3 text-text-muted">
                      {new Date(patient.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}