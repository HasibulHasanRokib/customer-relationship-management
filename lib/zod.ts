import { z } from "zod";

//deals
export const dealsSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  customer: z.string().min(1, { message: "Customer name is required" }),
  stage: z.enum(["NEW", "CONTACTED", "PROPOSAL", "NEGOTIATION", "WON", "LOST"]),
  value: z.number().min(1, { message: "Required" }),
  expectedClose: z.string().min(1, { message: "Date is required" }),
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
