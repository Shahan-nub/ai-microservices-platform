"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { getCurrentUser, type CurrentUser } from "@/services/auth";

interface AuthContextType {
  token: string;
  user: CurrentUser | null;
  displayName: string;
  saveDisplayName: (email: string, name: string) => void;
  login: (token: string, email?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const displayNameKey = (email: string) =>
  `displayName:${email.trim().toLowerCase()}`;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState(
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "",
  );
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (!token) return;

    let active = true;

    getCurrentUser()
      .then((currentUser) => {
        if (!active) return;
        setUser(currentUser);
        setDisplayName(
          localStorage.getItem(displayNameKey(currentUser.email)) || "",
        );
      })
      .catch((error: unknown) => {
        if (isAxiosError(error) && [401, 404].includes(error.response?.status ?? 0)) {
          localStorage.removeItem("token");
          document.cookie = `token=; Path=/; Max-Age=0; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`;
          setToken("");
          setUser(null);
          setDisplayName("");
          return;
        }

        console.error("Unable to load the current user:", error);
      });

    return () => {
      active = false;
    };
  }, [token]);

  const saveDisplayName = (email: string, name: string) => {
    const trimmedName = name.trim();
    localStorage.setItem(displayNameKey(email), trimmedName);
    setDisplayName(trimmedName);
  };

  const login = (jwt: string, email?: string) => {
    localStorage.setItem("token", jwt);
    document.cookie = `token=${encodeURIComponent(jwt)}; Path=/; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`;
    setDisplayName(
      email ? localStorage.getItem(displayNameKey(email)) || "" : "",
    );
    setToken(jwt);
    setUser(null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    document.cookie = `token=; Path=/; Max-Age=0; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`;
    setToken("");
    setUser(null);
    setDisplayName("");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        displayName,
        saveDisplayName,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext)!;
}
