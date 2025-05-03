import { db } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/contacts/columns";
import { AddContactForm } from "@/components/contacts/add-contact-form";

export default async function ContactsPage() {
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
    orderBy: {
      createdAt: "desc",
    },
  });

  const customFields = await db.customField.findMany({
    where: { entity: "CONTACT" },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
        <AddContactForm customFields={customFields} />
      </div>

      <DataTable
        columns={columns}
        data={contacts}
        searchColumn="email"
        searchPlaceholder="email"
        tableName="Contact"
      />
    </div>
  );
}
