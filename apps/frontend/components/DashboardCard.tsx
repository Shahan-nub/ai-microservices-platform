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
  violet: "bg-[#e6ddd2] text-[#615344] ring-[#d2c7ba]",
  cyan: "bg-[#e6ddd2] text-[#615344] ring-[#d2c7ba]",
  amber: "bg-[#e6ddd2] text-[#615344] ring-[#d2c7ba]",
  rose: "bg-[#e6ddd2] text-[#615344] ring-[#d2c7ba]",
};

export function DashboardCard({ title, description, href, icon: Icon, accent, stat, index = 0 }: DashboardCardProps) {
  return (
    <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07, duration: 0.4 }} whileHover={{ y: -3 }} className="group glass-panel rounded-sm p-5 transition-colors hover:border-[#76624f]">
      <div className="flex items-start justify-between">
        <span className={cn("grid size-11 place-items-center rounded-sm ring-1", accents[accent])}><Icon className="size-5" /></span>
        <span className="rounded-sm border border-border bg-background px-2.5 py-1 text-[9px] tracking-[0.12em] text-muted-foreground uppercase">{stat}</span>
      </div>
      <h2 className="editorial-title mt-7 text-2xl text-foreground">{title}</h2>
      <p className="mt-2 min-h-10 text-sm leading-5 text-muted-foreground">{description}</p>
      <Link href={href} className="mt-6 inline-flex items-center gap-2 border-t border-border pt-3 text-[10px] font-medium tracking-[0.12em] text-foreground uppercase">Open tool <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
    </motion.article>
  );
}
