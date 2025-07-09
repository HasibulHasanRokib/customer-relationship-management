"use client";
import { usePathname } from "next/navigation";
import {
  Calendar,
  FileText,
  LayoutDashboard,
  ClipboardList,
  Users,
  Building2,
  ChartPie,
  MessageSquare,
} from "lucide-react";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { userRole } from "@prisma/client";

export function NavItems({ userRole }: { userRole: userRole }) {
  const pathname = usePathname();

  return (
    <>
      <SidebarContent>
        {userRole === "admin" ? (
          <SidebarGroup>
            <SidebarGroupLabel>Settings</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminNavItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={item.title}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : (
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainNavItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={item.title}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </>
  );
}
const mainNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: ChartPie,
  },
  {
    title: "Contacts",
    href: "/dashboard/contacts",
    icon: Users,
  },

  {
    title: "Leads",
    href: "/dashboard/leads",
    icon: FileText,
  },
  {
    title: "Companies",
    href: "/dashboard/companies",
    icon: Building2,
  },

  {
    title: "Deals",
    href: "/dashboard/deals",
    icon: Calendar,
  },
  {
    title: "Tasks",
    href: "/dashboard/tasks",
    icon: ClipboardList,
  },
  {
    title: "Documents",
    href: "/dashboard/documents",
    icon: FileText,
  },
];

const adminNavItems = [
  {
    title: "Feedback",
    href: "/admin/feedback",
    icon: MessageSquare,
  },
];
