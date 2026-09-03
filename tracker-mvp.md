# Tracker — MVP Spec

## Stack

| | |
|---|---|
| Framework | Vite + React |
| Chart | Recharts |
| Data | Google Sheet → published CSV |
| Hosting | Vercel (free tier) |
| Analytics | Vercel Web Analytics |
| Email | Kit (free to 10k subscribers) |

No backend. No database. No auth.

## Data source — published Sheet, not `data.json`

Daily weigh-ins means ~365 entries a year. Typing JSON on a phone half-asleep is how you fat-finger a comma and break the build.

1. Sheet with three columns: `date`, `weight`, `moved`
2. File → Share → Publish to web → CSV
3. Fetch and parse that URL client-side

Morning routine: open Sheets, type a number in the next row. Sheets *is* the form.

```
date,weight,moved
2026-09-06,480.0,true
2026-09-07,479.2,true
```

**No entry form in the app.** A real one needs auth or anyone could edit your weight. That's the single biggest thing between one weekend and three.

## Page layout, top to bottom

1. **Intro paragraph** (see below)
2. **STARTED / NOW / DOWN** — the shot
3. **Chart**
4. **`7-day` / `4-week` toggle**
5. **CSV export**
6. **Email form**
7. **Links to all four platforms**

## Intro copy

> I'm a [age]-year-old web developer. I started at 480 pounds with type 2 diabetes. I'm logging every weigh-in here, publicly, so I can't quietly quit. No plan to sell you, no program, no advice — just the numbers as they happen.

Goes above the numbers. Same sentence into `<title>` and `og:description` — links get pasted into DMs and currently preview as nothing.

No mission statement. No "join my journey." Factual and slightly flat; the numbers are dramatic enough.

## The three numbers

```js
const START_WEIGHT = 480;        // hardcoded — first logged entry is the day
const current = avg.at(-1);      // rolling average, NOT last raw weigh-in
const lost    = START_WEIGHT - current;
```

```
STARTED        NOW          DOWN
 480.0        446.2         33.8
```

`NOW` biggest by a wide margin. Stack vertically on narrow screens.

Add days elapsed: `(Date.now() - startDate) / 86400000 | 0`. "33.8 lbs in 84 days" is a story; "33.8" is a fact.

**All design budget goes here, none on the chart.** This is what gets screenshotted and what a cold visitor sees first.

## Rolling average

```js
const rolling = (data, n) =>
  data.map((d, i) => {
    const w = data.slice(Math.max(0, i - (n - 1)), i + 1);
    return { ...d, avg: w.reduce((s, x) => s + x.weight, 0) / w.length };
  });
```

`rolling(data, 7)` or `rolling(data, 4)`. One `useState` for `n`. Average is the thick line; raw weight is faint dots behind it.

## CSV export

```js
const csv = ['date,weight', ...data.map(d => `${d.date},${d.weight}`)].join('\n');
const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
```

`<a href={url} download="weight.csv">`

## Data validation — not unit tests

The realistic failure is a typo in the Sheet, not a logic bug.

```js
if (weight < 100 || weight > 700) console.warn('check that entry', d);
```

No test framework before launch. After it ships, one optional test on `rolling()` window edges — that's the only place a bug produces a plausible wrong number instead of a crash. No component tests, no CI, no coverage target.

## Build checklist

- [ ] Vite + React deployed to Vercel, GitHub connected (public repo, real README)
- [ ] Sheet published as CSV, fetched and parsed
- [ ] Intro paragraph + `<title>` + `og:description`
- [ ] STARTED / NOW / DOWN block
- [ ] Line chart
- [ ] `7-day` / `4-week` toggle
- [ ] CSV export button
- [ ] Range warning on parse
- [ ] Analytics script tag
- [ ] Email form + privacy note
- [ ] Platform links
- [ ] Tagged links live: `?s=tt` `?s=ig` `?s=yt` `?s=fb`

## Not in the MVP

Accounts · auth · backend · weight-entry form · payments · other users' data · goal weights · target ranges · **macros or calories** · glucose · medication · advice of any kind · unit tests · CI · design system

Macros stays out permanently on the public page. It's a target by implication, it's the T2D line that goes to the doctor first, and a section that goes blank in week three is a visible failure on the page whose job is proving consistency.

## Done means

Public URL, one weigh-in in it, link in all four bios. Ship, then add.