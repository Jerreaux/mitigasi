"use client";

import dynamic from "next/dynamic";
import { useI18n } from "@/lib/i18n/context";
import type { FloodZone } from "@/types";

interface FloodMapDynamicProps {
  zones: FloodZone[];
  selectedZoneId?: string | null;
  onZoneSelect?: (zone: FloodZone) => void;
}

function LoadingMap() {
  const { t } = useI18n();
  return (
    <div className="flex h-[500px] items-center justify-center rounded-lg border border-border bg-muted">
      <p className="text-sm text-muted-foreground">{t.common.loadingMap}</p>
    </div>
  );
}

export const FloodMapDynamic = dynamic<FloodMapDynamicProps>(
  () => import("@/components/map/flood-map").then((mod) => mod.FloodMap),
  { ssr: false, loading: () => <LoadingMap /> }
);
