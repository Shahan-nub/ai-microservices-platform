import type { Metadata } from "next";
import { NotificationCenter } from "@/components/NotificationCenter";

export const metadata: Metadata = { title: "Notifications" };

export default function NotificationsPage() {
  return <NotificationCenter />;
}
