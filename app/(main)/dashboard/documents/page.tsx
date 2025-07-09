import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddDocument } from "@/components/documents/add-document";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/documents/columns";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Documents",
  description: "View and manage your documents",
};

export default async function DocumentsPage() {
  const user = await getCurrentUser();
  const documents = await db.document.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const docxDocuments = documents.filter((d) => d.type === "DOCX");
  const pdfDocuments = documents.filter((d) => d.type === "PDF");
  const imagesDocuments = documents.filter((d) =>
    ["PNG", "JPEG", "WEBP"].includes(d.type?.toUpperCase()),
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <AddDocument />
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Files</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="pdf">PDFs</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <DataTable columns={columns} data={documents} />
        </TabsContent>
        <TabsContent value="documents" className="space-y-4">
          <DataTable columns={columns} data={docxDocuments} />
        </TabsContent>
        <TabsContent value="images" className="space-y-4">
          <DataTable columns={columns} data={imagesDocuments} />
        </TabsContent>
        <TabsContent value="pdf" className="space-y-4">
          <DataTable columns={columns} data={pdfDocuments} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
