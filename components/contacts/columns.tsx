"use client";

import { Contact, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { deleteContact } from "@/actions/contacts";
import { toast } from "sonner";

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
          toast("Delete failed", { description: res.error });
        } else if (res.success) {
          toast("Success message", { description: "Contact has deleted" });
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(contact.id)}
            >
              Copy contact ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/dashboard/contacts/${contact.id}`}>
                View contact
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete}>
              <Trash className="h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
