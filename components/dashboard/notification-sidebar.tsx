"use client";

import type React from "react";

import { useState } from "react";
import {
  Bell,
  UserPlus,
  MessageSquare,
  Calendar,
  FileText,
  Settings,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  icon: React.ReactNode;
};

export default function NotificationSidebar() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Add new contact",
      description: "John Doe wants to connect with you",
      time: "Just now",
      read: false,
      icon: <UserPlus className="h-4 w-4" />,
    },
    {
      id: "2",
      title: "New message received",
      description: "Sarah sent you a message",
      time: "5 minutes ago",
      read: false,
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      id: "3",
      title: "Meeting scheduled",
      description: "Team meeting at 3:00 PM",
      time: "1 hour ago",
      read: false,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: "4",
      title: "Document shared",
      description: "Alex shared a document with you",
      time: "Yesterday",
      read: true,
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: "5",
      title: "Settings updated",
      description: "Your account settings were updated",
      time: "2 days ago",
      read: true,
      icon: <Settings className="h-4 w-4" />,
    },
  ]);

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true })),
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center bg-red-500 p-0 text-white">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>Notifications</SheetTitle>
          {unreadCount > 0 && (
            <Button size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </SheetHeader>
        <Separator className="my-4" />
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-4 pr-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 rounded-lg p-3 transition-colors ${
                    !notification.read ? "bg-muted/50" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="bg-primary/10 flex h-9 w-9 items-center justify-center rounded-full">
                    {notification.icon}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">
                        {notification.title}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {notification.time}
                      </p>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {notification.description}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="bg-primary h-2 w-2 rounded-full" />
                  )}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bell className="text-muted-foreground/50 h-12 w-12" />
                <h3 className="mt-4 text-lg font-semibold">No notifications</h3>
                <p className="text-muted-foreground text-sm">
                  You&apos;re all caught up! No new notifications.
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
