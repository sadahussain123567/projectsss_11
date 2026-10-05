# Best Friend Birthday Surprise

A step-by-step, phone-first birthday experience. One screen at a time, Back / Next buttons at the bottom, no long scrolling.
Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Production: `npm run build && npm start` (the first build needs internet once, to download Google Fonts).

## The flow

| # | Screen | Menu name |
| --- | --- | --- |
| 01 | Welcome | Birthday |
| 02 | Birthday message | Message |
| 03 | Memories: featured photos, then "See More Memories" for the full gallery | Memories |
| 04 | How did we become best friends: timeline, with an "Inside jokes" tab | Our Friendship |
| 05 | Why You're My Best Friend | Best Friend |
| 06 | Letter (envelope opens) | Letter |
| 07 | Countdown + final surprise (confetti), Replay | Surprise |

- Top: music button, `01 / 07` progress, and a menu button that opens a "Jump to" sheet.
- Bottom: Back / Next (Start The Surprise on screen 1, Replay on the last). Arrow keys also work on a computer.
- Replay resets everything (letter, gallery, surprise) without reloading the page.

## 1. Your text: `data/birthday.ts`

Every word and the date live in this one file.

| What | Key |
| --- | --- |
| Her name | `name` |
| Birthday date (drives the countdown) | `birthday` (`"2026-10-15T00:00:00"`) |
| Welcome screen | `hero` |
| Birthday message | `message` |
| Gallery titles + how many photos are featured | `gallery` (`featuredCount`) |
| Photos and captions | `memories` |
| Friendship timeline | `story` (title) and `timeline` (add / remove / reorder) |
| Inside jokes | `insideJokes.items` |
| Best-friend reasons | `reasonsSection` and `reasons` |
| Letter | `letter` (greeting, paragraphs, closing lines, signature) |
| Countdown wording | `countdown` |
| Final surprise | `surprise` |
| Music | `music` |

Wrap a word in `*asterisks*` to highlight it in rose.
Icons for `reasons` and `insideJokes` come from `lib/icons.ts` (smile, kindness, laugh, heart, sparkles, gift, camera, sun, music, voice, chat, coffee, flower, star, hug, moon).

## 2. Photos: `public/images/`

| File | Used for |
| --- | --- |
| `hero.jpg` | The taped polaroid on screen 1 (portrait, 4:5 works best) |
| `memory-1.jpg` ... `memory-8.jpg` | Gallery. The first 4 are the featured ones on screen 3 |
| `story-1.jpg`, `story-2.jpg` | Optional: add `image: "/images/story-1.jpg"` to any `timeline` entry |

Each memory has a `shape` (`portrait`, `landscape`, `square`, `tall`). Pick the closest to the photo. Missing photos show a soft placeholder naming the file to add.

## 3. Music: `public/music/birthday-song.mp3`

Nothing autoplays. If the file is missing, the button says "Song not found yet". Set `music.enabled` to `false` to hide it.

## Before you send it

1. Set `name`, the `birthday` date and the letter `signature`.
2. Replace the placeholder photos.
3. Deploy (Vercel: push to GitHub, import, done). The page is `noindex`.

## Project map

```
app/          layout (fonts, metadata), page, global styles + design tokens
components/   Experience.tsx runs the step flow; one file per screen
data/         birthday.ts: all content
lib/          screens list, confetti, icons, dialog hook, shared styles
public/       images/ and music/
```
