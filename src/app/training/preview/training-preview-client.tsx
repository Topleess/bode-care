"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Dumbbell, Play, Timer } from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";
import { useMockStore } from "@/lib/store";

export function TrainingPreviewClient() {
  const { state } = useMockStore();
  const { workout } = state;

  return (
    <MobileShell
      title="План тренировки"
      eyebrow="Сегодня"
      action={
        <Link href="/today" className="grid h-10 w-10 place-items-center rounded-full bg-white/8" aria-label="Назад">
          <ArrowLeft size={18} />
        </Link>
      }
    >
      <section className="safe-pad pt-5">
        <div className="rounded-[34px] border border-white/10 bg-white/[0.055] p-5">
          <p className="text-sm text-muted">{workout.focus}</p>
          <h1 className="mt-2 text-4xl font-semibold leading-[0.96]">{workout.title}</h1>
          <p className="mt-4 text-sm leading-5 text-muted">{workout.readinessNote}</p>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <PreviewBadge icon={<Timer size={16} />} label={workout.duration} />
            <PreviewBadge icon={<Dumbbell size={16} />} label={`${workout.exercises.length} упражнений`} />
          </div>
          <Link href="/training/session" className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-lime text-base font-semibold text-black">
            <Play size={20} fill="currentColor" />
            Начать тренировку
          </Link>
        </div>
      </section>

      <section className="safe-pad mt-6 space-y-3">
        <h2 className="text-2xl font-semibold">Состав</h2>
        {workout.exercises.map((exercise, index) => (
          <Link
            key={exercise.id}
            href={`/training/exercises/${exercise.id}`}
            className="flex items-center justify-between gap-4 rounded-[28px] border border-white/10 bg-white/[0.055] p-4"
          >
            <div className="min-w-0">
              <p className="text-sm text-muted">Упражнение {index + 1}</p>
              <h3 className="mt-1 text-lg font-semibold leading-tight">{exercise.name}</h3>
              <p className="mt-1 text-sm text-muted">{exercise.muscle} · отдых {exercise.rest}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="font-mono text-sm text-foreground">{exercise.sets} × {exercise.reps}</p>
              <p className="mt-1 text-sm text-muted">{exercise.weight}</p>
            </div>
          </Link>
        ))}
      </section>
    </MobileShell>
  );
}

function PreviewBadge({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="flex h-11 items-center justify-center gap-2 rounded-full bg-black/22 text-sm text-foreground/82">
      {icon}
      {label}
    </span>
  );
}
