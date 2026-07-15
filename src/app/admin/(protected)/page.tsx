import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [announcementCount, postCount, draftCount] = await Promise.all([
    prisma.announcement.count({ where: { isPublished: true } }),
    prisma.blogPost.count({ where: { isPublished: true } }),
    prisma.blogPost.count({ where: { isPublished: false } }),
  ]);

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">
        Manage announcements and blog posts for the public site.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <Link
          href="/admin/announcements"
          className="rounded-xl border border-border bg-surface p-6 transition hover:border-primary"
        >
          <p className="text-3xl font-semibold text-primary">
            {announcementCount}
          </p>
          <p className="mt-1 text-sm text-muted">Live announcements</p>
        </Link>
        <Link
          href="/admin/blog"
          className="rounded-xl border border-border bg-surface p-6 transition hover:border-primary"
        >
          <p className="text-3xl font-semibold text-primary">{postCount}</p>
          <p className="mt-1 text-sm text-muted">Published posts</p>
        </Link>
        <Link
          href="/admin/blog"
          className="rounded-xl border border-border bg-surface p-6 transition hover:border-primary"
        >
          <p className="text-3xl font-semibold text-primary">{draftCount}</p>
          <p className="mt-1 text-sm text-muted">Draft posts</p>
        </Link>
      </div>
    </div>
  );
}
