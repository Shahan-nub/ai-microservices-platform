export type ChatRole = "assistant" | "user";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "success" | "info" | "warning";
  unread?: boolean;
}

export interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  source: string;
  similarity: number;
}
