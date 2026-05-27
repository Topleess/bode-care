import { Camera, Flame, Plus } from "lucide-react";
import type { Meal } from "@/lib/types";
import { accentBg, accentSoft } from "@/lib/ui";

export function MealCard({ meal }: { meal: Meal }) {
  return (
    <article className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.055]">
      <div className="flex min-h-[152px]">
        <div className={`flex w-[38%] items-center justify-center ${accentBg[meal.accent]}`}>
          <div className="grid h-24 w-24 place-items-center rounded-[30px] bg-white/70 text-4xl shadow-inner">
            {meal.state === "eaten" ? "🍳" : meal.id === "lunch" ? "🥗" : "🐟"}
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <div className={`mb-3 inline-flex rounded-full border px-3 py-1 text-xs font-medium ${accentSoft[meal.accent]}`}>
              {meal.tag}
            </div>
            <h3 className="text-xl font-semibold leading-tight">{meal.title}</h3>
          </div>
          <div className="flex items-center justify-between text-sm text-muted">
            <span>{meal.time}</span>
            <span>{meal.calories} ккал</span>
            <span>{meal.protein} г белка</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function NutritionQuickActions({ onMeal, onWater }: { onMeal?: () => void; onWater?: () => void }) {
  const actions = [
    { label: "Фото", icon: Camera, tone: "bg-coral text-black", onClick: onMeal },
    { label: "Шаблон", icon: Plus, tone: "bg-lime text-black", onClick: onMeal },
    { label: "КБЖУ", icon: Flame, tone: "bg-white text-black" },
    { label: "Вода", icon: Plus, tone: "bg-aqua text-black", onClick: onWater },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.label}
            onClick={action.onClick}
            className={`flex h-24 flex-col items-center justify-center gap-2 rounded-[28px] text-sm font-semibold ${action.tone}`}
          >
            <Icon size={22} />
            {action.label}
          </button>
        );
      })}
    </div>
  );
}
