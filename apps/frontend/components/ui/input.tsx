import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-border bg-card px-3.5 text-sm text-foreground placeholder:text-muted-foreground transition focus:border-primary/60 focus:ring-2 focus:ring-primary/10 focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}
