"use client";

type SegmentedControlProps<T extends string> = {
  value: T;
  options: T[];
  onChange: (value: T) => void;
};

export function SegmentedControl<T extends string>({ value, options, onChange }: SegmentedControlProps<T>) {
  return (
    <div className="grid gap-1.5 rounded-full bg-black/24 p-1.5" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`h-11 rounded-full px-3 text-sm font-semibold transition ${
            value === option ? "bg-white text-black" : "text-muted"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
