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

export async function delUser(id: Number) {
  const userId = Number(id);
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
  } catch (err) {
    console.error("Delete user error: ", err);
    throw err;
  }
  revalidatePath("/users");
}

export async function updateUser({
  id,
  formData,
}: {
  id: Number;
  formData: FormData;
}) {
  try {
    const userId = Number(id);
    const data: any = {
      firstName: formData.get("firstName") || undefined,
      lastName: formData.get("lastName") || undefined,
      email: formData.get("email") || undefined,
      role: (formData.get("role") as Role) || undefined,
    };
    await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });
    console.log("Updated");
  } catch (err) {
    console.error("Update user error: ", err);
    throw err;
  }
  revalidatePath("/users");
}

export async function getUser(id: number) {
  const userId = Number(id);

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    console.log(user);
    return user;
  } catch (err) {
    console.error("Get user error: ", err);
    throw err;
  }
}

export async function getTransactions() {
  try {
    const transactions = await prisma.transaction.findMany();
    return transactions;
  } catch (error) {
    console.error("Get transaction error: ", error);
  }
}
