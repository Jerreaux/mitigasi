"use client";

import {
  AlertTriangle,
  Bell,
  Building2,
  ChevronLeft,
  LayoutDashboard,
  LogOut,
  Map,
  MessageSquareWarning,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

const navConfig = [
  { key: "dashboard" as const, href: "/dashboard", icon: LayoutDashboard },
  { key: "floodRisk" as const, href: "/flood-risk", icon: Map },
  { key: "reporting" as const, href: "/reporting", icon: MessageSquareWarning },
  { key: "alerts" as const, href: "/alerts", icon: Bell },
  {
    key: "infrastructure" as const,
    href: "/infrastructure",
    icon: Building2,
  },
];

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-border bg-surface transition-all duration-200",
        collapsed ? "w-16" : "w-64"
      )}
      aria-label="Dashboard navigation"
    >
      <div className="flex h-16 items-center justify-between px-4">
        {!collapsed && <Logo />}
        {onToggle && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn(collapsed && "mx-auto")}
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                collapsed && "rotate-180"
              )}
            />
          </Button>
        )}
      </div>

      <Separator />

      <nav className="flex-1 space-y-1 p-3">
        {navConfig.map((item) => {
          const isActive = pathname === item.href;
          const label = t.nav[item.key];

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? label : undefined}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <Link
          href="/alerts"
          className={cn(
            "mb-3 flex items-center gap-3 rounded-md bg-danger/5 p-3 transition-colors hover:bg-danger/10",
            collapsed && "justify-center p-2"
          )}
        >
          <AlertTriangle
            className="h-4 w-4 shrink-0 text-danger"
            aria-hidden="true"
          />
          {!collapsed && (
            <div>
              <p className="text-xs font-semibold text-danger">
                3 {t.common.activeAlerts}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {t.common.requiresAttention}
              </p>
            </div>
          )}
        </Link>

        {!collapsed && (
          <div className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Settings className="h-4 w-4" aria-hidden="true" />
              {t.common.settings}
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              {t.common.signOut}
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
