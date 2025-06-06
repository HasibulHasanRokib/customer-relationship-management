import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  Building2,
  Calendar,
  Clock,
  ArrowLeft,
  Pencil,
  Trash2,
} from "lucide-react";
import Link from "next/link";

// This would be replaced with your actual data fetching logic
async function getContact(id: string) {
  // Mock data based on your model
  return {
    id,
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corporation",
    imageUrl: "/placeholder.svg?height=300&width=300",
    createdAt: new Date("2023-09-15"),
    updatedAt: new Date("2024-04-28"),
    customFields: [
      { name: "LinkedIn", value: "linkedin.com/in/alexjohnson" },
      { name: "Birthday", value: "May 12, 1988" },
    ],
  };
}

// Format date to a readable format
function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const contact = await getContact(id);
  const fullName = `${contact.firstName} ${contact.lastName}`;

  // Get initials for avatar fallback
  const initials =
    `${contact.firstName.charAt(0)}${contact.lastName.charAt(0)}`.toUpperCase();

  return (
    <div className="container max-w-5xl space-y-8 py-8">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/contacts" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to contacts</span>
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Pencil className="h-4 w-4" />
            <span>Edit</span>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="flex items-center gap-1"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Left column - Profile card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <Avatar className="h-32 w-32">
                <AvatarImage
                  src={contact.imageUrl || "/placeholder.svg"}
                  alt={fullName}
                />
                <AvatarFallback className="text-3xl">{initials}</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-2xl">{fullName}</CardTitle>
            {contact.company && (
              <CardDescription className="flex items-center justify-center gap-1">
                <Building2 className="h-4 w-4" />
                <span>{contact.company}</span>
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {contact.email && (
              <div className="flex items-center gap-3">
                <Mail className="text-muted-foreground h-5 w-5" />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm hover:underline"
                >
                  {contact.email}
                </a>
              </div>
            )}
            {contact.phone && (
              <div className="flex items-center gap-3">
                <Phone className="text-muted-foreground h-5 w-5" />
                <a
                  href={`tel:${contact.phone}`}
                  className="text-sm hover:underline"
                >
                  {contact.phone}
                </a>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2">
            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <Calendar className="h-3.5 w-3.5" />
              <span>Created {formatDate(contact.createdAt)}</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <Clock className="h-3.5 w-3.5" />
              <span>Updated {formatDate(contact.updatedAt)}</span>
            </div>
          </CardFooter>
        </Card>

        {/* Right column - Details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Contact Details</CardTitle>
            <CardDescription>
              Complete information about {contact.firstName}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm font-medium">
                  First Name
                </p>
                <p>{contact.firstName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm font-medium">
                  Last Name
                </p>
                <p>{contact.lastName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm font-medium">
                  Email
                </p>
                <p>{contact.email || "—"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm font-medium">
                  Phone
                </p>
                <p>{contact.phone || "—"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm font-medium">
                  Company
                </p>
                <p>{contact.company || "—"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm font-medium">
                  Contact ID
                </p>
                <p className="font-mono text-xs">{contact.id}</p>
              </div>
            </div>

            {contact.customFields && contact.customFields.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="mb-3 text-lg font-medium">Custom Fields</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {contact.customFields.map((field, index) => (
                      <div key={index} className="space-y-1">
                        <p className="text-muted-foreground text-sm font-medium">
                          {field.name}
                        </p>
                        <p>{field.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Activity Timeline */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Track interactions and updates with this contact
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="relative mt-1">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <div className="bg-border absolute top-2 bottom-0 left-1 -ml-px w-px"></div>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Contact updated</p>
                    <Badge variant="outline" className="text-xs">
                      {formatDate(contact.updatedAt)}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Contact information was updated
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="relative mt-1">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <div className="bg-border absolute top-2 bottom-0 left-1 -ml-px w-px"></div>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Email sent</p>
                    <Badge variant="outline" className="text-xs">
                      {formatDate(
                        new Date(
                          contact.updatedAt.getTime() - 7 * 24 * 60 * 60 * 1000,
                        ),
                      )}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Quarterly newsletter sent to contact
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="relative mt-1">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Contact created</p>
                    <Badge variant="outline" className="text-xs">
                      {formatDate(contact.createdAt)}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Contact was added to the system
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
