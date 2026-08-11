"use client";

import { useEffect } from "react";
import { CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastProps {
  title: string;
  message: string;
  show: boolean;
  onClose: () => void;
}

export function Toast({ title, message, show, onClose }: ToastProps) {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className={cn(
        "fixed right-4 top-4 z-[100] w-full max-w-sm",
        "rounded-lg border border-border bg-surface p-4 shadow-xl"
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex gap-3">
        <CheckCircle className="h-5 w-5 shrink-0 text-success" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="mt-1 text-xs text-muted-foreground">{message}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 text-muted-foreground hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
