export type WeighIn = {
  date: string;
  weight: number;
  moved: boolean;
};

export type WeighInWithAvg = WeighIn & { avg: number };

/** Window size for the 7-day toggle (number of weigh-ins, not calendar days). */
export const WINDOW_7_DAY = 7;

/** Window size for the 4-week toggle. */
export const WINDOW_4_WEEK = 4;

/**
 * Rolling average of `weight` over the last `n` points (or fewer at the start).
 * Copied from the MVP spec so GitHub edits to data.json show up the same way.
 */
export function rolling(data: WeighIn[], n: number): WeighInWithAvg[] {
  return data.map((d, i) => {
    const w = data.slice(Math.max(0, i - (n - 1)), i + 1);
    return { ...d, avg: w.reduce((s, x) => s + x.weight, 0) / w.length };
  });
}
