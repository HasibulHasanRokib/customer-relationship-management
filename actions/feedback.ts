"use server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { addFeedbackSchema } from "@/lib/zod";

import { revalidatePath } from "next/cache";
import { z } from "zod";

type CreateFeedBackType = {
  data: z.infer<typeof addFeedbackSchema>;
  userId: string;
};

export async function createFeedback({ data, userId }: CreateFeedBackType) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") {
      return { error: "User not authenticated." };
    }
    const parsedData = addFeedbackSchema.safeParse(data);
    if (!parsedData.success) {
      return { error: "Invalid input data" };
    }
    const { rating, comment } = parsedData.data;
    await db.feedback.create({
      data: {
        userId,
        rating,
        comment,
      },
    });

    revalidatePath("/admin/feedback");

    return { success: true };
  } catch (error) {
    console.error("[CREATE_FEEDBACK]", error);
    return { success: false, error: "Failed to submit feedback." };
  }
}
