"use client";

import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n/context";
import type { RiskLevel } from "@/types";

const variantMap: Record<
  RiskLevel,
  "success" | "warning" | "danger" | "secondary"
> = {
  low: "success",
  moderate: "warning",
  high: "danger",
  critical: "danger",
};

interface RiskBadgeProps {
  level: RiskLevel;
}

export function RiskBadge({ level }: RiskBadgeProps) {
  const { t } = useI18n();
  return <Badge variant={variantMap[level]}>{t.risk[level]}</Badge>;
}
