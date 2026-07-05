import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 text-sm text-white placeholder:text-zinc-600 transition focus:border-primary/60 focus:ring-2 focus:ring-primary/10 focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}
