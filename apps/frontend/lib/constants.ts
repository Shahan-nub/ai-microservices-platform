import { Bell, FileSearch, MessageSquareText, ScanSearch } from "lucide-react";

export const APP_NAME = "Nexora AI";

export const DASHBOARD_NAV = [
  { label: "Overview", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "AI Chat", href: "/dashboard/chat", icon: "MessageSquareText" },
  { label: "Resume Analyzer", href: "/dashboard/resume", icon: "FileSearch" },
  { label: "Embedding Search", href: "/dashboard/search", icon: "ScanSearch" },
  { label: "Notifications", href: "/dashboard/notifications", icon: "Bell" },
] as const;

export const FEATURES = [
  {
    title: "AI Chat",
    description: "Think, write, and solve problems with an intelligent assistant.",
    href: "/dashboard/chat",
    icon: MessageSquareText,
    accent: "violet",
    stat: "Always ready",
  },
  {
    title: "Resume Analyzer",
    description: "Surface strengths, skill gaps, and ATS-ready improvements.",
    href: "/dashboard/resume",
    icon: FileSearch,
    accent: "cyan",
    stat: "PDF & DOCX",
  },
  {
    title: "Embedding Search",
    description: "Find meaning across your knowledge, not just keywords.",
    href: "/dashboard/search",
    icon: ScanSearch,
    accent: "amber",
    stat: "Semantic search",
  },
  {
    title: "Notifications",
    description: "Stay current on completed jobs, insights, and account events.",
    href: "/dashboard/notifications",
    icon: Bell,
    accent: "rose",
    stat: "3 unread",
  },
] as const;
