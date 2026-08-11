import {
  AlertTriangle,
  Building2,
  MapPin,
  MessageSquareWarning,
  TrendingUp,
  Users,
  Waves,
  Zap,
} from "lucide-react";

export function LoginDashboardPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-primary" aria-hidden="true">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute -right-20 top-1/4 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute -left-20 bottom-1/4 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

      {/* Dashboard mock */}
      <div className="absolute inset-4 flex flex-col gap-3 sm:inset-6 lg:inset-8">
        {/* Top bar */}
        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-sm">
          <span className="text-xs font-medium text-white/70">
            Geo-Mitigasi Intelligence Center
          </span>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
            <span className="text-[10px] font-medium text-success">Live</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 overflow-hidden lg:flex-row">
          {/* Map panel */}
          <div className="relative flex-[3] overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="border-b border-white/10 px-4 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                Flood Risk Map
              </p>
            </div>
            <div className="relative h-full min-h-[140px] p-3">
              <svg className="h-full w-full" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice">
                <path
                  d="M0 110 Q80 70 160 110 T320 90 T400 100"
                  fill="none"
                  stroke="#06B6D4"
                  strokeWidth="2"
                  opacity="0.6"
                />
                <path
                  d="M0 150 Q120 130 240 155 T400 140"
                  fill="none"
                  stroke="#06B6D4"
                  strokeWidth="1"
                  opacity="0.3"
                />
                {[
                  { cx: 100, cy: 95, r: 9, color: "#DC2626" },
                  { cx: 180, cy: 120, r: 7, color: "#EA580C" },
                  { cx: 260, cy: 85, r: 6, color: "#F59E0B" },
                  { cx: 320, cy: 110, r: 8, color: "#DC2626" },
                  { cx: 140, cy: 160, r: 5, color: "#16A34A" },
                ].map((dot, i) => (
                  <circle key={i} cx={dot.cx} cy={dot.cy} r={dot.r} fill={dot.color} opacity="0.75" />
                ))}
              </svg>
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-1 backdrop-blur-sm">
                <MapPin className="h-3 w-3 text-secondary" />
                <span className="text-[9px] font-medium text-white/80">
                  78 zones monitored
                </span>
              </div>
              {/* Emergency alert — red icon only, not red bg */}
              <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-md border border-danger/30 bg-white/10 px-2 py-1 backdrop-blur-sm">
                <AlertTriangle className="h-3 w-3 text-danger" />
                <span className="text-[9px] font-medium text-white/90">3 Alerts</span>
              </div>
            </div>
          </div>

          {/* Right stack */}
          <div className="flex flex-[2] flex-col gap-3">
            {/* Infrastructure */}
            <div className="rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                  Infrastructure
                </p>
                <Building2 className="h-3.5 w-3.5 text-secondary" />
              </div>
              <div className="mt-2 space-y-2">
                {[
                  { name: "Pump Station Sunter", pct: 72 },
                  { name: "Polder System C-12", pct: 45 },
                  { name: "Embankment Sector B", pct: 28 },
                ].map((a) => (
                  <div key={a.name}>
                    <div className="flex justify-between text-[8px]">
                      <span className="truncate text-white/60">{a.name}</span>
                      <span className={a.pct < 50 ? "text-danger" : "text-white/80"}>
                        {a.pct}%
                      </span>
                    </div>
                    <div className="mt-0.5 h-1 rounded-full bg-white/10">
                      <div
                        className={`h-1 rounded-full ${a.pct < 50 ? "bg-danger" : "bg-secondary"}`}
                        style={{ width: `${a.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community reporting */}
            <div className="rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                  Community Reports
                </p>
                <MessageSquareWarning className="h-3.5 w-3.5 text-secondary" />
              </div>
              <div className="mt-2 space-y-1.5">
                {[
                  "Road flooding — Jakarta Selatan",
                  "Drainage blocked — Bekasi",
                  "Water rising — Depok",
                ].map((r) => (
                  <div
                    key={r}
                    className="flex items-center gap-2 rounded bg-white/5 px-2 py-1.5"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-secondary" />
                    <span className="truncate text-[8px] text-white/70">{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency stats */}
            <div className="grid flex-1 grid-cols-2 gap-2">
              {[
                { icon: Users, label: "At Risk", value: "24.8K" },
                { icon: Zap, label: "Response", value: "95%" },
                { icon: Waves, label: "Reports", value: "12.4K" },
                { icon: TrendingUp, label: "Audits", value: "358" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2 backdrop-blur-sm"
                >
                  <s.icon className="h-3.5 w-3.5 text-secondary" />
                  <p className="mt-1 text-sm font-bold text-white">{s.value}</p>
                  <p className="text-[8px] text-white/50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Glassmorphism overlay — headline */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary via-primary/90 to-transparent px-6 pb-8 pt-24 sm:px-10 sm:pb-12 lg:px-12">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md sm:p-8">
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
            Disaster Intelligence for Safer Communities
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
            Connecting citizens, infrastructure, and government agencies through
            real-time geospatial intelligence.
          </p>
        </div>
      </div>
    </div>
  );
}
