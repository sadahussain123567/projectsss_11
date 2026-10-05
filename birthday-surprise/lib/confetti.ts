/**
 * Confetti helpers. canvas-confetti is imported lazily so it never ships in
 * the initial bundle, and everything is skipped for reduced-motion users.
 */
const COLORS = ["#b5586f", "#f7dfe0", "#c98f9a", "#e7def2", "#fbf4ec", "#e9cfa3"];

const HEART_PATH =
  "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z";

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export async function celebrate(kind: "soft" | "finale" = "finale"): Promise<void> {
  if (typeof window === "undefined" || prefersReducedMotion()) return;

  const { default: confetti } = await import("canvas-confetti");
  const heart = confetti.shapeFromPath({ path: HEART_PATH });
  const shapes = [heart, "circle" as const, "square" as const];

  if (kind === "soft") {
    confetti({
      particleCount: 70,
      spread: 90,
      startVelocity: 32,
      origin: { y: 0.45 },
      colors: COLORS,
      shapes,
      scalar: 1.1,
      disableForReducedMotion: true,
    });
    return;
  }

  // Finale: one big central burst, then two gentle cannons from the sides.
  confetti({
    particleCount: 140,
    spread: 100,
    startVelocity: 45,
    origin: { x: 0.5, y: 0.6 },
    colors: COLORS,
    shapes,
    scalar: 1.2,
    disableForReducedMotion: true,
  });

  const end = Date.now() + 2200;
  const frame = () => {
    confetti({ particleCount: 3, angle: 60, spread: 60, origin: { x: 0, y: 0.75 }, colors: COLORS, shapes, scalar: 1.1, disableForReducedMotion: true });
    confetti({ particleCount: 3, angle: 120, spread: 60, origin: { x: 1, y: 0.75 }, colors: COLORS, shapes, scalar: 1.1, disableForReducedMotion: true });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}
