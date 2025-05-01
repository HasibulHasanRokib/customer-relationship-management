"use client";

import { Document, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { FileText, FileImage, FileArchive } from "lucide-react";
import { Badge } from "../ui/badge";
import { TableActions } from "./table-actions";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function getFileIcon(type: string) {
  switch (type) {
    case "PDF":
      return <FileText className="h-5 w-5 text-red-500" />;
    case "DOCX":
      return <FileText className="h-5 w-5 text-blue-500" />;
    case "XLSX":
      return <FileText className="h-5 w-5 text-green-500" />;
    case "JPG":
    case "PNG":
      return <FileImage className="h-5 w-5 text-purple-500" />;
    case "ZIP":
      return <FileArchive className="h-5 w-5 text-yellow-500" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
}

type DocumentWithUser = Document & { user: Pick<User, "name"> };

export const columns: ColumnDef<DocumentWithUser>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell({ row }) {
      const type = row.original.type;
      const name = row.original.name;

      return (
        <div className="flex items-center gap-2">
          {getFileIcon(type)}
          <span className="font-medium">{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "relatedTo",
    header: "Related To",
    cell({ row }) {
      const relatedTo = row.original.relatedTo;
      const relatedType = row.original.relatedType;

      return relatedTo ? (
        <div className="flex flex-col">
          <span>{relatedTo}</span>
          <span className="text-muted-foreground text-xs">{relatedType}</span>
        </div>
      ) : (
        <span className="text-muted-foreground">—</span>
      );
    },
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell({ row }) {
      const tags = row.original.tags;
      const tagArray =
        typeof tags === "string"
          ? [tags]
          : Array.isArray(tags)
            ? tags.filter((t) => typeof t === "string")
            : [];
      return (
        <div className="flex flex-wrap gap-1">
          {tagArray.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      );
    },
  },

  {
    accessorKey: "updatedAt",
    header: "Uploaded",
    cell: ({ row }) => {
      const uploadedAt = row.original.updatedAt;
      const uploadedBy = row.original.user.name;
      return (
        <div className="flex flex-col">
          <span>{formatDate(uploadedAt)}</span>
          <span className="text-muted-foreground text-xs">by {uploadedBy}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const document = row.original;
      return <TableActions document={document} />;
    },
  },
];
