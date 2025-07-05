"use client";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { deleteCustomField } from "@/actions/custom-field";
import { toast } from "sonner";

export function DeleteCustomField({ id }: { id: string }) {
  const handleDelete = async () => {
    const res = await deleteCustomField(id);
    if (res.error) {
      toast("Error message", { description: res.error });
    } else if (res.success) {
      toast("Success", { description: "Custom field has deleted" });
    }
  };

  return (
    <div>
      <Button variant="ghost" size="icon" onClick={handleDelete}>
        <Trash className="text-destructive h-4 w-4" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}
