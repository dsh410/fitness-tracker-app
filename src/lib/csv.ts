import type { WeighIn } from "./rolling";

/** Build a downloadable CSV of the raw weigh-ins (not the rolling average). */
export function makeWeightCsvUrl(data: WeighIn[]): string {
  const csv = ["date,weight", ...data.map((d) => `${d.date},${d.weight}`)].join(
    "\n",
  );
  return URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
}
