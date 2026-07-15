import { Container } from "@/components/container";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-border bg-primary-dark text-white">
      <Container className="py-16">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-light">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 font-serif text-4xl font-semibold sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-white/80">{description}</p>
        )}
      </Container>
    </div>
  );
}
