import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Committee" };

export default function CommitteePage() {
  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="Committee Members"
        description="The team who serve and steward our church family."
      />

      <Container className="py-16">
        <div className="max-w-3xl">
          <p className="text-foreground/70">
            Ebenezer Baptist Church is led by a committee of church members
            who oversee the life and ministry of our congregation alongside
            our Pastor. Committee member details will be added here soon.
          </p>
          <p className="mt-4 text-foreground/70">
            If you&apos;d like to get in touch with the committee, please
            visit our{" "}
            <a href="/contact" className="text-primary hover:underline">
              Contact page
            </a>
            .
          </p>
        </div>
      </Container>
    </>
  );
}
