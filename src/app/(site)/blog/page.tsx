import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Blog" };

async function getPosts() {
  return prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
  });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHero
        eyebrow="Reflections & Teaching"
        title="Blog"
        description="Articles and updates from our church family."
      />

      <Container className="py-16">
        {posts.length === 0 ? (
          <p className="text-muted">No posts yet &mdash; check back soon.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-xl border border-border bg-surface p-8 transition hover:border-primary hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                  {post.publishedAt &&
                    new Intl.DateTimeFormat("en-GB", {
                      dateStyle: "long",
                    }).format(post.publishedAt)}
                </p>
                <h2 className="mt-2 font-serif text-xl font-semibold group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm text-foreground/70">
                  {post.excerpt}
                </p>
                <span className="mt-4 text-sm font-semibold text-primary">
                  Read more &rarr;
                </span>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
