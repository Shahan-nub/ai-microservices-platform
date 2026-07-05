"use client";

import { motion } from "motion/react";
import { AlertTriangle, CheckCircle2, Info, MoreHorizontal } from "lucide-react";
import type { Notification } from "@/types";

const config = {
  success: { icon: CheckCircle2, className: "bg-emerald-500/10 text-emerald-300" },
  info: { icon: Info, className: "bg-cyan-500/10 text-cyan-300" },
  warning: { icon: AlertTriangle, className: "bg-amber-500/10 text-amber-300" },
};

export function NotificationCard({ notification, index = 0 }: { notification: Notification; index?: number }) {
  const { icon: Icon, className } = config[notification.type];
  return (
    <motion.article initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="group relative flex gap-4 border-b border-white/[0.06] px-4 py-5 last:border-0 sm:px-5">
      {notification.unread && <span className="absolute top-6 left-0 size-1.5 rounded-full bg-violet-400" />}
      <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${className}`}><Icon className="size-4.5" /></span>
      <div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><p className="text-sm font-medium text-zinc-200">{notification.title}</p><button aria-label="Notification options" className="rounded-lg p-1 text-zinc-700 opacity-0 transition hover:bg-white/5 hover:text-zinc-400 group-hover:opacity-100"><MoreHorizontal className="size-4" /></button></div><p className="mt-1 text-xs leading-5 text-zinc-500">{notification.description}</p><p className="mt-2 text-[10px] text-zinc-700">{notification.timestamp}</p></div>
    </motion.article>
  );
}
