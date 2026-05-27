"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera } from "lucide-react";
import { useMockStore } from "@/lib/store";

export function ProgressEntryForm() {
  const router = useRouter();
  const { state, addProgressEntry } = useMockStore();
  const latest = state.progressEntries.at(-1);
  const [weight, setWeight] = useState(latest?.weight ?? "85.2");
  const [waist, setWaist] = useState(latest?.waist ?? "90.6");
  const [note, setNote] = useState("");

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        addProgressEntry({
          weight,
          waist,
          note: note || "Новый контрольный замер добавлен.",
          photoStub: "сегодня",
        });
        router.push("/progress");
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <label className="rounded-[26px] border border-white/10 bg-white/[0.055] p-4">
          <span className="text-sm text-muted">Вес, кг</span>
          <input
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            className="mt-3 h-14 w-full rounded-2xl border border-white/10 bg-black/22 px-4 font-mono text-2xl outline-none focus:border-lime/50"
            inputMode="decimal"
          />
        </label>
        <label className="rounded-[26px] border border-white/10 bg-white/[0.055] p-4">
          <span className="text-sm text-muted">Талия, см</span>
          <input
            value={waist}
            onChange={(event) => setWaist(event.target.value)}
            className="mt-3 h-14 w-full rounded-2xl border border-white/10 bg-black/22 px-4 font-mono text-2xl outline-none focus:border-lime/50"
            inputMode="decimal"
          />
        </label>
      </div>
      <div className="grid min-h-48 place-items-center rounded-[30px] border border-dashed border-white/16 bg-white/[0.035] text-center text-muted">
        <div>
          <Camera className="mx-auto mb-2" size={26} />
          Фото формы: standardized pose stub
        </div>
      </div>
      <label className="block rounded-[28px] border border-white/10 bg-white/[0.055] p-4">
        <span className="text-sm text-muted">Заметка</span>
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          className="mt-3 min-h-28 w-full resize-none rounded-[22px] border border-white/10 bg-black/22 p-4 outline-none focus:border-lime/50"
          placeholder="Самочувствие, фото, одежда, цикл, важные детали..."
        />
      </label>
      <button className="h-14 w-full rounded-full bg-lime text-base font-semibold text-black">
        Сохранить замер
      </button>
    </form>
  );
}
