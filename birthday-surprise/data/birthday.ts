/**
 * ============================================================================
 *  EVERYTHING PERSONAL LIVES IN THIS FILE.
 *  Edit the text, swap the photo paths, change the date. Nothing else needed.
 *
 *  Tip: wrap a word in *asterisks* to highlight it in rose, e.g.
 *       "You make every day *so much funnier*."
 * ============================================================================
 */
import type { IconName } from "@/lib/icons";

export type MemoryShape = "portrait" | "landscape" | "square" | "tall";

export interface Memory {
  /** File inside /public/images, e.g. "/images/memory-1.jpg" */
  image: string;
  alt: string;
  caption: string;
  /** Controls the frame proportions so the gallery feels editorial. */
  shape: MemoryShape;
}

export interface TimelineEntry {
  date: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

export interface Reason {
  icon: IconName;
  title: string;
  description: string;
}

export interface InsideJoke {
  icon: IconName;
  text: string;
}

export const birthdayData = {
  /** Your best friend's name (used in the page title and screen-reader text). */
  name: "Bestie",

  /**
   * Her birthday, in local time: "YYYY-MM-DDTHH:mm:ss".
   * If the date has already passed, the countdown automatically aims for the
   * next one. For 24 hours after it starts, the site shows the birthday message.
   */
  birthday: "2026-10-06T00:00:00",

  /** Screen 1 */
  hero: {
    eyebrow: "A Little Birthday Surprise For My Favorite Human ✨",
    title: "Happy Birthday,",
    accent: "Bestie! 🎂",
    subtitle: "Because a simple birthday wish was definitely not enough for you.",
    /** Label of the big button on the first screen. */
    cta: "Start The Surprise",
    photo: {
      image: "/images/hero.jpg",
      alt: "A favorite photo of us together",
      caption: "my favorite human",
    },
  },

  /** Screen 2 */
  message: {
    label: "A message from my heart",
    title: "For one of my favorite people in the whole world",
    paragraphs: [
      "Happy Birthday to *one of the most important people in my life*. From random conversations and stupid jokes to the moments when we actually need each other, I'm genuinely grateful for every memory we've made.",
      "You make ordinary days *funnier*, hard days *lighter*, and every plan *way more chaotic*. I wouldn't change a single bit of it.",
      "Today is all about you, so please enjoy it. (Yes, I'm going to embarrass you a little. It's tradition.)",
    ],
    closing: "Thank you for being you. 🫶",
  },

  /** Screen 3 */
  gallery: {
    title: "Our Little Moments",
    subtitle: "Some memories deserve to be kept forever.",
    /** How many photos appear on the main Memories screen. */
    featuredCount: 4,
    moreLabel: "See More Memories",
  },

  /**
   * Gallery photos. Put the files in /public/images and list them here.
   * Missing files show a soft placeholder, so the site never looks broken.
   */
  memories: [
    { image: "/images/memory-1.jpg", alt: "Us on one of our best days", caption: "Our favorite kind of chaos", shape: "portrait" },
    { image: "/images/memory-2.jpg", alt: "A relaxed moment together", caption: "One of those perfect days", shape: "landscape" },
    { image: "/images/memory-3.jpg", alt: "Her smile", caption: "That smile, always", shape: "square" },
    { image: "/images/memory-4.jpg", alt: "A quiet memory", caption: "A memory I'll always keep", shape: "tall" },
    { image: "/images/memory-5.jpg", alt: "Laughing together", caption: "Peak chaos, zero regrets", shape: "landscape" },
    { image: "/images/memory-6.jpg", alt: "A funny candid moment", caption: "Caught mid-laugh. Again.", shape: "portrait" },
    { image: "/images/memory-7.jpg", alt: "Together on an adventure", caption: "Anywhere is better with you", shape: "square" },
    { image: "/images/memory-8.jpg", alt: "A cozy evening", caption: "Questionable decisions, great memories", shape: "landscape" },
  ] satisfies Memory[],

  /** Screen 4 (first tab) */
  story: {
    title: "How Did We Even Become Best Friends? 😂",
    tabLabel: "Our story",
  },

  /** Add, remove or reorder entries freely. `image` is optional. */
  timeline: [
    {
      date: "Where it started",
      title: "First Meeting",
      description: "Neither of us knew it yet, but our lives were about to get a lot funnier.",
    },
    {
      date: "Day one-ish",
      title: "First Inside Joke",
      description: "Nobody else would get it. Honestly, that's the best part.",
    },
    {
      date: "Ever since",
      title: "Too Many Random Conversations",
      description: "Hours of talking about absolutely nothing, and somehow also everything.",
    },
    {
      date: "Plot twist",
      title: "Questionable Decisions",
      description: "We made them together. We regret nothing. (Mostly.)",
    },
    {
      date: "Today",
      title: "Somehow Still Best Friends",
      description: "After everything, we're still here. Impressive, honestly.",
    },
  ] satisfies TimelineEntry[],

  /** Screen 4 (second tab) */
  insideJokes: {
    title: "Things Only We Would Understand 😂",
    tabLabel: "Inside jokes",
    items: [
      { icon: "chat", text: "That one conversation we'll never forget." },
      { icon: "laugh", text: "How did we even end up there?" },
      { icon: "sparkles", text: "Our questionable decisions." },
      { icon: "smile", text: "That joke that is still somehow funny." },
      { icon: "moon", text: "The thing we swore we'd never bring up again." },
    ] satisfies InsideJoke[],
  },

  /** Screen 5 */
  reasonsSection: {
    title: "Why You're My Best Friend 🫶",
  },

  reasons: [
    { icon: "hug", title: "You're Always There", description: "Day or night, you show up. Every time." },
    { icon: "sparkles", title: "You Make Everything Fun", description: "Even boring plans turn into stories." },
    { icon: "chat", title: "You Understand My Randomness", description: "No explanation needed. You just get it." },
    { icon: "kindness", title: "You're Basically My Personal Therapist 😂", description: "Free advice. Zero judgment." },
    { icon: "voice", title: "We Can Talk About Literally Anything", description: "Deep stuff or complete nonsense." },
    { icon: "sun", title: "You've Been There Through Everything", description: "The good, the bad, and the awkward." },
    { icon: "coffee", title: "You Make Ordinary Days Better", description: "Even a normal Tuesday feels like an event." },
  ] satisfies Reason[],

  /** Screen 6 */
  letter: {
    title: "A Letter For My Best Friend 💌",
    teaser: "I wrote something for you...",
    openLabel: "Open My Letter 💌",
    greeting: "Dear Bestie,",
    paragraphs: [
      "I tried writing this a few times, and every version came out either too serious or too ridiculous. So here's the honest one: *you're one of the best things that has ever happened to me*.",
      "Thank you for the *endless laughs*, the random late-night conversations, and the way you can make even the worst day feel survivable. Somehow you always know when I need a joke and when I need an actual hug.",
      "You've been there through the chaos, the confusion, and every questionable decision I've made, and you never once made me feel alone. (Okay, you judged me a little. Lovingly.)",
      "I'm so grateful for every memory we've made, and I'm *really* excited for all the ones still waiting for us.",
      "I hope this next year gives you everything you've been working for. Big wins, calm days, new adventures, and people who appreciate you as much as you deserve. I'll be right here for all of it, cheering the loudest.",
    ],
    closing: ["Stay exactly the chaotic, amazing person you are.", "Happy Birthday, Bestie. 🫶"],
    /** Shown in handwritten script at the bottom of the letter. */
    signature: "— Your favorite person to annoy",
  },

  /** Countdown (shown on the final screen, before the surprise). */
  countdown: {
    title: "Counting Down To The Birthday Chaos 🎂",
    celebration: "IT'S YOUR BIRTHDAY!!! 🎉",
  },

  /** Screen 7 */
  surprise: {
    title: "Okay... One Last Thing 👀",
    subtitle: "Because a simple birthday wish was definitely not enough.",
    button: "Click For The Final Surprise ✨",
    finalTitle: "Happy Birthday, Bestie! 🎂🫶",
    finalParagraphs: [
      "I hope this year brings you countless reasons to smile, amazing memories, new adventures, and everything you've been wishing for.",
      "Thank you for being one of the best parts of my life.",
      "Now go enjoy your birthday. You deserve it!",
    ],
    replayLabel: "Replay From Beginning",
  },

  /**
   * Music. Put your file at /public/music/birthday-song.mp3.
   * Nothing autoplays. If the file is missing, the player just says so politely.
   */
  music: {
    enabled: true,
    src: "/music/birthday-song.mp3",
    title: "Our Song",
  },

  footer: {
    line: "Made with a lot of affection (and a little chaos) just for you 🫶",
  },
};

export type BirthdayData = typeof birthdayData;
