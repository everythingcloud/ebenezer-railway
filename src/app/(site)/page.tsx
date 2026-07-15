import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getLatestAnnouncement() {
  return prisma.announcement.findFirst({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
  });
}

async function getLatestPosts() {
  return prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });
}

export default async function HomePage() {
  const [announcement, posts] = await Promise.all([
    getLatestAnnouncement(),
    getLatestPosts(),
  ]);

  return (
    <>
      <section className="relative overflow-hidden bg-primary-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,134,58,0.25),transparent_55%)]" />
        <Container className="relative py-24 sm:py-32">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-light">
            Welcome Home
          </p>
          <h1 className="mt-4 max-w-2xl font-serif text-5xl font-semibold leading-tight sm:text-6xl">
            A warm, Christ-centred community in Newton Heath
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Join us for worship, teaching, and fellowship as we grow together
            in faith. Salvation by grace, through faith in Jesus Christ alone.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/weekly-services" variant="gold">
              Plan Your Visit
            </Button>
            <Button href="/about" variant="outline">
              Our Story
            </Button>
          </div>
        </Container>
      </section>

      {announcement && (
        <section className="bg-gold-light/20">
          <Container className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-foreground/80">
              <span className="mr-2 rounded-full bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                Announcement
              </span>
              {announcement.title}
            </p>
            <Link
              href="/announcements"
              className="text-sm font-semibold text-primary hover:underline"
            >
              View all announcements &rarr;
            </Link>
          </Container>
        </section>
      )}

      <section className="py-20">
        <Container>
          <div className="grid gap-10 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-surface p-8 shadow-sm">
              <p className="font-serif text-2xl font-semibold text-primary">
                11:00 AM
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-muted">
                Sunday Worship
              </p>
              <p className="mt-3 text-sm text-foreground/70">
                Sunday School and Fellowship follow the main service.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-8 shadow-sm">
              <p className="font-serif text-2xl font-semibold text-primary">
                First Sunday
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-muted">
                The Lord&apos;s Table
              </p>
              <p className="mt-3 text-sm text-foreground/70">
                Observed monthly as we remember Christ&apos;s sacrifice together.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-8 shadow-sm">
              <p className="font-serif text-2xl font-semibold text-primary">
                All Week
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-muted">
                Bible Studies &amp; Prayer
              </p>
              <p className="mt-3 text-sm text-foreground/70">
                Fellowship groups meet throughout the week &mdash; see Weekly Services.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface py-20">
        <Container>
          <div className="flex items-end justify-between">
            <h2 className="font-serif text-3xl font-semibold">From the Blog</h2>
            <Link href="/blog" className="text-sm font-semibold text-primary hover:underline">
              View all posts &rarr;
            </Link>
          </div>

          {posts.length === 0 ? (
            <p className="mt-8 text-sm text-muted">
              New articles are on their way &mdash; check back soon.
            </p>
          ) : (
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-xl border border-border p-6 transition hover:border-primary hover:shadow-md"
                >
                  <p className="font-serif text-lg font-semibold group-hover:text-primary">
                    {post.title}
                  </p>
                  <p className="mt-2 line-clamp-3 text-sm text-foreground/70">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="bg-primary py-16 text-white">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-serif text-3xl font-semibold">
            You&apos;re invited this Sunday
          </h2>
          <p className="max-w-xl text-white/80">
            Whatever your background or story, there&apos;s a seat for you at
            Ebenezer Baptist Church.
          </p>
          <Button href="/contact" variant="gold">
            Get in Touch
          </Button>
        </Container>
      </section>
    </>
  );
}
