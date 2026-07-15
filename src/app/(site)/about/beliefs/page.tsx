import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "What We Believe" };

const articles = [
  {
    title: "The Authority of Scripture",
    body: "We believe the Bible is God's inspired word and the final authority for faith and life.",
  },
  {
    title: "Salvation by Grace, Through Faith",
    body: "Redemption comes through grace, received by faith in Jesus Christ alone — not by works, so that no one may boast.",
  },
  {
    title: "Believer's Baptism",
    body: "We practise baptism by immersion as a public declaration of faith for those who have trusted in Christ.",
  },
  {
    title: "The Church as Family",
    body: "We gather as a local body to worship, disciple one another, and serve our community together.",
  },
];

export default function BeliefsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Foundation"
        title="What We Believe"
        description="Traditional Baptist doctrine, held with conviction and grace."
      />

      <Container className="py-16">
        <div className="max-w-3xl">
          <h2 className="font-serif text-2xl font-semibold">Salvation</h2>
          <p className="mt-4 text-foreground/70">
            At the centre of our faith is the good news that salvation comes
            by grace, through faith in Jesus Christ alone. No one can earn
            their way to God through good works &mdash; instead, we receive
            forgiveness and new life as a free gift, by trusting in what
            Christ has already done on the cross.
          </p>
        </div>

        <h2 className="mt-12 font-serif text-2xl font-semibold">
          Articles of Faith
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {articles.map((article) => (
            <div
              key={article.title}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <p className="font-serif text-lg font-semibold text-primary">
                {article.title}
              </p>
              <p className="mt-2 text-sm text-foreground/70">{article.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
