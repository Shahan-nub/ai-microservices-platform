"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Bot, Copy, RotateCcw, Sparkles } from "lucide-react";
import { ChatInput } from "@/components/ChatInput";
import type { ChatMessage } from "@/types";

const initialMessages: ChatMessage[] = [
  { id: "1", role: "assistant", content: "Hi Shahan — I’m ready when you are. What would you like to work through today?", timestamp: "10:42 AM" },
  { id: "2", role: "user", content: "Help me outline a launch plan for a new developer platform.", timestamp: "10:43 AM" },
  { id: "3", role: "assistant", content: "Absolutely. I’d structure it around four tracks: positioning, developer experience, community activation, and launch-day distribution. We can start by defining the audience and the single problem the platform solves better than alternatives.", timestamp: "10:43 AM" },
];

export function ChatWindow() {
  const [messages, setMessages] = useState(initialMessages);
  const sendMessage = (content: string) => {
    setMessages((items) => [...items, { id: crypto.randomUUID(), role: "user", content, timestamp: "Just now" }]);
  };

  return (
    <div className="flex h-[calc(100vh-4.25rem)] flex-col">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-violet-500/10 text-violet-300"><Sparkles className="size-4" /></span><div><p className="text-sm font-medium text-zinc-200">Nexora Assistant</p><p className="text-[11px] text-emerald-400"><span className="mr-1 inline-block size-1.5 rounded-full bg-emerald-400" />Online</p></div></div>
        <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-zinc-500 hover:bg-white/5 hover:text-zinc-300"><RotateCcw className="size-3.5" />New chat</button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-7">
          {messages.map((message, index) => (
            <motion.div key={message.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index < 3 ? index * 0.06 : 0 }} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              {message.role === "assistant" && <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-violet-500/15 text-violet-300"><Bot className="size-4" /></span>}
              <div className={`max-w-[85%] sm:max-w-[75%] ${message.role === "user" ? "items-end" : "items-start"}`}>
                <div className={message.role === "user" ? "rounded-2xl rounded-tr-sm bg-violet-600 px-4 py-3 text-sm leading-6 text-white" : "text-sm leading-7 text-zinc-300"}>{message.content}</div>
                <div className={`mt-1.5 flex items-center gap-2 text-[10px] text-zinc-700 ${message.role === "user" ? "justify-end" : "justify-start"}`}><span>{message.timestamp}</span>{message.role === "assistant" && <button aria-label="Copy message" className="hover:text-zinc-400"><Copy className="size-3" /></button>}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/[0.06] bg-[#080a11]/85 px-4 pt-3 pb-4 backdrop-blur-xl sm:px-6"><ChatInput onSend={sendMessage} /></div>
    </div>
  );
}
