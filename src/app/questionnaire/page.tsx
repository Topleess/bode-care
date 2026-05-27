"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, ClipboardList } from "lucide-react";

const goals = ["Снижение веса", "Набор мышц", "Рекомпозиция"];
const levels = ["Новичок", "Средний", "Опытный"];

export default function QuestionnairePage() {
  const [coachFilled, setCoachFilled] = useState(true);
  const [goal, setGoal] = useState(goals[2]);
  const [level, setLevel] = useState(levels[1]);

  return (
    <main className="min-h-dvh bg-background">
      <div className="safe-pad pb-safe mx-auto flex min-h-dvh max-w-[480px] flex-col border-x border-white/8 pt-[max(18px,env(safe-area-inset-top))]">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted">Старт</p>
            <h1 className="text-2xl font-semibold">Анкетирование</h1>
          </div>
          <Link href="/today" className="rounded-full bg-white/8 px-4 py-2 text-sm">
            Позже
          </Link>
        </header>

        <section className="mt-8 rounded-[34px] border border-white/10 bg-white/[0.055] p-5">
          <div className="mb-5 flex items-start gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-lime text-black">
              <ClipboardList size={26} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Данные уже внес тренер?</h2>
              <p className="mt-2 text-sm leading-5 text-muted">
                Если тренер заранее создал профиль, тебе останется подтвердить цель и пару настроек.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 rounded-full bg-black/22 p-1.5">
            <button
              onClick={() => setCoachFilled(true)}
              className={`h-12 rounded-full text-sm font-semibold ${coachFilled ? "bg-white text-black" : "text-muted"}`}
            >
              Да
            </button>
            <button
              onClick={() => setCoachFilled(false)}
              className={`h-12 rounded-full text-sm font-semibold ${!coachFilled ? "bg-white text-black" : "text-muted"}`}
            >
              Заполню сам
            </button>
          </div>
        </section>

        <section className="mt-5 space-y-5">
          <ChoiceGroup title="Цель" items={goals} active={goal} onPick={setGoal} />
          <ChoiceGroup title="Уровень тренировок" items={levels} active={level} onPick={setLevel} />
          <div className="rounded-[30px] border border-white/10 bg-white/[0.055] p-5">
            <p className="text-sm text-muted">Ограничения</p>
            <textarea
              className="mt-3 min-h-28 w-full resize-none rounded-[24px] border border-white/10 bg-black/20 p-4 text-base outline-none focus:border-lime/50"
              placeholder="Травмы, продукты, которые не едите, график дня..."
              defaultValue={coachFilled ? "Без молока. Тренировки после 18:00. Колено беречь на выпадах." : ""}
            />
          </div>
        </section>

        <div className="mt-auto pt-6">
          <Link
            href="/today"
            className="flex h-14 w-full items-center justify-center rounded-full bg-lime text-base font-semibold text-black"
          >
            Собрать мой день
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </main>
  );
}

function ChoiceGroup({
  title,
  items,
  active,
  onPick,
}: {
  title: string;
  items: string[];
  active: string;
  onPick: (value: string) => void;
}) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-white/[0.055] p-5">
      <p className="mb-3 text-sm text-muted">{title}</p>
      <div className="space-y-2">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onPick(item)}
            className={`flex h-12 w-full items-center justify-between rounded-2xl px-4 text-left ${
              active === item ? "bg-lime text-black" : "bg-black/22 text-foreground"
            }`}
          >
            <span className="font-semibold">{item}</span>
            {active === item && <Check size={18} />}
          </button>
        ))}
      </div>
    </div>
  );
}
