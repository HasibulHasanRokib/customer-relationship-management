import { SignInForm } from "@/components/auth/sign-in-form";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");
  return (
    <div>
      <SignInForm />
    </div>
  );
}
