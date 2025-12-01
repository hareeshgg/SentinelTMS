import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { Role } from "@/lib/generated/prisma/enums";

export async function POST(req: Request) {
  const body = await req.json();

  const user = await prisma.user.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      dob: body.dob,
      city: body.city,
      email: body.email,
      password: body.password,
      role: (body.role as Role) ?? "GUEST",
    },
  });

  return NextResponse.json(user, { status: 201 });
}
