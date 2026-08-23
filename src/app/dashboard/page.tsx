import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import type { ReactNode } from 'react';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { Appointment, Clinic, Encounter, Patient, QueueEntry } from '@/lib/models';
import SignOutButton from '@/components/SignOutButton/SignOutButton';
import GlobalSearch from '@/components/GlobalSearch/GlobalSearch';
import StatCard from '@/components/ui/StatCard';
import { CalendarIcon, ChartIcon, ClockIcon, UsersIcon } from '@/components/ui/icons';

export const metadata = {
  title: 'Dashboard — mysaas',
};

const statusStyles: Record<string, string> = {
  scheduled: 'bg-neutral-100 text-text-muted',
  'checked-in': 'bg-info-100 text-info-500',
  'in-room': 'bg-warning-100 text-warning-500',
  completed: 'bg-success-100 text-success-500',
  cancelled: 'bg-error-100 text-error-500',
  'no-show': 'bg-error-100 text-error-500',
};

function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border-default bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-bold text-text-heading">{title}</h2>
      {children}
    </div>
  );
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  if (session.user.role === 'patient') {
    redirect('/portal');
  }

  let clinicName = 'Your Clinic';
  let stats = {
    totalPatients: 0,
    todayAppointments: 0,
    waitingQueue: 0,
    encounters: 0,
  };
  let appointments: {
    _id: string;
    dateTime: Date;
    status: string;
    patientName: string;
  }[] = [];
  let recentPatients: {
    _id: string;
    fullName: string;
    email: string;
    insurance: string;
    createdAt: Date;
  }[] = [];
  let loadError = false;

  try {
    await connectToDatabase();

    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    const [
      totalPatients,
      todayAppointments,
      waitingQueue,
      encounters,
      appointmentDocs,
      patientDocs,
      clinic,
    ] = await Promise.all([
      Patient.countDocuments(),
      Appointment.countDocuments({ dateTime: { $gte: startOfDay, $lt: endOfDay } }),
      QueueEntry.countDocuments({ status: 'waiting' }),
      Encounter.countDocuments(),
      Appointment.find().sort({ dateTime: -1 }).limit(5).lean(),
      Patient.find().sort({ createdAt: -1 }).limit(5).lean(),
      session.user.clinicId ? Clinic.findById(session.user.clinicId).lean() : Promise.resolve(null),
    ]);

    const patientIds = appointmentDocs.map((a) => a.patientId);
    const nameMap = await Patient.find({ _id: { $in: patientIds } })
      .select('fullName')
      .lean()
      .then((docs) => new Map(docs.map((p) => [p._id.toString(), p.fullName])));

    stats = { totalPatients, todayAppointments, waitingQueue, encounters };
    appointments = appointmentDocs.map((a) => ({
      _id: a._id.toString(),
      dateTime: a.dateTime,
      status: a.status,
      patientName: nameMap.get(a.patientId.toString()) ?? 'Unknown patient',
    }));
    recentPatients = patientDocs.map((p) => ({
      _id: p._id.toString(),
      fullName: p.fullName,
      email: p.email,
      insurance: p.insurance,
      createdAt: p.createdAt,
    }));
    clinicName = clinic?.name ?? 'Your Clinic';
  } catch (err) {
    console.error('[dashboard] failed to load data:', err);
    loadError = true;
  }

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const firstName = session.user.name?.split(' ')[0] ?? 'there';
  const roleLabel = session.user.role ? session.user.role[0].toUpperCase() + session.user.role.slice(1) : '';

  return (
    <main className="min-h-screen bg-page px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-text-muted">
              {clinicName}
              {roleLabel ? ` · ${roleLabel}` : ''}
            </p>
            <h1 className="mt-1 text-2xl font-bold text-text-heading">
              {greeting}, {firstName}
            </h1>
            <p className="mt-1 text-sm text-text-muted">
              Here&apos;s what&apos;s happening at your clinic today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <GlobalSearch />
            {session.user.role === 'owner' && (
              <Link
                href="/staff"
                className="rounded-lg border border-border-default px-4 py-2 text-sm font-medium text-text-heading transition-colors hover:bg-neutral-100"
              >
                Staff
              </Link>
            )}
            <Link
              href="/patients"
              className="rounded-lg border border-border-default px-4 py-2 text-sm font-medium text-text-heading transition-colors hover:bg-neutral-100"
            >
              Manage patients
            </Link>
            <Link
              href="/settings"
              className="rounded-lg border border-border-default px-4 py-2 text-sm font-medium text-text-heading transition-colors hover:bg-neutral-100"
            >
              Settings
            </Link>
            <SignOutButton />
          </div>
        </header>

        {loadError ? (
          <div className="rounded-2xl border border-border-default bg-white p-10 text-center">
            <p className="text-sm text-text-muted">
              Could not load dashboard data. Make sure MongoDB is reachable, then refresh.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Total Patients" value={stats.totalPatients} icon={<UsersIcon className="h-5 w-5" />} />
              <StatCard label="Today's Appointments" value={stats.todayAppointments} icon={<CalendarIcon className="h-5 w-5" />} />
              <StatCard label="Patients in Queue" value={stats.waitingQueue} icon={<ClockIcon className="h-5 w-5" />} />
              <StatCard label="Clinical Encounters" value={stats.encounters} icon={<ChartIcon className="h-5 w-5" />} />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <SectionCard title="Upcoming Appointments">
                {appointments.length === 0 ? (
                  <p className="text-sm text-text-muted">No appointments yet.</p>
                ) : (
                  <ul className="divide-y divide-border-default">
                    {appointments.map((appointment) => (
                      <li key={appointment._id} className="flex items-center justify-between gap-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-text-heading">
                            {appointment.patientName}
                          </p>
                          <p className="text-xs text-text-muted">
                            {new Date(appointment.dateTime).toLocaleDateString()} ·{' '}
                            {new Date(appointment.dateTime).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            statusStyles[appointment.status] ?? 'bg-neutral-100 text-text-muted'
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </SectionCard>

              <SectionCard title="Recent Patients">
                {recentPatients.length === 0 ? (
                  <p className="text-sm text-text-muted">No patients yet.</p>
                ) : (
                  <ul className="divide-y divide-border-default">
                    {recentPatients.map((patient) => (
                      <li key={patient._id} className="flex items-center justify-between gap-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-text-heading">
                            {patient.fullName}
                          </p>
                          <p className="text-xs text-text-muted">{patient.email || 'No email'}</p>
                        </div>
                        <span className="text-xs text-text-muted">
                          {patient.insurance || '—'}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </SectionCard>
            </div>
          </>
        )}
      </div>
    </main>
  );
}