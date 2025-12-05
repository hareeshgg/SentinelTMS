import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { signIn } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);
  await signIn("credentials", body);
}
