"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Clock, MapPin, Shield } from "lucide-react";
import { RiskBadge } from "@/components/dashboard/risk-badge";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/context";
import { getAlerts } from "@/lib/api";
import type { AlertItem } from "@/types";

export function AlertsContent() {
  const { t, locale } = useI18n();

  // State Management sesuai standar industri (Data, Loading, Error)
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Kamus terjemahan untuk mock data bawaan (fallback)
  const alertTitles: Record<string, { id: string; en: string }> = {
    "ALT-001": {
      id: "Tingkat air kritis terlampaui — Kali Ciliwung Sektor A",
      en: "Critical water level exceeded — Kali Ciliwung Sector A",
    },
    "ALT-002": {
      id: "Prakiraan hujan lebat — 120mm dalam 6 jam",
      en: "Heavy rainfall forecast — 120mm in 6 hours",
    },
    "ALT-003": {
      id: "Kapasitas pompa mencapai 92%",
      en: "Pump station capacity at 92%",
    },
    "ALT-004": {
      id: "Degradasi struktur tanggul Sektor B terdeteksi",
      en: "Embankment Sector B structural degradation detected",
    },
    "ALT-005": {
      id: "Tingkat sungai naik — Ciliwung Riverside",
      en: "River level rising — Ciliwung Riverside",
    },
  };

  // Lifecycle: Fetch data dari API Express saat komponen dimuat
  useEffect(() => {
    getAlerts()
      .then((data) => {
        // Trik Industri: Memetakan _id dari MongoDB ke properti id agar cocok dengan tipe frontend
        const mappedData = data.map((item: any) => ({
          ...item,
          id: item._id || item.id,
        }));
        setAlerts(mappedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch alerts error:", err);
        setError(err.message || "Gagal menghubungkan ke server API");
        setLoading(false);
      });
  }, []);

  // UI State: Tampilan saat data sedang di-download
  if (loading) {
    return (
      <DashboardShell title={t.alerts.title} description={t.alerts.description}>
        <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
          <Clock className="mr-2 h-4 w-4 animate-spin" />
          Memuat data peringatan dari database...
        </div>
      </DashboardShell>
    );
  }

  // UI State: Tampilan saat terjadi error (misal server Express mati)
  if (error) {
    return (
      <DashboardShell title={t.alerts.title} description={t.alerts.description}>
        <div className="flex h-64 flex-col items-center justify-center gap-2 text-sm text-danger">
          <AlertTriangle className="h-6 w-6" />
          <p className="font-semibold">Gagal Memuat Data</p>
          <p className="text-xs text-muted-foreground">{error}</p>
        </div>
      </DashboardShell>
    );
  }

  // Menghitung zona unik secara dinamis dari data API
  const uniqueZonesCount = new Set(alerts.map((a) => a.zone)).size;

  return (
    <DashboardShell title={t.alerts.title} description={t.alerts.description}>
      <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        {t.common.lastUpdated}: {new Date().toLocaleTimeString(locale === "id" ? "id-ID" : "en-US")}
      </div>

      {/* Rangkuman Statistik dari Data Real API */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-danger/10">
              <AlertTriangle className="h-5 w-5 text-danger" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {alerts.filter((a) => a.severity === "critical").length}
              </p>
              <p className="text-xs text-muted-foreground">{t.risk.critical}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
              <Shield className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {alerts.length}
              </p>
              <p className="text-xs text-muted-foreground">{t.alerts.active}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {uniqueZonesCount}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.common.zones}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daftar Kartu Alert dari Database */}
      <div className="space-y-4">
        {alerts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-sm text-muted-foreground">
              Tidak ada peringatan aktif saat ini.
            </CardContent>
          </Card>
        ) : (
          alerts.map((alert) => {
            // Jika ID ada di kamus terjemahan lokal gunakan itu, jika tidak gunakan alert.title dari MongoDB
            const title =
              locale === "id"
                ? alertTitles[alert.id]?.id ?? alert.title
                : alertTitles[alert.id]?.en ?? alert.title;
            const action = t.alerts.actions[alert.actionKey] || alert.actionKey;

            return (
              <Card
                key={alert.id}
                className={
                  alert.severity === "critical"
                    ? "border-danger/30"
                    : undefined
                }
              >
                <CardHeader className="pb-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <AlertTriangle
                        className={`mt-0.5 h-5 w-5 shrink-0 ${alert.severity === "critical"
                          ? "text-danger"
                          : alert.severity === "high"
                            ? "text-[#EA580C]"
                            : "text-warning"
                          }`}
                      />
                      <div>
                        <CardTitle className="text-base">{title}</CardTitle>
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {alert.zone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {t.common.issuedAt}:{" "}
                            {new Date(alert.timestamp).toLocaleString(
                              locale === "id" ? "id-ID" : "en-US"
                            )}
                          </span>
                          <span className="font-mono text-[10px]">{alert.id}</span>
                        </div>
                      </div>
                    </div>
                    <RiskBadge level={alert.severity} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-secondary/20 bg-secondary/5 p-4">
                    <p className="text-xs font-semibold text-secondary">
                      {t.common.recommendation}
                    </p>
                    <p className="mt-1 text-sm text-foreground">{action}</p>
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
