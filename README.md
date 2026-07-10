# Boundaries Webinar — Facilitator Run-Sheet

A live-facilitation cockpit for the **Boundaries** webinar, in the
**Estus Health** brand. Dependency-free vanilla HTML/CSS/JS — no build step,
no frameworks — deployed as a static site on Vercel.

Two pages:

| Page | Audience | Purpose |
|---|---|---|
| `/` | Facilitators (Liam & Nic) | The run-sheet: segments, cues, timers, scripts |
| `/takeaway` | Attendees | The link you drop in chat at the close: 6 steps, 8 domains, all the scripts |

## Live session conductor

Hit **▶ Go live** and the toolbar becomes a conductor strip:

- **Session clock** — wall-clock elapsed, survives page refreshes.
- **Per-segment countdown** — `4:59 left` flips to `1:10 over` in plum.
- **Drift chip** — `on plan` / `2:10 behind` / `1:30 ahead`, measured against
  the printed running order (63 min plan).
- **Catch-up hints** — when you're >2 min behind, the current segment's own
  "if time is short" note surfaces in the bar (e.g. *protect steps 1, 2 & 6*).
- **Next ▸** ticks the current segment done, records its actual duration, and
  auto-scrolls to the next one.
- **End & debrief** — plan-vs-actual table per segment, copyable summary,
  and a four-band confetti drop (disabled under `prefers-reduced-motion`).
- **Wake lock** — the screen stays on while live (where supported).

## Chat drops

The 💬 drawer collects everything you'll paste into chat — the one-liner,
every audience Ask, all nine saying-no scripts, and the takeaway-page link —
in running order. **Copy next drop** walks the queue; copied items dim.

## Everything else

- **Dark mode** (`d`) — the brand's dark identity; persisted, follows system
  preference by default.
- **Keyboard shortcuts** (`?`) — `g` go live, `n` next, `x` tick, `j/k`
  navigate, `e/c` expand/collapse, `q` chat drops, `f` focus mode, `d` dark.
- **Focus mode** (`f`) — dims everything except the current segment.
- **Lead chips** — L / N / L·N per segment (click to swap), shown in the
  live bar.
- **Offline PWA** — service worker caches the app shell; wifi hiccups
  mid-webinar can't take the sheet down. Installable via the manifest.
- **Persistence** — ticks, leads, theme, and the live-session clock survive
  refreshes (`localStorage`).
- **Print** — collapses the chrome to a clean paper run-sheet.

## Estus Health branding

- **Wordmark:** banded ESTUS HEALTH lockup with the four-band color bar.
- **Palette:** indigo `#344982` · blue `#2f6f9e` · teal `#2ca5b8` · plum
  `#ab5c95`, on warm neutrals with near-black `#090909`.
- **Type:** Oswald (display), Barlow (body), Barlow Semi Condensed (labels) —
  self-hosted woff2, no third-party requests at runtime.

## Local preview

```bash
python3 -m http.server 8000
# http://localhost:8000            → run-sheet
# http://localhost:8000/takeaway.html → takeaway sheet
```

(Serving over HTTP rather than `file://` lets the fonts and service worker
load; clean URLs like `/takeaway` are a Vercel feature.)

## Deploy to Vercel

No build step — Vercel serves the repo as-is.

**Dashboard:** import this repository at [vercel.com/new](https://vercel.com/new),
framework preset **Other**, no build command.

**CLI:**

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

`vercel.json` sets clean URLs, security headers, immutable caching for fonts,
and `must-revalidate` for the HTML and service worker so updates roll out
immediately.
