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
    <section className="-mt-2 rounded-t-[34px] border border-white/10 bg-surface p-3 shadow-[0_-16px_42px_rgba(0,0,0,0.32)]">
      <button
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between rounded-[26px] px-2 py-2 text-left"
      >
        <div className="flex items-center gap-3">
          <span className={`h-12 w-2 rounded-full ${accentBg[accent]}`} />
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-sm text-muted">{meta}</p>
          </div>
        </div>
        <span className={`grid h-10 w-10 place-items-center rounded-full border ${accentSoft[accent]}`}>
          <ChevronDown className={open ? "rotate-180 transition" : "transition"} size={18} />
        </span>
      </button>
      {open && <div className="px-2 pb-3 pt-2">{children}</div>}
    </section>
  );
}
