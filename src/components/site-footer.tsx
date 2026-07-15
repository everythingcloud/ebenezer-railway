import Link from "next/link";
import { Container } from "@/components/container";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-primary-dark text-white/90">
      <Container className="grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-serif text-lg font-semibold text-white">
            Ebenezer Baptist Church
          </p>
          <p className="mt-3 text-sm text-white/70">
            Linwood Street, Newton Heath, Manchester, M40 1EZ
          </p>
          <p className="mt-1 text-sm text-white/70">
            Registered Charity No. 233642
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-light">
            Explore
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/weekly-services" className="text-white/70 hover:text-white">
                Weekly Services
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-white/70 hover:text-white">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/announcements" className="text-white/70 hover:text-white">
                Announcements
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-white/70 hover:text-white">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-light">
            Get in Touch
          </p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <a
                href="mailto:Pastor@ebenezerbaptist.uk"
                className="hover:text-white"
              >
                Pastor@ebenezerbaptist.uk
              </a>
            </li>
            <li>Sunday Service &middot; 11:00 AM</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container>
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} Ebenezer Baptist Church. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}
