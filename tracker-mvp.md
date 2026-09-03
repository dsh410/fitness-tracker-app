# Build #1 — Progress Tracker

Companion to `weekend-batch-sheet.md`.

## Decision (2026-09-02)

Build the free tracker now. Nothing paid. Only reason it's now: **data has to start accumulating.** Three months of weigh-ins is a story. One is nothing.

Building is not the bottleneck. Filming is. If code starts feeling more productive than filming, that's the warning sign.

## Scope — one weekend, hard stop

Web app, never native. A URL works in every bio; an app store link doesn't.

**Stack:** Vite + React, `data.json` in the repo, Recharts, Vercel. No backend, no auth, no database.

**Ship list:**
1. `data.json` edited by hand — `{ date, weight, moved }`
2. One chart + big current number + "pounds down since start"
3. Rolling average line, `7-day` / `4-week` toggle
4. CSV export button
5. Analytics script tag
6. Email form embed

**Update flow:** GitHub mobile app → edit `data.json` → commit → live in 40s. If it needs a laptop, weeks get skipped.

**Polish budget** goes on the big number, not the chart. That's what gets screenshotted.

## Rolling average

```js
const rolling = (data, n) =>
  data.map((d, i) => {
    const w = data.slice(Math.max(0, i - (n - 1)), i + 1);
    return { ...d, avg: w.reduce((s, x) => s + x.weight, 0) / w.length };
  });
```

Toggle, not a setting. Average is the thick line; raw weight is faint dots behind it. The big on-screen number is the average, not the last weigh-in.

## Analytics

Vercel or Cloudflare Web Analytics. Cookie-free, no consent banner. Not Google.

Three numbers only: visits/day, source, returning visitors. Check weekly during the Sunday review, not daily.

Tagged links so referrer data is usable: `?s=tt` `?s=ig` `?s=yt` `?s=fb`. This answers which platform is worth cross-posting to.

Page visits only. Never anyone's weight or behavior.

## Email capture

Collect day one. **Promise monthly, nothing more** — a newsletter habit is unbatched weekday work and will eat filming time. Never auto-send on video posts: followers already get notified, and 30 emails a month gets the list marked as spam.

**Kit** (free to 10k subscribers — exactly the milestone where the list starts mattering). Embedded form. Addresses live on Kit's servers, not in the repo — that's what keeps this front-end only. Email address only, no name, no weight, no health questions. Privacy note linked nearby.

Place under the chart. Copy: *"Get a monthly update: where the numbers are, and what I'm building next."*

Expect 5–15 addresses in three months. That's correct, not failure.

## Hard limits — every stage, free and paid

- Logging and visualization only. No advice, no targets, no recommendations.
- No glucose. No medication. No storing anyone else's health data.
- Nothing requiring weekday attention.
- Lawyer before the first dollar.

## Ruled out

| | |
|---|---|
| Average weight for 6'0" | Tells a man he should be 175. Exact feature that made mainstream apps unusable at 480. A target is a target. |
| Averages across users | Needs accounts + backend. Real idea, stage 3, lawyer attached. |
| Gating the tracker behind email | It's the receipt, not a lead magnet. Gate a copy of the template instead. |

Compare against **your own past**, never a population.

## Content from it

Screen-record as you go. Re-recording later never looks real.

1. What I'm building and why — *before any code exists*
2. Why every fitness app failed me at 480
3. The chart rendering with real data
4. Rolling average — "the scale said I gained 2 lbs, here's why that's garbage"
5. CSV export — "try getting your data out of MyFitnessPal"

## Promotion

No launch day. At 102 followers a launch is a normal day where you feel disappointed.

- **Now:** film clip 1 before the code exists
- **Go-live Sunday:** link in all four bios
- **Month 3:** the real moment — a curve that means something
- **Best clip:** wait for someone to accuse you of faking it, answer with the URL

Never "check out my tracker." Lead with the number, let the link be proof: *"Down 34 lbs. Built a page that logs it publicly — check my math."*

## Roadmap

1. **→ 10k:** free tracker, public, no accounts
2. **10k–30k:** ask the list what breaks. Build nothing.
3. **30k+, only if comments demand it:** paid version, one price, no free tier
4. **After content income is stable:** anything with real support burden

## Creep log

Added after scope was set: rolling average, 7-day/4-week toggle, CSV export.

All cheap. All individually reasonable. That's how one weekend becomes three. **Ship, then add.**