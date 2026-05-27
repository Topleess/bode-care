"use client";

import Link from "next/link";
import { ArrowLeft, Check, Clock } from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";
import { useMockStore } from "@/lib/store";
import { accentBg } from "@/lib/ui";

export function MealDetailClient({ mealId }: { mealId: string }) {
  const { state, logMeal } = useMockStore();
  const meal = state.meals.find((item) => item.id === mealId) ?? state.meals[0];

  return (
    <MobileShell
      title="Прием пищи"
      eyebrow={meal.time}
      action={
        <Link href="/nutrition" className="grid h-10 w-10 place-items-center rounded-full bg-white/8" aria-label="Назад">
          <ArrowLeft size={18} />
        </Link>
      }
    >
      <section className="safe-pad pt-5">
        <div className={`grid aspect-[1.08] place-items-center rounded-[38px] text-7xl ${accentBg[meal.accent]}`}>
          {meal.id === "breakfast" ? "🍳" : meal.id === "lunch" ? "🥗" : "🐟"}
        </div>
      </section>
      <section className="safe-pad mt-5">
        <h1 className="text-4xl font-semibold leading-[0.96] tracking-[-0.03em]">{meal.title}</h1>
        <p className="mt-3 text-base leading-6 text-muted">{meal.note}</p>
        <div className="mt-5 grid grid-cols-4 gap-2">
          <Metric label="Ккал" value={String(meal.calories)} />
          <Metric label="Белок" value={`${meal.protein}г`} />
          <Metric label="Угли" value={`${meal.carbs}г`} />
          <Metric label="Жиры" value={`${meal.fat}г`} />
        </div>
      </section>
      <section className="safe-pad mt-6">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.055] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Состав</h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/8 px-3 py-1 text-xs text-muted">
              <Clock size={13} />
              {meal.time}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {meal.ingredients.map((ingredient) => (
              <span key={ingredient} className="rounded-full border border-white/10 bg-black/22 px-3 py-2 text-sm">
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section className="safe-pad mt-6">
        <button
          onClick={() => logMeal(meal.id)}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-lime text-base font-semibold text-black"
        >
          <Check size={20} />
          {meal.state === "eaten" ? "Уже съедено" : "Отметить как съедено"}
        </button>
      </section>
    </MobileShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.055] p-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-mono text-lg font-semibold">{value}</p>
    </div>
  );
}
