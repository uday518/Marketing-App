"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { z } from "zod";

const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name is too long"),

    clinicName: z
      .string()
      .trim()
      .min(2, "Clinic name must be at least 2 characters")
      .max(150, "Clinic name is too long"),

    email: z
      .string()
      .trim()
      .email("Enter a valid email"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /[A-Z]/,
        "Password must contain at least one uppercase letter",
      )
      .regex(
        /[a-z]/,
        "Password must contain at least one lowercase letter",
      )
      .regex(
        /[0-9]/,
        "Password must contain at least one number",
      )
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one symbol",
      ),

    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

type FormData = z.infer<typeof signupSchema>;

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 12s3-8 10-8 10 8 10 8-3 8-10 8-10-8-10-8Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 3l18 18" />
      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
      <path d="M9.9 4.2A10.9 10.9 0 0 1 12 4c7 0 10 8 10 8a18.2 18.2 0 0 1-3 4.4" />
      <path d="M6.6 6.6C3.7 8.5 2 12 2 12s3 8 10 8a9.8 9.8 0 0 0 3.4-.6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="shrink-0"
      aria-hidden="true"
    >
      <path
        d="M11.5 3.5L5.5 10L2.5 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    name: "",
    clinicName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      // -----------------------------------------------
      // Client-side validation
      // -----------------------------------------------

      const parsed = signupSchema.safeParse(form);

      if (!parsed.success) {
        setError(
          parsed.error.issues[0]?.message ??
            "Please check your information.",
        );
        return;
      }

      // -----------------------------------------------
      // Create clinic + owner
      // -----------------------------------------------

      const response = await fetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsed.data),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data?.error ??
            "Unable to create your clinic account. Please try again.",
        );
        return;
      }

      // -----------------------------------------------
      // Automatically sign in
      // -----------------------------------------------

      const loginResult = await signIn(
        "credentials",
        {
          email: parsed.data.email,
          password: parsed.data.password,
          redirect: false,
        },
      );

      if (loginResult?.error) {
        router.push("/login");
        return;
      }

      // -----------------------------------------------
      // Owner dashboard
      // -----------------------------------------------

      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("SIGNUP_ERROR:", error);

      setError(
        "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-secondary-100">
      {/* =================================================
          HERO / SIGNUP SECTION
      ================================================= */}

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-6xl">
          {/* Back */}
          <Link
            href="/"
            className="text-sm font-medium text-brand-primary hover:underline"
          >
            ← Back to Home
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-start">
            {/* =================================================
                LEFT SIDE
            ================================================= */}

            <div className="pt-4">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-primary">
                Free Trial
              </p>

              <h1 className="text-4xl font-extrabold leading-tight text-text-heading sm:text-5xl">
                Start Your Free Trial
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-text-body">
                Get 30 days of full access to your dental
                clinic management platform. No credit card
                required.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Full access to every module",
                  "Set up your clinic in minutes",
                  "Add dentists, managers, and receptionists",
                  "Manage patients and appointments",
                  "No credit card required",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-brand-primary">
                      <CheckIcon />
                    </span>

                    <span className="text-sm text-text-body">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Trial information */}
              <div className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6">
                <p className="text-sm font-semibold text-text-heading">
                  What happens after signup?
                </p>

                <div className="mt-4 space-y-3 text-sm text-text-body">
                  <p>
                    <span className="font-semibold">
                      1.
                    </span>{" "}
                    Your clinic is created.
                  </p>

                  <p>
                    <span className="font-semibold">
                      2.
                    </span>{" "}
                    You become the clinic owner.
                  </p>

                  <p>
                    <span className="font-semibold">
                      3.
                    </span>{" "}
                    You are automatically signed in.
                  </p>

                  <p>
                    <span className="font-semibold">
                      4.
                    </span>{" "}
                    You can start managing your clinic.
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT SIDE - FORM
            ================================================= */}

            <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-text-heading">
                Create Your Clinic Account
              </h2>

              <p className="mt-2 text-sm text-text-muted">
                You will become the owner of this clinic.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-5"
              >
                {/* =================================================
                    OWNER NAME
                ================================================= */}

                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-text-heading"
                  >
                    Owner Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Dr. Jane Smith"
                    autoComplete="name"
                    disabled={isSubmitting}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-text-heading outline-none transition placeholder:text-text-disabled focus:border-brand-primary focus:ring-2 focus:ring-primary-100 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                {/* =================================================
                    CLINIC NAME
                ================================================= */}

                <div>
                  <label
                    htmlFor="clinicName"
                    className="mb-1.5 block text-sm font-medium text-text-heading"
                  >
                    Clinic Name
                  </label>

                  <input
                    id="clinicName"
                    name="clinicName"
                    type="text"
                    value={form.clinicName}
                    onChange={handleChange}
                    placeholder="Smile Dental Clinic"
                    autoComplete="organization"
                    disabled={isSubmitting}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-text-heading outline-none transition placeholder:text-text-disabled focus:border-brand-primary focus:ring-2 focus:ring-primary-100 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                {/* =================================================
                    EMAIL
                ================================================= */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-text-heading"
                  >
                    Work Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="owner@yourclinic.com"
                    autoComplete="email"
                    disabled={isSubmitting}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-text-heading outline-none transition placeholder:text-text-disabled focus:border-brand-primary focus:ring-2 focus:ring-primary-100 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                {/* =================================================
                    PASSWORD
                ================================================= */}

                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-sm font-medium text-text-heading"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      autoComplete="new-password"
                      disabled={isSubmitting}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 pr-12 text-sm text-text-heading outline-none transition placeholder:text-text-disabled focus:border-brand-primary focus:ring-2 focus:ring-primary-100 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (prev) => !prev,
                        )
                      }
                      disabled={isSubmitting}
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-text-muted transition hover:text-text-heading disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>

                  <p className="mt-1.5 text-xs text-text-muted">
                    Minimum 8 characters with uppercase,
                    lowercase, number, and symbol.
                  </p>
                </div>

                {/* =================================================
                    CONFIRM PASSWORD
                ================================================= */}

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-1.5 block text-sm font-medium text-text-heading"
                  >
                    Confirm Password
                  </label>

                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      disabled={isSubmitting}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 pr-12 text-sm text-text-heading outline-none transition placeholder:text-text-disabled focus:border-brand-primary focus:ring-2 focus:ring-primary-100 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (prev) => !prev,
                        )
                      }
                      disabled={isSubmitting}
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-text-muted transition hover:text-text-heading disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <EyeIcon
                        open={showConfirmPassword}
                      />
                    </button>
                  </div>
                </div>

                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                  >
                    {error}
                  </div>
                )}

                {/* =================================================
                    SUBMIT
                ================================================= */}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-brand-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting
                    ? "Creating Clinic..."
                    : "Start Free Trial"}
                </button>
              </form>

              <p className="mt-5 text-center text-xs text-text-muted">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-brand-primary hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
