"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera } from "lucide-react";
import { StepperInput } from "./stepper-input";
import { useMockStore } from "@/lib/store";

export function CheckInForm() {
  const router = useRouter();
  const { state, submitCheckIn } = useMockStore();
  const [mood, setMood] = useState(state.checkIn.mood);
  const [hunger, setHunger] = useState(state.checkIn.hunger);
  const [sleep, setSleep] = useState(state.checkIn.sleep);
  const [stress, setStress] = useState(state.checkIn.stress);
  const [comment, setComment] = useState(state.checkIn.comment);

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        submitCheckIn({ mood, hunger, sleep, stress, comment, photoStub: "ужин добавлен" });
        router.push("/today");
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <StepperInput label="Настроение" value={mood} min={1} max={10} onChange={setMood} />
        <StepperInput label="Голод" value={hunger} min={1} max={10} onChange={setHunger} />
        <StepperInput label="Сон" value={sleep} min={1} max={10} onChange={setSleep} />
        <StepperInput label="Стресс" value={stress} min={1} max={10} onChange={setStress} />
      </div>
      <label className="block rounded-[28px] border border-white/10 bg-white/[0.055] p-4">
        <span className="text-sm text-muted">Комментарий тренеру</span>
        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          className="mt-3 min-h-28 w-full resize-none rounded-[22px] border border-white/10 bg-black/22 p-4 outline-none focus:border-lime/50"
          placeholder="Как прошел день, что было сложно, что поменять завтра?"
        />
      </label>
      <div className="grid min-h-36 place-items-center rounded-[28px] border border-dashed border-white/16 bg-white/[0.035] text-center text-muted">
        <div>
          <Camera className="mx-auto mb-2" size={24} />
          Фото еды / формы: демо-заглушка
        </div>
      </div>
      <button className="h-14 w-full rounded-full bg-lime text-base font-semibold text-black">
        Отправить check-in
      </button>
    </form>
  );
}
