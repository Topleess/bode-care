export function CompletionRing({ value, label }: { value: number; label: string }) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className="grid h-20 w-20 place-items-center rounded-full"
      style={{
        background: `conic-gradient(var(--lime) ${clamped * 3.6}deg, rgba(255,255,255,0.1) 0deg)`,
      }}
    >
      <div className="grid h-16 w-16 place-items-center rounded-full bg-surface text-center">
        <div>
          <p className="font-mono text-lg font-semibold">{clamped}%</p>
          <p className="text-[10px] text-muted">{label}</p>
        </div>
      </div>
    </div>
  );
}
