import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="We'd Love to Hear From You"
        title="Contact Us"
        description="Reach out with questions, prayer requests, or to plan your visit."
      />

      <Container className="grid gap-10 py-16 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-8">
          <h2 className="font-serif text-2xl font-semibold">Get in Touch</h2>
          <dl className="mt-6 space-y-4 text-sm text-foreground/70">
            <div>
              <dt className="font-semibold text-foreground">Address</dt>
              <dd>Linwood Street, Newton Heath, Manchester, M40 1EZ</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Email</dt>
              <dd>
                <a
                  href="mailto:Pastor@ebenezerbaptist.uk"
                  className="text-primary hover:underline"
                >
                  Pastor@ebenezerbaptist.uk
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Sunday Service</dt>
              <dd>11:00 AM, with Sunday School and Fellowship</dd>
            </div>
          </dl>
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          <iframe
            title="Church location map"
            className="h-full min-h-[320px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Linwood+Street,+Newton+Heath,+Manchester,+M40+1EZ&output=embed"
          />
        </div>
      </Container>
    </>
  );
}
