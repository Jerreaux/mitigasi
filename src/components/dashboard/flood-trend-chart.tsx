"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface FloodTrendChartProps {
  data: { month: string; level: number; rainfall: number }[];
}

export function FloodTrendChart({ data }: FloodTrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="levelGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: "#64748B" }}
          axisLine={{ stroke: "#E2E8F0" }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#64748B" }}
          axisLine={{ stroke: "#E2E8F0" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: "0.5rem",
            fontSize: "12px",
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="level"
          name="Water Level (m)"
          stroke="#1E3A8A"
          fill="url(#levelGradient)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="rainfall"
          name="Rainfall (mm)"
          stroke="#06B6D4"
          fill="url(#rainGradient)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
