"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";

type BottomSheetProps = {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  onClose: () => void;
};

export function BottomSheet({ open, title, description, children, onClose }: BottomSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 mx-auto flex max-w-[480px] items-end bg-black/62 backdrop-blur-sm">
      <section className="safe-pad pb-safe max-h-[86dvh] w-full overflow-y-auto rounded-t-[38px] border border-white/10 bg-[#101210] p-5 shadow-[0_-24px_70px_rgba(0,0,0,0.42)]">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">{title}</h2>
            {description && <p className="mt-1 text-sm leading-5 text-muted">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/8"
            aria-label="Закрыть"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}
