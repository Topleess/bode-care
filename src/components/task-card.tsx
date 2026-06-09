import Link from "next/link";
import { Check, Clock, Dumbbell, MessageCircle, Utensils } from "lucide-react";
import type { Task } from "@/lib/types";

const iconByType = {
  meal: Utensils,
  workout: Dumbbell,
  checkin: MessageCircle,
  progress: Check,
};

const solidTaskTone: Record<Task["accent"], string> = {
  lime: "bg-lime text-black",
  mint: "bg-mint text-black",
  aqua: "bg-aqua text-black",
  coral: "bg-coral text-black",
  violet: "bg-violet text-black",
};

export function TaskCard({ task }: { task: Task }) {
  const Icon = iconByType[task.type];
  const done = task.status === "done";

  return (
    <Link
      href={task.href}
      className={`block rounded-[34px] p-5 shadow-[0_18px_44px_rgba(0,0,0,0.18)] transition active:scale-[0.99] ${
        done ? "border border-white/10 bg-white/[0.055] text-foreground/72" : solidTaskTone[task.accent]
      }`}
    >
      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0">
          <div className={`mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm ${done ? "bg-white/8 text-muted" : "bg-black/10 text-black/72"}`}>
            <Clock size={15} />
            <span>{task.time}</span>
          </div>
          <h3 className="text-3xl font-semibold leading-none">{task.title}</h3>
          <p className={`mt-3 text-sm leading-5 ${done ? "text-muted" : "text-black/68"}`}>{task.detail}</p>
        </div>
        <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-full ${done ? "bg-white/8 text-muted" : "bg-black/10 text-black"}`}>
          <Icon size={24} />
        </div>
      </div>
    </Link>
  );
}
