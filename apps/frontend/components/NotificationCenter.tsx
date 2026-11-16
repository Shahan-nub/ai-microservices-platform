"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CheckCheck, LoaderCircle } from "lucide-react";
import { NotificationCard } from "@/components/NotificationCard";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  deleteNotification,
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  type NotificationItem,
} from "@/services/notification";

type Filter = "all" | "unread";

export function NotificationCenter() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setItems(await getNotifications());
    } catch (err) {
      console.error("Unable to load notifications:", err);
      setError("Notifications could not be loaded. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const onChanged = () => void refresh();
    window.addEventListener("nexora:notifications-changed", onChanged);
    return () => window.removeEventListener("nexora:notifications-changed", onChanged);
  }, [refresh]);

  const unreadCount = useMemo(
    () => items.filter((item) => item.unread).length,
    [items],
  );
  const visibleItems = filter === "unread" ? items.filter((item) => item.unread) : items;

  async function markRead(id: number) {
    setBusy(true);
    setError("");
    try {
      const updated = await markNotificationAsRead(id);
      setItems((current) => current.map((item) => (item.id === id ? updated : item)));
    } catch (err) {
      console.error("Unable to mark notification as read:", err);
      setError("That notification could not be updated.");
    } finally {
      setBusy(false);
    }
  }

  async function markAllRead() {
    setBusy(true);
    setError("");
    try {
      await markAllNotificationsAsRead();
      setItems((current) => current.map((item) => ({ ...item, unread: false })));
    } catch (err) {
      console.error("Unable to mark notifications as read:", err);
      setError("Notifications could not be updated.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: number) {
    setBusy(true);
    setError("");
    try {
      await deleteNotification(id);
      setItems((current) => current.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Unable to delete notification:", err);
      setError("That notification could not be deleted.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <PageHeader
          eyebrow="Activity center"
          title="Notifications"
          description="Updates from your workspace, analyses, and account."
          action={
            <Button
              variant="secondary"
              size="sm"
              onClick={markAllRead}
              disabled={busy || unreadCount === 0}
            >
              <CheckCheck className="size-4" />
              Mark all as read
            </Button>
          }
        />

        <section className="glass-panel mt-8 overflow-hidden rounded-sm">
          <div className="flex items-center gap-5 border-b border-border px-5 py-3 text-xs">
            <button
              type="button"
              aria-pressed={filter === "all"}
              onClick={() => setFilter("all")}
              className={filter === "all" ? "font-medium text-accent" : "text-muted-foreground hover:text-foreground"}
            >
              All <span className="ml-1 border border-border px-2 py-0.5 text-[10px]">{items.length}</span>
            </button>
            <button
              type="button"
              aria-pressed={filter === "unread"}
              onClick={() => setFilter("unread")}
              className={filter === "unread" ? "font-medium text-accent" : "text-muted-foreground hover:text-foreground"}
            >
              Unread <span className="ml-1 text-[10px]">{unreadCount}</span>
            </button>
          </div>

          {error && (
            <div role="alert" className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 text-sm text-rose-700">
              <span>{error}</span>
              <Button variant="secondary" size="sm" onClick={() => void refresh()}>Retry</Button>
            </div>
          )}

          {loading ? (
            <div className="flex items-center gap-2 px-5 py-8 text-sm text-muted-foreground">
              <LoaderCircle className="size-4 animate-spin" />
              Loading notifications…
            </div>
          ) : visibleItems.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-muted-foreground">
              {filter === "unread" ? "You’re all caught up." : "Chat replies and resume analysis updates will appear here."}
            </p>
          ) : (
            visibleItems.map((notification, index) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                index={index}
                onMarkRead={() => void markRead(notification.id)}
                onDelete={() => void remove(notification.id)}
                disabled={busy}
              />
            ))
          )}
        </section>
      </div>
    </div>
  );
}
