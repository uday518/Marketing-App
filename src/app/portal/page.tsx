import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { Appointment, Encounter, Patient, QueueEntry, TreatmentPlan } from '@/lib/models';
import SignOutButton from '@/components/SignOutButton/SignOutButton';
import StatCard from '@/components/ui/StatCard';
import { CalendarIcon, ChartIcon, ClockIcon, DocsIcon } from '@/components/ui/icons';

export const metadata = {
  title: 'Patient Portal — mysaas',
};

const statusStyles: Record<string, string> = {
  scheduled: 'bg-neutral-100 text-text-muted',
  'checked-in': 'bg-info-100 text-info-500',
  'in-room': 'bg-warning-100 text-warning-500',
  completed: 'bg-success-100 text-success-500',
  cancelled: 'bg-error-100 text-error-500',
  'no-show': 'bg-error-100 text-error-500',
};

const planStatusStyles: Record<string, string> = {
  draft: 'bg-neutral-100 text-text-muted',
  'in-progress': 'bg-warning-100 text-warning-500',
  accepted: 'bg-info-100 text-info-500',
  completed: 'bg-success-100 text-success-500',
};

function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border-default bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-bold text-text-heading">{title}</h2>
      {children}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-text-muted">{label}</p>
      <p className="mt-1 text-sm text-text-heading">{value || '—'}</p>
    </div>
  );
}

