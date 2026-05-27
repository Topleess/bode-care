"use client";

import { useState } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";
import { useMockStore } from "@/lib/store";

export function DaySwitcher() {
  const [open, setOpen] = useState(false);
  const { state, selectedDay, selectDay } = useMockStore();

  return (
    <section className="safe-pad pt-4">
      <button
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between rounded-[28px] border border-white/10 bg-white/[0.055] p-2.5 pl-4"
      >
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-lime text-black">
            <CalendarDays size={20} />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold">{selectedDay.dateLabel}</p>
            <p className="text-xs text-muted">{selectedDay.weekday}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-white/8 px-3 py-2 text-sm text-muted">
          День {state.user.day}
          <ChevronDown className={open ? "rotate-180 transition" : "transition"} size={16} />
        </div>
      </button>
      {open && (
        <div className="mt-3 rounded-[30px] border border-white/10 bg-surface p-3">
          <div className="hide-scrollbar flex gap-2 overflow-x-auto">
            {state.days.map((day) => (
              <button
                key={day.id}
                onClick={() => {
                  selectDay(day.id);
                  setOpen(false);
                }}
                className={`flex min-w-14 flex-col items-center gap-1 rounded-2xl px-3 py-3 ${
                  day.id === selectedDay.id
                    ? "bg-lime text-black"
                    : day.tasks.every((task) => task.status === "done")
                      ? "bg-white/10 text-foreground"
                      : "bg-black/20 text-muted"
                }`}
              >
                <span className="text-xs">{day.dateLabel}</span>
                <span className="text-lg font-semibold">{day.weekday.split(",")[0].slice(0, 2)}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
