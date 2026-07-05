import { createApiClient, notImplemented } from "@/lib/api";

export const authApi = createApiClient();

export const signIn = (): never => notImplemented("Authentication");
export const signUp = (): never => notImplemented("Authentication");
export const signOut = (): never => notImplemented("Authentication");
export const getCurrentUser = (): never => notImplemented("Authentication");
