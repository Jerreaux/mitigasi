import { AlertTriangle, Bell } from "lucide-react";
import { RiskBadge } from "@/components/dashboard/risk-badge";
import type { AlertItem } from "@/types";

interface AlertBannerProps {
  alerts: AlertItem[];
}

export function AlertBanner({ alerts }: AlertBannerProps) {
  if (alerts.length === 0) return null;

  return (
    <div
      className="rounded-lg border border-danger/20 bg-danger/5 p-4"
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle
          className="mt-0.5 h-5 w-5 shrink-0 text-danger"
          aria-hidden="true"
        />
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-danger" aria-hidden="true" />
            <h2 className="text-sm font-semibold text-foreground">
              Active Early Warnings ({alerts.length})
            </h2>
          </div>
          <ul className="space-y-2">
            {alerts.map((alert) => (
              <li
                key={alert.id}
                className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-sm text-foreground">{alert.title}</span>
                <div className="flex items-center gap-2">
                  <RiskBadge level={alert.severity} />
                  <span className="text-xs text-muted-foreground">
                    {alert.zone}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
