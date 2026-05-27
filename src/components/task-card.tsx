import Link from "next/link";
import { ArrowRight, Check, Clock, Dumbbell, MessageCircle, Utensils } from "lucide-react";
import type { Task } from "@/lib/types";
import { accentSoft } from "@/lib/ui";

const iconByType = {
  meal: Utensils,
  workout: Dumbbell,
  checkin: MessageCircle,
  progress: Check,
};

export function TaskCard({ task, compact = false }: { task: Task; compact?: boolean }) {
  const Icon = iconByType[task.type];

  return (
    <article className="rounded-[30px] border border-white/10 bg-white/[0.055] p-4 shadow-[0_18px_44px_rgba(0,0,0,0.22)]">
      <div className="flex items-start gap-3">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${accentSoft[task.accent]}`}>
          <Icon size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2 text-xs text-muted">
            <Clock size={13} />
            <span>{task.time}</span>
          </div>
          <h3 className="text-lg font-semibold leading-tight">{task.title}</h3>
          {!compact && <p className="mt-2 text-sm leading-5 text-muted">{task.detail}</p>}
        </div>
      </div>
      <Link href={task.href} className="mt-4 flex h-12 w-full items-center justify-between rounded-full bg-white px-5 text-sm font-semibold text-black active:scale-[0.99]">
        <span>{task.action}</span>
        <ArrowRight size={18} />
      </Link>
    </article>
  );
}
