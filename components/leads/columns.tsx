"use client";

import { Lead, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react";

import { deleteLead } from "@/actions/leads";
import { ColumnsAction } from "../contacts/columns-action";
import { toast } from "sonner";

type LeadWithUser = Lead & { user: Pick<User, "name"> };

const getStatusColor = (status: string) => {
  switch (status) {
    case "new":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    case "contacted":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "qualified":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

export const columns: ColumnDef<LeadWithUser>[] = [
  {
    accessorKey: "name",
    header: "Lead Name",
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
    accessorKey: "source",
    header: "Source",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const leadStatus = row.original.status;
      return (
        <div>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(leadStatus.toLowerCase())}`}
          >
            {leadStatus}
          </span>
        </div>
      );
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
      const lead = row.original;
      const handleDelete = async () => {
        const res = await deleteLead(lead.id);
        if (res.error) {
          toast("Delete failed", { description: res.error });
        } else if (res.success) {
          toast("Success message", { description: "Contact has deleted" });
        }
      };

      return (
        <ColumnsAction handleDelete={handleDelete} id={lead.id} name="leads" />
      );
    },
  },
];
