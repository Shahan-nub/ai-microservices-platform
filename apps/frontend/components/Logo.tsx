import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/dashboard" className="flex items-center gap-2.5" aria-label={`${APP_NAME} dashboard`}>
      <span className="grid size-8 place-items-center border border-current font-serif text-xl leading-none text-foreground">N</span>
      {!compact && (
        <span className="font-serif text-xl tracking-tight text-foreground">
          Nexora{" "}<span className="ml-1.5 align-top font-sans text-[8px] font-medium tracking-[0.24em]">AI</span>
        </span>
      )}
    </Link>
  );
}
