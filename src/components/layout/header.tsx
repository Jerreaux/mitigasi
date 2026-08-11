"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useI18n } from "@/lib/i18n/context";

const publicLinks = [
  { href: "/", key: "home" as const },
  { href: "/#features", key: "features" as const },
  { href: "/#impact", key: "impact" as const },
  { href: "/flood-risk", key: "riskMap" as const },
];

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Main navigation"
        >
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {t.nav[link.key]}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <Button variant="ghost" asChild>
            <Link href="/login">{t.nav.login}</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">{t.nav.getStarted}</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-border bg-surface px-4 py-4 lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-3">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground"
                onClick={() => setOpen(false)}
              >
                {t.nav[link.key]}
              </Link>
            ))}
            <div className="flex flex-col gap-2 border-t border-border pt-3">
              <Button variant="outline" asChild>
                <Link href="/login">{t.nav.login}</Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard">{t.nav.getStarted}</Link>
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
