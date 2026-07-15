import Link from "next/link";
import { type ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition";
const variants = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  gold: "bg-gold text-white hover:brightness-95",
  outline: "border border-white/40 text-white hover:bg-white/10",
  ghost: "border border-border text-foreground hover:border-primary hover:text-primary",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
