import api from "@/lib/axios";

export interface ChatResponse {
  response: string;
}

export async function sendMessage(prompt: string) {
  const res = await api.post("/chat/", {
    prompt,
  });

  return res.data;
}

export async function getChatHistory() {
  const res = await api.get("/chat/history");

  return res.data;
}