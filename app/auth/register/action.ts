"use server";

import { db } from "@/lib/prisma";
import { registerSchema } from "@/lib/zod";
import { z } from "zod";
import { hash } from "bcryptjs";

export async function registerAction(data: z.infer<typeof registerSchema>) {
  try {
    const validatedFields = registerSchema.safeParse(data);

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

    const hashedPassword = await hash(password, 10);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: "User created successfully" };
  } catch (err) {
    console.log("register-error:", err);
    return { error: "Something went wrong!" };
  }
}
