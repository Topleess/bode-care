"use client";

import { useState } from "react";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import type { Exercise } from "@/lib/types";

export function WorkoutPlayer({ exercise }: { exercise: Exercise }) {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="rounded-[36px] border border-white/10 bg-black p-4">
      <div className="relative grid aspect-square place-items-center overflow-hidden rounded-[30px] bg-[radial-gradient(circle_at_50%_30%,rgba(223,255,56,0.22),transparent_28%),linear-gradient(145deg,#272a27,#080908)]">
        <div className="h-36 w-44 rounded-[40%] border border-white/16 bg-white/8 shadow-[0_0_60px_rgba(223,255,56,0.16)]" />
        <div className="absolute left-5 top-5 rounded-full bg-black/48 px-3 py-1 text-xs text-muted backdrop-blur">
          Видео-инструкция
        </div>
      </div>
      <div className="mt-5">
        <p className="font-mono text-5xl font-semibold">00:27</p>
        <h2 className="mt-2 text-2xl font-semibold">{exercise.name}</h2>
        <p className="text-sm uppercase tracking-[0.18em] text-muted">
          Exercise 1 / 4 · {exercise.muscle}
        </p>
      </div>
      <div className="mt-6 grid grid-cols-3 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.055]">
        <button className="grid h-20 place-items-center border-r border-white/10">
          <SkipBack size={24} />
        </button>
        <button
          onClick={() => setPlaying((value) => !value)}
          className="grid h-20 place-items-center bg-white/8"
        >
          {playing ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
        </button>
        <button className="grid h-20 place-items-center border-l border-white/10">
          <SkipForward size={24} />
        </button>
      </div>
    </section>
  );
}

export function SetLogger({ exercise }: { exercise: Exercise }) {
  const [sets, setSets] = useState([
    { weight: exercise.weight.replace(" кг", ""), reps: "10", done: true },
    { weight: exercise.weight.replace(" кг", ""), reps: "9", done: false },
    { weight: exercise.weight.replace(" кг", ""), reps: "", done: false },
  ]);

  return (
    <section className="rounded-[32px] border border-white/10 bg-white/[0.055] p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Подходы</h3>
          <p className="text-sm text-muted">{exercise.sets} подхода · отдых {exercise.rest}</p>
        </div>
        <button
          onClick={() => setSets([...sets, { weight: exercise.weight.replace(" кг", ""), reps: "", done: false }])}
          className="h-10 rounded-full bg-lime px-4 text-sm font-semibold text-black"
        >
          +
        </button>
      </div>
      <div className="space-y-2">
        {sets.map((set, index) => (
          <div key={index} className="grid grid-cols-[28px_minmax(0,1fr)_minmax(0,1fr)_42px] items-center gap-2 rounded-2xl bg-black/24 p-2">
            <span className="text-center text-sm text-muted">{index + 1}</span>
            <input
              value={set.weight}
              onChange={(event) => {
                const next = [...sets];
                next[index] = { ...set, weight: event.target.value };
                setSets(next);
              }}
              className="h-11 min-w-0 rounded-xl border border-white/10 bg-white/5 px-3 text-center font-mono outline-none focus:border-lime/50"
              inputMode="decimal"
              aria-label={`Вес подхода ${index + 1}`}
            />
            <input
              value={set.reps}
              onChange={(event) => {
                const next = [...sets];
                next[index] = { ...set, reps: event.target.value };
                setSets(next);
              }}
              className="h-11 min-w-0 rounded-xl border border-white/10 bg-white/5 px-3 text-center font-mono outline-none focus:border-lime/50"
              inputMode="numeric"
              aria-label={`Повторы подхода ${index + 1}`}
            />
            <button
              onClick={() => {
                const next = [...sets];
                next[index] = { ...set, done: !set.done };
                setSets(next);
              }}
              className={`h-11 min-w-0 rounded-xl text-sm font-semibold ${set.done ? "bg-lime text-black" : "bg-white/8 text-muted"}`}
            >
              ✓
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
