"use client";

import { AlertTriangle, Clock, MapPin, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { RiskBadge } from "@/components/dashboard/risk-badge";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toast } from "@/components/ui/toast";
import { useI18n } from "@/lib/i18n/context";
import { getReports, createReport } from "@/lib/api";
import type { CitizenReport } from "@/types";

const statusVariant: Record<
  string,
  "warning" | "secondary" | "success" | "danger"
> = {
  pending: "warning",
  verified: "secondary",
  "in-progress": "secondary",
  resolved: "success",
};

export function ReportingContent() {
  const { t, locale } = useI18n();

  // State Management
  const [reports, setReports] = useState<CitizenReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [newReportId, setNewReportId] = useState("");
  const [activeTab, setActiveTab] = useState("reports");

  // Lifecycle: Fetch data laporan dari API Express saat komponen dimuat
  useEffect(() => {
    getReports()
      .then((data) => {
        // Map _id dari MongoDB ke id frontend
        const mappedData = data.map((item: any) => ({
          ...item,
          id: item._id || item.id,
        }));
        setReports(mappedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch reports error:", err);
        setError(err.message || "Gagal menghubungkan ke server API");
        setLoading(false);
      });
  }, []);

  // Handler Kirim Laporan Baru (POST ke MongoDB via Backend API)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const category = (form.elements.namedItem("category") as HTMLInputElement).value;
    const location = (form.elements.namedItem("location") as HTMLInputElement).value;

    const newReportData = {
      title: title || "New flood incident report",
      category: category || "Flooding",
      location: location || "Jakarta",
      priority: "moderate", // Backend otomatis set status 'pending' dan timestamp reportedAt
    };

    try {
      // 1. Simpan ke MongoDB lewat Express API
      const savedReport = await createReport(newReportData);

      // 2. Map _id ke id
      const mappedNewReport = {
        ...savedReport,
        id: savedReport._id || savedReport.id,
      };

      // 3. Masukkan ke state lokal agar daftar laporan langsung bertambah tanpa reload
      setReports((prev) => [mappedNewReport, ...prev]);
      setNewReportId(mappedNewReport.id);
      setShowToast(true);
      setActiveTab("reports");
      form.reset();
    } catch (err: any) {
      console.error(err);
      alert("Gagal mengirim laporan: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // UI State: Loading
  if (loading) {
    return (
      <DashboardShell title={t.reporting.title} description={t.reporting.description}>
        <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
          <Clock className="mr-2 h-4 w-4 animate-spin" />
          Memuat data laporan warga dari database...
        </div>
      </DashboardShell>
    );
  }

  // UI State: Error
  if (error) {
    return (
      <DashboardShell title={t.reporting.title} description={t.reporting.description}>
        <div className="flex h-64 flex-col items-center justify-center gap-2 text-sm text-danger">
          <AlertTriangle className="h-6 w-6" />
          <p className="font-semibold">Gagal Memuat Data</p>
          <p className="text-xs text-muted-foreground">{error}</p>
        </div>
      </DashboardShell>
    );
  }

  return (
    <>
      <Toast
        title={t.reporting.successTitle}
        message={`${t.reporting.successMessage} (${newReportId})`}
        show={showToast}
        onClose={() => setShowToast(false)}
      />

      <DashboardShell
        title={t.reporting.title}
        description={t.reporting.description}
      >
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList>
            <TabsTrigger value="reports">{t.reporting.allReports}</TabsTrigger>
            <TabsTrigger value="submit">
              {t.reporting.submitReport}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reports">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {reports.length === 0 ? (
                <div className="col-span-full p-8 text-center text-sm text-muted-foreground">
                  Belum ada laporan dari warga.
                </div>
              ) : (
                reports.map((report) => (
                  <Card
                    key={report.id}
                    className={
                      report.id === newReportId
                        ? "ring-2 ring-success ring-offset-2"
                        : undefined
                    }
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-mono text-[10px] text-muted-foreground truncate max-w-[150px]">
                          {report.id}
                        </span>
                        <RiskBadge level={report.priority} />
                      </div>
                      <h3 className="mt-2 font-semibold text-foreground">
                        {report.title}
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Badge variant="outline">{report.category}</Badge>
                        <Badge variant={statusVariant[report.status] || "secondary"}>
                          {t.status[report.status] || report.status}
                        </Badge>
                      </div>
                      <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" aria-hidden="true" />
                          {report.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" aria-hidden="true" />
                          {new Date(report.reportedAt).toLocaleString(
                            locale === "id" ? "id-ID" : "en-US"
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="submit">
            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-primary" aria-hidden="true" />
                  {t.reporting.newReport}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="title">{t.reporting.incidentTitle}</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder={t.reporting.incidentPlaceholder}
                      required
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="category">{t.reporting.category}</Label>
                      <Input
                        id="category"
                        name="category"
                        placeholder={t.reporting.categoryPlaceholder}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">{t.reporting.location}</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder={t.reporting.locationPlaceholder}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      {t.reporting.descriptionLabel}
                    </Label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      className="flex w-full rounded-md border border-border bg-surface px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder={t.reporting.descriptionPlaceholder}
                    />
                  </div>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Mengirim..." : t.reporting.submitBtn}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DashboardShell>
    </>
  );
}
