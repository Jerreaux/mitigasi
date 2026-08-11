"use client";

import { Clock, Layers, MapPin, TrendingUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { RiskBadge } from "@/components/dashboard/risk-badge";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { FloodMapDynamic } from "@/components/map/flood-map-dynamic";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/context";
import { getFloodZones } from "@/lib/api";
import type { FloodZone, RiskLevel } from "@/types";
import { cn } from "@/lib/utils";

const ALL_LEVELS: RiskLevel[] = ["low", "moderate", "high", "critical"];

const riskColors: Record<RiskLevel, string> = {
  low: "bg-success",
  moderate: "bg-warning",
  high: "bg-[#EA580C]",
  critical: "bg-danger",
};

export function FloodRiskContent() {
  const { t } = useI18n();

  // State Management
  const [zones, setZones] = useState<FloodZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedLevels, setSelectedLevels] = useState<RiskLevel[]>(ALL_LEVELS);
  const [selectedZone, setSelectedZone] = useState<FloodZone | null>(null);
  const [showPopulation, setShowPopulation] = useState(true);

  // Lifecycle: Fetch data dari API Express saat komponen dimuat
  useEffect(() => {
    getFloodZones()
      .then((data) => {
        // Trik Industri: Memetakan _id dari MongoDB ke properti id agar cocok dengan TypeScript frontend
        const mappedData = data.map((item: any) => ({
          ...item,
          id: item._id || item.id,
        }));
        setZones(mappedData);

        // Pilih zona pertama sebagai default detail jika data tersedia
        if (mappedData.length > 0) {
          setSelectedZone(mappedData[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch flood zones error:", err);
        setError(err.message || "Gagal menghubungkan ke server API");
        setLoading(false);
      });
  }, []);

  // Filter zona secara dinamis berdasarkan state `zones` dari API
  const filteredZones = useMemo(
    () => zones.filter((z) => selectedLevels.includes(z.riskLevel)),
    [zones, selectedLevels]
  );

  const toggleLevel = (level: RiskLevel) => {
    setSelectedLevels((prev) =>
      prev.includes(level)
        ? prev.filter((l) => l !== level)
        : [...prev, level]
    );
  };

  // UI State: Loading
  if (loading) {
    return (
      <DashboardShell title={t.floodRisk.title} description={t.floodRisk.description}>
        <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
          <Clock className="mr-2 h-4 w-4 animate-spin" />
          Memuat data peta & zona banjir dari database...
        </div>
      </DashboardShell>
    );
  }

  // UI State: Error
  if (error) {
    return (
      <DashboardShell title={t.floodRisk.title} description={t.floodRisk.description}>
        <div className="flex h-64 flex-col items-center justify-center gap-2 text-sm text-danger">
          <Clock className="h-6 w-6" />
          <p className="font-semibold">Gagal Memuat Data</p>
          <p className="text-xs text-muted-foreground">{error}</p>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      title={t.floodRisk.title}
      description={t.floodRisk.description}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {t.common.lastUpdated}: {new Date().toLocaleTimeString()}
        </div>
        <Badge variant="secondary">
          {filteredZones.length} {t.common.zones}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="space-y-4 lg:col-span-3">
          {/* Filters */}
          <Card>
            <CardContent className="flex flex-wrap items-center gap-4 p-4">
              <span className="text-xs font-semibold text-muted-foreground">
                {t.floodRisk.filterLabel}:
              </span>
              {ALL_LEVELS.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => toggleLevel(level)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all",
                    selectedLevels.includes(level)
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border text-muted-foreground opacity-50"
                  )}
                >
                  <span
                    className={cn("h-2 w-2 rounded-full", riskColors[level])}
                  />
                  {t.risk[level]}
                </button>
              ))}
              <div className="ml-auto flex items-center gap-3">
                <label className="flex cursor-pointer items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={showPopulation}
                    onChange={(e) => setShowPopulation(e.target.checked)}
                    className="rounded border-border"
                  />
                  {t.floodRisk.layerPopulation}
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Map */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Layers className="h-5 w-5 text-primary" aria-hidden="true" />
                {t.floodRisk.mapTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FloodMapDynamic
                zones={filteredZones}
                selectedZoneId={selectedZone?.id}
                onZoneSelect={setSelectedZone}
              />
            </CardContent>
          </Card>
        </div>

        {/* Zone detail panel */}
        <div className="space-y-4">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-base">
                {t.floodRisk.zoneDetails}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedZone ? (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-foreground">
                        {selectedZone.name}
                      </p>
                      <RiskBadge level={selectedZone.riskLevel} />
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {selectedZone.district}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-muted/60 p-3">
                      <p className="text-[10px] text-muted-foreground">
                        {t.common.waterLevel}
                      </p>
                      <p className="text-xl font-bold text-foreground">
                        {selectedZone.waterLevel}m
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted/60 p-3">
                      <p className="text-[10px] text-muted-foreground">
                        {t.floodRisk.rainfall}
                      </p>
                      <p className="text-xl font-bold text-secondary">
                        120mm
                      </p>
                    </div>
                    {showPopulation && (
                      <div className="col-span-2 rounded-lg bg-muted/60 p-3">
                        <p className="text-[10px] text-muted-foreground">
                          {t.common.population}
                        </p>
                        <p className="text-xl font-bold text-foreground">
                          {selectedZone.population.toLocaleString("id-ID")}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 rounded-lg border border-warning/20 bg-warning/5 p-3">
                    <TrendingUp className="h-4 w-4 text-warning" />
                    <div>
                      <p className="text-xs font-semibold text-foreground">
                        {t.floodRisk.trend}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        +23% — {t.floodRisk.rising}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {t.floodRisk.selectZone}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Zone list */}
          <Card>
            <CardContent className="space-y-2 p-4">
              {filteredZones.map((zone) => (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => setSelectedZone(zone)}
                  className={cn(
                    "w-full rounded-md border p-3 text-left transition-colors",
                    selectedZone?.id === zone.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium">{zone.name}</p>
                    <RiskBadge level={zone.riskLevel} />
                  </div>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {zone.waterLevel}m · {zone.district}
                  </p>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
