"use client";

import { Check } from "lucide-react";

export function StatusToast({ message }: { message: string }) {
  return (
    <div className="fixed inset-x-0 top-[max(16px,env(safe-area-inset-top))] z-[60] mx-auto flex max-w-[480px] justify-center px-5">
      <div className="flex items-center gap-2 rounded-full border border-lime/20 bg-lime px-4 py-3 text-sm font-semibold text-black shadow-[0_18px_54px_rgba(223,255,56,0.22)]">
        <Check size={17} />
        {message}
      </div>
    </div>
  );
}
