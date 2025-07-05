"use client";

import { deleteDocument, getDocumentData } from "@/actions/documents";
import { Document } from "@prisma/client";
import React, { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Download, Share2, Trash } from "lucide-react";
import { Spinner } from "../spinner";

export function TableActions({ document }: { document: Document }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteDocument(document.id);
      if (res.error) {
        toast("Error", { description: res.error });
      } else if (res.success) {
        toast("Success", { description: "Your document has been deleted." });
      }
    });
  };

  const handleDownload = () => {
    startTransition(async () => {
      try {
        const result = await getDocumentData(document.id);

        if ("error" in result) {
          toast("Error", { description: result.error });
          return;
        }

        const response = await fetch(result.document.url);
        if (!response.ok) throw new Error("Failed to fetch file");

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        const anchor = window.document.createElement("a");
        anchor.href = url;
        anchor.download = result.document.name || "file";
        anchor.click();
        URL.revokeObjectURL(url);

        toast("Download started");
      } catch (err) {
        console.error(err);
        toast("Error", { description: "Failed to download" });
      }
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(document.url);
    toast("Share link copied!");
  };

  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={handleDelete}
        disabled={isPending}
      >
        {isPending ? <Spinner /> : <Trash className="h-4 w-4" />}
        <span className="sr-only">Delete</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleDownload}
        disabled={isPending}
      >
        <Download className="h-4 w-4" />
        <span className="sr-only">Download</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleShare}
        disabled={isPending}
      >
        <Share2 className="h-4 w-4" />
        <span className="sr-only">Share</span>
      </Button>
    </div>
  );
}
