import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { Appointment } from '@/lib/models';
import SignOutButton from '@/components/SignOutButton/SignOutButton';
import StatCard from '@/components/ui/StatCard';
import { CalendarIcon, ClockIcon, CheckIcon } from '@/components/ui/icons';

export const metadata = {
  title: 'Appointments — mysaas',
};

function formatTime(date: Date) {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

const statusBadge: Record<string, string> = {
  scheduled: 'bg-neutral-100 text-neutral-700',
  'checked-in': 'bg-blue-100 text-blue-700',
  'in-room': 'bg-orange-100 text-orange-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  'no-show': 'bg-red-100 text-red-700',
};

const statusLabel: Record<string, string> = {
  scheduled: 'Scheduled',
  'checked-in': 'Checked In',
  'in-room': 'In Room',
  completed: 'Completed',
  cancelled: 'Cancelled',
  'no-show': 'No Show',
};

export default async function AppointmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
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

  const { status: statusFilter } = await searchParams;

  await connectToDatabase();

  const clinicFilter = { clinicId: session.user.clinicId };
  const now = new Date();

  const appointmentQuery: Record<string, unknown> = { ...clinicFilter };
  if (statusFilter && statusFilter !== 'all') {
    appointmentQuery.status = statusFilter;
  }

  const [total, todayCount, upcomingCount, completedCount, appointments] = await Promise.all([
    Appointment.countDocuments(clinicFilter),
    Appointment.countDocuments({
      ...clinicFilter,
      dateTime: {
        $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        $lt: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
      },
    }),
    Appointment.countDocuments({
      ...clinicFilter,
      dateTime: { $gt: now },
      status: { $nin: ['cancelled', 'completed', 'no-show'] },
    }),
    Appointment.countDocuments({
      ...clinicFilter,
      status: 'completed',
    }),
    Appointment.find(appointmentQuery)
      .populate('patientId', 'fullName phone email')
      .populate('dentistId', 'name email')
      .sort({ dateTime: -1 })
      .lean(),
  ]);

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Scheduled', value: 'scheduled' },
    { label: 'Checked In', value: 'checked-in' },
    { label: 'In Room', value: 'in-room' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
  ];

  return (
    <main className="min-h-screen bg-page px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-text-muted">Logged in as {session.user.email}</p>
            <h1 className="mt-1 text-2xl font-bold text-text-heading">Appointments</h1>
            <p className="mt-1 text-sm text-text-muted">
              {total} total · {todayCount} today · {upcomingCount} upcoming
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
            label="Today"
            value={todayCount}
            icon={<CalendarIcon className="h-5 w-5 text-blue-500" />}
          />
          <StatCard
            label="Upcoming"
            value={upcomingCount}
            icon={<ClockIcon className="h-5 w-5 text-orange-500" />}
          />
          <StatCard
            label="Completed"
            value={completedCount}
            icon={<CheckIcon className="h-5 w-5 text-green-500" />}
          />
        </div>

        {/* Status Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {filters.map((f) => (
            <Link
              key={f.value}
              href={f.value === 'all' ? '/appointments' : `/appointments?status=${f.value}`}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                (statusFilter || 'all') === f.value
                  ? 'bg-brand-primary text-white'
                  : 'bg-white border border-neutral-200 text-text-heading hover:bg-neutral-50'
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>

        {/* Appointments List */}
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-base font-semibold text-neutral-900">
            {statusFilter && statusFilter !== 'all'
              ? `${statusLabel[statusFilter] || statusFilter} Appointments`
              : 'All Appointments'}{' '}
            ({appointments.length})
          </h2>
          {appointments.length === 0 ? (
            <p className="py-8 text-center text-sm text-text-muted">No appointments found</p>
          ) : (
            <div className="space-y-3">
              {appointments.map((apt) => {
                const patient = apt.patientId as unknown as {
                  _id: string;
                  fullName: string;
                  phone: string;
                  email: string;
                };
                const dentist = apt.dentistId as unknown as {
                  _id: string;
                  name: string;
                  email: string;
                } | null;
                const aptDate = new Date(apt.dateTime);
                const isToday =
                  aptDate.toDateString() === now.toDateString();
                const isPast = aptDate < now;

                return (
                  <div
                    key={apt._id.toString()}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                      isToday
                        ? 'border-brand-primary/30 bg-brand-primary/5'
                        : isPast
                          ? 'border-neutral-100 bg-neutral-50 opacity-70'
                          : 'border-neutral-100 bg-white hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-[60px]">
                        <p className="text-xs font-medium text-text-muted">
                          {isToday ? 'Today' : aptDate.toLocaleDateString('en-US', { weekday: 'short' })}
                        </p>
                        <p className="text-sm font-bold text-text-heading">
                          {formatTime(apt.dateTime)}
                        </p>
                      </div>
                      <div className="border-l border-neutral-200 pl-4">
                        <p className="text-sm font-medium text-text-heading">
                          {patient?.fullName || 'Unknown Patient'}
                        </p>
                        <p className="text-xs text-text-muted">
                          {patient?.phone || patient?.email || '—'}
                          {dentist && <> · Dr. {dentist.name}</>}
                        </p>
                        {apt.notes && (
                          <p className="mt-0.5 text-xs text-text-muted italic">{apt.notes}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          statusBadge[apt.status] || 'bg-neutral-100 text-neutral-600'
                        }`}
                      >
                        {statusLabel[apt.status] || apt.status}
                      </span>
                      <Link
                        href={`/patients/${patient?._id}`}
                        className="text-xs font-medium text-brand-primary hover:underline"
                      >
                        Patient
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
