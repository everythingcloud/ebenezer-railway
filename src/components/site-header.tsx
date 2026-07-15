"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const aboutLinks = [
  { href: "/about", label: "Our Story" },
  { href: "/about/beliefs", label: "What We Believe" },
  { href: "/about/kids", label: "Kids" },
  { href: "/about/committee", label: "Committee" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/weekly-services", label: "Weekly Services" },
  { href: "/announcements", label: "Announcements" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Ebenezer Baptist Church logo"
            width={44}
            height={44}
            className="rounded-md"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-xl font-semibold text-primary">
              Ebenezer Baptist Church
            </span>
            <span className="text-xs tracking-wide text-muted uppercase">
              Newton Heath, Manchester
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-foreground/80 transition hover:text-primary"
          >
            Home
          </Link>

          <div className="group relative">
            <button className="flex items-center gap-1 text-sm font-medium text-foreground/80 transition hover:text-primary">
              About
              <svg
                aria-hidden
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="invisible absolute left-0 top-full w-56 rounded-lg border border-border bg-surface p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
              {aboutLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-background hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-border md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            className="h-5 w-5"
          >
            {mobileOpen ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border bg-surface px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-2 py-2 text-sm font-medium text-foreground/80 hover:bg-background hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-border pt-2">
              <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-muted">
                About
              </p>
              {aboutLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-2 py-2 text-sm text-foreground/80 hover:bg-background hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
