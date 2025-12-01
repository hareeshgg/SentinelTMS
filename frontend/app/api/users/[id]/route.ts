import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: rawId } = await context.params;
  console.log("RAW PARAM ID:", rawId);

  const id = Number(rawId);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: `Invalid id: ${id}` }, { status: 400 });
  }

  try {
    const body = await req.json();
    console.log("UPDATE BODY", body);

    const data: any = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      role: body.role,
    };

    if (body.password && body.password.trim() !== "") {
      data.password = body.password; // hash in real app
    }

    const user = await prisma.user.update({
      where: { id },
      data,
    });

    return NextResponse.json(user, { status: 200 });
  } catch (err: any) {
    console.error("UPDATE USER ERROR", err);
    return NextResponse.json(
      { error: "Failed to update user", details: String(err) },
      { status: 500 }
    );
  }
}
