import { signOut } from "@/app/actions/auth";

export function SignOut() {
  return (
    <form action={signOut}>
      <button className="w-full" type="submit">
        Log out
      </button>
    </form>
  );
}
