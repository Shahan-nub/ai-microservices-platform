"use client";

import { ArrowUpRight, Clock3, Sparkles } from "lucide-react";
import Link from "next/link";
import { DashboardCard } from "@/components/DashboardCard";
import { PageHeader } from "@/components/PageHeader";
import { FEATURES } from "@/lib/constants";
import { useAuth } from "@/components/providers/AuthProvider";

export default function DashboardPage() {
  const { user, displayName } = useAuth();
  const emailName = user?.email
    .split("@", 1)[0]
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  const greetingName = displayName || user?.name?.trim() || emailName || "there";

  return (
    <div className="subtle-grid min-h-[calc(100vh-4.25rem)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <PageHeader eyebrow="Workspace / Overview" title={`Good evening, ${greetingName}`} description="A considered space for conversations, documents, research, and ideas." />

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map((feature, index) => <DashboardCard key={feature.title} {...feature} index={index} />)}
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className="glass-panel overflow-hidden rounded-sm p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div><p className="editorial-title text-2xl text-foreground">Recent activity</p><p className="mt-1 text-xs text-muted-foreground">A snapshot of your workspace</p></div>
              <button className="text-[9px] tracking-[0.16em] text-accent uppercase">View all</button>
            </div>
            <div className="mt-5 divide-y divide-border">
              {[
                ["Resume analysis completed", "Senior Product Designer.pdf", "2 min ago", "RA"],
                ["New AI conversation", "Q3 launch messaging ideas", "18 min ago", "AI"],
                ["Knowledge base indexed", "Product documentation", "1 hr ago", "ES"],
              ].map(([title, detail, time, tag]) => (
                <div key={title} className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0">
                  <span className="grid size-9 shrink-0 place-items-center border border-border bg-background text-[9px] tracking-[0.1em] text-muted-foreground">{tag}</span>
                  <div className="min-w-0 flex-1"><p className="truncate text-sm text-foreground">{title}</p><p className="truncate text-xs text-muted-foreground">{detail}</p></div>
                  <span className="hidden items-center gap-1 text-[11px] text-zinc-600 sm:flex"><Clock3 className="size-3" />{time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-sm border border-border bg-[#e5dcd1] p-6">
            <Sparkles className="absolute -right-6 -top-6 size-36 text-[#78634f]/10" />
            <span className="grid size-10 place-items-center border border-border bg-[#eee8df] text-accent"><Sparkles className="size-4.5" /></span>
            <p className="editorial-title mt-6 text-3xl text-foreground">Start with a conversation</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Ask a question, refine an idea, or turn a blank page into a first draft.</p>
            <Link href="/dashboard/chat" className="mt-5 inline-flex items-center gap-2 border-t border-border pt-3 text-[10px] font-medium tracking-[0.12em] text-foreground uppercase">Open AI Chat <ArrowUpRight className="size-3.5" /></Link>
          </div>
        </section>
      </div>
    </div>
  );
}
