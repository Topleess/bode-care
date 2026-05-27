"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, ChartNoAxesCombined, Dumbbell, MessageCircle, Utensils } from "lucide-react";

const slides = [
  {
    title: "День собирается сам",
    text: "Приложение показывает ближайшее действие: еда, тренировка, check-in или прогресс.",
    icon: ChartNoAxesCombined,
    accent: "bg-lime text-black",
  },
  {
    title: "Питание без хаоса",
    text: "Фото, шаблоны, рекомендации тренера и быстрые повторения привычных приемов пищи.",
    icon: Utensils,
    accent: "bg-coral text-black",
  },
  {
    title: "Workout mode не мешает",
    text: "Видео техники, таймер, подходы и повторы на одном экране без лишних переходов.",
    icon: Dumbbell,
    accent: "bg-aqua text-black",
  },
  {
    title: "Тренер видит картину",
    text: "Комментарии, check-in и weekly card помогают корректировать план без переписок вразнобой.",
    icon: MessageCircle,
    accent: "bg-violet text-black",
  },
];

export default function OnboardingPage() {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const slide = slides[index];
  const Icon = slide.icon;

  return (
    <main className="min-h-dvh bg-background">
      <div className="safe-pad pb-safe mx-auto flex min-h-dvh max-w-[480px] flex-col justify-between border-x border-white/8 pt-[max(18px,env(safe-area-inset-top))]">
        <header className="flex items-center justify-between">
          <span className="text-sm text-muted">{index + 1} / {slides.length}</span>
          <Link href="/questionnaire" className="rounded-full bg-white/8 px-4 py-2 text-sm">
            Пропустить
          </Link>
        </header>

        <section>
          <div className="mb-10 rounded-[42px] border border-white/10 bg-white/[0.045] p-4">
            <div className="grid aspect-[0.86] place-items-center rounded-[32px] bg-[radial-gradient(circle_at_50%_30%,rgba(223,255,56,0.14),transparent_34%),#090a09]">
              <div className={`grid h-28 w-28 place-items-center rounded-[34px] ${slide.accent}`}>
                <Icon size={54} strokeWidth={1.8} />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-semibold leading-[0.96] tracking-[-0.03em] text-balance">{slide.title}</h1>
          <p className="mt-5 text-lg leading-7 text-muted">{slide.text}</p>
          <div className="mt-8 flex gap-2">
            {slides.map((item, dotIndex) => (
              <button
                key={item.title}
                onClick={() => setIndex(dotIndex)}
                className={`h-2 rounded-full transition-all ${dotIndex === index ? "w-10 bg-lime" : "w-2 bg-white/20"}`}
                aria-label={`Открыть экран ${dotIndex + 1}`}
              />
            ))}
          </div>
        </section>

        <button
          onClick={() => {
            if (index < slides.length - 1) setIndex(index + 1);
            else router.push("/questionnaire");
          }}
          className="flex h-14 w-full items-center justify-center rounded-full bg-lime text-base font-semibold text-black"
        >
          {index < slides.length - 1 ? "Дальше" : "К анкете"}
          <ArrowRight className="ml-2" size={20} />
        </button>
      </div>
    </main>
  );
}
