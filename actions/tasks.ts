"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { tasksSchema } from "@/lib/zod";
import { TaskStatus } from "@prisma/client";

type UpdateTaskStatusParams = {
  id: string;
  status: TaskStatus;
};

export async function updateTaskStatus({ id, status }: UpdateTaskStatusParams) {
  try {
    if (!id || !status) {
      return { error: "Invalid field" };
    }
    const user = await getCurrentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const taskExist = await db.task.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!taskExist) {
      return { error: "Deal not found" };
    }

    const updatedTask = await db.task.update({
      where: {
        id: taskExist.id,
      },
      data: {
        status,
      },
    });

    revalidatePath("/dashboard/tasks");
    return { success: true, updatedTask };
  } catch (err) {
    console.error("Error update task stats:", err);
    return { error: "Failed to update task" };
  }
}

export async function createTask(values: z.infer<typeof tasksSchema>) {
  try {
    const validatedFields = tasksSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: "Invalid form data",
      };
    }
    const user = await getCurrentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const { subject, status, priority, description, dueDate } =
      validatedFields.data;

    await db.task.create({
      data: {
        subject,
        status,
        priority,
        description,
        dueDate,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard/tasks");
    return { success: true };
  } catch (error) {
    console.error("Error create task:", error);
    return { error: "Failed to create task" };
  }
}
