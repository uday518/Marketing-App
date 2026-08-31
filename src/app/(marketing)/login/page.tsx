"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        const msg = result.error.includes("Too many")
          ? result.error
          : "Invalid email or password.";

        setError(msg);
        return;
      }

      const session = await getSession();

      // ================================================
      // DEMO ACCOUNT
      // ================================================

      if (session?.user.role === "demo_account") {
        router.push("/demo");
        router.refresh();
        return;
      }

      // ================================================
      // PATIENT
      // ================================================

      if (session?.user.role === "patient") {
        router.push("/portal");
        router.refresh();
        return;
      }

      // ================================================
      // PLATFORM ADMIN
      // ================================================

      if (session?.user.role === "platform_admin") {
        router.push("/platform-admin");
        router.refresh();
        return;
      }

      // ================================================
      // CLINIC STAFF
      // ================================================

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("LOGIN_ERROR:", error);

      setError(
        "Something went wrong while signing in. Please try again.",
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
            Sign In
          </h1>

          <p className="mt-2 text-sm text-text-muted">
            Sign in to continue to your account
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-xl border border-border-default bg-white p-8 shadow-sm">
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
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
                placeholder="you@example.com"
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
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-border-default px-4 py-2.5 pr-12 text-sm text-text-heading placeholder:text-text-disabled focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                />

                {/* Show / Hide Password */}
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

              {/* Forgot Password */}
              <div className="mt-1.5 flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-brand-primary transition-colors hover:text-brand-primary-hover"
                >
                  Forgot password?
                </Link>
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
                ? "Signing In..."
                : "Sign In"}
            </button>
          </form>

          {/* Signup */}
          <div className="mt-6 border-t border-border-default pt-6 text-center text-sm">
            <p className="text-text-muted">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-brand-primary transition-colors hover:text-brand-primary-hover"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Legal */}
        <p className="mt-6 text-center text-xs text-text-muted">
          By signing in, you agree to our{" "}
          <Link
            href="/terms"
            className="text-brand-primary hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-brand-primary hover:underline"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </main>
  );
}
