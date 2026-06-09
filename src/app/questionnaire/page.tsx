"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useMockStore } from "@/lib/store";
import type { QuestionnaireProfile } from "@/lib/types";

const goals = [
  { title: "Снижение веса", detail: "убрать лишнее без резких ограничений" },
  { title: "Набор мышц", detail: "добавить объем и силу постепенно" },
  { title: "Рекомпозиция", detail: "меньше жира, больше формы и тонуса" },
  { title: "Здоровье и тонус", detail: "энергия, режим и стабильные привычки" },
];

const levels = ["Новичок", "Средний", "Опытный"];
const frequencies = ["2 раза в неделю", "3 раза в неделю", "4 раза в неделю", "5+ раз в неделю"];
const places = ["Зал", "Дом", "Улица", "Смешанный формат"];
const nutritionModes = ["Гибкий план", "Готовое меню", "Подсчет КБЖУ", "Интуитивное питание"];
const mealCounts = ["3", "4", "5", "6"];
const preferences = ["Высокий белок", "Быстрые блюда", "Без готовки утром", "Больше овощей", "Сладкое в плане"];

const totalSteps = 5;

export default function QuestionnairePage() {
  const router = useRouter();
  const { state, updateState } = useMockStore();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<QuestionnaireProfile>(state.questionnaire);

  const progress = ((step + 1) / totalSteps) * 100;
  const canContinue = useMemo(() => isStepComplete(step, draft), [draft, step]);

  function updateDraft(updates: Partial<QuestionnaireProfile>) {
    setDraft((current) => ({ ...current, ...updates }));
  }

  function togglePreference(value: string) {
    setDraft((current) => ({
      ...current,
      foodPreferences: current.foodPreferences.includes(value)
        ? current.foodPreferences.filter((item) => item !== value)
        : [...current.foodPreferences, value],
    }));
  }

  function goBack() {
    if (step === 0) {
      router.push("/onboarding");
      return;
    }
    setStep((current) => current - 1);
  }

  function goNext() {
    if (!canContinue) return;

    if (step < totalSteps - 1) {
      setStep((current) => current + 1);
      return;
    }

    updateState((current) => ({
      ...current,
      questionnaire: draft,
      user: {
        ...current.user,
        goal: draft.goal,
        phase: "Профиль настроен",
      },
    }));
    router.push("/today");
  }

  return (
    <main className="h-dvh overflow-hidden bg-background">
      <div className="safe-pad pb-safe mx-auto grid h-dvh max-w-[480px] grid-rows-[auto_1fr_auto] border-x border-white/8 bg-[linear-gradient(180deg,#0b0b0a,#050606_48%)] pt-[max(18px,env(safe-area-inset-top))]">
        <header>
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold">Bode Care</p>
            <p className="text-sm text-muted">{step + 1} из {totalSteps}</p>
          </div>
          <div className="mt-5 h-1 rounded-full bg-white/12">
            <div className="h-full rounded-full bg-lime transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </header>

        <section className="min-h-0 overflow-y-auto py-7">
          {step === 0 && (
            <StepFrame title="Что хочешь улучшить?" description="Выбери главный фокус. Тренер сможет уточнить детали позже.">
              <div className="space-y-3">
                {goals.map((item) => (
                  <ChoiceCard
                    key={item.title}
                    title={item.title}
                    detail={item.detail}
                    active={draft.goal === item.title}
                    onClick={() => updateDraft({ goal: item.title })}
                  />
                ))}
              </div>
            </StepFrame>
          )}

          {step === 1 && (
            <StepFrame title="Какие параметры берем за старт?" description="Эти данные нужны для питания, нагрузки и прогресса.">
              <div className="grid grid-cols-2 gap-3">
                <NumberField label="Рост" suffix="см" value={draft.height} onChange={(height) => updateDraft({ height })} />
                <NumberField label="Вес" suffix="кг" value={draft.weight} onChange={(weight) => updateDraft({ weight })} />
                <NumberField label="Целевой вес" suffix="кг" value={draft.targetWeight} onChange={(targetWeight) => updateDraft({ targetWeight })} />
                <NumberField label="Возраст" suffix="лет" value={draft.age} onChange={(age) => updateDraft({ age })} />
              </div>
            </StepFrame>
          )}

          {step === 2 && (
            <StepFrame title="Как тренируемся?" description="Подберем объем так, чтобы план был реалистичным, а не героическим на три дня.">
              <FieldGroup label="Уровень">
                {levels.map((item) => (
                  <PillChoice key={item} active={draft.trainingLevel === item} onClick={() => updateDraft({ trainingLevel: item })}>
                    {item}
                  </PillChoice>
                ))}
              </FieldGroup>
              <FieldGroup label="Частота">
                {frequencies.map((item) => (
                  <PillChoice key={item} active={draft.trainingFrequency === item} onClick={() => updateDraft({ trainingFrequency: item })}>
                    {item}
                  </PillChoice>
                ))}
              </FieldGroup>
              <FieldGroup label="Где удобно">
                {places.map((item) => (
                  <PillChoice key={item} active={draft.trainingPlace === item} onClick={() => updateDraft({ trainingPlace: item })}>
                    {item}
                  </PillChoice>
                ))}
              </FieldGroup>
            </StepFrame>
          )}

          {step === 3 && (
            <StepFrame title="Как устроить питание?" description="Выбери формат, который реально получится держать в обычный день.">
              <FieldGroup label="Формат">
                {nutritionModes.map((item) => (
                  <PillChoice key={item} active={draft.nutritionMode === item} onClick={() => updateDraft({ nutritionMode: item })}>
                    {item}
                  </PillChoice>
                ))}
              </FieldGroup>
              <FieldGroup label="Приемов пищи в день">
                {mealCounts.map((item) => (
                  <PillChoice key={item} active={draft.mealsPerDay === item} onClick={() => updateDraft({ mealsPerDay: item })}>
                    {item}
                  </PillChoice>
                ))}
              </FieldGroup>
              <FieldGroup label="Предпочтения">
                {preferences.map((item) => (
                  <PillChoice key={item} active={draft.foodPreferences.includes(item)} onClick={() => togglePreference(item)}>
                    {item}
                  </PillChoice>
                ))}
              </FieldGroup>
            </StepFrame>
          )}

          {step === 4 && (
            <StepFrame title="Что важно учесть?" description="Добавь ограничения, чтобы план не конфликтовал с телом, едой и графиком.">
              <TextAreaField label="Травмы и ограничения" value={draft.injuries} placeholder="Например: колено, поясница, плечо..." onChange={(injuries) => updateDraft({ injuries })} />
              <TextAreaField label="Аллергии и исключения" value={draft.allergies} placeholder="Например: без молока, не ем рыбу..." onChange={(allergies) => updateDraft({ allergies })} />
              <TextAreaField label="График и комментарии" value={draft.schedule} placeholder="Когда удобнее есть, тренироваться и заполнять check-in..." onChange={(schedule) => updateDraft({ schedule })} />
            </StepFrame>
          )}
        </section>

        <footer className="flex items-center gap-3 pt-3">
          <button
            onClick={goBack}
            aria-label="Назад"
            className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/14 bg-white/8 text-foreground transition active:scale-[0.98]"
          >
            <ArrowLeft size={22} />
          </button>
          <button
            onClick={goNext}
            disabled={!canContinue}
            className="flex h-14 w-full items-center justify-center rounded-full bg-lime text-base font-semibold text-black transition active:scale-[0.98] disabled:bg-white/16 disabled:text-muted disabled:shadow-none"
          >
            {step === totalSteps - 1 ? "Собрать мой день" : "Далее"}
            <ArrowRight className="ml-2" size={20} />
          </button>
        </footer>
      </div>
    </main>
  );
}

