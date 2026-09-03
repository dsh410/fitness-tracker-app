/** Hardcoded start — the first Sheet row is the start *day*, not this number. */
export const START_WEIGHT = 483.2;

/** Set this to show "I'm a 36-year-old web developer." in the intro. */
export const AGE: number | null = null;

/**
 * Published Google Sheet CSV (File → Share → Publish to web → CSV).
 * Falls back to /weigh-ins.csv in this repo until that URL is set.
 */
export const SHEET_CSV_URL =
  process.env.NEXT_PUBLIC_SHEET_CSV_URL || "/weigh-ins.csv";

export const PLATFORM_LINKS = {
  tt: process.env.NEXT_PUBLIC_TT_URL || "",
  ig: process.env.NEXT_PUBLIC_IG_URL || "",
  yt: process.env.NEXT_PUBLIC_YT_URL || "",
  fb: process.env.NEXT_PUBLIC_FB_URL || "",
};

export function introCopy(age: number | null = AGE): string {
  const who =
    age == null
      ? "I'm a web developer."
      : `I'm a ${age}-year-old web developer.`;
  return `${who} I started at 480 pounds with type 2 diabetes. I'm logging every weigh-in here, publicly, so I can't quietly quit. No plan to sell you, no program, no advice — just the numbers as they happen.`;
}
