import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { Search } from "lucide-react";
import Link from "next/link";

export default async function NotFound() {
  const user = await getCurrentUser();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-xl">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="rounded-full bg-slate-100 p-4">
                <Search className="h-12 w-12 text-slate-400" />
              </div>
            </div>
            <div className="text-destructive text-xl font-bold">404</div>
            <h1 className="mb-2 text-2xl font-bold text-slate-900">
              Page not found
            </h1>
            <p className="mb-6 text-slate-500">
              The page you are looking for doesn&apos;t exist or has been moved.
            </p>
            <div className="flex gap-4">
              <Button asChild>
                <Link href={user ? "/dashboard" : "/"}>
                  Go {user ? "dashboard" : "home"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 sm:px-8 sm:py-6">
          <p className="text-center text-xs text-slate-500">
            Try searching for what you&apos;re looking for or visit our
            homepage.
          </p>
        </div>
      </div>
    </div>
  );
}
