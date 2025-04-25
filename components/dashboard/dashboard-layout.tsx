import Link from "next/link";
import { SignOut } from "../auth/sign-out";

import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Bell, Home, PlusCircle } from "lucide-react";
import { NavItems } from "./nav-items";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export async function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col">
        <div className="flex flex-1">
          <Sidebar>
            <SidebarHeader className="border-b">
              <div className="flex items-center gap-2 px-2">
                {/* <Avatar>
                  <AvatarImage src={session?.user.image || ""} />
                  <AvatarFallback className="bg-primary text-white">
                    {session?.user.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar> */}

                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm leading-none font-medium capitalize">
                    {/* {session?.user.name} */}
                  </p>

                  <p className="text-muted-foreground text-xs leading-none capitalize">
                    {/* {session?.user.role} */}
                  </p>
                </div>
              </div>
            </SidebarHeader>
            <NavItems />
            <SidebarFooter className="border-t p-4">
              <SignOut />
            </SidebarFooter>
          </Sidebar>
          <main className="flex-1">
            <header className="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:px-6">
              <SidebarTrigger />
              <div className="flex flex-1 items-center justify-between">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 font-semibold"
                >
                  <Home className="h-5 w-5" />
                  <span>CRM</span>
                </Link>

                <div className="flex items-center gap-x-4">
                  <Link href={""}>
                    <PlusCircle className="h-5 w-5" />
                  </Link>
                  <Link href={""}>
                    <Bell className="h-5 w-5" />
                  </Link>
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
