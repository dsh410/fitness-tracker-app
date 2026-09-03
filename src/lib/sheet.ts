import type { WeighIn } from "./rolling";

/** Parse the published Sheet CSV. Warns on weights that look like typos. */
export function parseSheetCsv(text: string): WeighIn[] {
  const lines = text.trim().split(/\r?\n/).filter((line) => line.trim());
  if (lines.length <= 1) return [];

  const rows = lines.slice(1);
  const out: WeighIn[] = [];

  for (const line of rows) {
    const [dateRaw, weightRaw, movedRaw] = line.split(",");
    if (!dateRaw || weightRaw == null) continue;

    const date = dateRaw.trim();
    const weight = Number(weightRaw.trim());
    const moved = (movedRaw ?? "").trim().toLowerCase() === "true";

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(weight)) {
      console.warn("check that entry", { date, weightRaw, movedRaw });
      continue;
    }

    if (weight < 100 || weight > 700) {
      console.warn("check that entry", { date, weight, moved });
    }

    out.push({ date, weight, moved });
  }

  return out;
}
