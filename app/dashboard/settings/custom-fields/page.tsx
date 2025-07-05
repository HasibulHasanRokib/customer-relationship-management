import { AddCustomField } from "@/components/custom-field/add-custom-field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { Checkbox } from "@/components/ui/checkbox";
import { DeleteCustomField } from "@/components/custom-field/delete-custom-field";

export default async function CustomFieldPage() {
  const user = await getCurrentUser();

  const customFields = await db.customField.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Custom Fields</h1>
          <AddCustomField />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Manage Custom Fields</CardTitle>
            <CardDescription>
              Create and manage custom fields for different entities in your
              CRM.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="contacts">
              <TabsList className="mb-4">
                <TabsTrigger value="contacts">Contacts</TabsTrigger>
              </TabsList>
              {(
                ["contacts", "companies", "leads", "opportunities"] as const
              ).map((entity) => (
                <TabsContent key={entity} value={entity}>
                  <div className="rounded border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Field Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Required</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {customFields.length > 0 ? (
                          customFields.map((field) => (
                            <TableRow key={field.id}>
                              <TableCell className="font-medium">
                                {field.name}
                              </TableCell>
                              <TableCell>{field.type}</TableCell>
                              <TableCell>
                                <Checkbox checked={field.required} disabled />
                              </TableCell>
                              <TableCell>
                                <DeleteCustomField id={field.id} />
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                              No custom fields found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
