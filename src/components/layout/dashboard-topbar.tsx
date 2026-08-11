"use client";

import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LanguageToggle } from "@/components/ui/language-toggle";

interface DashboardTopbarProps {
  title: string;
  description?: string;
}

export function DashboardTopbar({ title, description }: DashboardTopbarProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-border bg-surface px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h1>
        {description && (
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <LanguageToggle />
        <div className="relative hidden sm:block">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            placeholder="Search zones, reports..."
            className="w-64 pl-9"
            aria-label="Search"
          />
        </div>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" aria-label="User profile">
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
