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

  // New patient form
  const [showNewPatientForm, setShowNewPatientForm] = useState(false);
  const [newPatientName, setNewPatientName] = useState("");
  const [newPatientPhone, setNewPatientPhone] = useState("");
  const [newPatientEmail, setNewPatientEmail] = useState("");
  const [newPatientDob, setNewPatientDob] = useState("");
  const [newPatientAddress, setNewPatientAddress] = useState("");
  const [newPatientInsurance, setNewPatientInsurance] = useState("");
  const [newPatientMedicalHistory, setNewPatientMedicalHistory] = useState("");
  const [isCreatingPatient, setIsCreatingPatient] = useState(false);

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
      .then((data) => {
        if (Array.isArray(data)) {
          setClinics(data);
        }
      })
      .catch(() => {});
  }, [status, hasClinic]);

  useEffect(() => {
    if (!clinicId) {
      setPatients([]);
      return;
    }

    let cancelled = false;

    fetch(`/api/clinics/${clinicId}/patients`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && Array.isArray(data)) {
          setPatients(data);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [clinicId]);

  const filteredPatients = patients.filter((p) => {
    const q = patientSearch.toLowerCase().trim();

    if (!q) return true;

    return (
      p.fullName.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.phone.toLowerCase().includes(q)
    );
  });

  function resetNewPatientForm() {
    setNewPatientName("");
    setNewPatientPhone("");
    setNewPatientEmail("");
    setNewPatientDob("");
    setNewPatientAddress("");
    setNewPatientInsurance("");
    setNewPatientMedicalHistory("");
  }

  async function handleCreatePatient(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!clinicId) {
      setError("Please select a clinic first.");
      return;
    }

    if (!newPatientName.trim()) {
      setError("Patient full name is required.");
      return;
    }

    if (!newPatientPhone.trim()) {
      setError("Patient phone number is required.");
      return;
    }

    setIsCreatingPatient(true);
    setError(null);

    try {
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: newPatientName.trim(),
          phone: newPatientPhone.trim(),
          email: newPatientEmail.trim(),
          dob: newPatientDob || null,
          address: newPatientAddress.trim(),
          insurance: newPatientInsurance.trim(),
          medicalHistory: newPatientMedicalHistory.trim()
            ? [
                {
                  condition: newPatientMedicalHistory.trim(),
                  notes: "",
                },
              ]
            : [],
          clinicId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create patient");
      }

      const newPatient: Patient = {
        _id: data._id,
        fullName: data.fullName,
        email: data.email || "",
        phone: data.phone || "",
      };

      setPatients((current) => [newPatient, ...current]);
      setSelectedPatient(newPatient);
      setPatientSearch(newPatient.fullName);
      setShowNewPatientForm(false);
      resetNewPatientForm();
    } catch (err) {
      console.error(err);

      setError(err instanceof Error ? err.message : "Failed to create patient");
    } finally {
      setIsCreatingPatient(false);
    }
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

    const pid = isPatient ? session?.user?.id : selectedPatient?._id;

    if (!pid) {
      setError("Please select a patient.");
      setIsSubmitting(false);
      return;
    }

    try {
      const dateTime = new Date(`${date}T${time}`);

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

      router.push(isPatient ? "/portal" : "/admin");
    } catch (err) {
      console.error(err);

      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-secondary-100 px-6 py-10">
        <div className="mx-auto max-w-md text-center text-sm text-text-muted">
          Loading…
        </div>
      </main>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <main className="min-h-screen bg-secondary-100 px-6 py-10">
      <div className="mx-auto max-w-md rounded-xl border border-border-default bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-bold text-text-heading">
          New Appointment
        </h1>

        {error && (
          <p
            className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!hasClinic && (
            <div>
              <label
                className="mb-1 block text-sm font-medium text-text-heading"
                htmlFor="clinicId"
              >
                Clinic
              </label>

              <select
                id="clinicId"
                required
                value={selectedClinicId}
                onChange={(e) => {
                  setSelectedClinicId(e.target.value);
                  setSelectedPatient(null);
                  setPatientSearch("");
                  setShowNewPatientForm(false);
                }}
                className="w-full rounded-lg border border-border-default px-4 py-2.5 text-sm text-text-heading focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              >
                <option value="">Select a clinic…</option>

                {clinics.map((clinic) => (
                  <option key={clinic._id} value={clinic._id}>
                    {clinic.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {!isPatient && clinicId && (
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label
                  className="block text-sm font-medium text-text-heading"
                  htmlFor="patientSearch"
                >
                  Patient
                </label>

                {!showNewPatientForm && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewPatientForm(true);
                      setSelectedPatient(null);
                      setPatientSearch("");
                      setError(null);
                    }}
                    className="text-sm font-medium text-brand-primary hover:underline"
                  >
                    + Add New Patient
                  </button>
                )}
              </div>

              {!showNewPatientForm && (
                <>
                  <input
                    id="patientSearch"
                    type="text"
                    placeholder="Search patient…"
                    value={patientSearch}
                    onChange={(e) => {
                      setPatientSearch(e.target.value);
                      setSelectedPatient(null);
                    }}
                    className="w-full rounded-lg border border-border-default px-4 py-2.5 text-sm text-text-heading placeholder:text-text-disabled focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                  />

                  {patientSearch && !selectedPatient && (
                    <div className="mt-1 max-h-40 overflow-y-auto rounded-lg border border-border-default bg-white shadow-sm">
                      {filteredPatients.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-text-muted">
                          No patients found.
                        </div>
                      ) : (
                        filteredPatients.map((patient) => (
                          <button
                            key={patient._id}
                            type="button"
                            onClick={() => {
                              setSelectedPatient(patient);
                              setPatientSearch(patient.fullName);
                            }}
                            className="w-full border-b border-border-default px-4 py-2.5 text-left text-sm last:border-0 hover:bg-neutral-50"
                          >
                            <span className="font-medium text-text-heading">
                              {patient.fullName}
                            </span>

                            <span className="ml-2 text-text-muted">
                              {patient.email || patient.phone || "—"}
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                  )}

                  {selectedPatient && (
                    <div className="mt-2 flex items-center gap-2 rounded-lg bg-neutral-50 px-3 py-2">
                      <span className="font-medium text-sm text-text-heading">
                        {selectedPatient.fullName}
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPatient(null);
                          setPatientSearch("");
                        }}
                        className="ml-auto text-xs text-text-muted hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </>
              )}

              {showNewPatientForm && (
                <div className="mt-3 rounded-lg border border-border-default bg-neutral-50 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-semibold text-text-heading">
                        Add New Patient
                      </h2>

                      <p className="mt-0.5 text-xs text-text-muted">
                        Create a patient and use them for this appointment.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setShowNewPatientForm(false);
                        resetNewPatientForm();
                        setError(null);
                      }}
                      className="text-xs text-text-muted hover:text-red-500"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="space-y-3">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="newPatientName"
                        className="mb-1 block text-sm font-medium text-text-heading"
                      >
                        Full Name
                      </label>

                      <input
                        id="newPatientName"
                        type="text"
                        required
                        value={newPatientName}
                        onChange={(e) => setNewPatientName(e.target.value)}
                        placeholder="e.g. Sita Rai"
                        className="w-full rounded-lg border border-border-default bg-white px-3 py-2.5 text-sm text-text-heading placeholder:text-text-disabled focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="newPatientPhone"
                        className="mb-1 block text-sm font-medium text-text-heading"
                      >
                        Phone Number
                      </label>

                      <input
                        id="newPatientPhone"
                        type="tel"
                        required
                        value={newPatientPhone}
                        onChange={(e) => setNewPatientPhone(e.target.value)}
                        placeholder="e.g. 9800000000"
                        className="w-full rounded-lg border border-border-default bg-white px-3 py-2.5 text-sm text-text-heading placeholder:text-text-disabled focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="newPatientEmail"
                        className="mb-1 block text-sm font-medium text-text-heading"
                      >
                        Email
                        <span className="ml-1 text-xs font-normal text-text-muted">
                          (optional)
                        </span>
                      </label>

                      <input
                        id="newPatientEmail"
                        type="email"
                        value={newPatientEmail}
                        onChange={(e) => setNewPatientEmail(e.target.value)}
                        placeholder="e.g. sita@example.com"
                        className="w-full rounded-lg border border-border-default bg-white px-3 py-2.5 text-sm text-text-heading placeholder:text-text-disabled focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                      />
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label
                        htmlFor="newPatientDob"
                        className="mb-1 block text-sm font-medium text-text-heading"
                      >
                        Date of Birth
                      </label>

                      <input
                        id="newPatientDob"
                        type="date"
                        value={newPatientDob}
                        onChange={(e) => setNewPatientDob(e.target.value)}
                        className="w-full rounded-lg border border-border-default bg-white px-3 py-2.5 text-sm text-text-heading focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label
                        htmlFor="newPatientAddress"
                        className="mb-1 block text-sm font-medium text-text-heading"
                      >
                        Address
                      </label>

                      <input
                        id="newPatientAddress"
                        type="text"
                        value={newPatientAddress}
                        onChange={(e) => setNewPatientAddress(e.target.value)}
                        placeholder="e.g. Kathmandu, Nepal"
                        className="w-full rounded-lg border border-border-default bg-white px-3 py-2.5 text-sm text-text-heading placeholder:text-text-disabled focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                      />
                    </div>

                    {/* Insurance */}
                    <div>
                      <label
                        htmlFor="newPatientInsurance"
                        className="mb-1 block text-sm font-medium text-text-heading"
                      >
                        Insurance
                      </label>

                      <input
                        id="newPatientInsurance"
                        type="text"
                        value={newPatientInsurance}
                        onChange={(e) => setNewPatientInsurance(e.target.value)}
                        placeholder="e.g. Nepal Insurance"
                        className="w-full rounded-lg border border-border-default bg-white px-3 py-2.5 text-sm text-text-heading placeholder:text-text-disabled focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                      />
                    </div>

                    {/* Medical History */}
                    <div>
                      <label
                        htmlFor="newPatientMedicalHistory"
                        className="mb-1 block text-sm font-medium text-text-heading"
                      >
                        Medical History
                      </label>

                      <textarea
                        id="newPatientMedicalHistory"
                        rows={3}
                        value={newPatientMedicalHistory}
                        onChange={(e) =>
                          setNewPatientMedicalHistory(e.target.value)
                        }
                        placeholder="Enter patient's medical history..."
                        className="w-full resize-none rounded-lg border border-border-default bg-white px-3 py-2.5 text-sm text-text-heading placeholder:text-text-disabled focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                      />
                    </div>

                    {/* Create Patient */}
                    <button
                      type="button"
                      onClick={() => {
                        const form = document.getElementById(
                          "newPatientForm",
                        ) as HTMLFormElement | null;

                        if (form) {
                          form.requestSubmit();
                        } else {
                          handleCreatePatient({
                            preventDefault: () => {},
                          } as React.FormEvent<HTMLFormElement>);
                        }
                      }}
                      disabled={isCreatingPatient}
                      className="w-full rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isCreatingPatient
                        ? "Creating Patient…"
                        : "Create Patient"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {isPatient && hasClinic && (
            <p className="text-sm text-text-muted">
              Booking as:{" "}
              <span className="font-medium text-text-heading">
                {session.user.name}
              </span>
            </p>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="mb-1 block text-sm font-medium text-text-heading"
                htmlFor="date"
              >
                Date
              </label>

              <input
                id="date"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border border-border-default px-3 py-2.5 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              />
            </div>

            <div>
              <label
                className="mb-1 block text-sm font-medium text-text-heading"
                htmlFor="time"
              >
                Time
              </label>

              <input
                id="time"
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-lg border border-border-default px-3 py-2.5 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              />
            </div>
          </div>

          <div>
            <label
              className="mb-1 block text-sm font-medium text-text-heading"
              htmlFor="notes"
            >
              Notes
            </label>

            <input
              id="notes"
              type="text"
              placeholder="Optional"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-lg border border-border-default px-4 py-2.5 text-sm text-text-heading placeholder:text-text-disabled focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || (!isPatient && !selectedPatient)}
            className="w-full rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Booking…" : "Book Appointment"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          <Link
            href={isPatient ? "/portal" : "/admin"}
            className="text-brand-primary hover:underline"
          >
            ← Back
          </Link>
        </p>
      </div>
    </main>
  );
}
