import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "icon";
};

export function Button({ asChild, className, variant = "primary", size = "md", ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary/60",
        variant === "primary" && "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-violet-500 hover:-translate-y-0.5",
        variant === "secondary" && "border border-white/10 bg-white/5 text-zinc-100 hover:bg-white/10",
        variant === "ghost" && "text-muted-foreground hover:bg-white/5 hover:text-white",
        size === "sm" && "h-9 px-3 text-sm",
        size === "md" && "h-11 px-4 text-sm",
        size === "icon" && "size-10",
        className,
      )}
      {...props}
    />
  );
}
