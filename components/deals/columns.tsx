"use client";

import { Deals, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

const getStageColor = (stage: string) => {
  switch (stage) {
    case "NEW":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    case "CONTACTED":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "PROPOSAL":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
    case "NEGOTIATION":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
    case "WON":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case "LOST":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

type DealsWithUser = Deals & { user: Pick<User, "name"> };

export const columns: ColumnDef<DealsWithUser>[] = [
  {
    accessorKey: "title",
    header: "Deal Name",
  },
  {
    accessorKey: "customer",
    header: "Customer name",
  },
  {
    accessorKey: "value",
    header: "Amount",
  },
  {
    accessorKey: "stage",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stage
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dealStage = row.original.stage;
      return (
        <div>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStageColor(dealStage)}`}
          >
            {dealStage}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "expectedClose",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Closing Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateFormate = row.original.expectedClose;
      return <div>{dateFormate.toLocaleDateString()}</div>;
    },
  },

  {
    accessorKey: "user",
    header: "Deal Owner",
    cell: ({ row }) => {
      const dealOwner = row.original.user;
      return <div>{dealOwner.name}</div>;
    },
  },
];