function isStepComplete(step: number, draft: QuestionnaireProfile) {
  if (step === 0) return Boolean(draft.goal);
  if (step === 1) return [draft.height, draft.weight, draft.targetWeight, draft.age].every((value) => Number(value) > 0);
  if (step === 2) return Boolean(draft.trainingLevel && draft.trainingFrequency && draft.trainingPlace);
  if (step === 3) return Boolean(draft.nutritionMode && draft.mealsPerDay && draft.foodPreferences.length);
  return true;
}

function StepFrame({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div>
      <h1 className="text-5xl font-semibold leading-[0.94] text-balance">{title}</h1>
      <p className="mt-4 text-base leading-6 text-muted">{description}</p>
      <div className="mt-8 space-y-5">{children}</div>
    </div>
  );
}

function ChoiceCard({ title, detail, active, onClick }: { title: string; detail: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex min-h-24 w-full items-center justify-between gap-4 rounded-[30px] border p-5 text-left transition ${
        active ? "border-lime/70 bg-lime text-black" : "border-white/10 bg-white/[0.055] text-foreground"
      }`}
    >
      <span>
        <span className="block text-xl font-semibold">{title}</span>
        <span className={`mt-2 block text-sm leading-5 ${active ? "text-black/70" : "text-muted"}`}>{detail}</span>
      </span>
      {active && <Check className="shrink-0" size={20} />}
    </button>
  );
}

function NumberField({ label, suffix, value, onChange }: { label: string; suffix: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="rounded-[26px] border border-white/10 bg-white/[0.055] p-4">
      <span className="text-sm text-muted">{label}</span>
      <span className="mt-3 flex items-end gap-2">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value.replace(/[^\d.]/g, ""))}
          inputMode="decimal"
          className="min-w-0 flex-1 bg-transparent text-3xl font-semibold outline-none"
        />
        <span className="pb-1 text-sm text-muted">{suffix}</span>
      </span>
    </label>
  );
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-sm text-muted">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function PillChoice({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`min-h-12 rounded-full border px-4 text-sm font-semibold transition ${
        active ? "border-lime bg-lime text-black" : "border-white/10 bg-white/[0.055] text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function TextAreaField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-3 block text-sm text-muted">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-h-28 w-full resize-none rounded-[26px] border border-white/10 bg-white/[0.055] p-4 text-base leading-6 outline-none transition placeholder:text-muted/60 focus:border-lime/60"
      />
    </label>
  );
}
