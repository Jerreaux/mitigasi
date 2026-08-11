"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Calendar, Clock, MapPin } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useI18n } from "@/lib/i18n/context";
import { getInfrastructure } from "@/lib/api";
import type { InfrastructureAsset } from "@/types";

const conditionVariant: Record<
  string,
  "success" | "secondary" | "warning" | "danger"
> = {
  excellent: "success",
  good: "success",
  fair: "warning",
  poor: "danger",
  critical: "danger",
};

const conditionScore: Record<string, number> = {
  excellent: 95,
  good: 80,
  fair: 60,
  poor: 35,
  critical: 15,
};

export function InfrastructureContent() {
  const { t } = useI18n();

  // State Management
  const [assets, setAssets] = useState<InfrastructureAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lifecycle: Fetch data dari API Express saat komponen dimuat
  useEffect(() => {
    getInfrastructure()
      .then((data) => {
        // Map _id ke id & format tanggal inspeksi
        const mappedData = data.map((item: any) => ({
          ...item,
          id: item._id || item.id,
          lastInspection: item.lastInspection
            ? new Date(item.lastInspection).toISOString().split("T")[0]
            : "-",
        }));
        setAssets(mappedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch infrastructure error:", err);
        setError(err.message || "Gagal menghubungkan ke server API");
        setLoading(false);
      });
  }, []);

  // UI State: Loading
  if (loading) {
    return (
      <DashboardShell title={t.infrastructure.title} description={t.infrastructure.description}>
        <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
          <Clock className="mr-2 h-4 w-4 animate-spin" />
          Memuat data aset infrastruktur dari database...
        </div>
      </DashboardShell>
    );
  }

  // UI State: Error
  if (error) {
    return (
      <DashboardShell title={t.infrastructure.title} description={t.infrastructure.description}>
        <div className="flex h-64 flex-col items-center justify-center gap-2 text-sm text-danger">
          <AlertTriangle className="h-6 w-6" />
          <p className="font-semibold">Gagal Memuat Data</p>
          <p className="text-xs text-muted-foreground">{error}</p>
        </div>
      </DashboardShell>
    );
  }

  // Kalkulasi statistik dinamis dari data API
  const criticalCount = assets.filter(
    (a) => a.condition === "critical" || a.condition === "poor"
  ).length;

  const avgRiskScore =
    assets.length > 0
      ? Math.round(assets.reduce((s, a) => s + a.riskScore, 0) / assets.length)
      : 0;

  return (
    <DashboardShell
      title={t.infrastructure.title}
      description={t.infrastructure.description}
    >
      <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        {t.common.lastUpdated}: {new Date().toLocaleTimeString()}
      </div>

      {/* Rangkuman Statistik */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Assets</p>
            <p className="mt-1 text-3xl font-bold">{assets.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Needs Attention</p>
            <p className="mt-1 text-3xl font-bold text-warning">{criticalCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Avg Risk Score</p>
            <p className="mt-1 text-3xl font-bold">{avgRiskScore}</p>
          </CardContent>
        </Card>
      </div>

      {/* Daftar Aset Infrastruktur */}
      <div className="grid gap-4">
        {assets.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-sm text-muted-foreground">
              Belum ada data aset infrastruktur.
            </CardContent>
          </Card>
        ) : (
          assets.map((asset) => {
            const healthScore = conditionScore[asset.condition] || 50;

            return (
              <Card key={asset.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-semibold text-foreground">{asset.name}</h3>
                        <Badge variant="outline">{asset.type}</Badge>
                        <Badge variant={conditionVariant[asset.condition] || "secondary"}>
                          {asset.condition}
                        </Badge>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {asset.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {asset.lastInspection}
                        </span>
                        <span className="font-mono text-[10px]">{asset.id}</span>
                      </div>
                    </div>
                    <div className="w-full sm:w-48">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Health Score</span>
                        <span className="font-semibold">{healthScore}%</span>
                      </div>
                      <Progress value={healthScore} className="mt-1.5" />
                      {asset.riskScore >= 70 && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-danger">
                          <AlertTriangle className="h-3 w-3" />
                          Risk: {asset.riskScore}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </DashboardShell>
  );
}
