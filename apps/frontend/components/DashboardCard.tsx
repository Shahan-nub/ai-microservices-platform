"use client";

import { motion } from "motion/react";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accent: "violet" | "cyan" | "amber" | "rose";
  stat: string;
  index?: number;
}

const accents = {
  violet: "bg-violet-500/10 text-violet-300 ring-violet-500/20",
  cyan: "bg-cyan-500/10 text-cyan-300 ring-cyan-500/20",
  amber: "bg-amber-500/10 text-amber-300 ring-amber-500/20",
  rose: "bg-rose-500/10 text-rose-300 ring-rose-500/20",
};

export function DashboardCard({ title, description, href, icon: Icon, accent, stat, index = 0 }: DashboardCardProps) {
  return (
    <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07, duration: 0.4 }} whileHover={{ y: -4 }} className="group glass-panel rounded-2xl p-5 transition-colors hover:border-white/15">
      <div className="flex items-start justify-between">
        <span className={cn("grid size-11 place-items-center rounded-xl ring-1", accents[accent])}><Icon className="size-5" /></span>
        <span className="rounded-full border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 text-[10px] text-zinc-500">{stat}</span>
      </div>
      <h2 className="mt-7 text-base font-semibold text-zinc-100">{title}</h2>
      <p className="mt-2 min-h-10 text-sm leading-5 text-muted-foreground">{description}</p>
      <Link href={href} className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-zinc-300 transition group-hover:text-white">Open tool <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
    </motion.article>
  );
}
