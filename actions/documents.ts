"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { uploadDocumentSchema } from "@/lib/zod";

export async function getDocumentData(id: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { error: "Unauthorized" };
    }

    const document = await db.document.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!document) {
      return { error: "Document not found!" };
    }

    return { success: true, document };
  } catch (error) {
    console.log("document download error", error);
    return { error: "Something went wrong!" };
  }
}

export async function deleteDocument(id: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { error: "Unauthorized" };
    }

    const documentExist = db.document.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!documentExist) {
      return { error: "Document not found!" };
    }

    await db.document.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/documents");
    return { success: true };
  } catch (error) {
    console.log("document delete error", error);
    return { error: "Something went wrong!" };
  }
}

export async function uploadDocument(
  values: z.infer<typeof uploadDocumentSchema>,
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { error: "Unauthorized" };
    }

    const validatedFields = uploadDocumentSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const tags = validatedFields.data.tags?.split(",").map((tag) => tag.trim());

    await db.document.create({
      data: {
        ...validatedFields.data,
        tags,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard/documents");
    return { success: true };
  } catch (error) {
    console.log("Upload document error", error);
    return { error: "Something went wrong!" };
  }
}
