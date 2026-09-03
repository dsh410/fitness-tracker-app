"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { WeighInWithAvg } from "@/lib/rolling";

type WeightChartProps = {
  data: WeighInWithAvg[];
};

function formatTick(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function WeightChart({ data }: WeightChartProps) {
  return (
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="rgba(255, 255, 255, 0.06)" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatTick}
            tick={{ fill: "#8b93a7", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          {/* Start near the data instead of 0 so small changes are visible. */}
          <YAxis
            domain={["dataMin - 2", "dataMax + 2"]}
            tick={{ fill: "#8b93a7", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip
            contentStyle={{
              background: "#16181d",
              border: "1px solid #2a2e38",
              borderRadius: 8,
            }}
            labelFormatter={(label) => formatTick(String(label))}
            formatter={(value, name) => {
              const n = typeof value === "number" ? value.toFixed(1) : String(value);
              return [n, name === "avg" ? "Average" : "Weight"];
            }}
          />
          <Line
            type="monotone"
            dataKey="avg"
            stroke="#e8eefc"
            strokeWidth={3}
            dot={false}
            isAnimationActive={false}
          />
          {/* Raw weigh-ins: no line, only faint dots. */}
          <Line
            type="monotone"
            dataKey="weight"
            stroke="none"
            dot={{ r: 4, fill: "#e8eefc", fillOpacity: 0.28 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
  );
}
