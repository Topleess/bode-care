"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { DaySwitcher } from "@/components/day-switcher";
import { MealCard } from "@/components/meal-card";
import { MobileShell } from "@/components/mobile-shell";
import { StickyModulePanel } from "@/components/sticky-module-panel";
import { TaskCard } from "@/components/task-card";
import { useMockStore } from "@/lib/store";
import type { MealLog } from "@/lib/types";

export function TodayClient() {
  const { state, selectedDay, nutritionTotals } = useMockStore();
  const lunch = state.meals.find((meal) => meal.id === "lunch") ?? state.meals[0];
  const completedCount = selectedDay.tasks.filter((task) => task.status === "done").length;

  return (
    <MobileShell showNav={true}>
      <DaySwitcher />
      <section className="safe-pad pt-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted">{selectedDay.weekday}</p>
            <h1 className="mt-1 text-4xl font-semibold leading-none">План на сегодня</h1>
          </div>
          <p className="rounded-full bg-white/8 px-3 py-2 text-sm text-muted">
            {completedCount} / {selectedDay.tasks.length}
          </p>
        </div>
      </section>

      <section className="safe-pad mt-5 space-y-3">
        {selectedDay.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </section>

      <section className="safe-pad mt-8 space-y-3">
        <StickyModulePanel title="Питание" meta={`Белок ${nutritionTotals.protein} / ${state.nutritionGoal.proteinGoal} г`} accent="coral" defaultOpen>
          <MealCard meal={lunch as MealLog} />
        </StickyModulePanel>
        <StickyModulePanel title="Тренировка" meta={`${state.workout.duration} · ${state.workout.focus}`} accent="lime">
          <div className="space-y-3">
            <p className="text-sm leading-5 text-muted">
              {state.workout.exercises.length} упражнений · {state.workout.readinessNote}
            </p>
            <Link href="/training/preview" className="flex h-12 items-center justify-between rounded-full bg-white px-5 text-sm font-semibold text-black">
              Посмотреть состав
              <ArrowRight size={18} />
            </Link>
          </div>
        </StickyModulePanel>
        <StickyModulePanel title="Check-in" meta={state.checkIn.completed ? "заполнен сегодня" : "2 вопроса и фото ужина вечером"} accent="aqua">
          <Link href="/check-in" className="flex items-center gap-3 rounded-[22px] bg-white/7 p-4">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-aqua/12 text-aqua">
              <MessageCircle size={20} />
            </span>
            <span className="min-w-0">
              <span className="block font-semibold">{state.checkIn.completed ? "Ответы сохранены" : "Вечерний check-in"}</span>
              <span className="mt-1 block text-sm text-muted">{state.checkIn.completed ? state.checkIn.comment || "Самочувствие сохранено." : "Самочувствие, голод, сон и фото ужина."}</span>
            </span>
          </Link>
        </StickyModulePanel>
        <StickyModulePanel title="Прогресс" meta={`${state.progress.adherence}% выполнения недели`} accent="violet">
          <div className="grid grid-cols-3 gap-2">
            <ModuleMetric label="Вес" value={state.progress.weight} />
            <ModuleMetric label="Талия" value={state.progress.waist} />
            <ModuleMetric label="План" value={`${state.progress.adherence}%`} />
          </div>
          <Link href="/progress/new" className="mt-3 flex h-12 items-center justify-between rounded-full bg-white px-5 text-sm font-semibold text-black">
            Добавить замер
            <ArrowRight size={18} />
          </Link>
        </StickyModulePanel>
      </section>
    </MobileShell>
  );
}

function ModuleMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[18px] bg-white/7 p-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}
