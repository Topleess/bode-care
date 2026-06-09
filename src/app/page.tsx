import { ArrowRight, ShieldCheck } from "lucide-react";
import { PrimaryButton } from "@/components/primary-button";

export default function WelcomePage() {
  return (
    <main className="min-h-dvh overflow-hidden bg-background">
      <div className="mx-auto flex min-h-dvh max-w-[480px] flex-col justify-between border-x border-white/8 bg-[radial-gradient(circle_at_50%_18%,rgba(223,255,56,0.24),transparent_28%),linear-gradient(180deg,#121611,#050606_52%)] safe-pad pb-safe pt-[max(22px,env(safe-area-inset-top))]">
        <header className="flex items-center">
          <div className="text-lg font-semibold">Bode Care</div>
        </header>

        <section className="py-5">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-muted">
            <ShieldCheck size={16} />
            Тренер, питание и прогресс в одном сценарии
          </p>
          <h2 className="text-4xl font-semibold leading-[0.96] tracking-[-0.03em] text-balance">
            Не ищи разделы. Делай следующий шаг.
          </h2>
          <p className="mt-3 text-base leading-6 text-muted">
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
