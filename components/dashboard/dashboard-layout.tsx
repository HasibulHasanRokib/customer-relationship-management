import Link from "next/link";

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { GalleryVerticalEnd } from "lucide-react";
import { NavItems } from "./nav-items";
import { NavigationCrumb } from "./navigation-crumb";

import { UserDropdown } from "./user-dropdown";
import { getCurrentUser } from "@/lib/auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col">
        <div className="flex flex-1">
          <Sidebar>
            <SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton size="lg" asChild>
                    <Link
                      href={user.role === "admin" ? "/admin" : "/dashboard"}
                    >
                      <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                        <GalleryVerticalEnd className="size-4" />
                      </div>
                      <div className="flex flex-col gap-0.5 leading-none">
                        <span className="font-semibold">
                          {user.role === "admin" ? "Admin panel" : "CRM"}
                        </span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarHeader>
            <NavItems userRole={user.role} />
          </Sidebar>
          <main className="flex-1">
            <header className="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:px-6">
              <SidebarTrigger />
              <div className="flex flex-1 items-center justify-between">
                <NavigationCrumb />

                <div className="flex items-center gap-x-4">
                  <UserDropdown
                    email={user.email}
                    name={user.name}
                    avatarUrl={user.imageUrl || ""}
                  />
                </div>
              </div>
            </header>
            <div className="p-4 md:p-6">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
