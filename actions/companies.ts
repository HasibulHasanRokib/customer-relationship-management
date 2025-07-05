"use server";

import { companiesSchema } from "@/lib/zod";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";

export async function createCompanyAction(
  data: z.infer<typeof companiesSchema>,
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { error: "Unauthorized" };
    }

    const validation = companiesSchema.safeParse(data);
    if (!validation.success) {
      return { error: "Invalid fields" };
    }

    await db.company.create({
      data: {
        name: data.name,
        industry: data.industry,
        location: data.location,
        employees: data.employees,
        revenue: data.revenue,
        status: data.status,
        website: data.website,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard/companies");
    return { success: true };
  } catch (error) {
    console.error("Error creating company:", error);
    return { error: "Failed to create company" };
  }
}
