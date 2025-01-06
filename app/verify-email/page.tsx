"use client";

import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center popup-animate">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Verify your email
          </h2>
          <div className="mt-4 text-center text-gray-600">
            <p className="mb-4">
              We've sent you an email with a verification link. Please check
              your inbox and click the link to complete your registration.
            </p>
            <p className="text-sm">
              Didn't receive the email? Check your spam folder or{" "}
              <Link
                href="/signup"
                className="font-medium text-orange-600 hover:text-orange-500"
              >
                try signing up again
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-sm font-medium text-orange-600 hover:text-orange-500"
          >
            Return to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
