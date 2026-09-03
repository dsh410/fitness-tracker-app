"use client";

import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { makeWeightCsvUrl } from "@/lib/csv";
import {
  AGE,
  introCopy,
  LINKS,
  SHEET_CSV_URL,
  START_WEIGHT,
} from "@/lib/config";
import { parseSheetCsv } from "@/lib/sheet";
import {
  rolling,
  WINDOW_4_WEEK,
  WINDOW_7_DAY,
  type WeighIn,
} from "@/lib/rolling";
import SubscribeForm from "./SubscribeForm";
import WeightChart from "./WeightChart";

function formatPounds(n: number) {
  return n.toFixed(1);
}

function daysElapsed(startDate: string, now: Date) {
  const [year, month, day] = startDate.split("-").map(Number);
  const start = Date.UTC(year, month - 1, day);
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return ((today - start) / 86400000) | 0;
}

export default function Tracker() {
  const [n, setN] = useState(WINDOW_7_DAY);
  const [chartReady, setChartReady] = useState(false);
  const [data, setData] = useState<WeighIn[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState<number | null>(null);

  const series = useMemo(
    () => (data ? rolling(data, n) : []),
    [data, n],
  );
  const current = series.at(-1)?.avg ?? 0;
  const lost = START_WEIGHT - current;
  const startDate = data?.[0]?.date;

  function downloadCsv(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    if (!data) return;
    const url = makeWeightCsvUrl(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "weight.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  useEffect(() => {
    setChartReady(true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(SHEET_CSV_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Sheet fetch failed (${res.status})`);
        return res.text();
      })
      .then((text) => {
        if (cancelled) return;
        setData(parseSheetCsv(text));
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Could not load weigh-ins.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!startDate) return;
    setDays(daysElapsed(startDate, new Date()));
  }, [startDate]);

  return (
    <main className="page">
      <p className="intro">{introCopy(AGE)}</p>

      <section className="shot" aria-label="Progress">
        <div className="shot-stat">
          <span className="shot-label">STARTED</span>
          <span className="shot-value">{formatPounds(START_WEIGHT)}</span>
        </div>
        <div className="shot-stat shot-now">
          <span className="shot-label">NOW</span>
          <span className="shot-value">
            {data ? formatPounds(current) : "—"}
          </span>
        </div>
        <div className="shot-stat">
          <span className="shot-label">DOWN</span>
          <span className="shot-value">{data ? formatPounds(lost) : "—"}</span>
        </div>
      </section>

      {data && days != null ? (
        <p className="shot-story">
          {formatPounds(lost)} lbs in {days} {days === 1 ? "day" : "days"}
        </p>
      ) : null}

      {error ? <p className="load-error">{error}</p> : null}

      <div className="chart" role="img" aria-label="Weight over time">
        {chartReady && data ? <WeightChart data={series} /> : null}
      </div>

      <div className="toggle" role="group" aria-label="Average window">
        <button
          type="button"
          className={n === WINDOW_7_DAY ? "is-active" : ""}
          onClick={() => setN(WINDOW_7_DAY)}
        >
          7-day
        </button>
        <button
          type="button"
          className={n === WINDOW_4_WEEK ? "is-active" : ""}
          onClick={() => setN(WINDOW_4_WEEK)}
        >
          4-week
        </button>
      </div>

      <a className="csv" href="#download-csv" download="weight.csv" onClick={downloadCsv}>
        Download CSV
      </a>

      <SubscribeForm />

      <nav className="platforms" aria-label="Social">
        {LINKS.map((link) => (
          <a key={link.name} href={link.url} rel="noreferrer" target="_blank">
            {link.name}
          </a>
        ))}
      </nav>
    </main>
  );
}
