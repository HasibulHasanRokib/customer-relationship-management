import { AddNoteDialog } from "@/components/leads/add-note";
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
  ArrowLeft,
  Building2,
  Calendar,
  Clock,
  Mail,
  Phone,
  Pencil,
  Trash2,
  MoveRight,
  UserCheck,
  Users,
  Megaphone,
  Globe,
  Search,
} from "lucide-react";
import Link from "next/link";

// This would be replaced with your actual data fetching logic
async function getLead(id: string) {
  // Mock data based on your model
  return {
    id,
    name: "Sarah Thompson",
    company: "Innovate Tech Solutions",
    email: "sarah.thompson@innovatetech.com",
    phone: "+1 (555) 987-6543",
    source: "REFERRAL",
    status: "QUALIFIED",
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-05-01"),
    notes: [
      {
        id: "1",
        content:
          "Initial contact made via email. Sarah expressed interest in our enterprise solution.",
        createdAt: new Date("2024-03-10"),
      },
      {
        id: "2",
        content:
          "Had a 30-minute discovery call. Discussed potential use cases and pricing options.",
        createdAt: new Date("2024-04-15"),
      },
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

// Get status badge variant and label
function getStatusDetails(status: string) {
  switch (status) {
    case "NEW":
      return {
        variant: "default",
        label: "New Lead",
        icon: <Users className="mr-1 h-3.5 w-3.5" />,
      };
    case "CONTACTED":
      return {
        variant: "secondary",
        label: "Contacted",
        icon: <Mail className="mr-1 h-3.5 w-3.5" />,
      };
    case "QUALIFIED":
      return {
        variant: "success",
        label: "Qualified",
        icon: <UserCheck className="mr-1 h-3.5 w-3.5" />,
      };
    case "PROPOSAL":
      return {
        variant: "warning",
        label: "Proposal Sent",
        icon: <MoveRight className="mr-1 h-3.5 w-3.5" />,
      };
    case "NEGOTIATION":
      return {
        variant: "purple",
        label: "In Negotiation",
        icon: <Megaphone className="mr-1 h-3.5 w-3.5" />,
      };
    case "CLOSED_WON":
      return {
        variant: "success",
        label: "Closed Won",
        icon: <UserCheck className="mr-1 h-3.5 w-3.5" />,
      };
    case "CLOSED_LOST":
      return {
        variant: "destructive",
        label: "Closed Lost",
        icon: <Trash2 className="mr-1 h-3.5 w-3.5" />,
      };
    default:
      return { variant: "outline", label: status, icon: null };
  }
}

// Get source icon and label
function getSourceDetails(source: string | null) {
  if (!source) return { icon: null, label: "Unknown" };

  switch (source) {
    case "WEBSITE":
      return {
        icon: <Globe className="mr-2 h-4 w-4 text-blue-500" />,
        label: "Website",
      };
    case "REFERRAL":
      return {
        icon: <Users className="mr-2 h-4 w-4 text-green-500" />,
        label: "Referral",
      };
    case "ADVERTISEMENT":
      return {
        icon: <Megaphone className="mr-2 h-4 w-4 text-purple-500" />,
        label: "Advertisement",
      };
    case "SOCIAL_MEDIA":
      return {
        icon: <Globe className="mr-2 h-4 w-4 text-pink-500" />,
        label: "Social Media",
      };
    case "EVENT":
      return {
        icon: <Calendar className="mr-2 h-4 w-4 text-amber-500" />,
        label: "Event",
      };
    case "COLD_OUTREACH":
      return {
        icon: <Mail className="mr-2 h-4 w-4 text-sky-500" />,
        label: "Cold Outreach",
      };
    case "SEARCH":
      return {
        icon: <Search className="mr-2 h-4 w-4 text-indigo-500" />,
        label: "Search Engine",
      };
    default:
      return { icon: null, label: source };
  }
}

export default async function LeadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const lead = await getLead(id);
  const statusDetails = getStatusDetails(lead.status);
  const sourceDetails = getSourceDetails(lead.source);

  return (
    <div className="container max-w-5xl space-y-8 py-8">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/leads" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to leads</span>
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
        {/* Left column - Status and summary */}
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex flex-col items-center text-center">
              <Badge
                className="mb-4 px-3 py-1.5 text-sm"
                variant={statusDetails.variant as any}
              >
                <div className="flex items-center">
                  {statusDetails.icon}
                  {statusDetails.label}
                </div>
              </Badge>
              <CardTitle className="text-2xl">{lead.name}</CardTitle>
              {lead.company && (
                <CardDescription className="mt-1 flex items-center justify-center gap-1">
                  <Building2 className="h-4 w-4" />
                  <span>{lead.company}</span>
                </CardDescription>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {lead.email && (
              <div className="flex items-center gap-3">
                <Mail className="text-muted-foreground h-5 w-5" />
                <a
                  href={`mailto:${lead.email}`}
                  className="text-sm hover:underline"
                >
                  {lead.email}
                </a>
              </div>
            )}
            {lead.phone && (
              <div className="flex items-center gap-3">
                <Phone className="text-muted-foreground h-5 w-5" />
                <a
                  href={`tel:${lead.phone}`}
                  className="text-sm hover:underline"
                >
                  {lead.phone}
                </a>
              </div>
            )}
            {lead.source && (
              <div className="mt-6 flex items-center gap-3">
                <div className="flex items-center">
                  {sourceDetails.icon}
                  <span className="text-sm">Source: {sourceDetails.label}</span>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2">
            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <Calendar className="h-3.5 w-3.5" />
              <span>Created {formatDate(lead.createdAt)}</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <Clock className="h-3.5 w-3.5" />
              <span>Updated {formatDate(lead.updatedAt)}</span>
            </div>
          </CardFooter>
        </Card>

        {/* Right column - Lead details and pipeline */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Lead Details</CardTitle>
            <CardDescription>
              Complete information and sales pipeline
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm font-medium">
                  Name
                </p>
                <p>{lead.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm font-medium">
                  Company
                </p>
                <p>{lead.company || "—"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm font-medium">
                  Email
                </p>
                <p>{lead.email || "—"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm font-medium">
                  Phone
                </p>
                <p>{lead.phone || "—"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm font-medium">
                  Status
                </p>
                <Badge variant={statusDetails.variant as any} className="mt-1">
                  {statusDetails.label}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm font-medium">
                  Lead ID
                </p>
                <p className="font-mono text-xs">{lead.id}</p>
              </div>
            </div>

            <Separator />

            {/* Pipeline visualization */}
            <div>
              <h3 className="mb-4 text-lg font-medium">Sales Pipeline</h3>
              <div className="relative">
                <div className="mb-2 flex justify-between">
                  <div className="text-xs font-medium">New</div>
                  <div className="text-xs font-medium">Contacted</div>
                  <div className="text-xs font-medium">Qualified</div>
                  <div className="text-xs font-medium">Proposal</div>
                  <div className="text-xs font-medium">Negotiation</div>
                  <div className="text-xs font-medium">Closed</div>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-600"
                    style={{
                      width:
                        lead.status === "NEW"
                          ? "16%"
                          : lead.status === "CONTACTED"
                            ? "32%"
                            : lead.status === "QUALIFIED"
                              ? "48%"
                              : lead.status === "PROPOSAL"
                                ? "64%"
                                : lead.status === "NEGOTIATION"
                                  ? "80%"
                                  : lead.status === "CLOSED_WON" ||
                                      lead.status === "CLOSED_LOST"
                                    ? "100%"
                                    : "0%",
                    }}
                  ></div>
                </div>
                <div className="mt-2 flex justify-between">
                  <div
                    className={`h-4 w-4 rounded-full border-2 ${lead.status === "NEW" || lead.status === "CONTACTED" || lead.status === "QUALIFIED" || lead.status === "PROPOSAL" || lead.status === "NEGOTIATION" || lead.status === "CLOSED_WON" || lead.status === "CLOSED_LOST" ? "border-green-600 bg-green-500" : "border-gray-300 bg-gray-200"}`}
                  ></div>
                  <div
                    className={`h-4 w-4 rounded-full border-2 ${lead.status === "CONTACTED" || lead.status === "QUALIFIED" || lead.status === "PROPOSAL" || lead.status === "NEGOTIATION" || lead.status === "CLOSED_WON" || lead.status === "CLOSED_LOST" ? "border-green-600 bg-green-500" : "border-gray-300 bg-gray-200"}`}
                  ></div>
                  <div
                    className={`h-4 w-4 rounded-full border-2 ${lead.status === "QUALIFIED" || lead.status === "PROPOSAL" || lead.status === "NEGOTIATION" || lead.status === "CLOSED_WON" || lead.status === "CLOSED_LOST" ? "border-green-600 bg-green-500" : "border-gray-300 bg-gray-200"}`}
                  ></div>
                  <div
                    className={`h-4 w-4 rounded-full border-2 ${lead.status === "PROPOSAL" || lead.status === "NEGOTIATION" || lead.status === "CLOSED_WON" || lead.status === "CLOSED_LOST" ? "border-green-600 bg-green-500" : "border-gray-300 bg-gray-200"}`}
                  ></div>
                  <div
                    className={`h-4 w-4 rounded-full border-2 ${lead.status === "NEGOTIATION" || lead.status === "CLOSED_WON" || lead.status === "CLOSED_LOST" ? "border-green-600 bg-green-500" : "border-gray-300 bg-gray-200"}`}
                  ></div>
                  <div
                    className={`h-4 w-4 rounded-full border-2 ${lead.status === "CLOSED_WON" || lead.status === "CLOSED_LOST" ? "border-green-600 bg-green-500" : "border-gray-300 bg-gray-200"}`}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes and Activity */}
        <Card className="md:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Notes & Activity</CardTitle>
              <CardDescription>
                Track interactions with this lead
              </CardDescription>
            </div>
            <AddNoteDialog leadId="1" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lead.notes &&
                lead.notes.map((note) => (
                  <div key={note.id} className="flex items-start gap-3">
                    <div className="relative mt-1">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      {note.id !== lead.notes[lead.notes.length - 1].id && (
                        <div className="bg-border absolute top-2 bottom-0 left-1 -ml-px w-px"></div>
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Note</p>
                        <Badge variant="outline" className="text-xs">
                          {formatDate(note.createdAt)}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {note.content}
                      </p>
                    </div>
                  </div>
                ))}

              <div className="flex items-start gap-3">
                <div className="relative mt-1">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Lead created</p>
                    <Badge variant="outline" className="text-xs">
                      {formatDate(lead.createdAt)}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Lead was added to the system
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
