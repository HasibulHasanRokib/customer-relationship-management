"use server";

import { getCurrentUser, hashPassword, verifyPassword } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { profileSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function updateProfile(values: z.infer<typeof profileSchema>) {
  try {
    const validation = profileSchema.safeParse(values);

    if (!validation.success) {
      return { error: "Invalid inputs!" };
    }

    const { name, email, imageUrl, oldPassword, newPassword } = validation.data;
    const user = await getCurrentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    if (oldPassword) {
      const passMatch = await verifyPassword(oldPassword, user.password);

      console.log({ oldPassword, passMatch });

      if (!passMatch) {
        return { error: "Your current password is incorrect" };
      }
    }
    const newPasswordHash = await hashPassword(newPassword as string);

    const update = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        name,
        email,
        imageUrl,
        password: newPasswordHash,
      },
    });

    revalidatePath("/dashboard/profile");
    return { success: true, update };
  } catch (error) {
    console.log("Update profile error", error);
    return { error: "Something went wrong!" };
  }
}
