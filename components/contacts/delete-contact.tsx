"use client";

import { deleteContact } from "@/actions/contacts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function DeleteContact({ id }: { id: string }) {
  const router = useRouter();
  const handleDelete = async () => {
    const res = await deleteContact(id);
    if (res.error) {
      toast("Failed to delete contact", { description: res.error });
    } else if (res.success) {
      toast("Contact deleted", {
        description: `Contact has been removed`,
      });

      router.push("/dashboard/contacts");
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="flex items-center gap-x-2">
          <Trash className="text-destructive h-4 w-4" />
          <span className="text-destructive">Delete</span>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete? This action cannot be undone and
              will permanently remove this contact.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
