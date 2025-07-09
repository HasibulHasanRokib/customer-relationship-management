"use client";

import { Feedback, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Star } from "lucide-react";
import AddFeedback from "./add-feedback";
import { Button } from "@/components/ui/button";
export type UserWithFeedback = User & { Feedback: Feedback[] };

export const columns: ColumnDef<UserWithFeedback>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "rating",
    accessorFn: (row) => row.Feedback[0]?.rating || 0,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rating
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      const fb = row.original.Feedback[0];
      return fb ? (
        <div className="flex flex-col">
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < fb.rating ? "fill-yellow-500" : "text-gray-300"}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <span className="text-muted-foreground italic">No rating</span>
      );
    },
  },
  {
    header: "Feedback",
    cell: ({ row }) => {
      const fb = row.original.Feedback[0];
      return fb ? (
        <div className="flex flex-col">
          <span className="text-muted-foreground text-sm">{fb.comment}</span>
        </div>
      ) : (
        <span className="text-muted-foreground italic">No feedback</span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Last feedback",
    cell: ({ row }) => {
      const fb = row.original.Feedback[0];
      return fb ? (
        <span className="text-muted-foreground">
          {new Date(fb.createdAt).toLocaleDateString()}
        </span>
      ) : (
        <span className="text-muted-foreground italic">No feedback</span>
      );
    },
  },
  {
    header: "Action",
    cell: ({ row }) => <AddFeedback user={row.original} />,
  },
];
