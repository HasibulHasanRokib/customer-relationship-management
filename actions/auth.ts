"use server";

import {
  hashPassword,
  verifyPassword,
  createSession,
  deleteSession,
} from "@/lib/auth";
import { db } from "@/lib/prisma";
import { seedDummyData } from "@/lib/seed";
import { loginSchema, registerSchema } from "@/lib/zod";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function signUp(values: z.infer<typeof registerSchema>) {
  try {
    const validatedFields = registerSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const { name, email, password } = validatedFields.data;

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "User already exists" };
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    await seedDummyData(newUser.id);

    return { success: "User created successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
}

export async function signIn(values: z.infer<typeof loginSchema>) {
  try {
    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const { email, password } = validatedFields.data;

    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return { error: "Invalid credentials" };
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return { error: "Invalid credentials" };
    }

    const token = await createSession(user.id);
    (await cookies()).set("session-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
}

export async function signOut() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session-token")?.value;

  if (token) {
    await deleteSession(token);
  }

  cookieStore.delete("session-token");
  redirect("/auth/sign-in");
}
