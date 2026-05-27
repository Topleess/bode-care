"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Apple, ChartNoAxesCombined, Dumbbell, House, UserRound } from "lucide-react";

const items = [
  { href: "/today", label: "Сегодня", icon: House },
  { href: "/nutrition", label: "Питание", icon: Apple },
  { href: "/training", label: "Тренировка", icon: Dumbbell },
  { href: "/progress", label: "Прогресс", icon: ChartNoAxesCombined },
  { href: "/profile", label: "Профиль", icon: UserRound },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="safe-pad pb-safe fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[480px] border-t border-white/8 bg-background/88 pt-3 backdrop-blur-2xl">
      <div className="grid grid-cols-5 gap-1 rounded-[28px] border border-white/10 bg-white/[0.04] p-1.5">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex h-[58px] flex-col items-center justify-center gap-1 rounded-[22px] text-[11px] transition ${
                active
                  ? "bg-lime text-black shadow-[0_0_28px_rgba(223,255,56,0.24)]"
                  : "text-muted hover:bg-white/7 hover:text-foreground"
              }`}
            >
              <Icon size={20} strokeWidth={2.2} />
              <span className="max-w-full truncate px-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
