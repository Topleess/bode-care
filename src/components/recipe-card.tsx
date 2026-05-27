import { Clock, Flame } from "lucide-react";
import type { Recipe } from "@/lib/types";
import { accentBg } from "@/lib/ui";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <article className="min-w-[250px] rounded-[30px] border border-white/10 bg-white/[0.055] p-4">
      <div className={`mb-5 grid h-28 place-items-center rounded-[24px] text-4xl ${accentBg[recipe.accent]}`}>
        {recipe.id === "recipe-1" ? "🍓" : recipe.id === "recipe-2" ? "🍗" : "🍝"}
      </div>
      <span className="rounded-full bg-white/8 px-3 py-1 text-xs text-muted">{recipe.tag}</span>
      <h3 className="mt-3 text-xl font-semibold leading-tight">{recipe.title}</h3>
      <div className="mt-4 flex items-center justify-between text-sm text-muted">
        <span className="inline-flex items-center gap-1"><Clock size={14} /> {recipe.time}</span>
        <span className="inline-flex items-center gap-1"><Flame size={14} /> {recipe.calories} ккал</span>
      </div>
    </article>
  );
}
