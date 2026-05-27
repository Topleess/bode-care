"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, History } from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";
import { WorkoutPlayer } from "@/components/workout-player";
import { useMockStore } from "@/lib/store";

export function ExerciseDetailClient({ exerciseId }: { exerciseId: string }) {
  const { state } = useMockStore();
  const exercise = state.workout.exercises.find((item) => item.id === exerciseId) ?? state.workout.exercises[0];

  return (
    <MobileShell
      title="Техника"
      eyebrow={exercise.muscle}
      action={
        <Link href="/training" className="grid h-10 w-10 place-items-center rounded-full bg-white/8" aria-label="Назад">
          <ArrowLeft size={18} />
        </Link>
      }
    >
      <section className="safe-pad pt-5">
        <WorkoutPlayer exercise={exercise} />
      </section>
      <section className="safe-pad mt-5 space-y-3">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.055] p-5">
          <h2 className="text-2xl font-semibold">Подсказки техники</h2>
          <div className="mt-4 space-y-3">
            {exercise.technique.map((tip) => (
              <div key={tip} className="flex items-center gap-3 rounded-2xl bg-black/22 p-3">
                <CheckCircle2 className="text-lime" size={20} />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[30px] border border-lime/18 bg-lime/10 p-5">
          <p className="text-sm text-lime">Комментарий тренера</p>
          <p className="mt-2 leading-6">{exercise.coachTip}</p>
        </div>
        <div className="rounded-[30px] border border-white/10 bg-white/[0.055] p-5">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
            <History size={22} />
            История
          </h2>
          <div className="space-y-2">
            {exercise.history.map((item) => (
              <div key={item} className="rounded-2xl bg-black/22 px-4 py-3 font-mono">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </MobileShell>
  );
}
