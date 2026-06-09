"use client";

import { useEffect, useMemo, useRef } from "react";
import { useMockStore } from "@/lib/store";

export function DaySwitcher() {
  const { state, selectedDay, selectDay } = useMockStore();
  const touchStartX = useRef<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const dayRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const selectedIndex = useMemo(
    () => Math.max(0, state.days.findIndex((day) => day.id === selectedDay.id)),
    [selectedDay.id, state.days],
  );

  const goToNeighborDay = (direction: "prev" | "next") => {
    const nextIndex = direction === "next" ? selectedIndex + 1 : selectedIndex - 1;
    const nextDay = state.days[nextIndex];
    if (!nextDay) return;
    selectDay(nextDay.id);
  };

  useEffect(() => {
    const activeDayNode = dayRefs.current[selectedDay.id];
    if (!activeDayNode) return;
    activeDayNode.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [selectedDay.id]);

  return (
    <section
      className="safe-pad pt-4"
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const startX = touchStartX.current;
        const endX = event.changedTouches[0]?.clientX;
        touchStartX.current = null;
        if (startX === null || endX === undefined) return;
        const delta = endX - startX;
        if (Math.abs(delta) < 45) return;
        goToNeighborDay(delta < 0 ? "next" : "prev");
      }}
    >
      <div ref={scrollerRef} className="hide-scrollbar flex snap-x gap-2 overflow-x-auto pb-1">
        {state.days.map((day) => (
          <button
            key={day.id}
            onClick={() => selectDay(day.id)}
            ref={(node) => {
              dayRefs.current[day.id] = node;
            }}
            className={`snap-start whitespace-nowrap rounded-full px-5 py-3 text-base transition ${
              day.id === selectedDay.id
                ? "bg-foreground px-7 font-semibold text-background"
                : "bg-white/8 text-muted hover:bg-white/12 hover:text-foreground"
            }`}
          >
            {day.dateLabel}
          </button>
        ))}
      </div>
    </section>
  );
}
