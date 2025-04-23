import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";

import { ArrowRight, FileText, PieChart, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-5">
                <h1 className="bg-gradient-to-r from-gray-800 to-green-500 bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-4xl md:text-5xl lg:text-6xl">
                  Manage Your Customer Relationships
                </h1>
                <p className="text-muted-foreground mx-auto w-2xl md:text-xl">
                  A comprehensive CRM solution for businesses of all sizes.
                  Manage contacts, track leads, and close more deals.
                </p>
              </div>
              <div className="space-x-4">
                <Link href={"/auth/login"}>
                  <Button className="px-4">
                    Get Started
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#">
                  <Button variant="outline" className="px-8">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl">
          <div className="grid gap-4 gap-x-4 p-4 md:grid-cols-3">
            <div className="rounded-lg border border-teal-300 bg-white p-6 text-center shadow">
              <div className="flex flex-col items-center space-y-3">
                <Users className="h-5 w-5 text-teal-600" />
                <h3 className="mb-2 text-xl font-semibold">
                  Contact Management
                </h3>
                <p className="text-muted-foreground">
                  Store and organize all your contacts with custom fields,
                  tagging, and categorization.
                </p>
              </div>
            </div>
            <div className="rounded-lg border border-fuchsia-300 bg-white p-6 text-center shadow">
              <div className="flex flex-col items-center space-y-3">
                <FileText className="h-5 w-5 text-fuchsia-600" />
                <h3 className="mb-2 text-xl font-semibold">Lead Tracking</h3>
                <p className="text-muted-foreground">
                  Capture, score, and qualify leads through a customizable
                  pipeline with multiple stages.
                </p>
              </div>
            </div>
            <div className="rounded-lg border border-orange-300 bg-white p-6 text-center shadow">
              <div className="flex flex-col items-center space-y-3">
                <PieChart className="h-5 w-5 text-orange-600" />
                <h3 className="mb-2 text-xl font-semibold">Analytics</h3>
                <p className="text-muted-foreground">
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
