"use client";

import { motion } from "motion/react";
import { AlertTriangle, Check, CheckCircle2, Info, Trash2 } from "lucide-react";
import type { NotificationItem } from "@/services/notification";

const config = {
  success: { icon: CheckCircle2, className: "bg-[#e6ddd2] text-[#615344]" },
  info: { icon: Info, className: "bg-[#e6ddd2] text-[#615344]" },
  warning: { icon: AlertTriangle, className: "bg-[#e6ddd2] text-[#615344]" },
};

function formatTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return Math.floor(seconds / 60) + " minutes ago";
  if (seconds < 86400) return Math.floor(seconds / 3600) + " hours ago";
  if (seconds < 604800) return Math.floor(seconds / 86400) + " days ago";
  return date.toLocaleDateString();
}

export function NotificationCard({
  notification,
  index = 0,
  onMarkRead,
  onDelete,
  disabled = false,
}: {
  notification: NotificationItem;
  index?: number;
  onMarkRead: () => void;
  onDelete: () => void;
  disabled?: boolean;
}) {
  const { icon: Icon, className } = config[notification.type];

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative flex gap-4 border-b border-border px-4 py-5 last:border-0 sm:px-5"
    >
      {notification.unread && <span className="absolute top-6 left-0 size-1.5 rounded-full bg-accent" />}
      <span className={"grid size-10 shrink-0 place-items-center rounded-sm border border-border " + className}>
        <Icon className="size-4.5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-foreground">{notification.title}</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">{notification.description}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            {notification.unread && (
              <button
                type="button"
                aria-label="Mark notification as read"
                title="Mark as read"
                disabled={disabled}
                onClick={onMarkRead}
                className="rounded-sm p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-50"
              >
                <Check className="size-4" />
              </button>
            )}
            <button
              type="button"
              aria-label="Delete notification"
              title="Delete notification"
              disabled={disabled}
              onClick={onDelete}
              className="rounded-sm p-1 text-muted-foreground transition hover:bg-muted hover:text-rose-700 disabled:opacity-50"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
        <p className="mt-2 text-[9px] tracking-[0.12em] text-muted-foreground uppercase">
          {formatTimestamp(notification.created_at)}
        </p>
      </div>
    </motion.article>
  );
}
