"use client";

import { Lock, Shield, UserCircle, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { cn } from "@/lib/utils";
import { loginUser } from "@/lib/api"; // Import fungsi API login kita

type UserRole = "citizen" | "bpbd" | "admin";

const roles: { id: UserRole; label: string; icon: typeof Users }[] = [
  { id: "citizen", label: "Citizen", icon: Users },
  { id: "bpbd", label: "BPBD Officer", icon: Shield },
  { id: "admin", label: "Administrator", icon: UserCircle },
];

export function LoginForm() {
  const [role, setRole] = useState<UserRole>("bpbd");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const emailPlaceholder =
    role === "citizen"
      ? "you@email.com"
      : role === "bpbd"
        ? "officer@bpbd.go.id"
        : "admin@agency.go.id";

  // Handler Submit Form Login ke Backend Express
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      // 1. Tembak API Backend POST /api/auth/login
      const res = await loginUser({ email, password });

      // 2. Simpan token & data user ke localStorage browser
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      // 3. Pindahkan halaman (Redirect) sesuai Role dari Backend:
      if (res.user.role === "admin") {
        router.push("/admin");
      } else if (res.user.role === "pegawai") {
        router.push("/pegawai");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Gagal login!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-md flex-col">
      <div className="mb-8 flex items-center justify-between">
        <Logo />
        <LanguageToggle />
      </div>

      <div className="rounded-2xl border border-border/60 bg-surface/80 p-8 shadow-xl shadow-primary/5 backdrop-blur-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Welcome Back
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Access your disaster intelligence dashboard.
          </p>
        </div>

        {/* Role selector */}
        <div className="mb-6">
          <Label className="mb-2.5 block text-xs font-medium text-muted-foreground">
            Sign in as
          </Label>
          <div
            className="grid grid-cols-3 gap-1.5 rounded-lg bg-muted p-1"
            role="radiogroup"
            aria-label="Select role"
          >
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                role="radio"
                aria-checked={role === r.id}
                onClick={() => setRole(r.id)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-md px-2 py-2.5 text-center transition-all",
                  role === r.id
                    ? "bg-surface text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <r.icon className="h-4 w-4" aria-hidden="true" />
                <span className="text-[10px] font-semibold leading-tight sm:text-xs">
                  {r.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Alert Error jika Gagal Login */}
        {error && (
          <div className="mb-4 rounded-lg bg-danger/10 p-3 text-xs text-danger font-medium border border-danger/20">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={emailPlaceholder}
              autoComplete="email"
              required
              className="h-11 rounded-lg border-border/80 bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
              className="h-11 rounded-lg border-border/80 bg-background/50"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-muted-foreground">Remember Me</span>
            </label>
            <Link
              href="#"
              className="text-sm font-medium text-primary hover:underline"
            >
              Forgot Password
            </Link>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-lg text-sm font-semibold"
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="h-11 w-full rounded-lg text-sm font-medium"
            asChild
          >
            <Link href="/reporting">Continue as Citizen</Link>
          </Button>
        </form>
      </div>

      {/* Security notice */}
      <div className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-border/60 bg-muted/40 px-4 py-3 backdrop-blur-sm">
        <Lock className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
        <p className="text-xs text-muted-foreground">
          Protected Government &amp; Community Data
        </p>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link href="/" className="font-medium text-primary hover:underline">
          ← Back to homepage
        </Link>
      </p>
    </div>
  );
}
