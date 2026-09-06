"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import DataTable, {
  Column,
} from "@/components/admin/shared/DataTable";
import StatusBadge from "@/components/admin/shared/StatusBadge";

interface Contact {
  _id: string;

  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  source: string;

  status: "New" | "Contacted" | "Resolved" | "Closed";

  notes?: string;

  createdAt: string;
  updatedAt: string;
}

const columns: Column<Contact>[] = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "phone",
    label: "Phone",
  },
  {
    key: "company",
    label: "Company / Clinic",
  },
  {
    key: "subject",
    label: "Subject",
  },
  {
    key: "source",
    label: "Source",
  },
  {
    key: "status",
    label: "Status",
    render: (item) => (
      <StatusBadge status={item.status} />
    ),
  },
  {
    key: "createdAt",
    label: "Created",
    render: (item) =>
      new Date(item.createdAt).toLocaleDateString(),
  },
];

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filter, setFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedContact, setSelectedContact] =
    useState<Contact | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");

  /*
   * Fetch contacts
   */
  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/platform-admin/contacts"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(
          data.message || "Failed to fetch contacts"
        );
      }

      setContacts(data.data || []);
    } catch (error) {
      console.error(
        "Failed to fetch contacts:",
        error
      );

      setError(
        "Failed to load contacts. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  /*
   * Filter contacts
   */
  const filteredData =
    filter === "all"
      ? contacts
      : contacts.filter(
          (contact) => contact.status === filter
        );

  /*
   * Status counts
   */
  const statusCounts = {
    all: contacts.length,

    New: contacts.filter(
      (contact) => contact.status === "New"
    ).length,

    Contacted: contacts.filter(
      (contact) => contact.status === "Contacted"
    ).length,

    Resolved: contacts.filter(
      (contact) => contact.status === "Resolved"
    ).length,

    Closed: contacts.filter(
      (contact) => contact.status === "Closed"
    ).length,
  };

  const filters = [
    "all",
    "New",
    "Contacted",
    "Resolved",
    "Closed",
  ] as const;

  /*
   * Open contact modal
   */
  function handleRowClick(contact: Contact) {
    setSelectedContact(contact);
    setSaveError("");
    setSaveSuccess("");
  }

  /*
   * Update selected contact locally
   */
  function updateSelectedContact(
    field: keyof Contact,
    value: string
  ) {
    setSelectedContact((current) => {
      if (!current) {
        return null;
      }

      return {
        ...current,
        [field]: value,
      };
    });

    setSaveError("");
    setSaveSuccess("");
  }

  /*
   * Save contact
   */
  async function handleSave() {
    if (!selectedContact) {
      return;
    }

    setSaveError("");
    setSaveSuccess("");

    /*
     * Basic validation
     */
    if (!selectedContact.name.trim()) {
      setSaveError("Full name is required.");
      return;
    }

    if (!selectedContact.email.trim()) {
      setSaveError("Email is required.");
      return;
    }

    if (!selectedContact.phone.trim()) {
      setSaveError("Phone number is required.");
      return;
    }

    if (!selectedContact.company.trim()) {
      setSaveError("Company / Clinic is required.");
      return;
    }

    if (!selectedContact.subject.trim()) {
      setSaveError("Subject is required.");
      return;
    }

    if (!selectedContact.message.trim()) {
      setSaveError("Message is required.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(
        `/api/platform-admin/contacts/${selectedContact._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: selectedContact.name.trim(),
            email: selectedContact.email
              .trim()
              .toLowerCase(),
            phone: selectedContact.phone.trim(),
            company: selectedContact.company.trim(),
            subject: selectedContact.subject.trim(),
            message: selectedContact.message.trim(),
            status: selectedContact.status,
            notes:
              selectedContact.notes?.trim() || "",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to update contact"
        );
      }

      const updatedContact: Contact = data.data;

      /*
       * Update table immediately
       */
      setContacts((currentContacts) =>
        currentContacts.map((contact) =>
          contact._id === updatedContact._id
            ? updatedContact
            : contact
        )
      );

      /*
       * Update modal with saved data
       */
      setSelectedContact(updatedContact);

      setSaveSuccess(
        "Contact updated successfully."
      );
    } catch (error) {
      console.error(
        "Failed to update contact:",
        error
      );

      setSaveError(
        error instanceof Error
          ? error.message
          : "Failed to update contact."
      );
    } finally {
      setIsSaving(false);
    }
  }

  /*
   * Close modal
   */
  function handleCloseModal() {
    if (isSaving) {
      return;
    }

    setSelectedContact(null);
    setSaveError("");
    setSaveSuccess("");
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contacts"
        description="Manage platform contacts and inquiries"
      />

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              filter === status
                ? "bg-brand-primary text-white shadow-sm"
                : "border border-border-default bg-white text-text-body hover:bg-neutral-50"
            }`}
          >
            {status === "all" ? "All" : status}

            {status !== "all" &&
              ` (${
                statusCounts[
                  status as keyof typeof statusCounts
                ]
              })`}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="py-10 text-center text-text-body">
          Loading contacts...
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Contacts Table */}
      {!loading && !error && (
        <DataTable
          columns={columns}
          data={filteredData}
          emptyMessage="No contacts found"
          onRowClick={handleRowClick}
        />
      )}

      {/* Contact Details / Edit Modal */}
      {selectedContact && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={handleCloseModal}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border-default px-6 py-5">
              <div>
                <h2 className="text-xl font-semibold text-text-heading">
                  Contact Details
                </h2>

                <p className="mt-1 text-sm text-text-muted">
                  View and update contact information
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                disabled={isSaving}
                className="rounded-lg p-2 text-text-muted transition-colors hover:bg-neutral-100 hover:text-text-heading disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Close contact details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-6 p-6">

              {/* Contact Information */}
              <section>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-text-muted">
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1.5 block text-sm font-medium text-text-heading"
                    >
                      Full Name
                    </label>

                    <input
                      id="contact-name"
                      type="text"
                      value={selectedContact.name}
                      onChange={(event) =>
                        updateSelectedContact(
                          "name",
                          event.target.value
                        )
                      }
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-text-heading outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-primary-100"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-1.5 block text-sm font-medium text-text-heading"
                    >
                      Email
                    </label>

                    <input
                      id="contact-email"
                      type="email"
                      value={selectedContact.email}
                      onChange={(event) =>
                        updateSelectedContact(
                          "email",
                          event.target.value
                        )
                      }
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-text-heading outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-primary-100"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="mb-1.5 block text-sm font-medium text-text-heading"
                    >
                      Phone
                    </label>

                    <input
                      id="contact-phone"
                      type="tel"
                      value={selectedContact.phone}
                      onChange={(event) =>
                        updateSelectedContact(
                          "phone",
                          event.target.value
                        )
                      }
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-text-heading outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-primary-100"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label
                      htmlFor="contact-company"
                      className="mb-1.5 block text-sm font-medium text-text-heading"
                    >
                      Company / Clinic
                    </label>

                    <input
                      id="contact-company"
                      type="text"
                      value={selectedContact.company}
                      onChange={(event) =>
                        updateSelectedContact(
                          "company",
                          event.target.value
                        )
                      }
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-text-heading outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-primary-100"
                    />
                  </div>
                </div>
              </section>

              {/* Inquiry */}
              <section>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-text-muted">
                  Inquiry
                </h3>

                <div className="space-y-4">

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="mb-1.5 block text-sm font-medium text-text-heading"
                    >
                      Subject
                    </label>

                    <input
                      id="contact-subject"
                      type="text"
                      value={selectedContact.subject}
                      onChange={(event) =>
                        updateSelectedContact(
                          "subject",
                          event.target.value
                        )
                      }
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-text-heading outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-primary-100"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-1.5 block text-sm font-medium text-text-heading"
                    >
                      Message
                    </label>

                    <textarea
                      id="contact-message"
                      value={selectedContact.message}
                      onChange={(event) =>
                        updateSelectedContact(
                          "message",
                          event.target.value
                        )
                      }
                      rows={6}
                      className="w-full resize-y rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-text-heading outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-primary-100"
                    />
                  </div>
                </div>
              </section>

              {/* Management */}
              <section>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-text-muted">
                  Management
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* Status */}
                  <div>
                    <label
                      htmlFor="contact-status"
                      className="mb-1.5 block text-sm font-medium text-text-heading"
                    >
                      Status
                    </label>

                    <select
                      id="contact-status"
                      value={selectedContact.status}
                      onChange={(event) =>
                        updateSelectedContact(
                          "status",
                          event.target.value
                        )
                      }
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-text-heading outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-primary-100"
                    >
                      <option value="New">
                        New
                      </option>

                      <option value="Contacted">
                        Contacted
                      </option>

                      <option value="Resolved">
                        Resolved
                      </option>

                      <option value="Closed">
                        Closed
                      </option>
                    </select>
                  </div>

                  {/* Source */}
                  <div>
                    <label
                      htmlFor="contact-source"
                      className="mb-1.5 block text-sm font-medium text-text-heading"
                    >
                      Source
                    </label>

                    <input
                      id="contact-source"
                      type="text"
                      value={selectedContact.source}
                      disabled
                      className="w-full cursor-not-allowed rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-3 text-sm text-text-muted outline-none"
                    />
                  </div>
                </div>

                {/* Internal Notes */}
                <div className="mt-4">
                  <label
                    htmlFor="contact-notes"
                    className="mb-1.5 block text-sm font-medium text-text-heading"
                  >
                    Internal Notes
                  </label>

                  <textarea
                    id="contact-notes"
                    value={selectedContact.notes || ""}
                    onChange={(event) =>
                      updateSelectedContact(
                        "notes",
                        event.target.value
                      )
                    }
                    rows={4}
                    placeholder="Add internal notes..."
                    className="w-full resize-y rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-text-heading outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-primary-100"
                  />
                </div>
              </section>

              {/* Metadata */}
              <section className="rounded-xl bg-neutral-50 p-4">
                <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">

                  <div>
                    <span className="text-text-muted">
                      Created
                    </span>

                    <p className="mt-1 font-medium text-text-heading">
                      {new Date(
                        selectedContact.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <span className="text-text-muted">
                      Last Updated
                    </span>

                    <p className="mt-1 font-medium text-text-heading">
                      {new Date(
                        selectedContact.updatedAt
                      ).toLocaleString()}
                    </p>
                  </div>

                </div>
              </section>

              {/* Save Error */}
              {saveError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {saveError}
                </div>
              )}

              {/* Save Success */}
              {saveSuccess && (
                <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {saveSuccess}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-border-default px-6 py-4">

              <button
                type="button"
                disabled={isSaving}
                onClick={handleCloseModal}
                className="rounded-lg border border-border-default bg-white px-5 py-2.5 text-sm font-medium text-text-body transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isSaving}
                onClick={handleSave}
                className="rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
