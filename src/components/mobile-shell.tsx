import Link from "next/link";
import type { ReactNode } from "react";
import { BottomNav } from "./bottom-nav";

type MobileShellProps = {
  children: ReactNode;
  title?: string;
  eyebrow?: string;
  showNav?: boolean;
  action?: ReactNode;
};

export function MobileShell({
  children,
  title,
  eyebrow,
  showNav = true,
  action,
}: MobileShellProps) {
  return (
    <main className="min-h-dvh overflow-hidden bg-[radial-gradient(circle_at_50%_-10%,rgba(223,255,56,0.16),transparent_30%),linear-gradient(180deg,#0a0d0b_0%,#050606_42%)]">
      <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col border-x border-white/8 bg-background/82 phone-shadow">
        {(title || eyebrow || action) && (
          <header className="safe-pad sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/8 bg-background/82 pb-4 pt-[max(18px,env(safe-area-inset-top))] backdrop-blur-2xl">
            <Link
              href="/today"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold"
              aria-label="На главный экран"
            >
              B
            </Link>
            <div className="min-w-0 flex-1">
              {eyebrow && <p className="text-xs uppercase tracking-[0.22em] text-muted">{eyebrow}</p>}
              {title && <h1 className="truncate text-xl font-semibold">{title}</h1>}
            </div>
            {action}
          </header>
        )}
        <div className={showNav ? "flex-1 pb-28" : "flex-1"}>{children}</div>
        {showNav && <BottomNav />}
      </div>
    </main>
  );
}
