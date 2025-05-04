"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Mail, User, Building, Clock } from "lucide-react";
import { ImageUpload } from "./image-upload";

// Mock user data - in a real app, you would fetch this from your API
const mockUser = {
  id: "clj2hf9xk0000qwer1234567",
  name: "Jane Smith",
  email: "jane.smith@example.com",
  imageUrl: "/placeholder.svg?height=128&width=128",
  role: "admin",
  createdAt: new Date("2023-01-15"),
  updatedAt: new Date("2023-06-20"),
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  imageUrl: z.string().optional(),
});

export function UserProfile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [user, setUser] = useState(mockUser);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsUpdating(true);

    // Simulate API call
    setTimeout(() => {
      setUser({
        ...user,
        ...values,
        updatedAt: new Date(),
      });
      setIsUpdating(false);
    }, 1000);

    // In a real app, you would call your API here
    // Example: await updateUserProfile(user.id, values);
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

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
                  src={user.imageUrl || "/placeholder.svg"}
                  alt={user.name}
                />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </CardDescription>
                <Badge className="mt-2 w-fit">{user.role}</Badge>
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
                <span className="text-sm font-medium">{user.id}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground text-sm">Role:</span>
                <span className="text-sm font-medium capitalize">
                  {user.role}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground text-sm">
                  Member since:
                </span>
                <span className="text-sm font-medium">
                  {formatDate(user.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground text-sm">
                  Last updated:
                </span>
                <span className="text-sm font-medium">
                  {formatDate(user.updatedAt)}
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
                  <div className="text-2xl font-bold">24</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium">Leads</div>
                  <div className="text-2xl font-bold">12</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium">Deals</div>
                  <div className="text-2xl font-bold">8</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium">Tasks</div>
                  <div className="text-2xl font-bold">15</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="edit">
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>
              Update your profile information here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="mb-6 flex flex-col items-center">
                  <Avatar className="mb-4 h-24 w-24">
                    <AvatarImage
                      src={
                        form.watch("imageUrl") ||
                        "/placeholder.svg?height=128&width=128"
                      }
                      alt={form.watch("name")}
                    />
                    <AvatarFallback>
                      {form.watch("name")?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <ImageUpload
                    value={form.watch("imageUrl")}
                    onChange={(url) => form.setValue("imageUrl", url)}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your email address is used for notifications and login.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isUpdating}>
                  {isUpdating ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
