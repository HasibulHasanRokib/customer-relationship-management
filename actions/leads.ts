"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { leadSchema } from "@/lib/zod";
import { LeadSource, LeadStatus } from "@prisma/client";

export async function deleteLead(id: string) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const lead = await db.lead.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!lead) {
      return { error: "Lead not found" };
    }

    await db.lead.delete({
      where: {
        id: lead.id,
      },
    });

    revalidatePath("/dashboard/leads");
    return { success: true };
  } catch (error) {
    console.error("Error delete lead:", error);
    return { error: "Failed to delete lead" };
  }
}

export async function addLead(values: z.infer<typeof leadSchema>) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const validatedFields = leadSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: "Invalid form data",
      };
    }

    const { name, email, phone, company, source, status } =
      validatedFields.data;

    await db.lead.create({
      data: {
        name,
        email,
        phone,
        company,
        source: source as LeadSource,
        status: status as LeadStatus,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard/leads");
    return { success: true };
  } catch (err) {
    console.error("Error creating leads:", err);
    return { error: "Failed to create leads" };
  }
}
