import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { QueueEntry, Patient, ContactMessage } from '@/lib/models';
import SignOutButton from '@/components/SignOutButton/SignOutButton';
import StatCard from '@/components/ui/StatCard';
import { ClockIcon, UsersIcon, ChatIcon } from '@/components/ui/icons';

export const metadata = {
  title: 'Queue — mysaas',
};

function formatTime(date: Date) {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

const statusBadge: Record<string, string> = {
  waiting: 'bg-yellow-100 text-yellow-800',
  'in-room': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
};

export default async function QueuePage() {
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

  await connectToDatabase();

  const clinicFilter = { clinicId: session.user.clinicId };

  const [waitingQueue, inRoomQueue, totalPatients, totalContacts, queueEntries, patients, contacts] =
    await Promise.all([
      QueueEntry.countDocuments({ ...clinicFilter, status: 'waiting' }),
      QueueEntry.countDocuments({ ...clinicFilter, status: 'in-room' }),
      Patient.countDocuments(clinicFilter),
      ContactMessage.countDocuments(),
      QueueEntry.find({ ...clinicFilter, status: { $in: ['waiting', 'in-room'] } })
        .populate('patientId', 'fullName phone email')
        .sort({ joinedAt: 1 })
        .lean(),
      Patient.find(clinicFilter)
        .sort({ createdAt: -1 })
        .limit(20)
        .lean(),
      ContactMessage.find()
        .sort({ createdAt: -1 })
        .limit(20)
        .lean(),
    ]);

  return (
    <main className="min-h-screen bg-page px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-text-muted">Logged in as {session.user.email}</p>
            <h1 className="mt-1 text-2xl font-bold text-text-heading">Queue & Contacts</h1>
            <p className="mt-1 text-sm text-text-muted">
              {waitingQueue} waiting · {inRoomQueue} in-room · {totalPatients} patients
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/appointments/new"
              className="rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
            >
              + New Appointment
            </Link>
            <SignOutButton />
          </div>
        </header>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Waiting"
            value={waitingQueue}
            icon={<ClockIcon className="h-5 w-5 text-orange-500" />}
          />
          <StatCard
            label="In Room"
            value={inRoomQueue}
            icon={<UsersIcon className="h-5 w-5 text-blue-500" />}
          />
          <StatCard
            label="Contacts"
            value={totalContacts}
            icon={<ChatIcon className="h-5 w-5 text-purple-500" />}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Queue Section */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-base font-semibold text-neutral-900">
              Active Queue ({queueEntries.length})
            </h2>
            {queueEntries.length === 0 ? (
              <p className="py-8 text-center text-sm text-text-muted">No patients in queue</p>
            ) : (
              <div className="space-y-3">
                {queueEntries.map((entry) => {
                  const patient = entry.patientId as unknown as {
                    _id: string;
                    fullName: string;
                    phone: string;
                    email: string;
                  };
                  return (
                    <div
                      key={entry._id.toString()}
                      className="flex items-center justify-between rounded-xl border border-neutral-100 bg-neutral-50 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary/10 text-sm font-bold text-brand-primary">
                          {patient?.fullName?.charAt(0) || '?'}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-heading">
                            {patient?.fullName || 'Unknown'}
                          </p>
                          <p className="text-xs text-text-muted">
                            {patient?.phone || patient?.email || '—'} · Joined {formatTime(entry.joinedAt)}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          statusBadge[entry.status] || 'bg-neutral-100 text-neutral-600'
                        }`}
                      >
                        {entry.status === 'in-room' ? 'In Room' : 'Waiting'}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Patients Section */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-semibold text-neutral-900">
                Patients ({totalPatients})
              </h2>
              <Link href="/patients" className="text-sm font-medium text-brand-primary hover:underline">
                View all patients
              </Link>
            </div>
            {patients.length === 0 ? (
              <p className="py-8 text-center text-sm text-text-muted">No patients yet</p>
            ) : (
              <div className="space-y-2">
                {patients.map((patient) => (
                  <div
                    key={patient._id.toString()}
                    className="flex items-center justify-between rounded-xl border border-neutral-100 px-4 py-3 hover:bg-neutral-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                        {patient.fullName?.charAt(0) || '?'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-heading">{patient.fullName}</p>
                        <p className="text-xs text-text-muted">
                          {patient.phone || patient.email || '—'}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/patients/${patient._id.toString()}`}
                      className="text-xs font-medium text-brand-primary hover:underline"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Contacts Section */}
          <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="mb-5 text-base font-semibold text-neutral-900">
              Contact Messages ({totalContacts})
            </h2>
            {contacts.length === 0 ? (
              <p className="py-8 text-center text-sm text-text-muted">No contact messages</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200 text-xs font-medium text-text-muted">
                      <th className="pb-3 pr-4">Name</th>
                      <th className="pb-3 pr-4">Email</th>
                      <th className="pb-3 pr-4">Phone</th>
                      <th className="pb-3 pr-4">Subject</th>
                      <th className="pb-3">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact._id.toString()} className="border-b border-neutral-100 last:border-0">
                        <td className="py-3 pr-4 font-medium text-text-heading">{contact.name}</td>
                        <td className="py-3 pr-4 text-text-muted">{contact.email}</td>
                        <td className="py-3 pr-4 text-text-muted">{contact.phone || '—'}</td>
                        <td className="py-3 pr-4 text-text-muted">{contact.subject}</td>
                        <td className="py-3 text-text-muted">{formatDate(contact.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
