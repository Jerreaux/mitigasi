export type RiskLevel = "low" | "moderate" | "high" | "critical";

export interface StatMetric {
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon?: string;
}

export interface FloodZone {
  id: string;
  name: string;
  district: string;
  riskLevel: RiskLevel;
  waterLevel: number;
  population: number;
  lat: number;
  lng: number;
}

export interface CitizenReport {
  id: string;
  title: string;
  category: string;
  status: "pending" | "verified" | "in-progress" | "resolved";
  location: string;
  reportedAt: string;
  priority: RiskLevel;
}

export interface InfrastructureAsset {
  id: string;
  name: string;
  type: string;
  condition: "excellent" | "good" | "fair" | "poor" | "critical";
  lastInspection: string;
  riskScore: number;
  location: string;
}

export interface AlertItem {
  id: string;
  title: string;
  severity: RiskLevel;
  timestamp: string;
  zone: string;
  actionKey: "evacuate" | "deploy" | "monitor" | "inspect";
}
