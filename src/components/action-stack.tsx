"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, X } from "lucide-react";
import type { Task } from "@/lib/types";
import { useMockStore } from "@/lib/store";
import { accentSoft } from "@/lib/ui";

export function ActionStack({ tasks }: { tasks: Task[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const { updateTaskStatus } = useMockStore();
  const task = tasks[index] ?? tasks[0];

  const goNext = (navigate = false) => {
    if (navigate) {
      setOpen(false);
      router.push(task.href);
      return;
    }
    updateTaskStatus(task.id, "done");
    if (index < tasks.length - 1) setIndex(index + 1);
    else setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-5 flex h-16 w-full items-center justify-between rounded-full bg-lime px-6 text-lg font-semibold text-black shadow-[0_18px_54px_rgba(223,255,56,0.25)] active:scale-[0.99]"
      >
        Приступить
        <ArrowRight size={22} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 mx-auto flex max-w-[480px] items-end bg-black/62 backdrop-blur-sm">
          <section className="safe-pad pb-safe w-full rounded-t-[38px] border border-white/10 bg-[#101210] p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted">Шаг {index + 1} из {tasks.length}</p>
                <h2 className="text-2xl font-semibold">Сейчас в фокусе</h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full bg-white/8"
                aria-label="Закрыть"
              >
                <X size={20} />
              </button>
            </div>
            <div className={`rounded-[30px] border p-5 ${accentSoft[task.accent]}`}>
              <p className="text-sm opacity-80">{task.time}</p>
              <h3 className="mt-2 text-2xl font-semibold leading-tight">{task.title}</h3>
              <p className="mt-3 text-sm leading-5 text-foreground/76">{task.detail}</p>
            </div>
            <div className="mt-5 grid grid-cols-[1fr_auto] gap-3">
              <button
                onClick={() => goNext(true)}
                className="h-14 rounded-full bg-white text-base font-semibold text-black"
              >
                {task.action}
              </button>
              <button
                onClick={() => goNext(false)}
                className="grid h-14 w-14 place-items-center rounded-full border border-white/12 bg-white/5"
                aria-label="Отметить выполненным"
              >
                <Check size={21} />
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
