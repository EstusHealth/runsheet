# Boundaries Webinar — Facilitator Run-Sheet

An ADHD-friendly, single-page facilitator companion for the live **Boundaries**
webinar, styled in the **Estus Health** brand. It's a self-contained static site:
one `index.html` with all CSS and JavaScript inline (fonts loaded from Google
Fonts).

## Features

- **Collapsible segments** (Pre-flight → Q&A) with a running order and clock.
- **Progress tracking** — tick segments "done"; the toolbar bar fills as you go.
- **Copy-ready scripts** — one-click copy for every "saying no" line.
- **Jump nav**, expand/collapse-all, and a print-friendly layout.
- **Local persistence** — open/done state is saved to `localStorage`, so a
  refresh mid-session keeps your place.

## Estus Health branding

- **Wordmark:** the banded ESTUS HEALTH lockup with the four-band color bar.
- **Palette:** indigo `#344982` · blue `#2f6f9e` · teal `#2ca5b8` · plum
  `#ab5c95`, on warm neutrals with near-black `#090909`.
- **Type:** Oswald (display), Barlow (body), Barlow Semi Condensed (labels).

## Local preview

It's a plain static file — open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to Vercel

No build step is required; Vercel serves `index.html` as a static site.

**From the dashboard:** import this repository at
[vercel.com/new](https://vercel.com/new). Leave the framework preset as
**Other** — no build command, no output directory to set.

**From the CLI:**

```bash
npm i -g vercel
vercel        # preview deploy
vercel --prod # production deploy
```

`vercel.json` adds clean URLs and a few sensible security headers.
