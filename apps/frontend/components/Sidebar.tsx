"use client";

import { AnimatePresence, motion } from "motion/react";
import { Bell, FileSearch, LayoutDashboard, LogOut, MessageSquareText, ScanSearch, Settings, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { DASHBOARD_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";

const icons = { LayoutDashboard, MessageSquareText, FileSearch, ScanSearch, Bell };

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

function SidebarContent({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-17 items-center justify-between px-5">
        <Logo />
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose} aria-label="Close navigation"><X className="size-5" /></Button>
      </div>
      <div className="px-3 pt-5">
        <p className="px-3 pb-2 text-[10px] font-semibold tracking-[0.16em] text-zinc-600 uppercase">Workspace</p>
        <nav className="space-y-1">
          {DASHBOARD_NAV.map((item) => {
            const Icon = icons[item.icon];
            const active = item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "relative flex h-10 items-center gap-3 rounded-xl px-3 text-sm transition-colors",
                  active ? "bg-violet-500/10 text-violet-200" : "text-zinc-500 hover:bg-white/[0.035] hover:text-zinc-200",
                )}
              >
                {active && <motion.span layoutId="active-nav" className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-violet-400" />}
                <Icon className="size-4.5" />
                <span>{item.label}</span>
                {item.label === "Notifications" && <span className="ml-auto rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] text-violet-300">3</span>}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto space-y-1 border-t border-white/[0.06] p-3">
        <button className="flex h-10 w-full items-center gap-3 rounded-xl px-3 text-sm text-zinc-500 transition hover:bg-white/[0.035] hover:text-zinc-200"><Settings className="size-4.5" />Settings</button>
        <Link href="/login" className="flex h-10 items-center gap-3 rounded-xl px-3 text-sm text-zinc-500 transition hover:bg-white/[0.035] hover:text-zinc-200"><LogOut className="size-4.5" />Sign out</Link>
      </div>
    </div>
  );
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/[0.06] bg-[#090b12]/90 backdrop-blur-xl md:block"><SidebarContent onClose={onClose} /></aside>
      <AnimatePresence>
        {open && (
          <>
            <motion.button aria-label="Close navigation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden" />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", damping: 28, stiffness: 300 }} className="fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-[#0b0d15] md:hidden"><SidebarContent onClose={onClose} /></motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
