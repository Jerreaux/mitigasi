import { MapPin } from "lucide-react";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: "default" | "light";
}

export function Logo({
  className,
  showText = true,
  variant = "default",
}: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5", className)}
      aria-label={`${APP_NAME} home`}
    >
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-md",
          isLight ? "bg-white" : "bg-primary"
        )}
      >
        <MapPin
          className={cn("h-5 w-5", isLight ? "text-primary" : "text-white")}
          aria-hidden="true"
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span
            className={cn(
              "text-base font-bold leading-tight",
              isLight ? "text-white" : "text-primary"
            )}
          >
            {APP_NAME}
          </span>
          <span
            className={cn(
              "text-[10px] font-medium uppercase tracking-wider",
              isLight ? "text-white/50" : "text-muted-foreground"
            )}
          >
            GovTech Platform
          </span>
        </div>
      )}
    </Link>
  );
}
