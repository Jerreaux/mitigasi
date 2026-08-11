export const APP_NAME = "Geo-Mitigasi";
export const APP_TAGLINE =
  "Intelligent Geospatial Disaster Mitigation Platform";

export const COLORS = {
  primary: "#1E3A8A",
  secondary: "#06B6D4",
  success: "#16A34A",
  warning: "#F59E0B",
  danger: "#DC2626",
  background: "#F8FAFC",
  surface: "#FFFFFF",
} as const;

export const NAV_ITEMS = [
  {
    title: "Dashboard",
    href: "/dashboard",
    description: "Operational overview and KPIs",
  },
  {
    title: "Flood Risk Map",
    href: "/flood-risk",
    description: "Real-time flood risk visualization",
  },
  {
    title: "Citizen Reporting",
    href: "/reporting",
    description: "Community incident submissions",
  },
  {
    title: "Infrastructure Audit",
    href: "/infrastructure",
    description: "Critical asset monitoring",
  },
] as const;

export const RISK_LEVELS = {
  low: { label: "Low", color: COLORS.success },
  moderate: { label: "Moderate", color: COLORS.warning },
  high: { label: "High", color: "#EA580C" },
  critical: { label: "Critical", color: COLORS.danger },
} as const;
