"use client";

import { Task, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "HIGHEST":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    case "HIGH":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
    case "NORMAL":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    case "LOW":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case "LOWEST":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case "IN_PROGRESS":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    case "WAITING":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
    case "DEFERRED":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "NOT_STARTED":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};
type TaskWithUser = Task & { user: Pick<User, "name"> };

export const columns: ColumnDef<TaskWithUser>[] = [
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const dateFormate = row.original.dueDate;
      return <div>{dateFormate?.toLocaleDateString()}</div>;
    },
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
      const status = row.original.status;
      return (
        <div>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusColor(status)}`}
          >
            {status.toLowerCase().replace(/_/g, " ")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const priority = row.original.priority;
      return (
        <div>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(priority)}`}
          >
            {priority}
          </span>
        </div>
      );
    },
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
    header: "Task Owner",
    cell: ({ row }) => {
      const owner = row.original.user;
      return <div className="capitalize">{owner.name}</div>;
    },
  },
];
