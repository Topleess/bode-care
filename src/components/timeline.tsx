import type { ProgressEntry } from "@/lib/types";

export function Timeline({ entries }: { entries: ProgressEntry[] }) {
  return (
    <div className="space-y-3">
      {[...entries].reverse().map((entry) => (
        <article key={entry.id} className="grid grid-cols-[18px_1fr] gap-3">
          <div className="flex flex-col items-center">
            <span className="mt-2 h-3 w-3 rounded-full bg-lime" />
            <span className="mt-2 min-h-16 w-px bg-white/12" />
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/[0.055] p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold">{entry.date}</h3>
              <span className="rounded-full bg-white/8 px-3 py-1 text-xs text-muted">{entry.photoStub}</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Metric label="Вес" value={`${entry.weight} кг`} />
              <Metric label="Талия" value={`${entry.waist} см`} />
            </div>
            <p className="mt-3 text-sm leading-5 text-muted">{entry.note}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-black/22 p-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-mono font-semibold">{value}</p>
    </div>
  );
}