export default async function PortalPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/portal/login');
  }

  if (session.user.role !== 'patient') {
    redirect('/dashboard');
  }

  await connectToDatabase();

  const patient = await Patient.findById(session.user.id).lean();

  if (!patient) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-page px-6">
        <div className="max-w-md rounded-2xl border border-border-default bg-white p-10 text-center shadow-sm">
          <h1 className="text-xl font-bold text-text-heading">No account found</h1>
          <p className="mt-2 text-sm text-text-muted">
            We couldn&apos;t find your patient record. Please contact your clinic.
          </p>
          <div className="mt-6 flex justify-center">
            <SignOutButton />
          </div>
        </div>
      </main>
    );
  }

  const now = new Date();
  const [upcoming, reports, activePlans, queueEntry] = await Promise.all([
    Appointment.find({
      patientId: patient._id,
      dateTime: { $gte: now },
      status: { $nin: ['cancelled', 'no-show'] },
    })
      .sort({ dateTime: 1 })
      .limit(10)
      .lean(),
    Encounter.find({ patientId: patient._id }).sort({ createdAt: -1 }).limit(10).lean(),
    TreatmentPlan.find({
      patientId: patient._id,
      status: { $in: ['in-progress', 'accepted'] },
    })
      .sort({ updatedAt: -1 })
      .limit(10)
      .lean(),
    QueueEntry.findOne({ patientId: patient._id, status: 'waiting' })
      .sort({ joinedAt: 1 })
      .lean(),
  ]);

  let queuePosition: number | null = null;
  if (queueEntry) {
    queuePosition =
      (await QueueEntry.countDocuments({
        status: 'waiting',
        joinedAt: { $lt: queueEntry.joinedAt },
      })) + 1;
  }

  const nextAppointment = upcoming[0] ?? null;
  const firstName = patient.fullName.split(' ')[0] ?? 'there';
  const planTotal = (plan: (typeof activePlans)[number]) =>
    plan.items.reduce((sum, item) => sum + (item.cost ?? 0), 0);

  return (
    <main className="min-h-screen bg-page px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-text-muted">Your personal patient portal</p>
            <h1 className="mt-1 text-2xl font-bold text-text-heading">Hi, {firstName}</h1>
            <p className="mt-1 text-sm text-text-muted">
              Here&apos;s everything you need — your schedule, reports, and treatment plan.
            </p>
          </div>
          <SignOutButton />
        </header>

        {nextAppointment && (
          <section className="mb-6 rounded-2xl border border-brand-primary bg-brand-primary/5 p-6 shadow-sm">
            <p className="text-sm font-medium text-brand-primary">Next Appointment</p>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xl font-bold text-text-heading">
                  {new Date(nextAppointment.dateTime).toLocaleDateString([], {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="mt-1 text-sm text-text-muted">
                  {new Date(nextAppointment.dateTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  {nextAppointment.notes ? ` · ${nextAppointment.notes}` : ''}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  statusStyles[nextAppointment.status] ?? 'bg-neutral-100 text-text-muted'
                }`}
              >
                {nextAppointment.status}
              </span>
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Upcoming Appointments"
            value={upcoming.length}
            icon={<CalendarIcon className="h-5 w-5" />}
          />
          <StatCard label="Visit Reports" value={reports.length} icon={<DocsIcon className="h-5 w-5" />} />
          <StatCard
            label="Active Treatment Plans"
            value={activePlans.length}
            icon={<ChartIcon className="h-5 w-5" />}
          />
          <StatCard
            label="Your Queue Position"
            value={queuePosition ?? 0}
            icon={<ClockIcon className="h-5 w-5" />}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SectionCard title="Your Schedule">
            {upcoming.length === 0 ? (
              <p className="text-sm text-text-muted">You have no upcoming appointments.</p>
            ) : (
              <ul className="divide-y divide-border-default">
                {upcoming.map((appointment) => (
                  <li key={appointment._id.toString()} className="flex items-center justify-between gap-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-text-heading">
                        {new Date(appointment.dateTime).toLocaleDateString([], {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-xs text-text-muted">
                        {new Date(appointment.dateTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                        {appointment.notes ? ` · ${appointment.notes}` : ''}
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

          <SectionCard title="Visit Reports">
            {reports.length === 0 ? (
              <p className="text-sm text-text-muted">No visit reports yet.</p>
            ) : (
              <ul className="divide-y divide-border-default">
                {reports.map((report) => (
                  <li key={report._id.toString()} className="py-3">
                    <p className="text-sm font-medium text-text-heading">
                      Visit on {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-text-muted">
                      {report.findings || report.diagnosis || 'No notes recorded.'}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SectionCard title="Your Treatment Plan">
            {activePlans.length === 0 ? (
              <p className="text-sm text-text-muted">No active treatment plans.</p>
            ) : (
              <ul className="divide-y divide-border-default">
                {activePlans.map((plan) => (
                  <li key={plan._id.toString()} className="flex items-center justify-between gap-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-text-heading">
                        {plan.items.length} procedure{plan.items.length === 1 ? '' : 's'}
                      </p>
                      <p className="text-xs text-text-muted">
                        {plan.items.length > 0
                          ? plan.items.map((item) => item.procedure).join(', ')
                          : 'No items yet'}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-text-heading">
                        ${planTotal(plan).toLocaleString()}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          planStatusStyles[plan.status] ?? 'bg-neutral-100 text-text-muted'
                        }`}
                      >
                        {plan.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>

          <SectionCard title="Medical History">
            {patient.medicalHistory.length === 0 ? (
              <p className="text-sm text-text-muted">No conditions on record.</p>
            ) : (
              <ul className="divide-y divide-border-default">
                {patient.medicalHistory.map((entry, index) => (
                  <li key={index} className="py-3">
                    <p className="text-sm font-medium text-text-heading">{entry.condition}</p>
                    {entry.notes && <p className="mt-0.5 text-xs text-text-muted">{entry.notes}</p>}
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>
        </div>

        <div className="mt-6 rounded-2xl border border-border-default bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-bold text-text-heading">My Details</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Detail label="Full Name" value={patient.fullName} />
            <Detail label="Email" value={patient.email} />
            <Detail label="Phone" value={patient.phone} />
            <Detail
              label="Date of Birth"
              value={patient.dob ? new Date(patient.dob).toLocaleDateString() : ''}
            />
            <Detail label="Insurance" value={patient.insurance} />
            <Detail label="Address" value={patient.address} />
          </div>
        </div>
      </div>
    </main>
  );
}