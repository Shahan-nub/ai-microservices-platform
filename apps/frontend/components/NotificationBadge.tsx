"use client";

import { useEffect, useState } from "react";
import { getUnreadNotificationCount } from "@/services/notification";

export function NotificationBadge({ className }: { className: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let active = true;

    const refresh = () => {
      getUnreadNotificationCount()
        .then((value) => {
          if (active) setCount(value);
        })
        .catch(() => {
          if (active) setCount(0);
        });
    };

    refresh();
    const timer = window.setInterval(refresh, 30_000);
    window.addEventListener("nexora:notifications-changed", refresh);
    window.addEventListener("focus", refresh);

    return () => {
      active = false;
      window.clearInterval(timer);
      window.removeEventListener("nexora:notifications-changed", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  if (count === 0) return null;

  return <span className={className}>{count > 99 ? "99+" : count}</span>;
}
