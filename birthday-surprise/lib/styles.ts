/** Shared button class strings so every call-to-action feels like part of one family. */
const shape =
  "btn-shine group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full text-[0.95rem] font-medium tracking-wide transition duration-300 ease-silk hover:scale-[1.03] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none motion-reduce:hover:scale-100";

const burgundy = "bg-burgundy text-cream shadow-lift hover:shadow-[0_26px_55px_-16px_rgb(78_26_45/0.55)] focus-visible:outline-rose";
const cream =
  "bg-cream text-burgundy shadow-[0_18px_50px_-14px_rgb(255_200_215/0.45)] hover:shadow-[0_24px_60px_-12px_rgb(255_200_215/0.6)] focus-visible:outline-champagne";

/** Deep burgundy button for light backgrounds. */
export const primaryButton = `${shape} px-8 py-4 ${burgundy}`;

/** Cream button for dark backgrounds. */
export const lightButton = `${shape} px-8 py-4 ${cream}`;

/** Quiet outline button for dark backgrounds. */
export const ghostButton =
  "inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm text-cream/85 transition duration-300 ease-silk hover:border-cream/60 hover:bg-cream/10 hover:text-cream active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne";

/* Bottom navigation: same family, slightly more compact for phones. */
export const navPrimary = `${shape} px-6 py-3.5 ${burgundy}`;
export const navPrimaryDark = `${shape} px-6 py-3.5 ${cream}`;
export const navGhost = `${shape} px-5 py-3.5 border border-dusty/50 bg-cream/60 text-burgundy backdrop-blur-md hover:bg-white/80 focus-visible:outline-rose`;
export const navGhostDark = `${shape} px-5 py-3.5 border border-cream/30 bg-cream/10 text-cream backdrop-blur-md hover:bg-cream/20 focus-visible:outline-champagne`;
