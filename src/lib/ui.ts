import type { Accent } from "./types";

export const accentText: Record<Accent, string> = {
  lime: "text-lime",
  mint: "text-mint",
  aqua: "text-aqua",
  coral: "text-coral",
  violet: "text-violet",
};

export const accentBg: Record<Accent, string> = {
  lime: "bg-lime text-black",
  mint: "bg-mint text-black",
  aqua: "bg-aqua text-black",
  coral: "bg-coral text-black",
  violet: "bg-violet text-black",
};

export const accentSoft: Record<Accent, string> = {
  lime: "bg-lime/12 text-lime border-lime/25",
  mint: "bg-mint/12 text-mint border-mint/25",
  aqua: "bg-aqua/12 text-aqua border-aqua/25",
  coral: "bg-coral/12 text-coral border-coral/25",
  violet: "bg-violet/12 text-violet border-violet/25",
};
