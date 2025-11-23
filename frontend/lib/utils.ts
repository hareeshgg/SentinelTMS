import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authFormSchema = (type: string) =>
  z.object({
    firstName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    lastName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    phone:
      type === "sign-in" ? z.string().optional() : z.string().min(10).max(14),
    city: type === "sign-in" ? z.string().optional() : z.string().min(3),
    dob: type === "sign-in" ? z.string().optional() : z.string(),
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8),
  });

export const transactionSchema = () => {
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
};
