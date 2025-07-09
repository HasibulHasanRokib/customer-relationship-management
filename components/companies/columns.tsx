"use client";

import { Company } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react";
import { ColumnsAction } from "../contacts/columns-action";

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "industry",
    header: "Industry",
  },
  {
    accessorKey: "employees",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Employees
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "revenue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Revenue
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const companyStatus = row.original.status;
      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            companyStatus === "Active"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
          }`}
        >
          {companyStatus}
        </span>
      );
    },
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => {
      const company = row.original;
      const handleDelete = async () => {};

      return (
        <ColumnsAction
          handleDelete={handleDelete}
          id={company.id}
          name="companies"
        />
      );
    },
  },
];
