import { createApiClient, notImplemented } from "@/lib/api";

export const notificationApi = createApiClient();

export const getNotifications = (): never => notImplemented("Notification");
export const markNotificationAsRead = (): never => notImplemented("Notification");
export const markAllNotificationsAsRead = (): never => notImplemented("Notification");
export const deleteNotification = (): never => notImplemented("Notification");
