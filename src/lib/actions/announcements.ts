"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const announcementSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Body is required"),
  isPublished: z.boolean(),
  expiresAt: z.string().optional(),
});

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }
  return session.user.email;
}

function parseForm(formData: FormData) {
  return announcementSchema.parse({
    title: formData.get("title"),
    body: formData.get("body"),
    isPublished: formData.get("isPublished") === "on",
    expiresAt: formData.get("expiresAt")?.toString() || undefined,
  });
}

export async function createAnnouncement(formData: FormData) {
  const authorEmail = await requireAdmin();
  const data = parseForm(formData);

  await prisma.announcement.create({
    data: {
      title: data.title,
      body: data.body,
      isPublished: data.isPublished,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      authorEmail,
    },
  });

  revalidatePath("/announcements");
  revalidatePath("/admin/announcements");
  redirect("/admin/announcements");
}

export async function updateAnnouncement(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseForm(formData);

  await prisma.announcement.update({
    where: { id },
    data: {
      title: data.title,
      body: data.body,
      isPublished: data.isPublished,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
    },
  });

  revalidatePath("/announcements");
  revalidatePath("/admin/announcements");
  redirect("/admin/announcements");
}

export async function deleteAnnouncement(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  if (!id) throw new Error("Missing id");

  await prisma.announcement.delete({ where: { id } });

  revalidatePath("/announcements");
  revalidatePath("/admin/announcements");
}
