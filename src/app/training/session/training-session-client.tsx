"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";
import { WorkoutPlayer } from "@/components/workout-player";
import { useMockStore } from "@/lib/store";

export function TrainingSessionClient() {
  const router = useRouter();
  const { state, updateState, updateWorkoutSet, addWorkoutSet, completeWorkout } = useMockStore();
  const activeIndex = state.workout.exercises.findIndex((exercise) => exercise.id === state.workoutSession.activeExerciseId);
  const exercise = state.workout.exercises[activeIndex] ?? state.workout.exercises[0];
  const sets = state.workoutSession.setsByExercise[exercise.id] ?? [];

  const setActive = (index: number) => {
    const next = state.workout.exercises[index];
    if (!next) return;
    updateState((current) => ({
      ...current,
      workoutSession: { ...current.workoutSession, activeExerciseId: next.id },
    }));
  };

  return (
    <MobileShell
      title="Workout mode"
      eyebrow={`${activeIndex + 1} / ${state.workout.exercises.length}`}
      action={
        <Link href="/training" className="grid h-10 w-10 place-items-center rounded-full bg-white/8" aria-label="Назад">
          <ArrowLeft size={18} />
        </Link>
      }
    >
      <section className="safe-pad pt-5">
        <WorkoutPlayer exercise={exercise} />
      </section>
      <section className="safe-pad mt-5">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.055] p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Подходы</h3>
              <p className="text-sm text-muted">{exercise.sets} подхода · отдых {exercise.rest}</p>
            </div>
            <button
              onClick={() => addWorkoutSet(exercise.id)}
              className="h-10 rounded-full bg-lime px-4 text-sm font-semibold text-black"
            >
              +
            </button>
          </div>
          <div className="space-y-2">
            {sets.map((set, index) => (
              <div key={set.id} className="grid grid-cols-[28px_minmax(0,1fr)_minmax(0,1fr)_42px] items-center gap-2 rounded-2xl bg-black/24 p-2">
                <span className="text-center text-sm text-muted">{index + 1}</span>
                <input
                  value={set.weight}
                  onChange={(event) => updateWorkoutSet(exercise.id, set.id, { weight: event.target.value })}
                  className="h-11 min-w-0 rounded-xl border border-white/10 bg-white/5 px-3 text-center font-mono outline-none focus:border-lime/50"
                  inputMode="decimal"
                  aria-label={`Вес подхода ${index + 1}`}
                />
                <input
                  value={set.reps}
                  onChange={(event) => updateWorkoutSet(exercise.id, set.id, { reps: event.target.value })}
                  className="h-11 min-w-0 rounded-xl border border-white/10 bg-white/5 px-3 text-center font-mono outline-none focus:border-lime/50"
                  inputMode="numeric"
                  aria-label={`Повторы подхода ${index + 1}`}
                />
                <button
                  onClick={() => updateWorkoutSet(exercise.id, set.id, { done: !set.done })}
                  className={`h-11 min-w-0 rounded-xl text-sm font-semibold ${set.done ? "bg-lime text-black" : "bg-white/8 text-muted"}`}
                >
                  ✓
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="safe-pad mt-5 grid grid-cols-[1fr_1fr] gap-3">
        <button
          onClick={() => setActive(Math.max(0, activeIndex - 1))}
          className="flex h-14 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 font-semibold"
        >
          <ChevronLeft size={18} />
          Назад
        </button>
        {activeIndex < state.workout.exercises.length - 1 ? (
          <button
            onClick={() => setActive(activeIndex + 1)}
            className="flex h-14 items-center justify-center gap-2 rounded-full bg-white font-semibold text-black"
          >
            Дальше
            <ChevronRight size={18} />
          </button>
        ) : (
          <button
            onClick={() => {
              completeWorkout();
              router.push("/today");
            }}
            className="flex h-14 items-center justify-center gap-2 rounded-full bg-lime font-semibold text-black"
          >
            <Check size={18} />
            Завершить
          </button>
        )}
      </section>
    </MobileShell>
  );
}
