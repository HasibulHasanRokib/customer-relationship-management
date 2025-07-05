import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Mail, User, Clock } from "lucide-react";
import { User as TUser } from "@prisma/client";
import { formatDate } from "@/lib/utils";
import { UpdateProfile } from "./update-profile";

export function UserProfile({
  currentUser,
  contacts,
  deals,
  tasks,
  leads,
}: {
  currentUser: TUser;
  contacts: number;
  deals: number;
  tasks: number;
  leads: number;
}) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-8 grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="edit">Edit Profile</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="border-background h-20 w-20 border-4">
                <AvatarImage
                  src={currentUser.imageUrl || ""}
                  alt={currentUser.name}
                  className="object-contain"
                />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <CardTitle className="text-2xl">{currentUser.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {currentUser.email}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>
                Your personal information and account details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground text-sm">User ID:</span>
                <span className="text-sm font-medium">{currentUser.id}</span>
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground text-sm">
                  Member since:
                </span>
                <span className="text-sm font-medium">
                  {formatDate(currentUser.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground text-sm">
                  Last updated:
                </span>
                <span className="text-sm font-medium">
                  {formatDate(currentUser.updatedAt)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Activity</CardTitle>
              <CardDescription>
                Your recent activity and account statistics.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium">Contacts</div>
                  <div className="text-2xl font-bold">{contacts}</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium">Leads</div>
                  <div className="text-2xl font-bold">{leads}</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium">Deals</div>
                  <div className="text-2xl font-bold">{deals}</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium">Tasks</div>
                  <div className="text-2xl font-bold">{tasks}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="edit">
        <UpdateProfile user={currentUser} />
      </TabsContent>
    </Tabs>
  );
}
