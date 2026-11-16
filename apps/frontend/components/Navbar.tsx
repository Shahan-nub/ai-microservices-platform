"use client";

import { Bell, Menu, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NotificationBadge } from "@/components/NotificationBadge";
import { Button } from "@/components/ui/button";
import { DASHBOARD_NAV } from "@/lib/constants";
import { useAuth } from "@/components/providers/AuthProvider";

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const pathname = usePathname();
  const current = DASHBOARD_NAV.find((item) => item.href === pathname)?.label ?? "Workspace";
  const { user, displayName } = useAuth();
  const emailName = user?.email.split("@", 1)[0].replace(/[._-]+/g, " ");
  const accountName = displayName || user?.name || emailName || "Your account";
  const initials = accountName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  return (
    <header className="sticky top-0 z-30 flex h-17 items-center justify-between border-b border-border bg-[#eee8df]/95 px-4 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick} aria-label="Open navigation">
          <Menu className="size-5" />
        </Button>
        <div>
          <p className="editorial-title truncate text-lg text-foreground">{current}</p>
          <p className="hidden text-[9px] tracking-[0.2em] text-muted-foreground uppercase sm:block">Your intelligent workspace</p>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <button className="hidden h-9 w-52 items-center gap-2 rounded-sm border border-border bg-card px-3 text-xs text-muted-foreground transition hover:text-foreground md:flex">
          <Search className="size-3.5" />
          Search anything
          <kbd className="ml-auto rounded-sm border border-border px-1.5 py-0.5 text-[10px]">⌘ K</kbd>
        </button>
        <Link
          href="/dashboard/notifications"
          className="relative grid size-9 place-items-center rounded-sm text-muted-foreground transition hover:bg-[#e8e1d8] hover:text-foreground"
          aria-label="View notifications"
        >
          <Bell className="size-4.5" />
          <NotificationBadge className="absolute -top-1 -right-1 grid min-h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[9px] font-medium text-white ring-2 ring-[#eee8df]" />
        </Link>
        <div className="ml-1 flex items-center gap-2 border-l border-border pl-3">
          <div className="grid size-8 place-items-center rounded-full border border-border bg-[#e1d8cd] text-[10px] font-medium text-foreground">{initials || "N"}</div>
          <div className="hidden leading-tight sm:block">
            <p className="max-w-32 truncate text-xs font-medium text-foreground">{accountName}</p>
            <p className="text-[9px] tracking-[0.12em] text-muted-foreground uppercase">Workspace</p>
          </div>
        </div>
      </div>
    </header>
  );
}
