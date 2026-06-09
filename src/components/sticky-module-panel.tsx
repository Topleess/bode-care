"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import type { Accent } from "@/lib/types";
import { accentBg, accentSoft } from "@/lib/ui";

type StickyModulePanelProps = {
  title: string;
  meta: string;
  accent: Accent;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function StickyModulePanel({
  title,
  meta,
  accent,
  children,
  defaultOpen = false,
}: StickyModulePanelProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="rounded-[30px] border border-white/10 bg-white/[0.045] p-3">
      <button
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 rounded-[24px] px-2 py-2 text-left"
      >
        <div className="flex items-center gap-3">
          <span className={`h-12 w-1.5 rounded-full ${accentBg[accent]}`} />
          <div className="min-w-0">
            <h3 className="text-2xl font-semibold leading-tight">{title}</h3>
            <p className="mt-1 text-sm text-muted">{meta}</p>
          </div>
        </div>
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border ${accentSoft[accent]}`}>
          <ChevronDown className={open ? "rotate-180 transition" : "transition"} size={18} />
        </span>
      </button>
      {open && <div className="px-2 pb-3 pt-3">{children}</div>}
    </section>
  );
}
