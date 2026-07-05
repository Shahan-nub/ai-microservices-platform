import { createApiClient, notImplemented } from "@/lib/api";

export const chatApi = createApiClient();

export const sendMessage = (): never => notImplemented("Chat");
export const getConversations = (): never => notImplemented("Chat");
export const getConversation = (): never => notImplemented("Chat");
export const deleteConversation = (): never => notImplemented("Chat");
