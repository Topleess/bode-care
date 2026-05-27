import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";
import { ProgressEntryForm } from "@/components/progress-entry-form";

export default function NewProgressPage() {
  return (
    <MobileShell
      title="Новый замер"
      eyebrow="progress entry"
      action={
        <Link href="/progress" className="grid h-10 w-10 place-items-center rounded-full bg-white/8" aria-label="Назад">
          <ArrowLeft size={18} />
        </Link>
      }
    >
      <section className="safe-pad pt-5">
        <div className="mb-5 rounded-[34px] border border-white/10 bg-[linear-gradient(145deg,rgba(189,181,255,0.18),rgba(255,255,255,0.055)_52%)] p-5">
          <h1 className="text-4xl font-semibold leading-[0.96] tracking-[-0.03em]">
            Добавь контрольную точку, не только цифру на весах.
          </h1>
          <p className="mt-4 text-sm leading-5 text-muted">
            Вес, талия, фото-заглушка и короткий контекст попадут в progress timeline.
          </p>
        </div>
        <ProgressEntryForm />
      </section>
    </MobileShell>
  );
}
