"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ChartNoAxesCombined, Dumbbell, MessageCircle, Utensils } from "lucide-react";

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
    <main className="h-dvh overflow-hidden bg-background">
      <div className="safe-pad pb-safe mx-auto grid h-dvh max-w-[480px] grid-rows-[auto_1fr_auto] border-x border-white/8 pt-[max(14px,env(safe-area-inset-top))]">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {slides.map((item, dotIndex) => (
              <button
                key={item.title}
                onClick={() => setIndex(dotIndex)}
                className={`relative overflow-hidden rounded-full transition-colors ${
                  dotIndex === index ? "h-2.5 w-12 bg-white/20" : "h-2.5 w-2.5"
                } ${dotIndex < index ? "bg-lime" : "bg-white/20"}`}
                aria-label={`Открыть экран ${dotIndex + 1}`}
              >
                {dotIndex === index && (
                  <span key={index} className="absolute inset-y-0 left-0 animate-[onboardingProgress_6s_linear_forwards] rounded-full bg-lime" />
                )}
              </button>
            ))}
          </div>
          <Link href="/questionnaire" className="rounded-full bg-white/8 px-4 py-2 text-sm">
            Пропустить
          </Link>
        </header>

        <section className="flex min-h-0 flex-col py-3 pb-6">
          <div className="mb-5 rounded-[34px] border border-white/10 bg-white/[0.045] p-3 sm:mb-6 sm:rounded-[42px] sm:p-4">
            <div className="grid aspect-[0.72] place-items-center rounded-[24px] bg-[radial-gradient(circle_at_50%_30%,rgba(223,255,56,0.14),transparent_34%),#090a09] sm:aspect-[0.86] sm:rounded-[32px]">
              <div className={`grid h-20 w-20 place-items-center rounded-[24px] sm:h-28 sm:w-28 sm:rounded-[34px] ${slide.accent}`}>
                <Icon className="h-10 w-10 sm:h-14 sm:w-14" strokeWidth={1.8} />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-semibold leading-[0.94] tracking-[-0.03em] text-balance sm:text-5xl">{slide.title}</h1>
          <p className="mt-3 text-base leading-6 text-muted sm:mt-5 sm:text-lg sm:leading-7">{slide.text}</p>
        </section>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
            disabled={index === 0}
            aria-label="Назад"
            className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/14 bg-white/8 text-foreground disabled:opacity-35"
          >
            <ArrowLeft size={20} />
          </button>
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
      </div>
    </main>
  );
}
