import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { Appointment, Encounter, Patient, TreatmentPlan } from '@/lib/models';
import SignOutButton from '@/components/SignOutButton/SignOutButton';

export const metadata = {
  title: 'Patient — mysaas',
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

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-text-muted">{label}</p>
      <p className="mt-1 text-sm text-text-heading">{value || '—'}</p>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border-default bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-bold text-text-heading">{title}</h2>
      {children}
    </div>
  );
}

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  if (session.user.role === 'patient') {
    redirect('/portal');
  }

  const { id } = await params;

  if (!mongoose.isValidObjectId(id)) {
    redirect('/patients');
  }

  await connectToDatabase();

  const clinicFilter = session.user.clinicId ? { clinicId: session.user.clinicId } : {};

  const patient = await Patient.findOne({ _id: id, ...clinicFilter }).lean();

  if (!patient) {
    redirect('/patients');
  }

  const [appointments, encounters, plans] = await Promise.all([
    Appointment.find({ patientId: id }).sort({ dateTime: -1 }).limit(10).lean(),
    Encounter.find({ patientId: id }).sort({ createdAt: -1 }).limit(10).lean(),
    TreatmentPlan.find({ patientId: id }).sort({ updatedAt: -1 }).limit(10).lean(),
  ]);

  const planTotal = (plan: (typeof plans)[number]) =>
    plan.items.reduce((sum, item) => sum + (item.cost ?? 0), 0);

  return (
    <main className="min-h-screen bg-page px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/patients"
              className="text-sm font-medium text-brand-primary transition-colors hover:text-brand-primary-hover"
            >
              ← Patients
            </Link>
            <span className="text-text-muted">/</span>
            <p className="text-sm text-text-muted">Patient record</p>
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

        <section className="mb-6 rounded-2xl border border-border-default bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-text-heading">{patient.fullName}</h1>
              <p className="mt-1 text-sm text-text-muted">
                Added {new Date(patient.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Detail label="Email" value={patient.email} />
            <Detail label="Phone" value={patient.phone} />
            <Detail
              label="Date of Birth"
              value={patient.dob ? new Date(patient.dob).toLocaleDateString() : ''}
            />
            <Detail label="Insurance" value={patient.insurance} />
            <Detail label="Address" value={patient.address} />
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SectionCard title="Medical History">
            {patient.medicalHistory.length === 0 ? (
              <p className="text-sm text-text-muted">No conditions recorded.</p>
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

          <SectionCard title="Appointments">
            {appointments.length === 0 ? (
              <p className="text-sm text-text-muted">No appointments yet.</p>
            ) : (
              <ul className="divide-y divide-border-default">
                {appointments.map((appointment) => (
                  <li key={appointment._id.toString()} className="flex items-center justify-between gap-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-text-heading">
                        {new Date(appointment.dateTime).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-text-muted">
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
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SectionCard title="Clinical Encounters">
            {encounters.length === 0 ? (
              <p className="text-sm text-text-muted">No encounters yet.</p>
            ) : (
              <ul className="divide-y divide-border-default">
                {encounters.map((encounter) => (
                  <li key={encounter._id.toString()} className="py-3">
                    <p className="text-sm font-medium text-text-heading">
                      {new Date(encounter.createdAt).toLocaleDateString()}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-text-muted">
                      {encounter.findings || encounter.diagnosis || 'No notes recorded.'}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>

          <SectionCard title="Treatment Plans">
            {plans.length === 0 ? (
              <p className="text-sm text-text-muted">No treatment plans yet.</p>
            ) : (
              <ul className="divide-y divide-border-default">
                {plans.map((plan) => (
                  <li key={plan._id.toString()} className="flex items-center justify-between gap-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-text-heading">
                        {plan.items.length} procedure{plan.items.length === 1 ? '' : 's'}
                      </p>
                      <p className="text-xs text-text-muted">
                        {plan.items.length > 0
                          ? `${plan.items.map((item) => item.procedure).join(', ')}`
                          : 'No items'}
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
        </div>
      </div>
    </main>
  );
}