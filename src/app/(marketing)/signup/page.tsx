"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      // ================================================
      // CREATE CLINIC + OWNER ACCOUNT
      // ================================================

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
          clinicName,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(
          data.error ??
            "Could not create your account. Please try again.",
        );
        return;
      }

      // ================================================
      // AUTOMATICALLY SIGN IN
      // ================================================

      const loginResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (loginResult?.error) {
        // Account was successfully created, but automatic
        // login failed. Send the user to the normal login page.
        router.push("/login");
        return;
      }

      // ================================================
      // FREE TRIAL → DASHBOARD
      // ================================================

      router.push("/dashboard");
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
    <main className="min-h-screen bg-secondary-100 px-6 py-20">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-text-heading">
            Start Your Free Trial
          </h1>

          <p className="mt-2 text-sm text-text-muted">
            Create your clinic account and start using
            the platform.
          </p>
        </div>

        {/* Signup Card */}
        <div className="rounded-xl border border-border-default bg-white p-8 shadow-sm">
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-text-heading"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
                autoComplete="name"
                placeholder="Maria Lopez"
                className="w-full rounded-lg border border-border-default px-4 py-2.5 text-sm text-text-heading placeholder:text-text-disabled focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              />
            </div>

            {/* Clinic Name */}
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
                value={clinicName}
                onChange={(e) =>
                  setClinicName(e.target.value)
                }
                required
                autoComplete="organization"
                placeholder="Smile Dental Clinic"
                className="w-full rounded-lg border border-border-default px-4 py-2.5 text-sm text-text-heading placeholder:text-text-disabled focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-text-heading"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
                autoComplete="email"
                placeholder="you@clinic.com"
                className="w-full rounded-lg border border-border-default px-4 py-2.5 text-sm text-text-heading placeholder:text-text-disabled focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              />
            </div>

            {/* Password */}
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
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  autoComplete="new-password"
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-border-default px-4 py-2.5 pr-12 text-sm text-text-heading placeholder:text-text-disabled focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous,
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-text-heading"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              <p className="mt-1 text-xs text-text-muted">
                Use a strong password with uppercase,
                lowercase, number, and symbol.
              </p>
            </div>

            {/* Confirm Password */}
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
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value,
                    )
                  }
                  required
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  className="w-full rounded-lg border border-border-default px-4 py-2.5 pr-12 text-sm text-text-heading placeholder:text-text-disabled focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (previous) => !previous,
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-text-heading"
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword
                    ? "🙈"
                    : "👁️"}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Creating Account..."
                : "Start Free Trial"}
            </button>
          </form>

          {/* Login */}
          <div className="mt-6 border-t border-border-default pt-6 text-center text-sm">
            <p className="text-text-muted">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-brand-primary transition-colors hover:text-brand-primary-hover"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
