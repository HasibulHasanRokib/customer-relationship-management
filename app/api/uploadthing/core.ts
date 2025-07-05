import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  documentUploader: f([
    // ✅ Images
    "image/png",
    "image/jpeg",
    "image/webp",
    // ✅ Word
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    // ✅ Excel
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    // ✅ PowerPoint
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",

    // ✅ PDF
    "application/pdf",
  ])
    .middleware(() => ({}))
    .onUploadComplete(() => {}),
  profileUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(() => ({}))
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
