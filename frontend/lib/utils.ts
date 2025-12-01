import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type AuthMode = "sign-in" | "sign-up" | "create" | "edit";

export const authFormSchema = (mode: AuthMode) => {
  if (mode === "sign-in") {
    return z.object({
      email: z.string().email("Please enter a valid email address."),
      password: z.string().min(8, "Password must be at least 8 characters"),
    });
  }

  if (mode === "sign-up") {
    // public sign-up form (all fields required)
    return z.object({
      firstName: z.string().min(3, "First name must be at least 3 characters"),
      lastName: z.string().min(3, "Last name must be at least 3 characters"),
      phone: z
        .string()
        .min(10, "Phone must be at least 10 digits")
        .max(14, "Phone too long"),
      city: z.string().min(3, "City must be at least 3 characters"),
      dob: z.string().min(1, "Date of birth is required"),
      email: z.email("Please enter a valid email address."),
      password: z.string().min(8, "Password must be at least 8 characters"),
      role: z.string().optional(), // user might not pick a role here
    });
  }

  if (mode === "create") {
    // admin: create user (no phone/city/dob required)
    return z.object({
      firstName: z.string().min(3, "First name must be at least 3 characters"),
      lastName: z.string().min(3, "Last name must be at least 3 characters"),
      email: z.string().email("Please enter a valid email address."),
      role: z.string().min(1, "Role is required"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .optional(),
    });
  }

  return z.object({
    firstName: z.string().min(3, "First name must be at least 3 characters"),
    lastName: z.string().min(3, "Last name must be at least 3 characters"),
    email: z.string().email("Please enter a valid email address."),
    role: z.string().min(1, "Role is required"),
    // password is optional when editing
    password: z.string().optional(),
  });
};

// export const authFormSchema = (mode: string) =>
//   z.object({
//     firstName: mode === "sign-in" ? z.string().optional() : z.string().min(3),
//     lastName: mode === "sign-in" ? z.string().optional() : z.string().min(3),
//     phone:
//       mode === "sign-in"
//         ? z.string().optional()
//         : mode === "edit"
//         ? z.string().optional()
//         : z.string().min(10).max(14),
//     city:
//       mode === "sign-in"
//         ? z.string().optional()
//         : mode === "edit"
//         ? z.string().optional()
//         : z.string().min(3),
//     dob: mode === "sign-in" ? z.string().optional() : z.string(),
//     email: z.email("Please enter a valid email address."),
//     password:
//       mode === "edit"
//         ? z.string().optional()
//         : z.string().min(8, "Password must be at least 8 characters"),
//     role: mode === "sign-in" ? z.string().optional() : z.string(),
//   });

export const transactionSchema = (type: string) =>
  z.object({
    id: z.string(),
    date: z.date(),
    benefactor: z.string(),
    beneficiary: z.string(),
    status: z.enum(["pending", "completed", "failed"]),
    score: z.number().min(0).max(10),
    type: z.enum(["credit", "debit", "transfer", "upi"]),
    amount: z.number(),
    currency: z.string().length(3).optional(),
    description: z.string().length(20).optional(),
    reference: z.string().optional(),
  });

export const userSchema = () =>
  z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    role: z.string(),
    status: z.string(),
    email: z.email(),
  });
