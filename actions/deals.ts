"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { dealsSchema } from "@/lib/zod";
import { DealStage } from "@prisma/client";

type UpdateDealStageParams = {
  id: string;
  stage: DealStage;
};

export async function updateDealStage({ id, stage }: UpdateDealStageParams) {
  try {
    if (!id || !stage) {
      return { error: "Invalid field" };
    }
    const user = await getCurrentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const dealExist = await db.deals.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!dealExist) {
      return { error: "Deal not found" };
    }

    const updatedDeal = await db.deals.update({
      where: {
        id: dealExist.id,
      },
      data: {
        stage,
      },
    });

    revalidatePath("/dashboard/deals");
    return { success: true, updatedDeal };
  } catch (err) {
    console.error("Error update deal stage:", err);
    return { error: "Failed to update deals" };
  }
}

export async function addDeal(values: z.infer<typeof dealsSchema>) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const validatedFields = dealsSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: "Invalid form data",
      };
    }

    const { customer, title, value, stage, expectedClose } =
      validatedFields.data;

    await db.deals.create({
      data: {
        customer,
        title,
        value,
        stage,
        expectedClose,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard/deals");
    return { success: true };
  } catch (err) {
    console.error("Error creating deal:", err);
    return { error: "Failed to create deals" };
  }
}
