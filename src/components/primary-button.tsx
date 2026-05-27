import Link from "next/link";
import type { ReactNode } from "react";

type PrimaryButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
};

export function PrimaryButton({ href, children, variant = "solid" }: PrimaryButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex h-14 w-full items-center justify-center rounded-full px-6 text-base font-semibold transition active:scale-[0.98] ${
        variant === "solid"
          ? "bg-lime text-black shadow-[0_16px_44px_rgba(223,255,56,0.24)]"
          : "border border-white/12 bg-white/5 text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}
