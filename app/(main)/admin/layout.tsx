import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/sign-in");
  }

  if (user.role !== "admin") {
    redirect("/dashboard");
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
