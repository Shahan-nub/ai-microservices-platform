"use client";

import { Bell, Menu, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DASHBOARD_NAV } from "@/lib/constants";

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const pathname = usePathname();
  const current = DASHBOARD_NAV.find((item) => item.href === pathname)?.label ?? "Workspace";

  return (
    <header className="sticky top-0 z-30 flex h-17 items-center justify-between border-b border-white/[0.06] bg-[#080a11]/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick} aria-label="Open navigation">
          <Menu className="size-5" />
        </Button>
        <div>
          <p className="truncate text-sm font-semibold text-zinc-100">{current}</p>
          <p className="hidden text-xs text-muted-foreground sm:block">Your intelligent workspace</p>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <button className="hidden h-9 w-52 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.035] px-3 text-xs text-zinc-500 transition hover:border-white/15 hover:text-zinc-300 md:flex">
          <Search className="size-3.5" />
          Search anything
          <kbd className="ml-auto rounded border border-white/10 px-1.5 py-0.5 text-[10px]">⌘ K</kbd>
        </button>
        <Button variant="ghost" size="icon" className="relative" aria-label="View notifications">
          <Bell className="size-4.5" />
          <span className="absolute top-2 right-2 size-1.5 rounded-full bg-violet-400 ring-2 ring-[#080a11]" />
        </Button>
        <div className="ml-1 flex items-center gap-2 border-l border-white/10 pl-3">
          <div className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 text-xs font-semibold text-white">SA</div>
          <div className="hidden leading-tight sm:block">
            <p className="text-xs font-medium text-zinc-200">Shahan</p>
            <p className="text-[10px] text-zinc-600">Pro workspace</p>
          </div>
        </div>
      </div>
    </header>
  );
}
