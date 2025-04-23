"use server";

import { signIn } from "@/auth";
import { loginSchema } from "@/lib/zod";
import { AuthError } from "next-auth";
import { z } from "zod";

export async function loginAction(values: z.infer<typeof loginSchema>) {
  const validation = loginSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid values! Please check your inputs!" };
  }

  const { email, password } = validation.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: "Login successful." };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.message.includes("CredentialsSignin")) {
        return { error: "Invalid email or password!" };
      }
      return { error: "Something went wrong! Please try again." };
    }
    console.error("Login error:", error);
    return { error: "Something went wrong! Please try again." };
  }
}
