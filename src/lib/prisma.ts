import path from "node:path";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Resolve a relative sqlite "file:" URL against the project root (where
// prisma.config.ts lives), matching how the Prisma CLI resolves it.
const rawUrl = process.env.DATABASE_URL ?? "file:./dev.db";
const sqlitePath = rawUrl.startsWith("file:")
  ? path.join(process.cwd(), rawUrl.replace(/^file:/, ""))
  : rawUrl;

const adapter = new PrismaBetterSqlite3({ url: `file:${sqlitePath}` });

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
