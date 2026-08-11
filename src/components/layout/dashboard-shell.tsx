"use client";

import { useState } from "react";
import { DashboardTopbar } from "@/components/layout/dashboard-topbar";
import { Sidebar } from "@/components/layout/sidebar";

interface DashboardShellProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function DashboardShell({
  children,
  title,
  description,
}: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          />
          <div className="relative h-full w-64">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="lg:hidden">
          <div className="flex h-14 items-center border-b border-border bg-surface px-4">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="text-sm font-medium text-primary"
              aria-label="Open navigation menu"
            >
              ☰ Menu
            </button>
          </div>
        </div>

        <DashboardTopbar title={title} description={description} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
