import Link from "next/link";
import { Sparkles } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/dashboard" className="flex items-center gap-3" aria-label={`${APP_NAME} dashboard`}>
      <span className="relative grid size-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-white shadow-lg shadow-violet-500/20">
        <Sparkles className="size-4.5" />
      </span>
      {!compact && <span className="text-[15px] font-semibold tracking-tight text-white">{APP_NAME}</span>}
    </Link>
  );
}
