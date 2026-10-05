/**
 * The step-by-step flow. Order here = order of the experience.
 * `tone` switches header/footer colors; `bg` is the screen's own background.
 */
export const SCREENS = [
  { id: "welcome", label: "Birthday", tone: "light", decor: "hero", bg: "", grain: false },
  { id: "message", label: "Message", tone: "light", decor: "soft", bg: "", grain: false },
  { id: "memories", label: "Memories", tone: "light", decor: "soft", bg: "", grain: false },
  { id: "friendship", label: "Our Friendship", tone: "light", decor: "soft", bg: "bg-linear-to-b from-transparent via-petal/70 to-transparent", grain: false },
  { id: "bestfriend", label: "Best Friend", tone: "light", decor: "soft", bg: "", grain: false },
  { id: "letter", label: "Letter", tone: "light", decor: "soft", bg: "bg-linear-to-b from-blush/70 via-lavender/60 to-mist", grain: true },
  { id: "surprise", label: "Surprise", tone: "dark", decor: "finale", bg: "bg-linear-to-b from-[#6a2440] via-burgundy to-[#2c0e1a]", grain: true },
] as const;

export type ScreenId = (typeof SCREENS)[number]["id"];
export type Tone = "light" | "dark";
