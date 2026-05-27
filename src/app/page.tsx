import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { PrimaryButton } from "@/components/primary-button";

export default function WelcomePage() {
  return (
    <main className="min-h-dvh overflow-hidden bg-background">
      <div className="mx-auto flex min-h-dvh max-w-[480px] flex-col justify-between border-x border-white/8 bg-[radial-gradient(circle_at_50%_18%,rgba(223,255,56,0.24),transparent_28%),linear-gradient(180deg,#121611,#050606_52%)] safe-pad pb-safe pt-[max(22px,env(safe-area-inset-top))]">
        <header className="flex items-center justify-between">
          <div className="text-lg font-semibold">Bode Care</div>
          <Link href="/today" className="rounded-full border border-white/12 px-4 py-2 text-sm text-muted">
            Пропустить
          </Link>
        </header>

        <section className="py-12">
          <div className="relative mx-auto mb-12 aspect-[0.72] w-[78%] max-w-[330px] rounded-[48px] border border-white/14 bg-black p-4 shadow-[0_24px_80px_rgba(0,0,0,0.44)]">
            <div className="h-full rounded-[34px] bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.02)),radial-gradient(circle_at_70%_10%,rgba(255,107,74,0.26),transparent_32%),radial-gradient(circle_at_30%_38%,rgba(141,220,255,0.2),transparent_28%)] p-5">
              <div className="mb-8 flex items-center justify-between">
                <span className="rounded-full bg-lime px-3 py-1 text-sm font-semibold text-black">82</span>
                <span className="h-10 w-10 rounded-full bg-white/10" />
              </div>
              <p className="text-sm text-muted">Сегодня</p>
              <h1 className="mt-2 text-4xl font-semibold leading-[0.95] text-balance">
                Понятный план тела на каждый день
              </h1>
              <div className="mt-8 space-y-3">
                {["Поесть через 45 мин", "Тренировка в 18:00", "Check-in вечером"].map((item) => (
                  <div key={item} className="rounded-2xl bg-white/10 p-3 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-muted">
            <ShieldCheck size={16} />
            Тренер, питание и прогресс в одном сценарии
          </p>
          <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.03em] text-balance">
            Не ищи разделы. Просто делай следующий шаг.
          </h2>
          <p className="mt-5 text-lg leading-7 text-muted">
            Bode Care ведет через день: что съесть, как тренироваться, что заполнить и почему это двигает тебя к цели.
          </p>
        </section>

        <footer>
          <PrimaryButton href="/onboarding">
            Продолжить <ArrowRight className="ml-2" size={20} />
          </PrimaryButton>
          <p className="mx-auto mt-4 max-w-[340px] text-center text-xs leading-5 text-muted">
            Продолжая, вы принимаете условия использования и политику обработки данных.
          </p>
        </footer>
      </div>
    </main>
  );
}
