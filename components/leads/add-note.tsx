"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface AddNoteProps {
  leadId: string;
}

export function AddNoteDialog({ leadId }: AddNoteProps) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast("Error", { description: "Note content cannot be empty" });
      return;
    }

    setIsSubmitting(true);

    try {
      toast("Success", { description: "Note added successfully" });
      setContent("");
      setOpen(false);
      router.refresh(); // Refresh the page to show the new note
    } catch (error) {
      toast("Error", {
        description:
          error instanceof Error ? error.message : "Failed to add note",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        Add Note
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add Note</DialogTitle>
              <DialogDescription>
                Add a new note to track interactions with this lead.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <Textarea
                id="note"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your note here..."
                className="min-h-[120px]"
                disabled={isSubmitting}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Note"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
