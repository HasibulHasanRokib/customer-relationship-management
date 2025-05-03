import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Users,
  Database,
  Workflow,
  Mail,
  FileText,
  Upload,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/settings/custom-fields">
          <Card className="hover:bg-muted/50 h-full transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Custom Fields
              </CardTitle>
              <Database className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Create and manage custom fields for your CRM entities.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/settings/workflows">
          <Card className="hover:bg-muted/50 h-full transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Workflow Automation
              </CardTitle>
              <Workflow className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Set up automated workflows and business processes.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/settings/email-integration">
          <Card className="hover:bg-muted/50 h-full transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Email Integration
              </CardTitle>
              <Mail className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Connect email accounts and manage email templates.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/documents">
          <Card className="hover:bg-muted/50 h-full transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Document Management
              </CardTitle>
              <FileText className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Upload, organize, and share documents and files.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/import-export">
          <Card className="hover:bg-muted/50 h-full transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Import & Export
              </CardTitle>
              <Upload className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Import data from CSV/Excel or export your CRM data.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/settings/users">
          <Card className="hover:bg-muted/50 h-full transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                User Management
              </CardTitle>
              <Users className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Manage users, roles, and permissions.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>
            Configure general settings for your CRM.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="mb-2 text-sm font-medium">Company Information</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Update your company details and branding.
              </p>
              <Button variant="outline">Edit Company Info</Button>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium">Localization</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Set your timezone, date format, and language preferences.
              </p>
              <Button variant="outline">Edit Localization</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
