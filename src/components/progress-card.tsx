import { Camera, ChevronRight, Medal } from "lucide-react";
import type { ProgressSnapshot } from "@/lib/types";

export function ProgressCard({ progress }: { progress: ProgressSnapshot }) {
  return (
    <section className="rounded-[36px] border border-white/10 bg-[linear-gradient(145deg,rgba(223,255,56,0.18),rgba(255,255,255,0.055)_42%,rgba(141,220,255,0.12))] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted">Transformation card</p>
          <h2 className="mt-1 text-3xl font-semibold">{progress.week}</h2>
        </div>
        <div className="grid h-14 w-14 place-items-center rounded-full bg-lime text-black">
          <Medal size={24} />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2">
        <Metric label="Вес" value={progress.weight} />
        <Metric label="Талия" value={progress.waist} />
        <Metric label="План" value={`${progress.adherence}%`} />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="grid aspect-[4/5] place-items-center rounded-[28px] border border-dashed border-white/18 bg-black/20 text-center text-sm text-muted">
          <div>
            <Camera className="mx-auto mb-2" size={22} />
            Стартовое фото
          </div>
        </div>
        <div className="grid aspect-[4/5] place-items-center rounded-[28px] border border-white/10 bg-lime text-center text-sm font-semibold text-black">
          Фото недели
        </div>
      </div>
      <p className="mt-5 text-sm leading-5 text-foreground/86">{progress.insight}</p>
      <button className="mt-5 flex h-12 w-full items-center justify-between rounded-full bg-white px-5 text-sm font-semibold text-black">
        <span>Открыть динамику</span>
        <ChevronRight size={18} />
      </button>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-black/22 p-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}
