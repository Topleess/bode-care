import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CheckInForm } from "@/components/check-in-form";
import { MobileShell } from "@/components/mobile-shell";

export default function CheckInPage() {
  return (
    <MobileShell
      title="Check-in"
      eyebrow="вечерний отчет"
      action={
        <Link href="/today" className="grid h-10 w-10 place-items-center rounded-full bg-white/8" aria-label="Назад">
          <ArrowLeft size={18} />
        </Link>
      }
    >
      <section className="safe-pad pt-5">
        <div className="mb-5 rounded-[34px] border border-white/10 bg-[linear-gradient(145deg,rgba(141,220,255,0.16),rgba(255,255,255,0.055)_52%)] p-5">
          <h1 className="text-4xl font-semibold leading-[0.96] tracking-[-0.03em]">
            Пара ответов, чтобы тренер видел день целиком.
          </h1>
          <p className="mt-4 text-sm leading-5 text-muted">
            Это не экзамен. Чем честнее отметки, тем точнее завтра будет план.
          </p>
        </div>
        <CheckInForm />
      </section>
    </MobileShell>
  );
}
