"use client";

import Link from "next/link";
import { Award, Flame, Plus, Share2 } from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";
import { ProgressCard } from "@/components/progress-card";
import { Timeline } from "@/components/timeline";
import { useMockStore } from "@/lib/store";

export function ProgressClient() {
  const { state } = useMockStore();
  const habitScores = [
    { label: "Белок", value: state.progress.protein },
    { label: "Тренировки", value: state.workoutSession.completed ? 100 : 80 },
    { label: "Сон", value: state.checkIn.completed ? state.checkIn.sleep * 10 : 68 },
    { label: "Вода", value: Math.round((state.days[1].waterMl / state.days[1].waterGoalMl) * 100) },
  ];

  return (
    <MobileShell title="Прогресс" eyebrow="Measure → See → Stay engaged">
      <section className="safe-pad pt-5">
        <ProgressCard progress={state.progress} />
      </section>

      <section className="safe-pad mt-6">
        <div className="rounded-[34px] border border-white/10 bg-white/[0.055] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted">Геймификация</p>
              <h2 className="text-2xl font-semibold">Серия и навыки</h2>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-full bg-coral text-black">
              <Flame size={22} />
            </div>
          </div>
          <div className="mt-5 space-y-4">
            {habitScores.map((score) => (
              <div key={score.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>{score.label}</span>
                  <span className="text-muted">{score.value}%</span>
                </div>
                <div className="h-3 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-lime" style={{ width: `${score.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="safe-pad mt-5 grid grid-cols-2 gap-3">
        <Link href="/progress/new" className="flex h-28 flex-col items-start justify-between rounded-[30px] bg-lime p-4 text-left font-semibold text-black">
          <Plus size={24} />
          Добавить замер
        </Link>
        <button className="flex h-28 flex-col items-start justify-between rounded-[30px] border border-white/10 bg-white/[0.055] p-4 text-left font-semibold">
          <Share2 size={24} />
          Поделиться карточкой
        </button>
      </section>

      <section className="safe-pad mt-7">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
          <Award size={22} />
          Timeline
        </h2>
        <Timeline entries={state.progressEntries} />
      </section>
    </MobileShell>
  );
}
