"use client";

import { Award, Lock, Server, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { APP_NAME } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/context";

const partners = [
  { abbr: "BPBD", name: "Badan Penanggulangan Bencana Daerah" },
  { abbr: "BMKG", name: "Meteorologi, Klimatologi, dan Geofisika" },
  { abbr: "BNPB", name: "Badan Nasional Penanggulangan Bencana" },
  { abbr: "PUPR", name: "Pekerjaan Umum dan Perumahan Rakyat" },
];

export function Footer() {
  const { t } = useI18n();
  const f = t.footer;

  const platformLinks = [
    { href: "/dashboard", label: t.nav.dashboard },
    { href: "/flood-risk", label: t.nav.floodRisk },
    { href: "/reporting", label: t.nav.reporting },
    { href: "/infrastructure", label: t.nav.infrastructure },
  ];

  const trustIndicators = [
    { icon: ShieldCheck, label: f.trustIso },
    { icon: Lock, label: f.trustEncryption },
    { icon: Server, label: f.trustUptime },
    { icon: Award, label: f.trustGovtech },
  ];

  const complianceItems = [
    f.compliance1,
    f.compliance2,
    f.compliance3,
    f.compliance4,
  ];

  return (
    <footer className="border-t border-border bg-primary text-white">
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-4 sm:px-6 lg:px-8">
          {trustIndicators.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5">
              <item.icon
                className="h-4 w-4 shrink-0 text-secondary"
                aria-hidden="true"
              />
              <span className="text-xs font-medium text-white/80">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-white/10 bg-primary/80">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-white/50">
            {f.integratedAgencies}
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {partners.map((partner) => (
              <div
                key={partner.abbr}
                className="flex flex-col items-center rounded-lg border border-white/10 bg-white/5 px-4 py-4 text-center"
              >
                <span className="text-lg font-bold tracking-tight text-white">
                  {partner.abbr}
                </span>
                <span className="mt-1 text-[10px] leading-tight text-white/50">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <Logo variant="light" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              {f.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">{f.platform}</h3>
            <ul className="mt-4 space-y-2.5">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-secondary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">{f.compliance}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              {complianceItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {APP_NAME}. {f.copyright}
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <Link href="#" className="hover:text-white/70">
              {f.privacy}
            </Link>
            <Link href="#" className="hover:text-white/70">
              {f.terms}
            </Link>
            <Link href="#" className="hover:text-white/70">
              {f.security}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
