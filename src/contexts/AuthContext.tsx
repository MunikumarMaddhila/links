"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "super_admin" | "admin" | "user" | "SUPER_ADMIN" | "ADMIN" | "USER";

export interface User {
  id: string;
  email: string;
  name: string;
  token?: string;
  avatar?: string;
  role: UserRole | { id: string; name: string }; // Accept both formats from backend
  organizationId?: string;
  organizationName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🔥 Restore user on refresh from cookie (persists across browser sessions)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if authUser cookie exists (set by backend during login)
        if (typeof document !== "undefined") {
          const authUserCookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("authUser="));

          if (authUserCookie) {
            try {
              const userJson = decodeURIComponent(authUserCookie.split("=")[1]);
              const userToSet = JSON.parse(userJson);
              setUser(userToSet);
              console.log("User restored from authUser cookie:", userToSet);
              setIsLoading(false);
              return;
            } catch (e) {
              console.error("Failed to parse authUser cookie:", e);
            }
          }
        }

        // Fallback: Check if token exists via /api/auth/me
        const response = await fetch("/api/auth/me", { credentials: "include" });

        if (response.ok) {
          // Token is valid, but no user data available
          console.log("Token valid but no user data in cookie");
          setUser(null);
        } else {
          console.log("Auth check failed:", response.status);
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  // 🔥 Login - token stored in httpOnly cookie, user stored in regular cookie
  const login = (userData: User) => {
    setUser(userData);
    // User data is already stored in cookie by /api/auth/login endpoint
    console.log("User logged in:", userData);
  };

  // 🔥 Logout
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { 
        method: "POST",
        credentials: "include" 
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
    setUser(null);
    // Cookies are cleared by server endpoint
  };

  // 🔥 Switch role dynamically
  const switchRole = (role: UserRole) => {
    if (!user) return;

    const updatedUser = { ...user, role };
    setUser(updatedUser);
    // Note: Role switch is client-only for demo; in production, verify server-side
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
