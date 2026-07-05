"use client";

import { useState } from "react";
import { ArrowUp, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChatInput({ onSend }: { onSend: (message: string) => void }) {
  const [message, setMessage] = useState("");
  const submit = () => {
    const value = message.trim();
    if (!value) return;
    onSend(value);
    setMessage("");
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-[#141720] p-2 shadow-2xl shadow-black/30 focus-within:border-violet-500/35">
        <Button variant="ghost" size="icon" className="mb-0.5" aria-label="Attach file"><Paperclip className="size-4.5" /></Button>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); submit(); } }}
          rows={1}
          placeholder="Message Nexora..."
          className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-1 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
        />
        <Button size="icon" className="mb-0.5 size-9 rounded-xl" onClick={submit} disabled={!message.trim()} aria-label="Send message"><ArrowUp className="size-4" /></Button>
      </div>
      <p className="mt-2 text-center text-[10px] text-zinc-700">AI can make mistakes. Check important information.</p>
    </div>
  );
}
