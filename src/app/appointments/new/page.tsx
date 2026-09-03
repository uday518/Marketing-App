"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface Patient {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
}

interface Clinic {
  _id: string;
  name: string;
}

function getDefaultDate() {
  return new Date().toISOString().split("T")[0];
}

function getDefaultTime() {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 30);
  return now.toTimeString().slice(0, 5);
}

export default function NewAppointmentPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedClinicId, setSelectedClinicId] = useState("");
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [date, setDate] = useState(getDefaultDate);
  const [time, setTime] = useState(getDefaultTime);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasClinic = !!session?.user?.clinicId;
  const isPatient = session?.user?.role === "patient";
  const clinicId = hasClinic ? session.user.clinicId : selectedClinicId;

  useEffect(() => {
    if (status !== "authenticated" || hasClinic) return;
    fetch("/api/clinics")
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setClinics(data); })
      .catch(() => {});
  }, [status, hasClinic]);

  useEffect(() => {
    if (!clinicId) return;
    let cancelled = false;
    fetch(`/api/clinics/${clinicId}/patients`)
      .then((res) => res.json())
      .then((data) => { if (!cancelled && Array.isArray(data)) setPatients(data); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [clinicId]);

  const filteredPatients = patients.filter((p) => {
    const q = patientSearch.toLowerCase();
    return (
      p.fullName.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.phone.toLowerCase().includes(q)
    );
  });

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-secondary-100 px-6 py-10">
        <div className="mx-auto max-w-md text-center text-sm text-text-muted">Loading…</div>
      </main>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!clinicId) {
      setError("Please select a clinic.");
      setIsSubmitting(false);
      return;
    }

    const pid = isPatient ? session.user.id : selectedPatient?._id;
    if (!pid) {
      setError("Please select a patient.");
      setIsSubmitting(false);
      return;
    }

    try {
      const dateTime = new Date(`${date}T${time}`);
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: pid,
          dateTime: dateTime.toISOString(),
          notes,
          clinicId,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create appointment");
      }
      router.push(isPatient ? "/portal" : "/dashboard");
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-secondary-100 px-6 py-10">
      <div className="mx-auto max-w-md rounded-xl border border-border-default bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-bold text-text-heading">
          New Appointment
        </h1>
        {error && (
          <p className="mb-4 rounded bg-red-50 px-3 py-2 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!hasClinic && (
            <div>
              <label className="block text-sm font-medium text-text-heading mb-1" htmlFor="clinicId">
                Clinic
              </label>
              <select
                id="clinicId"
                required
                value={selectedClinicId}
                onChange={e => {
                  setSelectedClinicId(e.target.value);
                  setSelectedPatient(null);
                  setPatientSearch("");
                }}
                className="w-full rounded-lg border border-border-default px-4 py-2.5 text-sm text-text-heading focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              >
                <option value="">Select a clinic…</option>
                {clinics.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
          )}

          {!isPatient && clinicId && (
            <div>
              <label className="block text-sm font-medium text-text-heading mb-1">
                Patient
              </label>
              <input
                type="text"
                placeholder="Search patient…"
                value={patientSearch}
                onChange={e => {
                  setPatientSearch(e.target.value);
                  setSelectedPatient(null);
                }}
                className="w-full rounded-lg border border-border-default px-4 py-2.5 text-sm text-text-heading placeholder:text-text-disabled focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              />
              {patientSearch && !selectedPatient && (
                <div className="mt-1 max-h-40 overflow-y-auto rounded-lg border border-border-default bg-white shadow-sm">
                  {filteredPatients.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-text-muted">No patients found</div>
                  ) : (
                    filteredPatients.map((p) => (
                      <button
                        key={p._id}
                        type="button"
                        onClick={() => {
                          setSelectedPatient(p);
                          setPatientSearch(p.fullName);
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm hover:bg-neutral-50 border-b border-border-default last:border-0"
                      >
                        <span className="font-medium text-text-heading">{p.fullName}</span>
                        <span className="ml-2 text-text-muted">
                          {p.email || p.phone || "—"}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              )}
              {selectedPatient && (
                <div className="mt-2 flex items-center gap-2 rounded-lg bg-neutral-50 px-3 py-2">
                  <span className="text-sm text-text-heading font-medium">{selectedPatient.fullName}</span>
                  <button
                    type="button"
                    onClick={() => { setSelectedPatient(null); setPatientSearch(""); }}
                    className="ml-auto text-xs text-text-muted hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          )}

          {isPatient && hasClinic && (
            <p className="text-sm text-text-muted">
              Booking as: <span className="font-medium text-text-heading">{session.user.name}</span>
            </p>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-heading mb-1" htmlFor="date">
                Date
              </label>
              <input
                id="date"
                type="date"
                required
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full rounded-lg border border-border-default px-3 py-2.5 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-heading mb-1" htmlFor="time">
                Time
              </label>
              <input
                id="time"
                type="time"
                required
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full rounded-lg border border-border-default px-3 py-2.5 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-heading mb-1" htmlFor="notes">
              Notes
            </label>
            <input
              id="notes"
              type="text"
              placeholder="Optional"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full rounded-lg border border-border-default px-4 py-2.5 text-sm text-text-heading placeholder:text-text-disabled focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover disabled:opacity-60"
          >
            {isSubmitting ? "Booking…" : "Book Appointment"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-text-muted">
          <Link href={isPatient ? "/portal" : "/dashboard"} className="text-brand-primary hover:underline">
            ← Back
          </Link>
        </p>
      </div>
    </main>
  );
}
