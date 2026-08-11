import {
  AlertTriangle,
  Building2,
  Droplets,
  MapPin,
  TrendingUp,
  Waves,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HeroDashboardPreview() {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-border bg-surface shadow-2xl shadow-primary/10"
      aria-hidden="true"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
        </div>
        <span className="ml-2 text-[10px] font-medium text-muted-foreground">
          Geo-Mitigasi Operations Center
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
          <span className="text-[10px] text-success">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-0">
        {/* Sidebar */}
        <div className="col-span-2 hidden border-r border-border bg-primary p-3 sm:block">
          <div className="space-y-2">
            {["Dashboard", "Risk Map", "Reports", "Assets"].map((item, i) => (
              <div
                key={item}
                className={`rounded px-2 py-1.5 text-[9px] font-medium ${
                  i === 1
                    ? "bg-white/15 text-white"
                    : "text-white/50"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="col-span-12 sm:col-span-10">
          {/* Alert bar */}
          <div className="flex items-center gap-2 border-b border-danger/20 bg-danger/5 px-3 py-2">
            <AlertTriangle className="h-3 w-3 shrink-0 text-danger" />
            <span className="truncate text-[9px] font-medium text-danger">
              CRITICAL: Water level 4.8m — Kali Ciliwung Sector A
            </span>
          </div>

          <div className="grid grid-cols-12 gap-2 p-3">
            {/* Map area */}
            <div className="relative col-span-12 overflow-hidden rounded-lg border border-border bg-[#E8EDF5] lg:col-span-7">
              <div className="absolute inset-0 opacity-30">
                <svg className="h-full w-full" viewBox="0 0 400 240">
                  <path
                    d="M0 120 Q100 80 200 120 T400 100"
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="2"
                  />
                  <path
                    d="M0 160 Q150 140 300 160 T400 150"
                    fill="none"
                    stroke="#1E3A8A"
                    strokeWidth="1.5"
                    opacity="0.5"
                  />
                  {[
                    { cx: 120, cy: 100, r: 8, color: "#DC2626" },
                    { cx: 200, cy: 130, r: 6, color: "#EA580C" },
                    { cx: 280, cy: 90, r: 5, color: "#F59E0B" },
                    { cx: 160, cy: 170, r: 4, color: "#16A34A" },
                    { cx: 320, cy: 140, r: 7, color: "#DC2626" },
                  ].map((dot, i) => (
                    <circle
                      key={i}
                      cx={dot.cx}
                      cy={dot.cy}
                      r={dot.r}
                      fill={dot.color}
                      opacity="0.7"
                    />
                  ))}
                </svg>
              </div>
              <div className="relative flex h-36 items-end p-2 lg:h-44">
                <div className="rounded bg-surface/90 px-2 py-1 text-[8px] font-medium shadow-sm backdrop-blur">
                  <MapPin className="mb-0.5 inline h-2.5 w-2.5 text-primary" />
                  Greater Jakarta — 5 zones active
                </div>
              </div>
              {/* Map legend */}
              <div className="absolute right-2 top-2 rounded bg-surface/95 p-1.5 shadow-sm">
                <div className="space-y-1">
                  {[
                    { color: "#DC2626", label: "Critical" },
                    { color: "#EA580C", label: "High" },
                    { color: "#F59E0B", label: "Moderate" },
                    { color: "#16A34A", label: "Low" },
                  ].map((l) => (
                    <div key={l.label} className="flex items-center gap-1">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: l.color }}
                      />
                      <span className="text-[7px] text-muted-foreground">
                        {l.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right panel */}
            <div className="col-span-12 space-y-2 lg:col-span-5">
              {/* Risk indicators */}
              <div className="rounded-lg border border-border bg-surface p-2.5">
                <p className="text-[9px] font-semibold text-foreground">
                  Risk Indicators
                </p>
                <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                  {[
                    { label: "Water Level", value: "4.8m", status: "danger" },
                    { label: "Rainfall", value: "120mm", status: "warning" },
                    { label: "River Flow", value: "↑ 23%", status: "danger" },
                    { label: "Soil Sat.", value: "89%", status: "warning" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded bg-muted/60 px-2 py-1.5"
                    >
                      <p className="text-[7px] text-muted-foreground">
                        {item.label}
                      </p>
                      <p
                        className={`text-[10px] font-bold ${
                          item.status === "danger"
                            ? "text-danger"
                            : "text-warning"
                        }`}
                      >
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Infrastructure */}
              <div className="rounded-lg border border-border bg-surface p-2.5">
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-semibold text-foreground">
                    Infrastructure
                  </p>
                  <Building2 className="h-3 w-3 text-primary" />
                </div>
                <div className="mt-1.5 space-y-1">
                  {[
                    { name: "Pump Station Sunter", health: 72 },
                    { name: "Polder System C-12", health: 45 },
                    { name: "Embankment B", health: 28 },
                  ].map((asset) => (
                    <div key={asset.name}>
                      <div className="flex justify-between text-[7px]">
                        <span className="truncate text-muted-foreground">
                          {asset.name}
                        </span>
                        <span
                          className={
                            asset.health < 50
                              ? "text-danger"
                              : "text-foreground"
                          }
                        >
                          {asset.health}%
                        </span>
                      </div>
                      <div className="mt-0.5 h-1 rounded-full bg-muted">
                        <div
                          className={`h-1 rounded-full ${
                            asset.health < 50 ? "bg-danger" : "bg-primary"
                          }`}
                          style={{ width: `${asset.health}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analytics mini chart */}
              <div className="rounded-lg border border-border bg-surface p-2.5">
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-semibold text-foreground">
                    Flood Analytics
                  </p>
                  <TrendingUp className="h-3 w-3 text-secondary" />
                </div>
                <div className="mt-2 flex items-end gap-0.5">
                  {[40, 55, 48, 72, 65, 88, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-primary/20"
                      style={{ height: `${h * 0.35}px` }}
                    >
                      <div
                        className="w-full rounded-t bg-primary"
                        style={{ height: `${h * 0.25}px` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom stats bar */}
          <div className="grid grid-cols-4 gap-2 border-t border-border bg-muted/30 px-3 py-2">
            {[
              { icon: Droplets, label: "Zones", value: "78" },
              { icon: AlertTriangle, label: "Alerts", value: "3" },
              { icon: Waves, label: "Reports", value: "47" },
              { icon: Building2, label: "Assets", value: "358" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="mx-auto h-3 w-3 text-primary" />
                <p className="text-[10px] font-bold text-foreground">
                  {s.value}
                </p>
                <p className="text-[7px] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <Badge
        variant="danger"
        className="absolute -left-2 top-16 z-10 hidden text-[9px] shadow-lg sm:flex"
      >
        3 Active Alerts
      </Badge>
      <Badge
        variant="secondary"
        className="absolute -right-2 bottom-16 z-10 hidden text-[9px] shadow-lg sm:flex"
      >
        GIS Intelligence Active
      </Badge>
    </div>
  );
}
