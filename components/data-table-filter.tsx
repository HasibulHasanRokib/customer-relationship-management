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
    <div className="flex items-center gap-x-2">
      <Search className="text-primary h-4 w-4" />
      <Input
        placeholder={placeholder}
        value={(columnInstance?.getFilterValue() as string) ?? ""}
        onChange={(event) => columnInstance?.setFilterValue(event.target.value)}
        className="max-w-sm"
      />
    </div>
  );
}
