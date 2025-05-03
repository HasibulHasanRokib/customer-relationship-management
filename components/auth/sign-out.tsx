import { signOut } from "@/actions/auth";
import { LogOut } from "lucide-react";

export function SignOut() {
  return (
    <form action={signOut}>
      <button className="flex w-full items-center gap-x-2" type="submit">
        <LogOut className="text-destructive h-4 w-4" />
        Log out
      </button>
    </form>
  );
}
