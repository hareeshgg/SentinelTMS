// src/lib/prismadb.ts
import { PrismaClient } from "../lib/generated/prisma/client";

import { PrismaPg } from "@prisma/adapter-pg";

declare global {
  // eslint-disable-next-line no-var
  var __prismaClient__: PrismaClient | undefined;
}

// Ensure DATABASE_URL is present; for Supabase copy "Connection string" from project's Settings -> Database
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    "Missing DATABASE_URL environment variable (set your Supabase connection string)."
  );
}

// Construct the adapter with the Supabase connection string
const adapter = new PrismaPg({
  connectionString,
});

// create client
const createClient = () => new PrismaClient({ adapter });

// Use a global singleton to avoid creating too many clients in dev (Next.js / hot reload)
export const prisma: PrismaClient =
  global.__prismaClient__ ?? (global.__prismaClient__ = createClient());

export default prisma;
