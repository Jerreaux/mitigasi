"use client";

import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale } = useI18n();

  return (
    <div
      className={cn(
        "inline-flex rounded-md border border-border bg-muted p-0.5 text-xs font-semibold",
        className
      )}
      role="group"
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={() => setLocale("id")}
        className={cn(
          "rounded px-2.5 py-1 transition-colors",
          locale === "id"
            ? "bg-surface text-primary shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-pressed={locale === "id"}
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={cn(
          "rounded px-2.5 py-1 transition-colors",
          locale === "en"
            ? "bg-surface text-primary shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
    </div>
  );
}
