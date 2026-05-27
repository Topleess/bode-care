"use client";

import { Minus, Plus } from "lucide-react";

type StepperInputProps = {
  label: string;
  value: number;
  suffix?: string;
  step?: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

export function StepperInput({
  label,
  value,
  suffix,
  step = 1,
  min = 0,
  max = 9999,
  onChange,
}: StepperInputProps) {
  const setValue = (next: number) => onChange(Math.min(max, Math.max(min, next)));

  return (
    <div className="rounded-[26px] border border-white/10 bg-black/20 p-4">
      <p className="text-sm text-muted">{label}</p>
      <div className="mt-3 flex items-center justify-between gap-3">
        <button
          onClick={() => setValue(value - step)}
          className="grid h-12 w-12 place-items-center rounded-full bg-white/8"
          aria-label={`Уменьшить ${label}`}
        >
          <Minus size={18} />
        </button>
        <div className="min-w-0 text-center">
          <span className="font-mono text-3xl font-semibold">{value}</span>
          {suffix && <span className="ml-1 text-sm text-muted">{suffix}</span>}
        </div>
        <button
          onClick={() => setValue(value + step)}
          className="grid h-12 w-12 place-items-center rounded-full bg-lime text-black"
          aria-label={`Увеличить ${label}`}
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}
