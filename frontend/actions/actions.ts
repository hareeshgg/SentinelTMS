"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/db";
import { Role } from "@/lib/generated/prisma/enums";

export async function createUser(formData: FormData) {
  try {
    await prisma.user.create({
      data: {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        phone: formData.get("phone") as string,
        dob: formData.get("dob") as string,
        city: formData.get("city") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        role: (formData.get("role") as Role) ?? "GUEST",
      },
    });
  } catch (err) {
    console.error("createUser error:", err);
    throw err;
  }

  revalidatePath("/users");
}

export async function getTransactions() {
  const transactions = await prisma.transaction.findMany();

  return transactions;
}
