"use client";

import {
  ArrowRight,
  Bell,
  Building2,
  Cpu,
  Globe,
  Map,
  MessageSquareWarning,
  Radio,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/header";
import { HeroDashboardPreview } from "@/components/landing/hero-dashboard-preview";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/context";

export function LandingPageContent() {
  const { t } = useI18n();
  const l = t.landing;

  const stats = [
    { value: "12,482", label: l.stats.reports },
    { value: "358", label: l.stats.audits },
    { value: "78", label: l.stats.zones },
    { value: "95%", label: l.stats.response },
  ];

  const features = [
    {
      icon: MessageSquareWarning,
      title: l.feature1Title,
      description: l.feature1Desc,
      href: "/reporting",
    },
    {
      icon: Building2,
      title: l.feature2Title,
      description: l.feature2Desc,
      href: "/infrastructure",
    },
    {
      icon: Map,
      title: l.feature3Title,
      description: l.feature3Desc,
      href: "/flood-risk",
    },
    {
      icon: Bell,
      title: l.feature4Title,
      description: l.feature4Desc,
      href: "/alerts",
    },
  ];

  const impactStakeholders = [
    {
      icon: Users,
      title: l.citizenTitle,
      role: l.citizenRole,
      description: l.citizenDesc,
      metrics: [l.citizenMetric1, l.citizenMetric2],
    },
    {
      icon: Shield,
      title: l.bpbdTitle,
      role: l.bpbdRole,
      description: l.bpbdDesc,
      metrics: [l.bpbdMetric1, l.bpbdMetric2],
    },
    {
      icon: Globe,
      title: l.govTitle,
      role: l.govRole,
      description: l.govDesc,
      metrics: [l.govMetric1, l.govMetric2],
    },
  ];

  const architecture = [
    {
      icon: Users,
      title: l.tech1Title,
      description: l.tech1Desc,
      layer: l.tech1Layer,
    },
    {
      icon: Map,
      title: l.tech2Title,
      description: l.tech2Desc,
      layer: l.tech2Layer,
    },
    {
      icon: Cpu,
      title: l.tech3Title,
      description: l.tech3Desc,
      layer: l.tech3Layer,
    },
    {
      icon: Zap,
      title: l.tech4Title,
      description: l.tech4Desc,
      layer: l.tech4Layer,
    },
  ];

  const flowSteps = [l.flowStep1, l.flowStep2, l.flowStep3];

  return (
    <>
      <PublicHeader />

      <section className="relative overflow-hidden border-b border-border bg-surface">
        <div className="absolute inset-0 bg-[linear-gradient(160deg,#1E3A8A06_0%,#06B6D406_50%,transparent_100%)]" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
                <Radio className="h-3.5 w-3.5" aria-hidden="true" />
                {l.badge}
              </div>

              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
                {l.heroTitle}{" "}
                <span className="text-primary">{l.heroTitleHighlight}</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {l.heroSubtitle}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/reporting">
                    {l.reportIncident}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/flood-risk">{l.viewRiskMap}</Link>
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-primary" />
                  {l.govSecurity}
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-secondary" />
                  {l.bmkgCompatible}
                </div>
              </div>
            </div>

            <div className="relative lg:pl-4">
              <HeroDashboardPreview />
            </div>
          </div>
        </div>
      </section>

      <section
        id="stats"
        className="border-b border-border bg-primary py-14 sm:py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-white/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              {l.featuresLabel}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {l.featuresTitle}
            </h2>
            <p className="mt-4 text-muted-foreground">{l.featuresSubtitle}</p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="group relative overflow-hidden transition-all hover:border-primary/30 hover:shadow-lg"
              >
                <CardContent className="p-8">
                  <span className="absolute right-6 top-6 text-5xl font-bold text-muted/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-white">
                    <feature.icon
                      className="h-5 w-5 text-primary group-hover:text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                  <Link
                    href={feature.href}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    {l.exploreModule}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="impact"
        className="border-y border-border bg-muted/40 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              {l.impactLabel}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {l.impactTitle}
            </h2>
            <p className="mt-4 text-muted-foreground">{l.impactSubtitle}</p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {impactStakeholders.map((stakeholder) => (
              <Card key={stakeholder.title} className="bg-surface">
                <CardContent className="p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
                    <stakeholder.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-secondary">
                    {stakeholder.role}
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-foreground">
                    {stakeholder.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {stakeholder.description}
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-border pt-5">
                    {stakeholder.metrics.map((metric) => (
                      <li
                        key={metric}
                        className="flex items-center gap-2 text-xs font-medium text-foreground"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                        {metric}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 rounded-xl border border-border bg-surface p-6 sm:flex-row sm:gap-8">
            {flowSteps.map((step, i) => (
              <div key={step} className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <span className="mt-2 text-xs font-medium text-foreground">
                    {step}
                  </span>
                </div>
                {i < 2 && (
                  <ArrowRight
                    className="hidden h-4 w-4 text-muted-foreground sm:block"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="technology" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              {l.techLabel}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {l.techTitle}
            </h2>
            <p className="mt-4 text-muted-foreground">{l.techSubtitle}</p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {architecture.map((item, index) => (
              <Card
                key={item.title}
                className="relative overflow-hidden border-t-2 border-t-secondary"
              >
                <CardContent className="p-6">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {item.layer}
                  </span>
                  <div className="mt-4 flex h-10 w-10 items-center justify-center rounded-md bg-secondary/10">
                    <item.icon
                      className="h-5 w-5 text-secondary"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  {index < architecture.length - 1 && (
                    <ArrowRight
                      className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-border lg:block"
                      aria-hidden="true"
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-primary px-8 py-16 text-center sm:px-16">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,#06B6D415_100%)]" />
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {l.ctaTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/70">
                {l.ctaSubtitle}
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                  asChild
                >
                  <Link href="/dashboard">
                    {t.nav.getStarted}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-transparent text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/login">{l.agencyLogin}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
