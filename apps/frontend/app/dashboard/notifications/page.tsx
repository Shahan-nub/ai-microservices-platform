import type { Metadata } from "next";
import { CheckCheck } from "lucide-react";
import { NotificationCard } from "@/components/NotificationCard";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import type { Notification } from "@/types";

export const metadata: Metadata = { title: "Notifications" };
const notifications: Notification[] = [
  { id: "1", title: "Resume analysis complete", description: "Your resume scored 82/100. We found 5 opportunities to improve ATS compatibility.", timestamp: "2 minutes ago", type: "success", unread: true },
  { id: "2", title: "Knowledge base updated", description: "24 documents were indexed successfully and are now available in Embedding Search.", timestamp: "38 minutes ago", type: "info", unread: true },
  { id: "3", title: "Usage approaching monthly limit", description: "You have used 80% of your monthly AI message allowance.", timestamp: "3 hours ago", type: "warning", unread: true },
  { id: "4", title: "New sign-in to your account", description: "A sign-in was detected from Chrome on macOS in Bengaluru, India.", timestamp: "Yesterday", type: "info" },
  { id: "5", title: "Resume analysis complete", description: "The analysis for Product_Manager_Resume.pdf is ready to review.", timestamp: "2 days ago", type: "success" },
];

export default function NotificationsPage() {
  return <div className="p-4 sm:p-6 lg:p-8"><div className="mx-auto max-w-4xl"><PageHeader eyebrow="Activity center" title="Notifications" description="Updates from your workspace, analyses, and account." action={<Button variant="secondary" size="sm"><CheckCheck className="size-4" />Mark all as read</Button>} /><section className="glass-panel mt-8 overflow-hidden rounded-2xl"><div className="flex items-center gap-5 border-b border-white/[0.06] px-5 py-3 text-xs"><button className="font-medium text-violet-300">All <span className="ml-1 rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px]">5</span></button><button className="text-zinc-600 hover:text-zinc-300">Unread <span className="ml-1 text-[10px]">3</span></button></div>{notifications.map((notification, index) => <NotificationCard key={notification.id} notification={notification} index={index} />)}</section></div></div>;
}
