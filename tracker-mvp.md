# Tracker — MVP Spec

## Stack

| | |
|---|---|
| Framework | Vite + React |
| Chart | Recharts |
| Data | `data.json` in repo |
| Hosting | Vercel (free tier) |
| Analytics | Vercel Web Analytics |
| Email | Kit / Buttondown / MailerLite embed |

No backend. No database. No auth.

## Data shape

```json
[
  { "date": "2026-09-06", "weight": 480.0, "moved": true },
  { "date": "2026-09-13", "weight": 476.4, "moved": true }
]
```

## Build checklist

- [ ] Vite + React project, deployed to Vercel, GitHub connected
- [ ] `data.json` with first weigh-in
- [ ] Big current number (rolling average, not last weigh-in)
- [ ] "Pounds down since start"
- [ ] Line chart — average thick, raw weight as faint dots
- [ ] `7-day` / `4-week` toggle
- [ ] CSV export button
- [ ] Analytics script tag
- [ ] Email form embedded under the chart
- [ ] Privacy note linked near form
- [ ] Tagged links live: `?s=tt` `?s=ig` `?s=yt` `?s=fb`

## Rolling average

```js
const rolling = (data, n) =>
  data.map((d, i) => {
    const w = data.slice(Math.max(0, i - (n - 1)), i + 1);
    return { ...d, avg: w.reduce((s, x) => s + x.weight, 0) / w.length };
  });
```

`rolling(data, 7)` or `rolling(data, 4)`. One `useState` for `n`.

## CSV export

```js
const csv = ['date,weight', ...data.map(d => `${d.date},${d.weight}`)].join('\n');
const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
```

`<a href={url} download="weight.csv">`

## Update flow

GitHub mobile app → edit `data.json` → commit → live in ~40s.

## Not in the MVP

Accounts · auth · backend · weight-entry form · payments · other users' data · goal weights · target ranges · glucose · medication · advice of any kind · tests · design system

## Done means

Public URL, one weigh-in in it, link in all four bios. Ship, then add.
