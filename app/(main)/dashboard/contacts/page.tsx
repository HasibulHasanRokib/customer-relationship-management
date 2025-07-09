import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/contacts/columns";
import { AddContactForm } from "@/components/contacts/add-contact-form";
import PaginationControl from "@/components/pagination";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contacts",
  description: "View and manage your contacts",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const contactSearchParams = await searchParams;

  const page = Number(contactSearchParams.page) || 1;
  const limit = Number(contactSearchParams.limit) || 5;
  const offset = (page - 1) * limit;
  const user = await getCurrentUser();

  const contacts = await db.contact.findMany({
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
    skip: offset,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });
  const totalContacts = await db.contact.count({
    where: {
      userId: user?.id,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
        <AddContactForm />
      </div>

      <DataTable columns={columns} data={contacts} />
      <PaginationControl
        page={page}
        limit={limit}
        pathname="/dashboard/contacts"
        totalPages={Math.ceil(totalContacts / limit)}
        total={totalContacts}
      />
    </div>
  );
}
