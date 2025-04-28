import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { ArrowRight, FileText, PieChart, Users } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-8 sm:py-12 md:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-4 sm:space-y-5">
                <h1 className="from-primary bg-gradient-to-r to-green-500 bg-clip-text text-2xl font-bold tracking-tighter text-transparent sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                  Manage Your Customer Relationships
                </h1>
                <p className="text-muted-foreground mx-auto max-w-md text-sm sm:text-base md:max-w-2xl md:text-lg lg:text-xl">
                  A comprehensive CRM solution for businesses of all sizes.
                  Manage contacts, track leads, and close more deals.
                </p>
              </div>
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Link href={"/auth/sign-in"}>
                  <Button className="px-4 py-2 sm:px-4">
                    Get Started
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#">
                  <Button variant="outline" className="px-6 py-2 sm:px-8">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 sm:px-6">
          <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
            <div className="rounded-lg border border-teal-300 bg-white p-4 text-center shadow sm:p-6">
              <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                <Users className="h-5 w-5 text-teal-600" />
                <h3 className="mb-1 text-lg font-semibold sm:mb-2 sm:text-xl">
                  Contact Management
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Store and organize all your contacts with custom fields,
                  tagging, and categorization.
                </p>
              </div>
            </div>
            <div className="rounded-lg border border-fuchsia-300 bg-white p-4 text-center shadow sm:p-6">
              <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                <FileText className="h-5 w-5 text-fuchsia-600" />
                <h3 className="mb-1 text-lg font-semibold sm:mb-2 sm:text-xl">
                  Lead Tracking
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Capture, score, and qualify leads through a customizable
                  pipeline with multiple stages.
                </p>
              </div>
            </div>
            <div className="rounded-lg border border-orange-300 bg-white p-4 text-center shadow sm:p-6">
              <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                <PieChart className="h-5 w-5 text-orange-600" />
                <h3 className="mb-1 text-lg font-semibold sm:mb-2 sm:text-xl">
                  Analytics
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Visualize your sales data with customizable dashboards and
                  reports.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
