"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  coverImageUrl: z.string().optional(),
  isPublished: z.boolean(),
});

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }
  return session.user.email;
}

function parseForm(formData: FormData) {
  return blogSchema.parse({
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    coverImageUrl: formData.get("coverImageUrl")?.toString() || undefined,
    isPublished: formData.get("isPublished") === "on",
  });
}

async function uniqueSlug(base: string, ignoreId?: string) {
  let slug = slugify(base) || "post";
  let suffix = 1;

  while (
    await prisma.blogPost.findFirst({
      where: { slug, ...(ignoreId ? { NOT: { id: ignoreId } } : {}) },
    })
  ) {
    suffix += 1;
    slug = `${slugify(base)}-${suffix}`;
  }

  return slug;
}

export async function createBlogPost(formData: FormData) {
  const authorEmail = await requireAdmin();
  const data = parseForm(formData);
  const slug = await uniqueSlug(data.title);

  await prisma.blogPost.create({
    data: {
      title: data.title,
      slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImageUrl: data.coverImageUrl || null,
      isPublished: data.isPublished,
      publishedAt: data.isPublished ? new Date() : null,
      authorEmail,
    },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function updateBlogPost(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseForm(formData);

  const existing = await prisma.blogPost.findUniqueOrThrow({ where: { id } });
  const slug =
    existing.title === data.title
      ? existing.slug
      : await uniqueSlug(data.title, id);

  await prisma.blogPost.update({
    where: { id },
    data: {
      title: data.title,
      slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImageUrl: data.coverImageUrl || null,
      isPublished: data.isPublished,
      publishedAt: data.isPublished ? existing.publishedAt ?? new Date() : null,
    },
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${existing.slug}`);
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function deleteBlogPost(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  if (!id) throw new Error("Missing id");

  const existing = await prisma.blogPost.delete({ where: { id } });

  revalidatePath("/blog");
  revalidatePath(`/blog/${existing.slug}`);
  revalidatePath("/admin/blog");
}
