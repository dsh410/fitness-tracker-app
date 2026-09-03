"use client";

import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { makeWeightCsvUrl } from "@/lib/csv";
import {
  rolling,
  WINDOW_4_WEEK,
  WINDOW_7_DAY,
  type WeighIn,
} from "@/lib/rolling";
import SubscribeForm from "./SubscribeForm";
import WeightChart from "./WeightChart";

type TrackerProps = {
  data: WeighIn[];
};

function formatPounds(n: number) {
  // toFixed is the same on the server and in the browser.
  return n.toFixed(1);
}

export default function Tracker({ data }: TrackerProps) {
  const [n, setN] = useState(WINDOW_7_DAY);
  // Recharts measures the window size, so it cannot run during SSR.
  // First paint (server + client) is an empty box; the chart mounts after.
  const [chartReady, setChartReady] = useState(false);

  const series = useMemo(() => rolling(data, n), [data, n]);
  const currentAvg = series.at(-1)?.avg ?? 0;
  const startWeight = data[0]?.weight ?? 0;
  const poundsDown = startWeight - currentAvg;

  function downloadCsv(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
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

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Average</p>
        <p className="big-number">
          {formatPounds(currentAvg)}
          <span className="unit">lbs</span>
        </p>
        <p className="delta">
          <strong>{formatPounds(poundsDown)}</strong> pounds down since start
        </p>
      </section>

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

      <div className="chart" role="img" aria-label="Weight over time">
        {chartReady ? <WeightChart data={series} /> : null}
      </div>

      <a className="csv" href="#download-csv" download="weight.csv" onClick={downloadCsv}>
        Download CSV
      </a>

      <SubscribeForm />
    </main>
  );
}
