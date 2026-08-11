"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import { RiskBadge } from "@/components/dashboard/risk-badge";
import { RISK_LEVELS } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/context";
import type { FloodZone } from "@/types";

const riskRadius: Record<FloodZone["riskLevel"], number> = {
  low: 8,
  moderate: 10,
  high: 12,
  critical: 14,
};

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 200);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

function MapFlyTo({
  lat,
  lng,
  selected,
}: {
  lat: number;
  lng: number;
  selected: boolean;
}) {
  const map = useMap();
  useEffect(() => {
    if (selected) {
      map.flyTo([lat, lng], 12, { duration: 0.8 });
    }
  }, [lat, lng, selected, map]);
  return null;
}

interface FloodMapProps {
  zones: FloodZone[];
  selectedZoneId?: string | null;
  onZoneSelect?: (zone: FloodZone) => void;
  className?: string;
  height?: string;
}

export function FloodMap({
  zones,
  selectedZoneId,
  onZoneSelect,
  className,
  height = "500px",
}: FloodMapProps) {
  const { t } = useI18n();
  const center: [number, number] = [-6.2615, 106.845];
  const selectedZone = zones.find((z) => z.id === selectedZoneId);

  return (
    <div
      className={className}
      style={{ height }}
      role="application"
      aria-label="Flood risk map"
    >
      <MapContainer
        center={center}
        zoom={10}
        className="h-full w-full rounded-lg"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapResizer />
        {selectedZone && (
          <MapFlyTo
            lat={selectedZone.lat}
            lng={selectedZone.lng}
            selected={!!selectedZoneId}
          />
        )}
        {zones.map((zone) => {
          const isSelected = zone.id === selectedZoneId;
          return (
            <CircleMarker
              key={zone.id}
              center={[zone.lat, zone.lng]}
              radius={isSelected ? riskRadius[zone.riskLevel] + 4 : riskRadius[zone.riskLevel]}
              pathOptions={{
                color: RISK_LEVELS[zone.riskLevel].color,
                fillColor: RISK_LEVELS[zone.riskLevel].color,
                fillOpacity: isSelected ? 0.85 : 0.55,
                weight: isSelected ? 3 : 2,
              }}
              eventHandlers={{
                click: () => onZoneSelect?.(zone),
              }}
            >
              <Popup>
                <div className="min-w-[200px] space-y-2 p-1">
                  <p className="text-sm font-semibold">{zone.name}</p>
                  <p className="text-xs text-gray-600">{zone.district}</p>
                  <div className="flex items-center gap-2">
                    <RiskBadge level={zone.riskLevel} />
                    <span className="text-xs">
                      {zone.waterLevel}m {t.common.waterLevel.toLowerCase()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    {t.common.population}:{" "}
                    {zone.population.toLocaleString("id-ID")}
                  </p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});
