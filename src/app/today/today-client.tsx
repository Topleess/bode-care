"use client";

import { Activity, Flame, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { ActionStack } from "@/components/action-stack";
import { DaySwitcher } from "@/components/day-switcher";
import { MealCard } from "@/components/meal-card";
import { MobileShell } from "@/components/mobile-shell";
import { ProgressCard } from "@/components/progress-card";
import { StickyModulePanel } from "@/components/sticky-module-panel";
import { TaskCard } from "@/components/task-card";
import { useMockStore } from "@/lib/store";
import type { MealLog } from "@/lib/types";

export function TodayClient() {
  const { state, selectedDay, nutritionTotals } = useMockStore();
  const openTasks = selectedDay.tasks.filter((task) => task.status !== "done");
  const lunch = state.meals.find((meal) => meal.id === "lunch") ?? state.meals[0];
  const completedCount = selectedDay.tasks.filter((task) => task.status === "done").length;
  const completion = Math.round((completedCount / Math.max(1, selectedDay.tasks.length)) * 100);

  return (
    <MobileShell showNav={true}>
      <DaySwitcher />
      <section className="safe-pad pt-5">
        <div className="rounded-[38px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.09),rgba(255,255,255,0.035))] p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted">{state.user.phase}</p>
              <h1 className="mt-2 text-4xl font-semibold leading-[0.96] tracking-[-0.03em] text-balance">
                {completion === 100 ? "День закрыт. Хорошая работа." : "Добро пожаловать. Сегодня без хаоса."}
              </h1>
            </div>
            <div className="grid h-16 w-16 place-items-center rounded-full bg-lime text-black">
              <div className="text-center">
                <p className="text-xl font-semibold leading-none">{selectedDay.readiness}</p>
                <p className="text-[10px]">score</p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-base leading-6 text-muted">
            {completion}% дня выполнено · {selectedDay.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Pill icon={<Flame size={14} />} label={`${state.user.streak} дней серии`} />
            <Pill icon={<Activity size={14} />} label={`${selectedDay.waterMl} / ${selectedDay.waterGoalMl} мл воды`} />
            <Pill icon={<MessageCircle size={14} />} label="тренер обновил план" />
          </div>
          <ActionStack tasks={openTasks.length ? openTasks : selectedDay.tasks} />
        </div>
      </section>

      <section className="safe-pad mt-5 space-y-3">
        {selectedDay.tasks.map((task) => (
          <TaskCard key={task.id} task={task} compact={task.status !== "next"} />
        ))}
      </section>

      <section className="safe-pad mt-8 space-y-0">
        <StickyModulePanel title="Питание" meta={`Белок ${nutritionTotals.protein} / ${state.nutritionGoal.proteinGoal} г`} accent="coral" defaultOpen>
          <MealCard meal={lunch as MealLog} />
        </StickyModulePanel>
        <StickyModulePanel title="Тренировка" meta={`${state.workout.duration} · ${state.workout.focus}`} accent="lime">
          <p className="text-sm leading-5 text-muted">
            {state.workoutSession.completed ? "Тренировка завершена. Подходы сохранены в демо-истории." : state.workout.readinessNote}
          </p>
        </StickyModulePanel>
        <StickyModulePanel title="Check-in" meta={state.checkIn.completed ? "заполнен сегодня" : "2 вопроса и фото ужина вечером"} accent="aqua">
          <p className="text-sm leading-5 text-muted">
            {state.checkIn.completed ? state.checkIn.comment || "Самочувствие сохранено." : "Тренер увидит самочувствие, голод и соблюдение плана до завтрашней корректировки."}
          </p>
        </StickyModulePanel>
        <StickyModulePanel title="Прогресс" meta={`${state.progress.adherence}% выполнения недели`} accent="violet">
          <ProgressCard progress={state.progress} />
        </StickyModulePanel>
      </section>
    </MobileShell>
  );
}

function Pill({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/7 px-3 py-2 text-xs text-foreground/82">
      {icon}
      {label}
    </span>
  );
}
