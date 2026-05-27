"use client";

import { useState } from "react";
import { Bell, ChevronRight, CreditCard, HeartPulse, RotateCcw, Shield } from "lucide-react";
import { BottomSheet } from "@/components/bottom-sheet";
import { MobileShell } from "@/components/mobile-shell";
import { SegmentedControl } from "@/components/segmented-control";
import { useMockStore } from "@/lib/store";

type Sheet = "goal" | "notifications" | "privacy" | null;

export function ProfileClient() {
  const { state, updateUser, resetState } = useMockStore();
  const [sheet, setSheet] = useState<Sheet>(null);
  const [goal, setGoal] = useState(state.user.goal);
  const [notifications, setNotifications] = useState(state.user.notifications ? "Вкл" : "Выкл");

  const settings = [
    { id: "goal" as const, label: "Цель и фаза", value: state.user.goal, icon: HeartPulse },
    { id: "notifications" as const, label: "Уведомления", value: state.user.notifications ? "Еда, тренировка, check-in" : "Выключены", icon: Bell },
    { id: null, label: "Подписка", value: "Prototype access", icon: CreditCard },
    { id: "privacy" as const, label: "Данные и приватность", value: state.user.privacy, icon: Shield },
  ];

  return (
    <MobileShell title="Профиль" eyebrow="Bode Care">
      <section className="safe-pad pt-5">
        <div className="rounded-[38px] border border-white/10 bg-[linear-gradient(145deg,rgba(223,255,56,0.16),rgba(255,255,255,0.055)_46%)] p-5">
          <div className="flex items-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-[28px] bg-lime text-2xl font-semibold text-black">
              Н
            </div>
            <div>
              <h1 className="text-3xl font-semibold">{state.user.name}</h1>
              <p className="mt-1 text-sm text-muted">{state.user.phase}</p>
            </div>
          </div>
          <div className="mt-5 rounded-[28px] border border-white/10 bg-black/22 p-4">
            <p className="text-sm text-muted">Текущая цель</p>
            <p className="mt-1 text-xl font-semibold">{state.user.goal}</p>
          </div>
        </div>
      </section>

      <section className="safe-pad mt-5">
        <div className="rounded-[34px] border border-white/10 bg-white/[0.055] p-5">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-black">
              {state.user.coach.avatar}
            </div>
            <div className="min-w-0">
              <p className="text-sm text-muted">{state.user.coach.role}</p>
              <h2 className="text-xl font-semibold">{state.user.coach.name}</h2>
            </div>
          </div>
          <p className="mt-4 text-sm leading-5 text-muted">{state.user.coach.note}</p>
        </div>
      </section>

      <section className="safe-pad mt-6 space-y-3">
        {settings.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => item.id && setSheet(item.id)}
              className="flex w-full items-center gap-4 rounded-[28px] border border-white/10 bg-white/[0.055] p-4 text-left"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/8">
                <Icon size={21} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold">{item.label}</h3>
                <p className="truncate text-sm text-muted">{item.value}</p>
              </div>
              <ChevronRight className="text-muted" size={18} />
            </button>
          );
        })}
      </section>

      <section className="safe-pad mt-6">
        <button
          onClick={resetState}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 text-base font-semibold"
        >
          <RotateCcw size={20} />
          Сбросить демо-данные
        </button>
      </section>

      <BottomSheet open={sheet === "goal"} title="Цель" description="Изменение сразу отразится в профиле." onClose={() => setSheet(null)}>
        <div className="space-y-3">
          {["Минус 6 кг и сильнее верх тела", "Набрать 4 кг мышц", "Удержать вес и улучшить форму"].map((item) => (
            <button
              key={item}
              onClick={() => setGoal(item)}
              className={`h-12 w-full rounded-2xl px-4 text-left font-semibold ${goal === item ? "bg-lime text-black" : "bg-white/8"}`}
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => {
              updateUser({ goal });
              setSheet(null);
            }}
            className="h-14 w-full rounded-full bg-lime font-semibold text-black"
          >
            Сохранить цель
          </button>
        </div>
      </BottomSheet>

      <BottomSheet open={sheet === "notifications"} title="Уведомления" onClose={() => setSheet(null)}>
        <div className="space-y-4">
          <SegmentedControl value={notifications} options={["Вкл", "Выкл"]} onChange={setNotifications} />
          <button
            onClick={() => {
              updateUser({ notifications: notifications === "Вкл" });
              setSheet(null);
            }}
            className="h-14 w-full rounded-full bg-lime font-semibold text-black"
          >
            Сохранить
          </button>
        </div>
      </BottomSheet>

      <BottomSheet open={sheet === "privacy"} title="Приватность" description={state.user.privacy} onClose={() => setSheet(null)}>
        <button
          onClick={() => {
            updateUser({ privacy: "Фото прогресса видит только пользователь" });
            setSheet(null);
          }}
          className="h-14 w-full rounded-full bg-white font-semibold text-black"
        >
          Скрыть фото от тренера
        </button>
      </BottomSheet>
    </MobileShell>
  );
}
