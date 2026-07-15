import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/button";

export const metadata: Metadata = { title: "Weekly Services" };

export default function WeeklyServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Join Us"
        title="Weekly Services"
        description="Everything you need to know before you visit."
      />

      <Container className="py-16">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-gold">
              Sunday
            </p>
            <p className="mt-2 font-serif text-3xl font-semibold text-primary">
              11:00 AM
            </p>
            <p className="mt-3 text-foreground/70">
              Our main Sunday Worship Service, with Sunday School for children
              and Fellowship for all ages following the service.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-gold">
              First Sunday of the Month
            </p>
            <p className="mt-2 font-serif text-3xl font-semibold text-primary">
              The Lord&apos;s Table
            </p>
            <p className="mt-3 text-foreground/70">
              We observe the Lord&apos;s Table together as a church family,
              remembering Christ&apos;s sacrifice on our behalf.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-xl border border-border bg-surface p-8">
          <h2 className="font-serif text-2xl font-semibold">
            Midweek Gatherings
          </h2>
          <p className="mt-3 max-w-2xl text-foreground/70">
            Throughout the week we also meet in smaller groups for Bible
            study, prayer, and fellowship. Days and times vary by season &mdash;
            get in touch and we&apos;ll point you to a group that fits.
          </p>
          <div className="mt-6">
            <Button href="/contact" variant="ghost">
              Ask About Midweek Groups
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
