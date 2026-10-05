import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  return { title: post?.title ?? "Blog" };
}

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });

  if (!post || !post.isPublished) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow={
          post.publishedAt
            ? new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(
                post.publishedAt
              )
            : undefined
        }
        title={post.title}
      />

      <Container className="max-w-3xl py-16">
        <div className="whitespace-pre-wrap text-lg leading-relaxed text-foreground/80">
          {post.content}
        </div>
      </Container>
    </>
  );
}
