import { SignInForm } from "@/components/auth/sign-in-form";
import { getCurrentUser } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In ",
  description: "Sign In for CRM",
};

export default async function SignIn() {
  const user = await getCurrentUser();
  if (user?.role === "admin") {
    redirect("/admin");
  }

  if (user) {
    redirect("/dashboard");
  }
  return (
    <div>
      <SignInForm />
    </div>
  );
}
