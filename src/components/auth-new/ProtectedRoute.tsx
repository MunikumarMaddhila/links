"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
      return;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      const redirectPath =
        user.role === "super_admin" ? "/super-admin" : user.role === "admin" ? "/admin" : "/dashboard";
      router.replace(redirectPath);
    }
  }, [allowedRoles, isAuthenticated, router, user]);

  if (!isAuthenticated) {
    return null;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
