"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";

interface DataTableFilterProps<TData> {
  table: Table<TData>;
  column?: string;
  placeholder?: string;
}

export function DataTableFilter<TData>({
  table,
  column = "email",
  placeholder = "Filter...",
}: DataTableFilterProps<TData>) {
  const columnInstance = table.getColumn(column);

  return (
    <div className="relative max-w-sm flex-1">
      <Search className="text-primary absolute top-2.5 left-2 h-4 w-4" />
      <Input
        className="pl-8"
        placeholder={`Search ${placeholder}...`}
        value={(columnInstance?.getFilterValue() as string) ?? ""}
        onChange={(event) => columnInstance?.setFilterValue(event.target.value)}
      />
    </div>
  );
}
