import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Announcements" };

async function getAnnouncements() {
  return prisma.announcement.findMany({
    where: {
      isPublished: true,
      OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
    },
    orderBy: { publishedAt: "desc" },
  });
}

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <>
      <PageHero
        eyebrow="Stay in the Loop"
        title="Announcements"
        description="What's happening at Ebenezer Baptist Church."
      />

      <Container className="py-16">
        {announcements.length === 0 ? (
          <p className="text-muted">There are no announcements right now &mdash; check back soon.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {announcements.map((a) => (
              <article
                key={a.id}
                className="rounded-xl border border-border bg-surface p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                  {new Intl.DateTimeFormat("en-GB", {
                    dateStyle: "long",
                  }).format(a.publishedAt)}
                </p>
                <h2 className="mt-2 font-serif text-2xl font-semibold">
                  {a.title}
                </h2>
                <p className="mt-3 whitespace-pre-wrap text-foreground/70">
                  {a.body}
                </p>
              </article>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
