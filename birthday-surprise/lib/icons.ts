import {
  Coffee,
  Camera,
  Flower2,
  Gift,
  Heart,
  HeartHandshake,
  HandHeart,
  Laugh,
  MessageCircleHeart,
  Mic,
  Moon,
  Music,
  Smile,
  Sparkles,
  Star,
  Sun,
  type LucideIcon,
} from "lucide-react";

/**
 * Icon names you can use in data/birthday.ts (reasons + favorites).
 * Add more by importing them from "lucide-react" and listing them here.
 */
export const ICONS = {
  smile: Smile,
  kindness: HandHeart,
  laugh: Laugh,
  heart: Heart,
  sparkles: Sparkles,
  gift: Gift,
  camera: Camera,
  sun: Sun,
  music: Music,
  voice: Mic,
  chat: MessageCircleHeart,
  coffee: Coffee,
  flower: Flower2,
  star: Star,
  hug: HeartHandshake,
  moon: Moon,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;
