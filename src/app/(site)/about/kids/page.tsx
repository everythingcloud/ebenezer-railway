import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Kids" };

export default function KidsPage() {
  return (
    <>
      <PageHero
        eyebrow="For Families"
        title="Kids at Ebenezer"
        description="A safe, welcoming space for children to learn about God's love."
      />

      <Container className="py-16">
        <div className="max-w-3xl">
          <h2 className="font-serif text-2xl font-semibold">Sunday School</h2>
          <p className="mt-4 text-foreground/70">
            Our children join Sunday School during the morning service, where
            they learn Bible stories and grow in faith alongside friends
            their own age, before rejoining their families for Fellowship.
          </p>
        </div>
      </Container>
    </>
  );
}
