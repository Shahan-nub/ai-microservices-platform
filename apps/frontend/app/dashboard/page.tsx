"use client";

import { ArrowUpRight, Clock3, Sparkles } from "lucide-react";
import Link from "next/link";
import { DashboardCard } from "@/components/DashboardCard";
import { PageHeader } from "@/components/PageHeader";
import { FEATURES } from "@/lib/constants";

export default function DashboardPage() {
  return (
    <div className="subtle-grid min-h-[calc(100vh-4.25rem)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <PageHeader eyebrow="Overview" title="Good evening, Shahan" description="Everything you need to turn ideas and information into useful work." />

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map((feature, index) => <DashboardCard key={feature.title} {...feature} index={index} />)}
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className="glass-panel overflow-hidden rounded-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-semibold text-zinc-100">Recent activity</p><p className="mt-1 text-xs text-muted-foreground">A snapshot of your workspace</p></div>
              <button className="text-xs text-violet-300 hover:text-violet-200">View all</button>
            </div>
            <div className="mt-5 divide-y divide-white/[0.06]">
              {[
                ["Resume analysis completed", "Senior Product Designer.pdf", "2 min ago", "RA"],
                ["New AI conversation", "Q3 launch messaging ideas", "18 min ago", "AI"],
                ["Knowledge base indexed", "Product documentation", "1 hr ago", "ES"],
              ].map(([title, detail, time, tag]) => (
                <div key={title} className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/[0.045] text-[10px] font-semibold text-zinc-400">{tag}</span>
                  <div className="min-w-0 flex-1"><p className="truncate text-sm text-zinc-300">{title}</p><p className="truncate text-xs text-zinc-600">{detail}</p></div>
                  <span className="hidden items-center gap-1 text-[11px] text-zinc-600 sm:flex"><Clock3 className="size-3" />{time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/15 via-[#12121c] to-cyan-500/5 p-6">
            <Sparkles className="absolute -right-6 -top-6 size-36 text-violet-500/[0.07]" />
            <span className="grid size-10 place-items-center rounded-xl bg-violet-500/15 text-violet-300"><Sparkles className="size-4.5" /></span>
            <p className="mt-6 text-base font-semibold text-white">Start with a conversation</p>
            <p className="mt-2 text-sm leading-6 text-zinc-500">Ask a question, refine an idea, or turn a blank page into a first draft.</p>
            <Link href="/dashboard/chat" className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-violet-300 hover:text-violet-200">Open AI Chat <ArrowUpRight className="size-3.5" /></Link>
          </div>
        </section>
      </div>
    </div>
  );
}
