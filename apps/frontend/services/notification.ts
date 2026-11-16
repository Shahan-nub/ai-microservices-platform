"use client";

import api from "@/lib/axios";

export interface NotificationItem {
  id: number;
  title: string;
  description: string;
  type: "success" | "info" | "warning";
  unread: boolean;
  created_at: string;
}

export interface CreateNotificationInput {
  title: string;
  description: string;
  type: NotificationItem["type"];
  event_key: string;
}

function notifyChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("nexora:notifications-changed"));
  }
}

export async function getNotifications(unreadOnly = false) {
  const response = await api.get<NotificationItem[]>("/notify/notifications", {
    params: unreadOnly ? { unread_only: true } : undefined,
  });
  return response.data;
}

export async function getUnreadNotificationCount() {
  const response = await api.get<{ count: number }>("/notify/notifications/unread-count");
  return response.data.count;
}

export async function createNotification(input: CreateNotificationInput) {
  const response = await api.post<NotificationItem>("/notify/notifications", input);
  notifyChanged();
  return response.data;
}

export async function markNotificationAsRead(id: number) {
  const response = await api.patch<NotificationItem>("/notify/notifications/" + id + "/read");
  notifyChanged();
  return response.data;
}

export async function markAllNotificationsAsRead() {
  const response = await api.patch<{ updated: number }>("/notify/notifications/read-all");
  notifyChanged();
  return response.data;
}

export async function deleteNotification(id: number) {
  await api.delete("/notify/notifications/" + id);
  notifyChanged();
}
