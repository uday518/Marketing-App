import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/lib/models';
import CreateStaffForm from '@/components/CreateStaffForm/CreateStaffForm';
import DeleteStaffButton from '@/components/DeleteStaffButton/DeleteStaffButton';
import SignOutButton from '@/components/SignOutButton/SignOutButton';

export const metadata = {
  title: 'Staff Management — mysaas',
};

const roleLabels: Record<string, string> = {
  owner: 'Admin',
  manager: 'Manager',
  dentist: 'Doctor / Dentist',
  receptionist: 'Receptionist',
};

export default async function StaffPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  if (session.user.role !== 'owner') {
    redirect('/dashboard');
  }

  await connectToDatabase();

  const staff = await User.find({
    clinicId: session.user.clinicId,
    role: { $ne: 'owner' },
  })
    .select('name email role createdAt')
    .sort({ createdAt: 1 })
    .lean();

  return (
    <main className="min-h-screen bg-page px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-text-muted">Admin only — staff accounts are created here</p>
            <h1 className="mt-1 text-2xl font-bold text-text-heading">Staff Management</h1>
            <p className="mt-1 text-sm text-text-muted">
              {staff.length} staff member{staff.length === 1 ? '' : 's'} in your clinic
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

        <CreateStaffForm />

        {staff.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border-strong bg-white p-10 text-center text-sm text-text-muted">
            No staff yet. Create the first account above.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border-default bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border-default bg-neutral-50 text-xs uppercase tracking-wide text-text-muted">
                <tr>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Role</th>
                  <th className="px-5 py-3 font-medium">Added</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {staff.map((member) => (
                  <tr key={member._id.toString()} className="hover:bg-neutral-50">
                    <td className="px-5 py-3 font-medium text-text-heading">{member.name}</td>
                    <td className="px-5 py-3 text-text-body">{member.email}</td>
                    <td className="px-5 py-3">
                      <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-text-muted">
                        {roleLabels[member.role] ?? member.role}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-text-muted">
                      {new Date(member.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <DeleteStaffButton id={member._id.toString()} name={member.name} />
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