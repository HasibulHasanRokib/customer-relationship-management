import { signOut } from "@/auth";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button size="sm" className="w-full" type="submit">
        <LogOut className="mr-2 h-4 w-4" />
        Log out
      </Button>
    </form>
  );
}
