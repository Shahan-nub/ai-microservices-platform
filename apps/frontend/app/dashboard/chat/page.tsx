import type { Metadata } from "next";
import { ChatWindow } from "@/components/ChatWindow";

export const metadata: Metadata = { title: "AI Chat" };
export default function ChatPage() { return <ChatWindow />; }
