"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Building2,
  Clock,
  Droplets,
  Users,
} from "lucide-react";
import { AlertBanner } from "@/components/dashboard/alert-banner";
import { FloodTrendChart } from "@/components/dashboard/flood-trend-chart";
import { RiskDistributionChart } from "@/components/dashboard/risk-distribution-chart";
import { RiskBadge } from "@/components/dashboard/risk-badge";
import { StatCard } from "@/components/dashboard/stat-card";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/context";
import {
  getAlerts,
  getFloodZones,
  getInfrastructure,
  getReports,
} from "@/lib/api";
import { floodTrendData } from "@/lib/mock-data";
import type {
  AlertItem,
  CitizenReport,
  FloodZone,
  InfrastructureAsset,
  StatMetric,
} from "@/types";

const statIcons = [
  <Droplets key="1" className="h-5 w-5" />,
  <Users key="2" className="h-5 w-5" />,
  <Building2 key="3" className="h-5 w-5" />,
  <AlertTriangle key="4" className="h-5 w-5" />,
];

const statusVariant: Record<
  string,
  "warning" | "secondary" | "success" | "danger"
> = {
  pending: "warning",
  verified: "secondary",
  "in-progress": "secondary",
  resolved: "success",
};

export function DashboardContent() {
  const { t, locale } = useI18n();

  // State untuk menampung data dari 4 API
  const [floodZones, setFloodZones] = useState<FloodZone[]>([]);
  const [reports, setReports] = useState<CitizenReport[]>([]);
  const [infrastructure, setInfrastructure] = useState<InfrastructureAsset[]>([]);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch semua data secara bersamaan (Promise.all)
  useEffect(() => {
    Promise.all([
      getFloodZones(),
      getReports(),
      getInfrastructure(),
      getAlerts(),
    ])
      .then(([floodZonesData, reportsData, infraData, alertsData]) => {
        setFloodZones(
          floodZonesData.map((item: any) => ({ ...item, id: item._id || item.id }))
        );
        setReports(
          reportsData.map((item: any) => ({ ...item, id: item._id || item.id }))
        );
        setInfrastructure(
          infraData.map((item: any) => ({ ...item, id: item._id || item.id }))
        );
        setAlerts(
          alertsData.map((item: any) => ({ ...item, id: item._id || item.id }))
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch dashboard error:", err);
        setError(err.message || "Gagal menghubungkan ke server API");
        setLoading(false);
      });
  }, []);

  // UI State: Loading
  if (loading) {
    return (
      <DashboardShell title={t.dashboard.title} description={t.dashboard.description}>
        <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
          <Clock className="mr-2 h-4 w-4 animate-spin" />
          Mengunduh data ringkasan dashboard dari database...
        </div>
      </DashboardShell>
    );
  }

  // UI State: Error
  if (error) {
    return (
      <DashboardShell title={t.dashboard.title} description={t.dashboard.description}>
        <div className="flex h-64 flex-col items-center justify-center gap-2 text-sm text-danger">
          <AlertTriangle className="h-6 w-6" />
          <p className="font-semibold">Gagal Memuat Dashboard</p>
          <p className="text-xs text-muted-foreground">{error}</p>
        </div>
      </DashboardShell>
    );
  }

  // 1. Kalkulasi Statistik Utama Dinamis dari Database
  const totalPopulationAtRisk = floodZones
    .reduce((sum, z) => sum + (z.population || 0), 0)
    .toLocaleString("id-ID");

  const dashboardStats: StatMetric[] = [
    {
      label: "Active Flood Zones",
      value: floodZones.length,
      trend: "neutral",
    },
    {
      label: "Citizen Reports",
      value: reports.length,
      trend: "up",
    },
    {
      label: "Infrastructure Assets",
      value: infrastructure.length,
      trend: "neutral",
    },
    {
      label: "Population at Risk",
      value: totalPopulationAtRisk,
      trend: "up",
    },
  ];

  // 2. Kalkulasi Distribusi Risiko Risiko (Pie Chart) Dinamis dari FloodZones
  const totalZones = floodZones.length || 1;
  const riskDistribution = [
    {
      name: "Low",
      value: Math.round((floodZones.filter((z) => z.riskLevel === "low").length / totalZones) * 100),
      color: "#16A34A",
    },
    {
      name: "Moderate",
      value: Math.round((floodZones.filter((z) => z.riskLevel === "moderate").length / totalZones) * 100),
      color: "#F59E0B",
    },
    {
      name: "High",
      value: Math.round((floodZones.filter((z) => z.riskLevel === "high").length / totalZones) * 100),
      color: "#EA580C",
    },
    {
      name: "Critical",
      value: Math.round((floodZones.filter((z) => z.riskLevel === "critical").length / totalZones) * 100),
      color: "#DC2626",
    },
  ];

  return (
    <DashboardShell
      title={t.dashboard.title}
      description={t.dashboard.description}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {t.common.lastUpdated}: {new Date().toLocaleTimeString(locale === "id" ? "id-ID" : "en-US")}
        </div>

        {/* Alert Banner dari Data Real API */}
        <AlertBanner alerts={alerts} />

        {/* Card Statistik Dinamis */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardStats.map((stat, i) => (
            <StatCard key={stat.label} metric={stat} icon={statIcons[i]} />
          ))}
        </div>

        {/* Chart Grafik */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" aria-hidden="true" />
                Flood Trend Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FloodTrendChart data={floodTrendData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <RiskDistributionChart data={riskDistribution} />
              <div className="mt-4 grid grid-cols-2 gap-2">
                {riskDistribution.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {t.risk[["low", "moderate", "high", "critical"][i] as keyof typeof t.risk]}: {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabel Laporan Terbaru dari Database */}
        <Card>
          <CardHeader>
            <CardTitle>{t.reporting.allReports}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 pr-4 font-medium text-muted-foreground">ID</th>
                    <th className="pb-3 pr-4 font-medium text-muted-foreground">Report</th>
                    <th className="pb-3 pr-4 font-medium text-muted-foreground">{t.reporting.location}</th>
                    <th className="pb-3 pr-4 font-medium text-muted-foreground">{t.alerts.severity}</th>
                    <th className="pb-3 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-xs text-muted-foreground">
                        Belum ada laporan di database.
                      </td>
                    </tr>
                  ) : (
                    reports.map((report) => (
                      <tr key={report.id} className="border-b border-border/50">
                        <td className="py-3 pr-4 font-mono text-[10px] truncate max-w-[120px]">{report.id}</td>
                        <td className="py-3 pr-4">{report.title}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{report.location}</td>
                        <td className="py-3 pr-4">
                          <RiskBadge level={report.priority} />
                        </td>
                        <td className="py-3">
                          <Badge variant={statusVariant[report.status] || "secondary"}>
                            {t.status[report.status] || report.status}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
