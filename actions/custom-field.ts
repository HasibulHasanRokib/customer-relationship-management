"use server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { customFieldSchema } from "@/lib/zod";
import { EntityType, FieldType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

//delete
export async function deleteCustomField(id: string) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { error: "UnAuthorized" };
    }

    await db.customField.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard/setting/custom-fields");
    return { success: true };
  } catch (error) {
    console.log("Delete custom field error", error);
    return { error: "Something went wrong!" };
  }
}

//add
export async function addCustomField(
  values: z.infer<typeof customFieldSchema>,
) {
  try {
    const validation = customFieldSchema.safeParse(values);

    if (!validation.success) {
      return { error: "Invalid fields" };
    }

    const user = await getCurrentUser();

    if (!user) {
      return { error: "UnAuthorized" };
    }

    const options = validation.data.options
      ?.split(",")
      .map((option) => option.trim());

    await db.customField.create({
      data: {
        name: validation.data.name,
        entity: validation.data.entity as EntityType,
        type: validation.data.type as FieldType,
        required: validation.data.required,
        options,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard/setting/custom-fields");
    return { success: true };
  } catch (error) {
    console.log("Add custom field error", error);
    return { error: "Something went wrong!" };
  }
}
