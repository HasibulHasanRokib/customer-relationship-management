"use client";

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
import { Eye, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
interface ColumnsActionProps {
  id: string;
  name: string;
  handleDelete: () => void;
}

export function ColumnsAction({ id, name, handleDelete }: ColumnsActionProps) {
  return (
    <div className="flex items-center gap-x-2">
      <Link href={`/dashboard/${name}/${id}`}>
        <Button variant={"outline"}>
          <Eye className="text-primary h-4 w-4" />
        </Button>
      </Link>

      <div>
        <AlertDialog>
          <AlertDialogTrigger className="flex items-center gap-x-2">
            <Button variant={"outline"}>
              <Trash className="text-destructive h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete? This action cannot be undone
                and will permanently remove this contact.
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
    </div>
  );
}
