"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-xl">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-red-100 p-3">
                <AlertTriangle className="h-10 w-10 text-red-500" />
              </div>
              <h1 className="mb-2 text-2xl font-bold text-slate-900">
                Something went wrong!
              </h1>
              <p className="mb-6 text-slate-500">
                We apologize for the inconvenience. An unexpected error has
                occurred.
              </p>
              {error.digest && (
                <div className="mb-6 w-full overflow-auto rounded bg-slate-50 p-3">
                  <p className="font-mono text-xs text-slate-500">
                    Error ID: {error.digest}
                  </p>
                </div>
              )}
              <div className="flex gap-4">
                <Button onClick={() => reset()} variant="default">
                  Try again
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">Go home</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 sm:px-8 sm:py-6">
            <p className="text-center text-xs text-slate-500">
              If this problem persists, please contact our support team.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
