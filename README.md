# Tracker

Public weigh-in log. No accounts, no advice, no entry form. The numbers live in a Google Sheet; this site only displays them.

## Daily update

1. Open the Sheet.
2. Add a row: `date`, `weight`, `moved`.
3. The site fetches the published CSV. No deploy.

## Publish the Sheet

1. Columns: `date`, `weight`, `moved` (example: `2026-09-06,480.0,true`).
2. **File → Share → Publish to web → CSV**.
3. Put that URL in `.env.local` as `NEXT_PUBLIC_SHEET_CSV_URL=...`.
4. On Vercel, add the same env var and redeploy once.

Until that URL is set, the app loads `/weigh-ins.csv` from this repo.

## Run locally

```powershell
npm install
npm run dev
```

Open http://localhost:3000.

## Bio links

Use tagged URLs so analytics can tell which platform sent the visit:

- `https://YOUR-DOMAIN/?s=tt`
- `https://YOUR-DOMAIN/?s=ig`
- `https://YOUR-DOMAIN/?s=yt`
- `https://YOUR-DOMAIN/?s=fb`

Paste your profile URLs into `.env.local` (`NEXT_PUBLIC_TT_URL`, `IG`, `YT`, `FB`) for the links at the bottom of the page.

## Kit

The subscribe form posts to Kit. Confirm `NEXT_PUBLIC_KIT_FORM_ACTION` matches your form's `action` URL.

## Config

`src/lib/config.ts` holds `START_WEIGHT` (480) and `AGE` (set this for the intro line).
