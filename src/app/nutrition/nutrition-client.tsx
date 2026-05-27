"use client";

import Link from "next/link";
import { useState } from "react";
import { Barcode, Droplets, Search, ShoppingBag } from "lucide-react";
import { BottomSheet } from "@/components/bottom-sheet";
import { MealCard, NutritionQuickActions } from "@/components/meal-card";
import { MobileShell } from "@/components/mobile-shell";
import { RecipeCard } from "@/components/recipe-card";
import { StepperInput } from "@/components/stepper-input";
import { useMockStore } from "@/lib/store";

export function NutritionClient() {
  const { state, nutritionTotals, logMeal, addWater } = useMockStore();
  const [sheet, setSheet] = useState<"meal" | "water" | null>(null);
  const [protein, setProtein] = useState(42);
  const [calories, setCalories] = useState(520);

  return (
    <MobileShell title="Питание" eyebrow="Eat → Understand → Adjust">
      <section className="safe-pad pt-5">
        <div className="rounded-[36px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,107,74,0.18),rgba(255,255,255,0.055)_50%)] p-5">
          <p className="text-sm text-muted">Сегодня</p>
          <h1 className="mt-2 text-4xl font-semibold leading-[0.96] tracking-[-0.03em]">
            Закрой белок без ручной бухгалтерии.
          </h1>
          <div className="mt-6 grid grid-cols-3 gap-2">
            <Metric label="Ккал" value={`${nutritionTotals.calories} / ${state.nutritionGoal.caloriesGoal}`} />
            <Metric label="Белок" value={`${nutritionTotals.protein} / ${state.nutritionGoal.proteinGoal}`} />
            <Metric label="Вода" value={`${state.days[1].waterMl} мл`} />
          </div>
        </div>
      </section>

      <section className="safe-pad mt-5">
        <NutritionQuickActions onMeal={() => setSheet("meal")} onWater={() => setSheet("water")} />
      </section>

      <section className="safe-pad mt-5">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-3">
          <Search className="text-muted" size={20} />
          <input
            className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted"
            placeholder="Поиск блюда или продукта"
          />
          <Barcode className="text-muted" size={20} />
        </div>
      </section>

      <section className="safe-pad mt-6 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">План и факты</h2>
          <button className="grid h-10 w-10 place-items-center rounded-full bg-white/8" aria-label="Список покупок">
            <ShoppingBag size={19} />
          </button>
        </div>
        {state.meals.map((meal) => (
          <Link key={meal.id} href={`/nutrition/${meal.id}`} className="block">
            <MealCard meal={meal} />
          </Link>
        ))}
      </section>

      <section className="safe-pad mt-7">
        <h2 className="mb-3 text-2xl font-semibold">Что приготовить</h2>
        <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-2">
          {state.recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      <BottomSheet
        open={sheet === "meal"}
        title="Быстрый лог еды"
        description="Заполни примерные значения. Это моковый ввод, но Today и КБЖУ обновятся."
        onClose={() => setSheet(null)}
      >
        <div className="space-y-4">
          <StepperInput label="Калории" value={calories} step={20} suffix="ккал" onChange={setCalories} />
          <StepperInput label="Белок" value={protein} step={2} suffix="г" onChange={setProtein} />
          <button
            onClick={() => {
              logMeal("lunch", { calories, protein });
              setSheet(null);
            }}
            className="h-14 w-full rounded-full bg-lime text-base font-semibold text-black"
          >
            Сохранить как обед
          </button>
        </div>
      </BottomSheet>

      <BottomSheet
        open={sheet === "water"}
        title="Вода"
        description="Быстро добавить стакан воды в текущий день."
        onClose={() => setSheet(null)}
      >
        <button
          onClick={() => {
            addWater(250);
            setSheet(null);
          }}
          className="flex h-16 w-full items-center justify-center gap-2 rounded-full bg-aqua text-base font-semibold text-black"
        >
          <Droplets size={20} />
          Добавить 250 мл
        </button>
      </BottomSheet>
    </MobileShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] bg-black/22 p-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}
