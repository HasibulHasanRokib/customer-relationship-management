"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { contactSchema } from "@/lib/zod";

// Create contact
export async function createContact(values: z.infer<typeof contactSchema>) {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const validatedFields = contactSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid form data",
    };
  }

  const { firstName, lastName, email, phone, company } = validatedFields.data;

  try {
    await db.contact.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        company,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard/contacts");
    return { success: true };
  } catch (error) {
    console.error("Error creating contact:", error);
    return { error: "Failed to create contact" };
  }
}
