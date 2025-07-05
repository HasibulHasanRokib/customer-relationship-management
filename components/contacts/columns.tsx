"use client";

import { Contact, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { deleteContact } from "@/actions/contacts";
import { toast } from "sonner";
import { ColumnsAction } from "./columns-action";

type ContactWithUser = Contact & { user: Pick<User, "name"> };

export const columns: ColumnDef<ContactWithUser>[] = [
  {
    accessorKey: "firstName",
    header: "First name",
  },
  {
    accessorKey: "lastName",
    header: "Last name",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const dateFormate = row.original.createdAt;
      return <div>{dateFormate.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "user",
    header: "Contact Owner",
    cell: ({ row }) => {
      const user = row.original.user;
      return <div>{user?.name}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const contact = row.original;
      const handleDelete = async () => {
        const res = await deleteContact(contact.id);
        if (res.error) {
          toast("Failed to delete contact", { description: res.error });
        } else if (res.success) {
          toast("Contact deleted", {
            description: `${contact.firstName} ${contact.lastName} has been removed`,
          });
        }
      };

      return (
        <ColumnsAction
          handleDelete={handleDelete}
          id={contact.id}
          name="contacts"
        />
      );
    },
  },
];
