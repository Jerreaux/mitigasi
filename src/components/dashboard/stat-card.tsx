import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatPercent } from "@/lib/utils";
import type { StatMetric } from "@/types";

interface StatCardProps {
  metric: StatMetric;
  icon: React.ReactNode;
}

export function StatCard({ metric, icon }: StatCardProps) {
  const trendIcon =
    metric.trend === "up" ? (
      <ArrowUpRight className="h-3.5 w-3.5" />
    ) : metric.trend === "down" ? (
      <ArrowDownRight className="h-3.5 w-3.5" />
    ) : (
      <Minus className="h-3.5 w-3.5" />
    );

  const trendColor =
    metric.trend === "up"
      ? "text-danger"
      : metric.trend === "down"
        ? "text-success"
        : "text-muted-foreground";

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">
              {metric.label}
            </p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
              {metric.value}
            </p>
            {metric.change !== undefined && (
              <div
                className={cn(
                  "mt-2 flex items-center gap-1 text-xs font-medium",
                  trendColor
                )}
              >
                {trendIcon}
                <span>{formatPercent(Math.abs(metric.change))}</span>
                <span className="text-muted-foreground">vs last period</span>
              </div>
            )}
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
