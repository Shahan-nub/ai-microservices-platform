"use client";

import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { motion } from "motion/react";
import { Bot, Copy, RotateCcw, Sparkles } from "lucide-react";
import { ChatInput } from "@/components/ChatInput";
import { sendMessage, getChatHistory } from "@/services/chat";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const history = await getChatHistory();

      const formatted: Message[] = [];

      history.forEach((chat: any, index: number) => {
        formatted.push({
          id: `${index}-u`,
          role: "user",
          content: chat.prompt,
          timestamp: "",
        });

        formatted.push({
          id: `${index}-a`,
          role: "assistant",
          content: chat.response,
          timestamp: "",
        });
      });

      setMessages(formatted);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSend(content: string) {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: "Now",
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const data = await sendMessage(content);

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.response,
        timestamp: "Now",
      };

      setMessages((prev) => [...prev, aiMessage]);
      window.dispatchEvent(new Event("nexora:notifications-changed"));
    } catch (err) {
      const detail = isAxiosError<{ detail?: string }>(err)
        ? err.response?.data?.detail
        : undefined;
      alert(detail || "Failed to send message. Please try again.");
    }

    setLoading(false);
  }

  return (
    <div className="flex h-[calc(100vh-4.25rem)] flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-sm border border-border bg-[#e6ddd2] text-accent">
            <Sparkles className="size-4" />
          </span>

          <div>
            <p className="text-sm font-medium text-zinc-200">
              Nexora Assistant
            </p>

            <p className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
              <span className="mr-1 inline-block size-1.5 rounded-full bg-accent" />
              Online
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages([])}
          className="flex items-center gap-2 rounded-sm px-3 py-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <RotateCcw className="size-3.5" />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-7">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <span className="mr-3 grid size-8 place-items-center rounded-sm border border-border bg-card text-accent">
                  <Bot className="size-4" />
                </span>
              )}

              <div
                className={
                  message.role === "user"
                    ? "max-w-[70%] rounded-sm bg-primary px-4 py-3 text-primary-foreground"
                    : "max-w-[70%] leading-7 text-foreground"
                }
              >
                {message.content}
              </div>

              {message.role === "assistant" && (
                <button className="ml-2">
                  <Copy className="size-4 text-muted-foreground" />
                </button>
              )}
            </motion.div>
          ))}

          {loading && (
            <div className="text-sm text-muted-foreground">
              Nexora is thinking...
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-border bg-background px-4 pt-3 pb-4">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}