"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface RiskDistributionChartProps {
  data: { name: string; value: number; color: string }[];
}

export function RiskDistributionChart({ data }: RiskDistributionChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: "0.5rem",
            fontSize: "12px",
          }}
          formatter={(value) => [`${value}%`, "Coverage"]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
