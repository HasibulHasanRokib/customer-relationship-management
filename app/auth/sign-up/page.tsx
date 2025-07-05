import { SignUpForm } from "@/components/auth/sign-up-form";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");
  return (
    <div>
      <SignUpForm />
    </div>
  );
}
