import { SignUpForm } from "@/components/auth/sign-up-form";
import { getCurrentUser } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign Up ",
  description: "Sign Up for CRM",
};

export default async function SignUp() {
  const user = await getCurrentUser();
  if (user?.role === "admin") {
    redirect("/admin");
  }

  if (user) {
    redirect("/dashboard");
  }
  return (
    <div>
      <SignUpForm />
    </div>
  );
}
