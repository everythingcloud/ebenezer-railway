import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Our Story" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Our Story"
        description="A warm, Christ-centred community in the heart of Newton Heath."
      />

      <Container className="grid gap-12 py-16 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="font-serif text-2xl font-semibold">Who We Are</h2>
          <p className="mt-4 text-foreground/70">
            Ebenezer Baptist Church is a registered Baptist charity
            (Charity Number 233642), affiliated with the Old Baptist Union
            and rooted in the Newton Heath area of Manchester for
            generations. We are a warm, Christ-centred community that
            welcomes anyone exploring faith and spiritual growth through
            worship, teaching, and fellowship.
          </p>

          <h2 className="mt-10 font-serif text-2xl font-semibold">
            Our History
          </h2>
          <p className="mt-4 text-foreground/70">
            For many years our church family has gathered on Linwood Street
            to worship together, serve our local community, and pass on the
            faith to the next generation. Through changing times, our
            commitment to the Gospel and to one another has stayed the same.
          </p>

          <h2 className="mt-10 font-serif text-2xl font-semibold">
            Our Foundation
          </h2>
          <p className="mt-4 text-foreground/70">
            Everything we do flows from our conviction that salvation comes
            by grace, through faith in Jesus Christ alone &mdash; not by works.
            Read more about{" "}
            <a href="/about/beliefs" className="text-primary hover:underline">
              what we believe
            </a>
            .
          </p>
        </div>

        <aside className="rounded-xl border border-border bg-surface p-6 text-sm">
          <p className="font-semibold uppercase tracking-wide text-gold">
            At a Glance
          </p>
          <dl className="mt-4 space-y-3 text-foreground/70">
            <div>
              <dt className="font-semibold text-foreground">Affiliation</dt>
              <dd>Old Baptist Union</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Charity Number</dt>
              <dd>233642</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Address</dt>
              <dd>Linwood Street, Newton Heath, Manchester, M40 1EZ</dd>
            </div>
          </dl>
        </aside>
      </Container>
    </>
  );
}
