import { z } from "zod";

//update-profile
export const profileSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    imageUrl: z.string().optional(),
    oldPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const isChangingPassword = !!data.oldPassword;

    if (isChangingPassword) {
      if (!data.newPassword || data.newPassword.length < 8) {
        ctx.addIssue({
          path: ["newPassword"],
          code: "custom",
          message:
            "New password is required and must be at least 8 characters.",
        });
      }

      if (!data.confirmPassword || data.confirmPassword.length < 8) {
        ctx.addIssue({
          path: ["confirmPassword"],
          code: "custom",
          message: "Please confirm your new password.",
        });
      }

      if (data.newPassword !== data.confirmPassword) {
        ctx.addIssue({
          path: ["confirmPassword"],
          code: "custom",
          message: "New passwords do not match.",
        });
      }
    }
  });

//custom-field
export const customFieldSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  type: z.string(),
  required: z.boolean().default(false).optional(),
  entity: z.string(),
  options: z.string().optional(),
});

//documents
export const uploadDocumentSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  type: z.string(),
  size: z.string(),
  url: z.string().url({ message: "Please enter a valid URL" }),
  relatedTo: z.string().optional(),
  relatedType: z.string().optional(),
  tags: z.string().optional(),
});
export const documentsSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Document name must be at least 2 characters" })
    .optional()
    .or(z.literal("")),
  relatedTo: z.string().optional(),
  relatedType: z.string().optional(),
  tags: z.string().optional(),
  file: z
    .any()
    .refine((file) => file?.length === 1, { message: "File is required" }),
});

//companies
export const companiesSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  industry: z.string().min(2, { message: "Industry is required" }),
  location: z.string().min(2, { message: "Location is required" }),
  employees: z.string(),
  revenue: z.string(),
  status: z.string(),
  website: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .optional()
    .or(z.literal("")),
});

//tasks

export const tasksSchema = z.object({
  subject: z.string().min(1, { message: "Subject is required" }),
  dueDate: z.date({ required_error: "Due date is required" }),
  status: z.enum([
    "NOT_STARTED",
    "DEFERRED",
    "IN_PROGRESS",
    "COMPLETED",
    "WAITING",
  ]),
  priority: z.enum(["HIGH", "HIGHEST", "LOW", "LOWEST", "NORMAL"]),
  description: z.string(),
});

//deals
export const dealsSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  customer: z.string().min(1, { message: "Customer name is required" }),
  stage: z.enum(["NEW", "CONTACTED", "PROPOSAL", "NEGOTIATION", "WON", "LOST"]),
  value: z.number().min(1, { message: "Required" }),
  expectedClose: z.date({ required_error: "Date is required" }),
});

//lead
export const leadSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  company: z.string().min(2, { message: "Company name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(5, { message: "Please enter a valid phone number" }),
  source: z.string(),
  status: z.string(),
});

//contact
export const contactSchema = z.object({
  firstName: z.string(),
  lastName: z.string().min(2, { message: "Required" }),
  email: z.string().email().optional().nullable().or(z.literal("")),
  phone: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  customFields: z.record(z.string()),
});

//login
export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

//register
export const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
