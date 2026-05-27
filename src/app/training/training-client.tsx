"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Dumbbell, Play, Timer, Zap } from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";
import { useMockStore } from "@/lib/store";

export function TrainingClient() {
  const { state } = useMockStore();
  const { workout, workoutSession } = state;
  const doneSets = Object.values(workoutSession.setsByExercise).flat().filter((set) => set.done).length;

  return (
    <MobileShell title="Тренировка" eyebrow="Plan → Do → Confirm">
      <section className="safe-pad pt-5">
        <div className="rounded-[34px] border border-white/10 bg-white/[0.055] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-muted">{workout.focus}</p>
              <h1 className="mt-2 text-4xl font-semibold leading-[0.96] tracking-[-0.03em]">
                {workout.title}
              </h1>
            </div>
            <div className="grid h-14 w-14 place-items-center rounded-full bg-lime text-black">
              <Dumbbell size={24} />
            </div>
          </div>
          <p className="mt-4 text-sm leading-5 text-muted">
            {workoutSession.completed ? "Тренировка завершена. Можно открыть сессию и посмотреть подходы." : workout.readinessNote}
          </p>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <Badge icon={<Timer size={15} />} label={workout.duration} />
            <Badge icon={<Zap size={15} />} label={`${doneSets} подходов`} />
            <Badge icon={<Dumbbell size={15} />} label={`${workout.exercises.length} упр.`} />
          </div>
          <Link href="/training/session" className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-lime text-base font-semibold text-black">
            <Play size={20} fill="currentColor" />
            {workoutSession.completed ? "Открыть тренировку" : "Начать тренировку"}
          </Link>
        </div>
      </section>

      <section className="safe-pad mt-6 space-y-3">
        <h2 className="text-2xl font-semibold">Упражнения</h2>
        {workout.exercises.map((exercise, index) => (
          <Link key={exercise.id} href={`/training/exercises/${exercise.id}`} className="flex items-center justify-between rounded-[28px] border border-white/10 bg-white/[0.055] p-4">
            <div>
              <p className="text-sm text-muted">Упражнение {index + 1}</p>
              <h3 className="text-lg font-semibold">{exercise.name}</h3>
            </div>
            <p className="font-mono text-sm text-muted">{exercise.sets} × {exercise.reps}</p>
          </Link>
        ))}
      </section>
    </MobileShell>
  );
}

function Badge({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="flex h-11 items-center justify-center gap-1.5 rounded-full bg-black/22 text-xs text-foreground/82">
      {icon}
      {label}
    </span>
  );
}
