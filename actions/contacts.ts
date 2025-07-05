"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { contactSchema } from "@/lib/zod";

export async function deleteContact(id: string) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const contact = await db.contact.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!contact) {
      return { error: "Contact not found" };
    }

    await db.contact.delete({
      where: {
        id: contact.id,
      },
    });

    await db.notification.create({
      data: {
        title: "Delete contact",
        description: `${contact.firstName} ${contact.lastName} has been deleted`,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard/contacts");
    return { success: true };
  } catch (error) {
    console.error("Error delete contact:", error);
    return { error: "Failed to delete contact" };
  }
}

// Create contact

type CreateContactParams = {
  values: z.infer<typeof contactSchema>;
  customFields: {
    customFieldId: string;
    value: string;
  }[];
};

export async function createContact({
  values,
  customFields,
}: CreateContactParams) {
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
    const newContact = await db.contact.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        company,
        userId: user.id,
      },
    });

    await db.notification.create({
      data: {
        title: "Add new contact",
        description: `${newContact.firstName} ${newContact.lastName} to connect with you`,
        userId: user.id,
      },
    });

    if (customFields.length > 0) {
      await db.customFieldValue.createMany({
        data: customFields.map((f) => ({
          contactId: newContact.id,
          customFieldId: f.customFieldId,
          value: f.value,
        })),
      });
    }

    revalidatePath("/dashboard/contacts");
    return { success: true };
  } catch (error) {
    console.error("Error creating contact:", error);
    return { error: "Failed to create contact" };
  }
}
